"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import {
    ChevronRight,
    ChevronLeft,
    CheckCircle2,
    AlertCircle,
    Upload,
    MapPin,
    Sparkles,
    Home,
    Ruler,
    DollarSign,
    FileText,
    Building,
    Trees,
    SkipForward,
} from "lucide-react";

// Components
import { Card } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CustomFormField } from "@/components/FormField";
import Header from "@/components/Header";

// Schemas & Types
import { PropertyFormData, propertySchema } from "@/lib/schemas";
import { FormDataProcessor } from "@/lib/formDataProcessor";

// API
import { useCreatePropertyMutation, useGetAuthUserQuery } from "@/state/api";

// Constants
import {
    HighlightEnum,
    InfrastructureEnum,
    SizeUnitEnum,
    PriceUnitEnum,
    PaymentPlanEnum,
    PropertyCategoryEnum,
    InfrastructureIcons,
    HighlightIcons,
    PropertyTypeEnum,
} from "@/lib/constants";

interface FormSectionConfig {
    id: string;
    title: string;
    description: string;
    icon: React.ReactNode;
    fields: React.ReactNode;
    validationFields?: readonly (keyof PropertyFormData)[];
    isOptional?: boolean;
    skipCondition?: (data: PropertyFormData) => boolean;
}

interface FormNavigationProps {
    currentStep: number;
    totalSteps: number;
    onPrevious: () => void;
    onNext: () => void;
    onSkip: () => void;
    onSubmit: () => void;
    isSubmitting: boolean;
    hasErrors: boolean;
    errorMessage?: string;
    canSkip: boolean;
}

// Animation
const FORM_ANIMATION = {
    initial: { x: 300, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: -300, opacity: 0 },
    transition: { type: "spring", stiffness: 300, damping: 30 },
};

// Default Values
const DEFAULT_FORM_VALUES: Partial<PropertyFormData> = {
    title: "",
    description: "",
    category: PropertyCategoryEnum.RESIDENTIAL,
    price: 0,
    priceUnit: PriceUnitEnum.TOTAL,
    pricePerMonth: 0,
    securityDeposit: 0,
    applicationFee: 0,
    beds: 0,
    baths: 0,
    squareFeet: 0,
    isPetsAllowed: false,
    isParkingIncluded: false,
    photoUrls: [],
    highlights: "",
    infrastructure: "",
    address: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
};

// Custom Hook: Navigation + Auto-advance
const useFormNavigation = (sections: FormSectionConfig[], form: any) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [direction, setDirection] = useState(0);

    const goToStep = useCallback(
        (step: number) => {
            if (step >= 0 && step < sections.length) {
                setDirection(step > currentStep ? 1 : -1);
                setCurrentStep(step);
            }
        },
        [currentStep, sections.length]
    );

    const next = useCallback(() => goToStep(currentStep + 1), [currentStep, goToStep]);
    const prev = useCallback(() => goToStep(currentStep - 1), [currentStep, goToStep]);

    // Auto-advance on valid input
    useEffect(() => {
        const subscription = form.watch(async (value: PropertyFormData) => {
            const section = sections[currentStep];
            if (!section.validationFields?.length) return;

            const isValid = await form.trigger(section.validationFields);
            if (isValid && section.isOptional !== true) {
                // Auto-advance only if not optional
                next();
            }
        });
        return () => subscription.unsubscribe();
    }, [form, currentStep, sections, next]);

    return { currentStep, direction, next, prev, goToStep };
};

// Sub-components
const FormNavigation: React.FC<FormNavigationProps> = ({
                                                           currentStep,
                                                           totalSteps,
                                                           onPrevious,
                                                           onNext,
                                                           onSkip,
                                                           onSubmit,
                                                           isSubmitting,
                                                           hasErrors,
                                                           errorMessage,
                                                           canSkip,
                                                       }) => (
    <div className="flex justify-between items-center pt-6">
        <Button
            type="button"
            variant="outline"
            onClick={onPrevious}
            disabled={currentStep === 0}
            className="flex items-center gap-2"
        >
            <ChevronLeft className="w-4 h-4" />
            Previous
        </Button>

        {hasErrors && (
            <Alert variant="destructive" className="flex-1 mx-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
        )}

        <div className="flex items-center gap-2">
            {canSkip && (
                <Button type="button" variant="ghost" onClick={onSkip} size="sm">
                    <SkipForward className="w-4 h-4 mr-1" />
                    Skip
                </Button>
            )}

            {currentStep === totalSteps - 1 ? (
                <Button
                    type="submit"
                    className="bg-primary-700 hover:bg-primary-800 text-white px-8"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                            Creating...
                        </>
                    ) : (
                        <>
                            <CheckCircle2 className="w-4 h-4 mr-2" />
                            Create Property
                        </>
                    )}
                </Button>
            ) : (
                <Button type="button" onClick={onNext} className="flex items-center gap-2">
                    Next
                    <ChevronRight className="w-4 h-4" />
                </Button>
            )}
        </div>
    </div>
);

const FormSection: React.FC<{
    section: FormSectionConfig;
    isActive: boolean;
    direction: number;
}> = ({ section, isActive, direction }) => (
    <AnimatePresence mode="wait">
        {isActive && (
            <motion.div
                key={section.id}
                custom={direction}
                {...FORM_ANIMATION}
                className="space-y-8"
            >
                <Card className="p-6 shadow-sm border border-gray-200">
                    <div className="flex items-start gap-3 mb-4">
                        <div className="p-2 bg-primary-100 rounded-lg text-primary-700">
                            {section.icon}
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">{section.title}</h3>
                            <p className="text-sm text-gray-600">{section.description}</p>
                        </div>
                    </div>
                    <Separator className="mb-6" />
                    <div className="space-y-6">{section.fields}</div>
                </Card>
            </motion.div>
        )}
    </AnimatePresence>
);

// Main Component
const NewProperty: React.FC = () => {
    const [createProperty, { isLoading: isSubmitting }] = useCreatePropertyMutation();
    const { data: authUser, isLoading: isLoadingUser } = useGetAuthUserQuery();

    const form = useForm<PropertyFormData>({
        resolver: zodResolver(propertySchema),
        defaultValues: DEFAULT_FORM_VALUES,
        mode: "onChange",
    });

    const category = form.watch("category");
    const formData = form.watch();

    const formSections = useMemo((): FormSectionConfig[] => {
        const base = [
            {
                id: "category",
                title: "Property Category",
                description: "Choose the type of property",
                icon: <Building className="w-5 h-5" />,
                fields: (
                    <CustomFormField
                        name="category"
                        label="Select Category"
                        type="select"
                        options={[
                            { value: "RESIDENTIAL", label: "Residential", icon: Home },
                            { value: "COMMERCIAL", label: "Commercial", icon: Building },
                            { value: "LAND", label: "Land", icon: Trees },
                        ].map((o) => ({ value: o.value, label: o.label, icon: o.icon }))}
                    />
                ),
                validationFields: ["category"] as const,
            },
            {
                id: "basic",
                title: "Basic Information",
                description: "Name and description",
                icon: <FileText className="w-5 h-5" />,
                fields: (
                    <div className="space-y-4">
                        <CustomFormField name="title" label="Property Title" placeholder="e.g., 3-Bedroom Villa" />
                        <CustomFormField name="description" label="Description" type="textarea" placeholder="Describe the property..." />
                    </div>
                ),
                validationFields: ["title", "description"] as const,
            },
            {
                id: "pricing",
                title: "Pricing & Payment",
                description: "Set price and terms",
                icon: <DollarSign className="w-5 h-5" />,
                fields: (
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <CustomFormField name="price" label="Price" type="number" />
                            <CustomFormField
                                name="priceUnit"
                                label="Unit"
                                type="select"
                                options={Object.values(PriceUnitEnum).map((u) => ({ value: u, label: u.replace(/_/g, " ") }))}
                            />
                        </div>
                        <CustomFormField
                            name="paymentPlan"
                            label="Payment Plan"
                            type="select"
                            options={Object.values(PaymentPlanEnum).map((p) => ({ value: p, label: p.replace(/_/g, " ") }))}
                        />
                    </div>
                ),
                validationFields: ["price", "priceUnit"] as const,
            },
        ] satisfies FormSectionConfig[];

        const conditional = category === "LAND"
            ? [
                {
                    id: "land",
                    title: "Land Details",
                    description: "Size and infrastructure",
                    icon: <Ruler className="w-5 h-5" />,
                    fields: (
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <CustomFormField name="size" label="Size" type="number" />
                                <CustomFormField
                                    name="sizeUnit"
                                    label="Unit"
                                    type="select"
                                    options={Object.values(SizeUnitEnum).map((u) => ({ value: u, label: u }))}
                                />
                            </div>
                            <CustomFormField
                                name="infrastructure"
                                label="Infrastructure"
                                type="multiselect"
                                options={Object.values(InfrastructureEnum).map((i) => ({
                                    value: i,
                                    label: i.replace(/_/g, " "),
                                    icon: InfrastructureIcons[i],
                                }))}
                            />
                        </div>
                    ),
                    validationFields: ["size", "sizeUnit"] as const,
                },
            ]
            : [
                {
                    id: "details",
                    title: "Property Details",
                    description: "Rooms, size, amenities",
                    icon: <Home className="w-5 h-5" />,
                    fields: (
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <CustomFormField name="beds" label="Beds" type="number" />
                                <CustomFormField name="baths" label="Baths" type="number" />
                                <CustomFormField name="squareFeet" label="Sq Ft" type="number" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <CustomFormField name="isPetsAllowed" label="Pets Allowed" type="switch" />
                                <CustomFormField name="isParkingIncluded" label="Parking" type="switch" />
                            </div>
                            <CustomFormField
                                name="propertyType"
                                label="Property Type"
                                type="select"
                                options={Object.values(PropertyTypeEnum)
                                    .filter((t) => !["Land", "ResidentialLand", "CommercialLand"].includes(t))
                                    .map((t) => ({ value: t, label: t }))}
                            />
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <CustomFormField name="pricePerMonth" label="Rent/Month" type="number" />
                                <CustomFormField name="securityDeposit" label="Deposit" type="number" />
                                <CustomFormField name="applicationFee" label="App Fee" type="number" />
                            </div>
                        </div>
                    ),
                    validationFields: ["beds", "baths", "squareFeet", "propertyType"] as const,
                },
            ];

        const optional = [
            {
                id: "highlights",
                title: "Highlights",
                description: "Optional: What makes it special?",
                icon: <Sparkles className="w-5 h-5" />,
                fields: (
                    <CustomFormField
                        name="highlights"
                        label="Select Highlights"
                        type="multiselect"
                        options={Object.values(HighlightEnum).map((h) => ({
                            value: h,
                            label: h.replace(/_/g, " "),
                            icon: HighlightIcons[h],
                        }))}
                    />
                ),
                isOptional: true,
                skipCondition: () => true,
            },
            {
                id: "photos",
                title: "Photos",
                description: "Optional: Upload images",
                icon: <Upload className="w-5 h-5" />,
                fields: (
                    <CustomFormField name="photoUrls" label="Drag & drop" type="file" accept="image/*" multiple />
                ),
                isOptional: true,
                skipCondition: () => true,
            },
        ] satisfies FormSectionConfig[];

        const required = [
            {
                id: "location",
                title: "Location",
                description: "Where is your property?",
                icon: <MapPin className="w-5 h-5" />,
                fields: (
                    <div className="space-y-4">
                        <CustomFormField name="address" label="Street Address" />
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <CustomFormField name="city" label="City" />
                            <CustomFormField name="state" label="State" />
                            <CustomFormField name="postalCode" label="Postal Code" />
                        </div>
                        <CustomFormField name="country" label="Country" />
                    </div>
                ),
                validationFields: ["address", "city", "state", "country", "postalCode"] as const,
            },
        ] satisfies FormSectionConfig[];

        return [...base, ...conditional, ...optional, ...required];
    }, [category]);

    const { currentStep, direction, next, prev } = useFormNavigation(formSections, form);

    const currentSection = formSections[currentStep];
    const canSkip = currentSection.isOptional || (currentSection.skipCondition?.(formData) ?? false);

    const handleNext = async () => {
        if (currentSection.validationFields) {
            const isValid = await form.trigger(currentSection.validationFields);
            if (isValid) next();
        } else {
            next();
        }
    };

    const handleSkip = () => {
        next();
    };

    const handleSubmit = async (data: PropertyFormData) => {
        if (!authUser?.cognitoInfo?.userId) {
            form.setError("root", { message: "Authentication required" });
            return;
        }

        const formData = FormDataProcessor.toFormData(data);
        formData.append("managerCognitoId", authUser.cognitoInfo.userId);

        try {
            await createProperty(formData).unwrap();
            form.reset();
        } catch (error: any) {
            form.setError("root", { message: error.data?.message || "Failed to create property" });
        }
    };

    if (isLoadingUser) return <div className="p-8 text-center">Loading...</div>;

    return (
        <div className="dashboard-container space-y-6">
            <Header title="Add New Property" subtitle="Create a professional listing" />

            {/* Progress */}
            <Card className="p-4 bg-gradient-to-r from-primary-50 to-primary-100">
                <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Step {currentStep + 1} of {formSections.length}</span>
                    <Badge variant="secondary" className="bg-white">
                        {currentSection.title}
                    </Badge>
                </div>
                <Progress value={((currentStep + 1) / formSections.length) * 100} className="h-2" />
            </Card>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
                    <FormSection section={currentSection} isActive={true} direction={direction} />

                    <FormNavigation
                        currentStep={currentStep}
                        totalSteps={formSections.length}
                        onPrevious={prev}
                        onNext={handleNext}
                        onSkip={handleSkip}
                        onSubmit={form.handleSubmit(handleSubmit)}
                        isSubmitting={isSubmitting}
                        hasErrors={!!form.formState.errors.root}
                        errorMessage={form.formState.errors.root?.message}
                        canSkip={canSkip}
                    />
                </form>
            </Form>
        </div>
    );
};

export default NewProperty;