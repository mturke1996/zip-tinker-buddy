import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "./LoadingSpinner";
import { cn } from "@/lib/utils";

interface LoadingButtonProps {
  isLoading: boolean;
  loadingText: string;
  children: React.ReactNode;
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export const LoadingButton = ({
  isLoading,
  loadingText,
  children,
  variant = "default",
  className,
  onClick,
  type = "button",
  disabled
}: LoadingButtonProps) => {
  return (
    <Button
      type={type}
      variant={variant}
      className={cn("w-full h-11 font-medium", className)}
      onClick={onClick}
      disabled={isLoading || disabled}
    >
      {isLoading ? (
        <div className="flex items-center gap-2">
          <LoadingSpinner size="md" />
          {loadingText}
        </div>
      ) : (
        children
      )}
    </Button>
  );
};