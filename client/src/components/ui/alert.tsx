import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { AlertCircle } from "lucide-react";

const alertVariants = cva(
    "relative w-full rounded-lg border p-4 [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg+div]:pl-7",
    {
        variants: {
            variant: {
                default: "bg-background text-foreground",
                destructive: "border-red-500/50 text-red-700 dark:text-red-600",
                success: "border-green-500/50 text-green-700 dark:text-green-600",
                warning: "border-yellow-500/50 text-yellow-700 dark:text-yellow-600",
                info: "border-blue-500/50 text-blue-700 dark:text-blue-600",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
);

export interface AlertProps
    extends React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof alertVariants> {}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
    ({ className, variant, children, ...props }, ref) => {
        return (
            <div
                ref={ref}
                role="alert"
                className={cn(alertVariants({ variant }), className)}
                {...props}
            >
                {variant === "destructive" && <AlertCircle className="h-4 w-4" />}
                <div>{children}</div>
            </div>
        );
    }
);
Alert.displayName = "Alert";

const AlertTitle = ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h5 className={cn("mb-1 font-medium leading-none tracking-tight", className)} {...props} />
);
AlertTitle.displayName = "AlertTitle";

const AlertDescription = ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className={cn("text-sm text-muted-foreground", className)} {...props} />
);
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };
