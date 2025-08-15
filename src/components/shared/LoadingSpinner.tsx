interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
}

export const LoadingSpinner = ({ size = "md" }: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: "w-3 h-3",
    md: "w-4 h-4", 
    lg: "w-6 h-6"
  };

  return (
    <div className={`${sizeClasses[size]} border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin`} />
  );
};