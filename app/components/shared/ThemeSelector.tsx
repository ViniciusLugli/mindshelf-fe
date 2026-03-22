"use client";

import { useTheme } from "@/app/hooks/useTheme";

const themes = ["cupcake", "dim", "night", "retro"] as const;

export function ThemeSelector() {
  const { theme, changeTheme } = useTheme();

  return (
    <select
      className="select select-bordered"
      value={theme}
      onChange={(e) => changeTheme(e.target.value as (typeof themes)[number])}
    >
      {themes.map((t) => (
        <option key={t} value={t}>
          {t}
        </option>
      ))}
    </select>
  );
}
