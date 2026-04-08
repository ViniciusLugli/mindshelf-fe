"use client";
import { useState, useRef, useEffect } from "react";
import { HexColorPicker, HexColorInput } from "react-colorful";

type Props = {
  value: string;
  onChange: (color: string) => void;
  label?: string;
};

export default function ColorPicker({ value, onChange, label }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="form-control w-fit" ref={ref}>
      {label && (
        <span className="label-text mb-1.5 text-[13px] font-medium text-base-content/60">
          {label}
        </span>
      )}

      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="input input-bordered flex h-10 w-auto cursor-pointer items-center gap-2.5 px-3 hover:border-base-content/30 transition-colors"
      >
        <span
          className="h-4 w-4 shrink-0 rounded-sm border border-base-content/15 shadow-sm"
          style={{ backgroundColor: value }}
        />
        <span className="font-mono text-sm text-base-content/70">{value}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="ml-1 h-3 w-3 shrink-0 text-base-content/30"
        >
          <path
            fillRule="evenodd"
            d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* Popover */}
      {open && (
        <div className="absolute z-50 mt-1 flex flex-col gap-3 rounded-2xl border border-base-300/70 bg-base-100 p-4 shadow-2xl shadow-base-content/10">
          <HexColorPicker color={value} onChange={onChange} />

          <div className="flex items-center gap-2 rounded-xl border border-base-300/60 bg-base-200/50 px-3 py-2">
            <span className="text-[11px] font-bold tracking-widest text-base-content/30">
              #
            </span>
            <HexColorInput
              color={value}
              onChange={onChange}
              className="w-full bg-transparent font-mono text-sm uppercase text-base-content outline-none placeholder:text-base-content/25"
              prefixed={false}
            />
            {/* Preview dot */}
            <span
              className="h-4 w-4 shrink-0 rounded-full border border-base-content/15 shadow-sm transition-colors"
              style={{ backgroundColor: value }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
