// utils/formDataProcessor.ts - FULLY SAFE VERSION
import { PropertyFormData } from "@/lib/schemas";

export class FormDataProcessor {
    static toFormData(data: PropertyFormData): FormData {
        const formData = new FormData();

        // 1. FILES
        if (data.photoUrls?.length) {
            data.photoUrls.forEach((file) => {
                if (file instanceof File) formData.append("photos", file);
            });
        }

        // 2. ARRAYS (comma-joined)
        ["highlights", "infrastructure"].forEach((key) => {
            const value = (data as any)[key];
            if (Array.isArray(value) && value.length) {
                formData.append(key, value.join(","));
            }
        });

        // 3. BOoleans (only fields that exist in schema)
        const booleans = {
            isPetsAllowed: data.isPetsAllowed,
            isParkingIncluded: data.isParkingIncluded,
        } as Record<string, boolean | undefined>;

        Object.entries(booleans).forEach(([key, value]) => {
            if (typeof value === "boolean") {
                formData.append(key, value.toString());
            }
        });

        // 4. NUMBERS
        const numbers = {
            price: data.price,
            pricePerMonth: data.pricePerMonth,
            securityDeposit: data.securityDeposit,
            applicationFee: data.applicationFee,
            beds: data.beds,
            baths: data.baths,
            squareFeet: data.squareFeet,
            size: data.size,
        };

        Object.entries(numbers).forEach(([key, value]) => {
            if (typeof value === "number" && !isNaN(value)) {
                formData.append(key, value.toString());
            }
        });

        // 5. STRINGS & ENUMS
        const strings = {
            title: data.title,
            description: data.description,
            category: data.category,
            propertyType: data.propertyType,
            priceUnit: data.priceUnit,
            paymentPlan: data.paymentPlan,
            sizeUnit: data.sizeUnit,
            address: data.address,
            city: data.city,
            state: data.state,
            country: data.country,
            postalCode: data.postalCode,
        };

        Object.entries(strings).forEach(([key, value]) => {
            if (typeof value === "string" && value.trim()) {
                formData.append(key, value.trim());
            }
        });

        return formData;
    }

    static log(formData: FormData) {
        console.log("FormData:");
        for (const [key, value] of formData.entries()) {
            console.log(`${key}:`, value instanceof File ? `[File ${value.name}]` : value);
        }
    }
}