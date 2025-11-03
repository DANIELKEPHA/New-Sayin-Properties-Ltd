import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface FormSectionProps {
    title: string;
    description?: string;
    children: React.ReactNode;
    isLast?: boolean;
}

export const FormSection: React.FC<FormSectionProps> = ({
                                                            title,
                                                            description,
                                                            children,
                                                            isLast = false,
                                                        }) => {
    return (
        <Card className="border-l-4 border-l-blue-500 shadow-sm">
            <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-gray-900">
                    {title}
                </CardTitle>
                {description && (
                    <p className="text-sm text-gray-600 mt-1">{description}</p>
                )}
            </CardHeader>
            <CardContent className="space-y-4">
                {children}
            </CardContent>
        </Card>
    );
};