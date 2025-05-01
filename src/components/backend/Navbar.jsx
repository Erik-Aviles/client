"use client";

import { AlignJustify } from "lucide-react";
import React from "react";
import UserDropdown from "./UserDropdown";
import NotificationDropdown from "./NotificationDropdown";
import { ThemeSwitcherBtn } from "../ThemeSwitcherBtn";

export default function Navbar() {
  return (
    <div className="flex items-center justify-between text-gray-600 dark:text-amber-400 bg-slate-50  dark:bg-slate-800 h-16 px-8 py-4 fixed top-0 w-[calc(100%-13rem)] left-52 right-0  ">
      <button
        type="button"
        className="dark:hover:text-slate-50 bg-transparent"
      >
        <AlignJustify />
      </button>
      <div className="flex space-x-3 ">
        <ThemeSwitcherBtn />
        <NotificationDropdown />
        <UserDropdown />
      </div>
    </div>
  );
}
