import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function useTheme() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const saved = (localStorage.getItem("ddk-theme") as "dark" | "light" | null) ?? "dark";
    setTheme(saved);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("light", theme === "light");
    root.classList.toggle("dark", theme === "dark");
    root.style.colorScheme = theme;
    localStorage.setItem("ddk-theme", theme);
  }, [theme]);

  return { theme, toggle: () => setTheme((t) => (t === "dark" ? "light" : "dark")) };
}

export function ThemeToggle({ theme, toggle }: { theme: "dark" | "light"; toggle: () => void }) {
  return (
    <button
      onClick={toggle}
      aria-label={theme === "dark" ? "Chuyển sang giao diện sáng" : "Chuyển sang giao diện tối"}
      className="ctl-btn"
    >
      <Sun size={15} className={`absolute transition-all duration-500 ${theme === "light" ? "rotate-0 scale-100 opacity-100 text-primary" : "-rotate-90 scale-0 opacity-0"}`} />
      <Moon size={15} className={`absolute transition-all duration-500 ${theme === "dark" ? "rotate-0 scale-100 opacity-100 text-muted-foreground" : "rotate-90 scale-0 opacity-0"}`} />
    </button>
  );
}
