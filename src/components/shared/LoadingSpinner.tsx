import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const LoadingSpinner = ({ size = "md", className }: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: "w-3 h-3 border-2",
    md: "w-4 h-4 border-2", 
    lg: "w-6 h-6 border-2"
  };

  return (
    <div 
      className={cn(
        sizeClasses[size],
        "border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin",
        className
      )}
    />
  );
};