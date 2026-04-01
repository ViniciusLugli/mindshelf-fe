import { useState, type ChangeEventHandler } from "react";

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
    <label className="form-control w-full" htmlFor={id}>
      <span className="label-text mb-1.5 text-[13px] font-medium text-base-content/60">
        {label}
      </span>
      <div className="relative">
        <input
          id={id}
          type={resolvedType}
          className="input input-bordered w-full pr-18 focus:input-primary"
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
            className="btn btn-ghost btn-xs absolute right-2 top-1/2 -translate-y-1/2 normal-case"
            aria-label={isPasswordVisible ? `Hide ${label}` : `Show ${label}`}
            onClick={() => setIsPasswordVisible((previous) => !previous)}
            disabled={disabled}
          >
            {isPasswordVisible ? "Hide" : "Show"}
          </button>
        ) : null}
      </div>
    </label>
  );
}
