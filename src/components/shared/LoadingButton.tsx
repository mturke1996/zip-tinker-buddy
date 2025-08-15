import { LoadingSpinner } from "./LoadingSpinner";

interface LoadingButtonProps {
  isLoading: boolean;
  loadingText: string;
  children: React.ReactNode;
  variant?: "primary" | "outline" | "secondary";
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export const LoadingButton = ({
  isLoading,
  loadingText,
  children,
  variant = "primary",
  onClick,
  type = "button",
  disabled
}: LoadingButtonProps) => {
  const baseClasses = "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all cursor-pointer border-none w-full h-11";
  
  const variantClasses = {
    primary: "bg-gradient-primary text-primary-foreground hover:shadow-glow",
    outline: "border border-border/80 bg-background text-foreground hover:bg-accent/10 hover:border-accent/50",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80"
  };

  const buttonClass = `${baseClasses} ${variantClasses[variant]} ${(isLoading || disabled) ? "opacity-50 pointer-events-none" : ""}`;

  return (
    <button
      type={type}
      className={buttonClass}
      onClick={onClick}
      disabled={isLoading || disabled}
    >
      {isLoading ? (
        <div className="flex items-center gap-2">
          <LoadingSpinner />
          {loadingText}
        </div>
      ) : (
        children
      )}
    </button>
  );
};