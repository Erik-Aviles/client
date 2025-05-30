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
      className="hover:scale-110 active:scale-100 duration-200 text-amber-400 hover:text-amber-500 dark:text-amber-400  dark:hover:text-slate-50 bg-transparent"
      onClick={toggleColorSchemeInpu}
    >
      {theme === "dark" ? <Sun /> : <Moon /> }
    </button>
  );
}
