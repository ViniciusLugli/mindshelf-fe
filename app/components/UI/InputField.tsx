type InputFieldProps = {
  label: string;
  placeholder: string;
  value: string;
  size?: "input-sm" | "input-md" | "input-lg" | "input-xs";
  onChange?: (value: string) => void;
};

export default function InputField({
  label,
  placeholder,
  value,
  size,
  onChange,
}: InputFieldProps) {
  return (
    <div className="flex flex-col gap-1 justify-start">
      <label htmlFor="input">{label}</label>
      <input
        id="input"
        type="text"
        className={` input input-bordered ${size}`}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
      />
    </div>
  );
}
