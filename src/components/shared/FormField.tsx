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
    <div className="form-field">
      <label htmlFor={id} className="field-label">
        {label}
      </label>
      <div className="input-container">
        <input
          id={id}
          type={inputType}
          placeholder={placeholder}
          className={`form-input ${showPasswordToggle ? "input-with-icon" : ""}`}
          required={required}
        />
        {showPasswordToggle && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="password-toggle"
          >
            {showPassword ? (
              <svg className="password-toggle-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
              </svg>
            ) : (
              <svg className="password-toggle-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            )}
          </button>
        )}
      </div>
    </div>
  );
};