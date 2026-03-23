import { useEffect, useState } from "react";

type Theme = "cupcake" | "dim" | "night" | "retro";

const themes: Theme[] = ["cupcake", "dim", "night", "retro"];

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") {
      return "cupcake";
    }

    const stored = localStorage.getItem("theme");
    return themes.includes(stored as Theme) ? (stored as Theme) : "cupcake";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const changeTheme = (newTheme: Theme) => setTheme(newTheme);

  return { theme, changeTheme };
}
