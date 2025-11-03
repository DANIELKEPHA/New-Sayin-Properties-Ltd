import { Request, Response } from "express";
import {
    PrismaClient,
    Prisma,
    PropertyType,
    PriceUnit,
    PropertyCategory,
    PaymentPlan,
    SizeUnit,
    Infrastructure,
    Highlight,
    Location
} from "@prisma/client";
import { wktToGeoJSON } from "@terraformer/wkt";
import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import axios from "axios";

const prisma = new PrismaClient();

const s3Client = new S3Client({
    region: process.env.AWS_REGION,
});

export const getProperties = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const {
            favoriteIds,
            priceMin,
            priceMax,
            beds,
            baths,
            propertyType,
            squareFeetMin,
            squareFeetMax,
            amenities,
            availableFrom,
            latitude,
            longitude,
        } = req.query;

        let whereConditions: Prisma.Sql[] = [];

        // Add condition for available properties (if applicable)
        // Example: whereConditions.push(Prisma.sql`p."isAvailable" = true`);

        if (favoriteIds) {
            const favoriteIdsArray = (favoriteIds as string).split(",").map(Number);
            whereConditions.push(
                Prisma.sql`p.id IN (${Prisma.join(favoriteIdsArray)})`
            );
        }

        if (priceMin) {
            whereConditions.push(
                Prisma.sql`p."pricePerMonth" >= ${Number(priceMin)}`
            );
        }

        if (priceMax) {
            whereConditions.push(
                Prisma.sql`p."pricePerMonth" <= ${Number(priceMax)}`
            );
        }

        if (beds && beds !== "any") {
            whereConditions.push(Prisma.sql`p.beds >= ${Number(beds)}`);
        }

        if (baths && baths !== "any") {
            whereConditions.push(Prisma.sql`p.baths >= ${Number(baths)}`);
        }

        if (squareFeetMin) {
            whereConditions.push(
                Prisma.sql`p."squareFeet" >= ${Number(squareFeetMin)}`
            );
        }

        if (squareFeetMax) {
            whereConditions.push(
                Prisma.sql`p."squareFeet" <= ${Number(squareFeetMax)}`
            );
        }

        if (propertyType && propertyType !== "any") {
            whereConditions.push(
                Prisma.sql`p."propertyType" = ${propertyType}::"PropertyType"`
            );
        }

        if (amenities && amenities !== "any") {
            const amenitiesArray = (amenities as string).split(",");
            whereConditions.push(Prisma.sql`p.amenities @> ${amenitiesArray}`);
        }

        if (availableFrom && availableFrom !== "any") {
            const availableFromDate =
                typeof availableFrom === "string" ? availableFrom : null;
            if (availableFromDate) {
                const date = new Date(availableFromDate);
                if (!isNaN(date.getTime())) {
                    whereConditions.push(
                        Prisma.sql`NOT EXISTS (
              SELECT 1 FROM "Lease" l 
              WHERE l."propertyId" = p.id 
              AND l."endDate" > ${date.toISOString()}
            )`
                    );
                }
            }
        }

        if (latitude && longitude) {
            const lat = parseFloat(latitude as string);
            const lng = parseFloat(longitude as string);

            // Validate latitude and longitude
            if (isNaN(lat) || isNaN(lng)) {
                throw new Error("Invalid latitude or longitude values");
            }

            // Ensure latitude and longitude are within valid ranges
            if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
                throw new Error("Latitude or longitude out of valid range");
            }

            const radiusInKilometers = 1000;
            const degrees = radiusInKilometers / 111; // Converts kilometers to degrees

            whereConditions.push(
                Prisma.sql`ST_DWithin(
          l.coordinates::geometry,
          ST_SetSRID(ST_MakePoint(${lng}, ${lat}), 4326),
          ${degrees}
        )`
            );
        }

        const completeQuery = Prisma.sql`
            SELECT
                p.*,
                json_build_object(
                        'id', l.id,
                        'address', l.address,
                        'city', l.city,
                        'state', l.state,
                        'country', l.country,
                        'postalCode', l."postalCode",
                        'coordinates', json_build_object(
                                'longitude', ST_X(l."coordinates"::geometry),
                                'latitude', ST_Y(l."coordinates"::geometry)
                                       )
                ) as location
            FROM "Property" p
                     JOIN "Location" l ON p."locationId" = l.id
                ${
            whereConditions.length > 0
                ? Prisma.sql`WHERE ${Prisma.join(whereConditions, " AND ")}`
                : Prisma.empty
        }
        `;

        const properties = await prisma.$queryRaw(completeQuery);

        res.json(properties);
    } catch (error: any) {
        res
            .status(500)
            .json({ message: `Error retrieving properties: ${error.message}` });
    }
};

export const getProperty = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { id } = req.params;
        const property = await prisma.property.findUnique({
            where: { id: Number(id) },
            include: { location: true },
        });

        if (!property) {
            res.status(404).json({ message: "Property not found" });
            return;
        }

        const [{ coordinates }] = await prisma.$queryRaw<
            { coordinates: string }[]
        >`SELECT ST_AsText(coordinates) AS coordinates FROM "Location" WHERE id = ${property.locationId}`;

        const geoJSON: any = wktToGeoJSON(coordinates || "");
        const longitude = geoJSON.coordinates[0];
        const latitude = geoJSON.coordinates[1];

        res.json({
            ...property,
            location: {
                ...property.location,
                coordinates: { longitude, latitude },
            },
        });
    } catch (err: any) {
        res
            .status(500)
            .json({ message: `Error retrieving property: ${err.message}` });
    }
};

export const createProperty = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const files = req.files as Express.Multer.File[];
        const {
            address,
            city,
            state,
            country,
            postalCode,
            managerCognitoId,
            category = "RESIDENTIAL",               // default for backward compat
            propertyType,
            price,
            priceUnit = "TOTAL",
            paymentPlan,
            size,
            sizeUnit,
            pricePerMonth,
            securityDeposit,
            applicationFee,
            beds,
            baths,
            squareFeet,
            highlights,
            infrastructure,
            isForSale,
            isForRent,
            isPetsAllowed,
            isParkingIncluded,
            title,
            description,
        } = req.body;

        // -------------------------------------------------
        // 1. Upload photos to S3
        // -------------------------------------------------
        const photoUrls = (
            await Promise.all(
                files.map(async (file) => {
                    const uploadResult = await new Upload({
                        client: s3Client,
                        params: {
                            Bucket: process.env.S3_BUCKET_NAME!,
                            Key: `properties/${Date.now()}-${file.originalname}`,
                            Body: file.buffer,
                            ContentType: file.mimetype,
                        },
                    }).done();

                    return uploadResult.Location as string;
                })
            )
        ).filter(Boolean) as string[];


        // -------------------------------------------------
        // 2. Geocode address → PostGIS point
        // -------------------------------------------------
        const geocodingUrl = `https://nominatim.openstreetmap.org/search?${new URLSearchParams(
            {
                street: address,
                city,
                country,
                postalcode: postalCode,
                format: "json",
                limit: "1",
            }
        ).toString()}`;

        const geocodingResponse = await axios.get(geocodingUrl, {
            headers: {
                "User-Agent": "RealEstateApp (justsomedummyemail@gmail.com)",
            },
        });

        const [longitude, latitude] =
            geocodingResponse.data[0]?.lon && geocodingResponse.data[0]?.lat
                ? [
                    parseFloat(geocodingResponse.data[0].lon),
                    parseFloat(geocodingResponse.data[0].lat),
                ]
                : [0, 0];

        // -------------------------------------------------
        // 3. Create Location (PostGIS)
        // -------------------------------------------------
        const [location] = await prisma.$queryRaw<Location[]>`
      INSERT INTO "Location" (address, city, state, country, "postalCode", coordinates)
      VALUES (${address}, ${city}, ${state}, ${country}, ${postalCode},
              ST_SetSRID(ST_MakePoint(${longitude}, ${latitude}), 4326))
      RETURNING id, address, city, state, country, "postalCode", ST_AsText(coordinates) as coordinates;
    `;

        // -------------------------------------------------
        // 4. Prepare Property data
        // -------------------------------------------------
        const isLand = category === "LAND";

        // Helper to safely parse comma-separated enum arrays
        const parseEnumArray = <T>(val: unknown): T[] => {
            if (Array.isArray(val)) return val as T[];
            if (typeof val === "string") return val.split(",").filter(Boolean) as T[];
            return [];
        };

        // ----- Core fields (always present) -----
        const baseData: Prisma.PropertyCreateInput = {
            title: title ?? "Untitled Property",
            description: description ?? "",
            category: category as PropertyCategory,
            price: price ? parseFloat(price) : 0,
            priceUnit: priceUnit as PriceUnit,
            photoUrls,
            location: { connect: { id: location.id } },
            manager: { connect: { cognitoId: managerCognitoId } },
            isForSale: isForSale === "true",
            isForRent: isForRent !== "false", // default true
        };

        // ----- Conditional fields -----
        if (propertyType) {
            baseData.propertyType = propertyType as PropertyType;
        }

        if (paymentPlan) {
            baseData.paymentPlan = paymentPlan as PaymentPlan;
        }

        // ----- LAND-specific required fields -----
        if (isLand) {
            if (!size || !sizeUnit) {
                res.status(400).json({
                    message: "For LAND category, `size` and `sizeUnit` are required.",
                });
                return;
            }
            baseData.size = parseFloat(size);
            baseData.sizeUnit = sizeUnit as SizeUnit;
            baseData.infrastructure = parseEnumArray<Infrastructure>(infrastructure);
        } else {
            // ----- Residential / Commercial fields -----
            if (pricePerMonth) baseData.pricePerMonth = parseFloat(pricePerMonth);
            if (securityDeposit) baseData.securityDeposit = parseFloat(securityDeposit);
            if (applicationFee) baseData.applicationFee = parseFloat(applicationFee);
            if (beds) baseData.beds = parseInt(beds, 10);
            if (baths) baseData.baths = parseFloat(baths);
            if (squareFeet) baseData.squareFeet = parseInt(squareFeet, 10);
            baseData.isPetsAllowed = isPetsAllowed === "true";
            baseData.isParkingIncluded = isParkingIncluded === "true";
        }

        // ----- Common optional arrays -----
        baseData.highlights = parseEnumArray<Highlight>(highlights);

        // -------------------------------------------------
        // 5. Create Property
        // -------------------------------------------------
        const newProperty = await prisma.property.create({
            data: baseData as Prisma.PropertyCreateInput,
            include: {
                location: true,
                manager: true,
            },
        });

        res.status(201).json(newProperty);
    } catch (err: any) {
        console.error("createProperty error:", err);
        res
            .status(500)
            .json({ message: `Error creating property: ${err.message}` });
    }
};

export const updateProperty = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { id } = req.params;
        const propertyId = Number(id);
        if (isNaN(propertyId)) {
            res.status(400).json({ message: "Invalid property ID" });
            return;
        }

        const files = req.files as Express.Multer.File[];
        const managerCognitoId = req.body.managerCognitoId; // must match owner

        // -------------------------------------------------
        // 1. Verify ownership
        // -------------------------------------------------
        const existingProperty = await prisma.property.findUnique({
            where: { id: propertyId },
            select: { managerCognitoId: true, locationId: true, photoUrls: true },
        });

        if (!existingProperty) {
            res.status(404).json({ message: "Property not found" });
            return;
        }

        if (existingProperty.managerCognitoId !== managerCognitoId) {
            res.status(403).json({ message: "Unauthorized: You do not own this property" });
            return;
        }

        // -------------------------------------------------
        // 2. Upload new photos (if any)
        // -------------------------------------------------
        let newPhotoUrls: string[] = existingProperty.photoUrls;
        if (files && files.length > 0) {
            const uploadedUrls = (
                await Promise.all(
                    files.map(async (file) => {
                        const uploadParams = {
                            Bucket: process.env.S3_BUCKET_NAME!,
                            Key: `properties/${Date.now()}-${file.originalname}`,
                            Body: file.buffer,
                            ContentType: file.mimetype,
                        };

                        const uploadResult = await new Upload({
                            client: s3Client,
                            params: uploadParams,
                        }).done();

                        return uploadResult.Location as string;
                    })
                )
            ).filter(Boolean) as string[];

            newPhotoUrls = [...newPhotoUrls, ...uploadedUrls];
        }

        // -------------------------------------------------
        // 3. Handle location update (optional)
        // -------------------------------------------------
        const {
            address,
            city,
            state,
            country,
            postalCode,
            // property fields
            title,
            description,
            category,
            propertyType,
            price,
            priceUnit,
            paymentPlan,
            size,
            sizeUnit,
            pricePerMonth,
            securityDeposit,
            applicationFee,
            beds,
            baths,
            squareFeet,
            highlights,
            infrastructure,
            isForSale,
            isForRent,
            isPetsAllowed,
            isParkingIncluded,
            // special: remove photos by URL
            removePhotoUrls,
        } = req.body;

        const isLand = category === "LAND";

        // Helper: parse comma-separated enum arrays
        const parseEnumArray = <T>(val: unknown): T[] => {
            if (Array.isArray(val)) return val as T[];
            if (typeof val === "string") return val.split(",").filter(Boolean) as T[];
            return [];
        };

        // -------------------------------------------------
        // 4. Build update data
        // -------------------------------------------------
        const updateData: Prisma.PropertyUpdateInput = {
            title: title ?? undefined,
            description: description ?? undefined,
            category: category ? (category as PropertyCategory) : undefined,
            price: price ? parseFloat(price) : undefined,
            priceUnit: priceUnit ? (priceUnit as PriceUnit) : undefined,
            photoUrls: newPhotoUrls,
            isForSale: isForSale !== undefined ? isForSale === "true" : undefined,
            isForRent: isForRent !== undefined ? isForRent !== "false" : undefined,
        };

        // Optional fields
        if (propertyType) updateData.propertyType = propertyType as PropertyType;
        if (paymentPlan) updateData.paymentPlan = paymentPlan as PaymentPlan;
        if (highlights !== undefined) updateData.highlights = parseEnumArray<Highlight>(highlights);

        // Remove photos if requested
        if (removePhotoUrls) {
            const urlsToRemove = Array.isArray(removePhotoUrls)
                ? removePhotoUrls
                : removePhotoUrls.split(",");
            updateData.photoUrls = {
                set: newPhotoUrls.filter((url) => !urlsToRemove.includes(url)),
            };
        }

        // LAND-specific
        if (isLand) {
            if (size !== undefined) updateData.size = parseFloat(size);
            if (sizeUnit) updateData.sizeUnit = sizeUnit as SizeUnit;
            if (infrastructure !== undefined)
                updateData.infrastructure = parseEnumArray<Infrastructure>(infrastructure);

            // Nullify residential fields
            updateData.beds = null;
            updateData.baths = null;
            updateData.squareFeet = null;
            updateData.pricePerMonth = null;
            updateData.securityDeposit = null;
            updateData.applicationFee = null;
            updateData.isPetsAllowed = false;
            updateData.isParkingIncluded = false;
        } else {
            // Residential / Commercial
            if (pricePerMonth !== undefined) updateData.pricePerMonth = parseFloat(pricePerMonth);
            if (securityDeposit !== undefined) updateData.securityDeposit = parseFloat(securityDeposit);
            if (applicationFee !== undefined) updateData.applicationFee = parseFloat(applicationFee);
            if (beds !== undefined) updateData.beds = parseInt(beds, 10);
            if (baths !== undefined) updateData.baths = parseFloat(baths);
            if (squareFeet !== undefined) updateData.squareFeet = parseInt(squareFeet, 10);
            if (isPetsAllowed !== undefined) updateData.isPetsAllowed = isPetsAllowed === "true";
            if (isParkingIncluded !== undefined) updateData.isParkingIncluded = isParkingIncluded === "true";

            // Nullify land fields
            updateData.size = null;
            updateData.sizeUnit = null;
            updateData.infrastructure = [];
        }

        // -------------------------------------------------
        // 5. Update Location (if address fields changed)
        // -------------------------------------------------
        if (address || city || state || country || postalCode) {
            let longitude = 0, latitude = 0;

            if (address && city && country) {
                const geocodingUrl = `https://nominatim.openstreetmap.org/search?${new URLSearchParams(
                    {
                        street: address,
                        city,
                        country,
                        postalcode: postalCode || "",
                        format: "json",
                        limit: "1",
                    }
                ).toString()}`;

                const response = await axios.get(geocodingUrl, {
                    headers: { "User-Agent": "RealEstateApp (justsomedummyemail@gmail.com)" },
                });

                if (response.data[0]?.lon && response.data[0]?.lat) {
                    longitude = parseFloat(response.data[0].lon);
                    latitude = parseFloat(response.data[0].lat);
                }
            }

            await prisma.location.update({
                where: { id: existingProperty.locationId },
                data: {
                    address: address ?? undefined,
                    city: city ?? undefined,
                    state: state ?? undefined,
                    country: country ?? undefined,
                    postalCode: postalCode ?? undefined,
                },
            });

            if (address && city && country) {
                await prisma.$executeRawUnsafe(
                    `UPDATE "Location" SET coordinates = ST_SetSRID(ST_MakePoint(${longitude}, ${latitude}), 4326)
     WHERE id = ${existingProperty.locationId}`
                );
            }

        }

        // -------------------------------------------------
        // 6. Update Property
        // -------------------------------------------------
        const updatedProperty = await prisma.property.update({
            where: { id: propertyId },
            data: updateData,
            include: {
                location: true,
                manager: true,
            },
        });

        res.json(updatedProperty);
    } catch (err: any) {
        console.error("updateProperty error:", err);
        res.status(500).json({ message: `Error updating property: ${err.message}` });
    }
};

export const deleteProperty = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { id } = req.params;
        const propertyId = Number(id);
        if (isNaN(propertyId)) {
            res.status(400).json({ message: "Invalid property ID" });
            return;
        }

        const { managerCognitoId } = req.body;

        // -------------------------------------------------
        // 1. Verify ownership
        // -------------------------------------------------
        const property = await prisma.property.findUnique({
            where: { id: propertyId },
            select: { managerCognitoId: true, photoUrls: true },
        });

        if (!property) {
            res.status(404).json({ message: "Property not found" });
            return;
        }

        if (property.managerCognitoId !== managerCognitoId) {
            res.status(403).json({ message: "Unauthorized: You do not own this property" });
            return;
        }

        // -------------------------------------------------
        // 2. Delete from S3 (optional: soft-delete photo URLs)
        // -------------------------------------------------
        // Note: S3 cleanup is best-effort. You can skip or run async.
        // Here we just delete the DB record and let lifecycle rules clean S3.
        // Uncomment below if you want immediate deletion:

        /*
        await Promise.all(
          property.photoUrls.map(async (url) => {
            const key = url.split("/").slice(-2).join("/"); // adjust based on your URL format
            await s3Client.send(new DeleteObjectCommand({
              Bucket: process.env.S3_BUCKET_NAME!,
              Key: key,
            }));
          })
        );
        */

        // -------------------------------------------------
        // 3. Delete Property (cascades to Location via onDelete: Cascade)
        // -------------------------------------------------
        await prisma.property.delete({
            where: { id: propertyId },
        });

        res.status(204).send(); // No content
    } catch (err: any) {
        console.error("deleteProperty error:", err);
        res.status(500).json({ message: `Error deleting property: ${err.message}` });
    }
};