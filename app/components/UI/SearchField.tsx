import { Search } from "@mui/icons-material";

type SearchFieldProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
};

export default function SearchField({
  value,
  onChange,
  placeholder,
}: SearchFieldProps) {
  return (
    <label className="app-field-shell input input-bordered flex h-12 w-full items-center gap-2 rounded-2xl px-4 transition-colors focus-within:border-primary/45">
      <Search className="app-faint" fontSize="small" />
      <input
        type="text"
        className="app-placeholder grow"
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}
