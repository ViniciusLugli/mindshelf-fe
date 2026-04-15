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
    <label className="input input-bordered flex h-12 w-full items-center gap-2 rounded-2xl border-base-300/70 bg-base-100/90 px-4 shadow-sm">
      <Search className="text-base-content/40" fontSize="small" />
      <input
        type="text"
        className="grow"
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}
