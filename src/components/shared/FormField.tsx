import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

interface FormFieldProps {
  id: string;
  type: string;
  label: string;
  placeholder: string;
  required?: boolean;
  showPasswordToggle?: boolean;
}

export const FormField = ({
  id,
  type,
  label,
  placeholder,
  required = false,
  showPasswordToggle = false
}: FormFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputType = showPasswordToggle && showPassword ? "text" : type;

  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
      </Label>
      <div className="relative">
        <Input
          id={id}
          type={inputType}
          placeholder={placeholder}
          className={`h-11 bg-background/50 border-border/80 focus:border-primary transition-colors ${
            showPasswordToggle ? "pl-10" : ""
          }`}
          required={required}
        />
        {showPasswordToggle && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        )}
      </div>
    </div>
  );
};