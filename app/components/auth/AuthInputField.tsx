import type { ChangeEventHandler } from "react";

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
  return (
    <label className="form-control w-full" htmlFor={id}>
      <span className="label-text mb-1.5 text-[13px] font-medium text-base-content/60">
        {label}
      </span>
      <input
        id={id}
        type={type}
        className="input input-bordered w-full focus:input-primary"
        value={value}
        autoComplete={autoComplete}
        disabled={disabled}
        required={required}
        aria-required={required}
        aria-invalid={hasError}
        aria-describedby={hasError ? errorMessageId : undefined}
        onChange={onChange}
      />
    </label>
  );
}
