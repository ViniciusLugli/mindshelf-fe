import { useEffect, useState } from "react";

type Theme = "cupcake" | "dim" | "night" | "retro";

export function useTheme() {
  const [theme, setTheme] = useState<Theme>("cupcake");

  useEffect(() => {
    const stored = localStorage.getItem("theme") as Theme;
    if (stored) {
      setTheme(stored);
      document.documentElement.setAttribute("data-theme", stored);
    }
  }, []);

  const changeTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return { theme, changeTheme };
}
