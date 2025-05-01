"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeSwitcherBtn() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  console.log(theme)

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      className="hover:scale-110 active:scale-100 duration-200  dark:hover:text-slate-50 bg-transparent"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? <Sun /> : <Moon /> }
    </button>
  );
}
