"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";


export function ThemeSwitcherBtn() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

   const toggleColorSchemeInpu = () => {
    setTheme(theme === "dark" ? "light" : "dark")

  };

  return (
    <button
      className="hover:scale-110 active:scale-100 transition-all duration-300 text-amber-600 dark:text-slate-50 hover:text-amber-500 dark:hover:text-slate-50 "
      onClick={toggleColorSchemeInpu}
    >
      {theme === "dark" ? <Sun /> : <Moon /> }
    </button>
  );
}
