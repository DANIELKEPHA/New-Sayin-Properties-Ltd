import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface FormStepIndicatorProps {
    currentStep: number;
    totalSteps: number;
    currentSectionTitle: string;
}

export const FormStepIndicator: React.FC<FormStepIndicatorProps> = ({
                                                                        currentStep,
                                                                        totalSteps,
                                                                        currentSectionTitle,
                                                                    }) => {
    const progress = ((currentStep + 1) / totalSteps) * 100;

    return (
        <Card className="p-4 bg-gradient-to-r from-primary-50 to-primary-100 border-primary-200">
            <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-primary-800">
          Step {currentStep + 1} of {totalSteps}
        </span>
                <Badge variant="secondary" className="bg-white">
                    {currentSectionTitle}
                </Badge>
            </div>
            <Progress value={progress} className="h-2" />
        </Card>
    );
};