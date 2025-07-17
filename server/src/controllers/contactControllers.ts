import { Request, Response } from "express";
import {Prisma, PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

export const createContact = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, message, interests, privacyConsent, tenantCognitoId } = req.body;

        // Validate required fields
        if (!name || typeof name !== "string" || name.trim() === "") {
            res.status(400).json({ message: "Missing or invalid required field: name must be a non-empty string" });
            return;
        }
        if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            res.status(400).json({ message: "Missing or invalid required field: email must be a valid email address" });
            return;
        }
        if (!interests || typeof interests !== "string" || interests.trim() === "") {
            res.status(400).json({ message: "Invalid interests: must be a non-empty string" });
            return;
        }
        if (privacyConsent === undefined || typeof privacyConsent !== "boolean") {
            res.status(400).json({ message: "Missing or invalid required field: privacyConsent must be a boolean" });
            return;
        }

        // Validate tenantCognitoId if provided
        if (tenantCognitoId) {
            const tenant = await prisma.tenant.findUnique({
                where: { cognitoId: tenantCognitoId },
            });
            if (!tenant) {
                res.status(400).json({ message: `Invalid tenantCognitoId: no tenant found with cognitoId ${tenantCognitoId}` });
                return;
            }
        }

        const contact = await prisma.contact.create({
            data: {
                name,
                email,
                message: message || null,
                interests: interests || null,
                privacyConsent,
                tenantCognitoId: tenantCognitoId || null,
            },
        });

        res.status(201).json(contact);
    } catch (error: any) {
        console.error("Error creating contact:", error, { payload: req.body });
        res.status(500).json({ message: `Error creating contact: ${error.message}` });
    }
};

export const getContacts = async (req: Request, res: Response): Promise<void> => {
    try {
        const { page = "1", limit = "10", search } = req.query;
        const pageNumber = Number(page);
        const limitNumber = Number(limit);

        if (isNaN(pageNumber) || isNaN(limitNumber) || pageNumber < 1 || limitNumber < 1) {
            res.status(400).json({ message: "Invalid page or limit parameters" });
            return;
        }

        const where = search
            ? {
                OR: [
                    { name: { contains: String(search), mode: "insensitive" as Prisma.QueryMode } },
                    { email: { contains: String(search), mode: "insensitive" as Prisma.QueryMode } },
                    { message: { contains: String(search), mode: "insensitive" as Prisma.QueryMode } },
                    { interests: { contains: String(search), mode: "insensitive" as Prisma.QueryMode } },
                ],
            }
            : {};

        const contacts = await prisma.contact.findMany({
            where,
            orderBy: { createdAt: "desc" },
            skip: (pageNumber - 1) * limitNumber,
            take: limitNumber,
            include: { tenant: true },
        });

        if (contacts.length === 0) {
            res.status(404).json({ message: "No contact submissions found" });
            return;
        }

        res.json(contacts);
    } catch (error: any) {
        console.error("Error retrieving contacts:", error);
        res.status(500).json({ message: `Error retrieving contacts: ${error.message}` });
    }
};

export const getContact = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const idNumber = Number(id);

        if (isNaN(idNumber)) {
            res.status(400).json({ message: "Invalid contact ID" });
            return;
        }

        const contact = await prisma.contact.findUnique({
            where: { id: idNumber },
            include: { tenant: true },
        });

        if (!contact) {
            res.status(404).json({ message: "Contact not found" });
            return;
        }

        res.json(contact);
    } catch (error: any) {
        console.error("Error retrieving contact:", error);
        res.status(500).json({ message: `Error retrieving contact: ${error.message}` });
    }
};

export const deleteContact = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const idNumber = Number(id);

        if (isNaN(idNumber)) {
            res.status(400).json({ message: "Invalid contact ID" });
            return;
        }

        await prisma.contact.delete({
            where: { id: idNumber },
        });

        res.json({ message: "Contact submission deleted successfully" });
    } catch (error: any) {
        if (error.code === "P2025") {
            res.status(404).json({ message: "Contact submission not found" });
            return;
        }
        console.error("Error deleting contact:", error);
        res.status(500).json({ message: `Error deleting contact: ${error.message}` });
    }
};