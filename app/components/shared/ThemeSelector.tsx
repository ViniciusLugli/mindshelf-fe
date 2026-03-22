"use client";

import { useTheme } from "@/app/hooks/useTheme";

const themes = ["cupcake", "dim", "night", "retro"] as const;

export function ThemeSelector() {
  const { theme, changeTheme } = useTheme();

  return (
    <select
      className="select select-sm select-bordered w-fit bg-base-100 text-base-content"
      value={theme}
      onChange={(e) => changeTheme(e.target.value as (typeof themes)[number])}
    >
      <option disabled>Theme</option>
      {themes.map((t) => (
        <option key={t} value={t}>
          {t}
        </option>
      ))}
    </select>
  );
}
