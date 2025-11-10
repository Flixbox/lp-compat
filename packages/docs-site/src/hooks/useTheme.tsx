import { useEffect, useState } from "react";

function useTheme(): "light" | "dark" {
  const [theme, setTheme] = useState<string | null>(null);

  useEffect(() => {
    // Initial theme
    if (window?.theme) {
      setTheme(window.theme.getTheme());
    }

    // Listen for changes
    const handler = (event: CustomEvent) => {
      setTheme(event.detail.theme);
    };
    window.addEventListener("theme-changed", handler as EventListener);

    return () => {
      window.removeEventListener("theme-changed", handler as EventListener);
    };
  }, []);

  return theme as "light" | "dark";
}

export { useTheme };