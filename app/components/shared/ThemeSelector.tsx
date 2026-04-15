"use client";

import { useTheme } from "@/app/hooks/useTheme";
import { KeyboardArrowDown, PaletteOutlined } from "@mui/icons-material";

const themes = ["cupcake", "dim", "night", "retro"] as const;

type ThemeSelectorProps = {
  className?: string;
};

const themeLabels: Record<(typeof themes)[number], string> = {
  cupcake: "Cupcake",
  dim: "Dim",
  night: "Night",
  retro: "Retro",
};

export function ThemeSelector({ className = "" }: ThemeSelectorProps) {
  const { theme, changeTheme } = useTheme();

  return (
    <label
      className={`group relative flex min-h-14 w-full items-center gap-3 overflow-hidden rounded-[1.35rem] border border-base-300/70 bg-linear-to-br from-base-100 to-base-200/45 px-4 shadow-sm transition-colors hover:border-primary/30 ${className}`}
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <PaletteOutlined fontSize="small" />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-base-content/35">
          Tema
        </p>
        <p className="truncate text-sm font-medium text-base-content">
          {themeLabels[theme]}
        </p>
      </div>

      <KeyboardArrowDown className="text-base-content/35 transition-transform group-focus-within:rotate-180" />

      <select
        aria-label="Selecionar tema"
        className="absolute inset-0 cursor-pointer opacity-0"
        value={theme}
        onChange={(e) => changeTheme(e.target.value as (typeof themes)[number])}
      >
        {themes.map((t) => (
          <option key={t} value={t}>
            {themeLabels[t]}
          </option>
        ))}
      </select>
    </label>
  );
}
