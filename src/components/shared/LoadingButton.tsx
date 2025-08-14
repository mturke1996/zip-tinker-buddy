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
  const buttonClass = `button ${variant === "primary" ? "button-primary" : variant === "outline" ? "button-outline" : "button-secondary"}`;

  return (
    <button
      type={type}
      className={buttonClass}
      onClick={onClick}
      disabled={isLoading || disabled}
    >
      {isLoading ? (
        <div className="loading-content">
          <LoadingSpinner />
          {loadingText}
        </div>
      ) : (
        children
      )}
    </button>
  );
};