"use client";

import { useState, type ChangeEventHandler } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";

type AuthInputFieldProps = {
  id: string;
  label: string;
  type: "text" | "email" | "password";
  value: string;
  autoComplete?: string;
  disabled?: boolean;
  required?: boolean;
  hasError?: boolean;
  errorMessageId?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
};

export default function AuthInputField({
  id,
  label,
  type,
  value,
  autoComplete,
  disabled,
  required,
  hasError,
  errorMessageId,
  onChange,
}: AuthInputFieldProps) {
  const isPasswordField = type === "password";
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const resolvedType = isPasswordField
    ? isPasswordVisible
      ? "text"
      : "password"
    : type;

  return (
    <div className="form-control w-full">
      <label htmlFor={id} className="mb-1.5 block">
        <span className="label-text text-[13px] font-medium text-base-content/60">
          {label}
        </span>
      </label>

      <div className="relative">
        <input
          id={id}
          type={resolvedType}
          className="input input-bordered w-full pr-14 focus:input-primary"
          value={value}
          autoComplete={autoComplete}
          disabled={disabled}
          required={required}
          aria-required={required}
          aria-invalid={hasError}
          aria-describedby={hasError ? errorMessageId : undefined}
          onChange={onChange}
        />

        {isPasswordField ? (
          <button
            type="button"
            className="btn btn-ghost btn-sm absolute right-1.5 top-1/2 h-9 min-h-0 w-9 -translate-y-1/2 rounded-full p-0"
            aria-label={isPasswordVisible ? `Hide ${label}` : `Show ${label}`}
            aria-pressed={isPasswordVisible}
            onClick={() => setIsPasswordVisible((previous) => !previous)}
            disabled={disabled}
          >
            {isPasswordVisible ? (
              <VisibilityOff fontSize="small" />
            ) : (
              <Visibility fontSize="small" />
            )}
          </button>
        ) : null}
      </div>
    </div>
  );
}
