import * as z from "zod";
import {
    PropertyCategoryEnum,
    PropertyTypeEnum,
    PriceUnitEnum,
    PaymentPlanEnum,
    SizeUnitEnum,
    ListingStatusEnum,
} from "@/lib/constants";

export const propertySchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),

    category: z.nativeEnum(PropertyCategoryEnum),
    propertyType: z.nativeEnum(PropertyTypeEnum),

    price: z.coerce.number().positive("Price must be positive"),
    priceUnit: z.nativeEnum(PriceUnitEnum),
    paymentPlan: z.nativeEnum(PaymentPlanEnum).optional(),

    size: z.coerce.number().positive("Size must be positive").optional(),
    sizeUnit: z.nativeEnum(SizeUnitEnum).optional(),

    pricePerMonth: z.coerce.number().positive().min(0).int().optional(),
    securityDeposit: z.coerce.number().positive().min(0).int().optional(),
    applicationFee: z.coerce.number().positive().min(0).int().optional(),

    isPetsAllowed: z.boolean(),
    isParkingIncluded: z.boolean(),

    // Support for multiple file uploads
    photoUrls: z
        .array(z.instanceof(File))
        .min(1, "At least one photo is required"),

    // Textarea-style comma-separated inputs for form simplicity
    highlights: z.string().min(1, "Highlights are required"),
    infrastructure: z.string().min(1, "Infrastructure is required"),

    beds: z.coerce.number().positive().min(0).max(10).int().optional(),
    baths: z.coerce.number().positive().min(0).max(10).int().optional(),
    squareFeet: z.coerce.number().int().positive().optional(),

    status: z.nativeEnum(ListingStatusEnum).default(ListingStatusEnum.AVAILABLE),

    address: z.string().min(1, "Address is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    country: z.string().min(1, "Country is required"),
    postalCode: z.string().min(1, "Postal code is required"),
});

export type PropertyFormData = z.infer<typeof propertySchema>;

export const applicationSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
    message: z.string().optional(),
});

export type ApplicationFormData = z.infer<typeof applicationSchema>;

export const settingsSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
});

export type SettingsFormData = z.infer<typeof settingsSchema>;
