"use client";

import { AlignJustify } from "lucide-react";
import React from "react";
import UserDropdown from "./UserDropdown";
import NotificationDropdown from "./NotificationDropdown";
import { ThemeSwitcherBtn } from "../ThemeSwitcherBtn";

export default function Navbar({
  toggleShowSiderbarCatalogue,
  showSiderbarCatalogue,
}) {
  return (
    <div
      className={`transition-all duration-500 ease-in-out flex items-center justify-between border-b border-border text-amber-400 bg-slate-50 dark:bg-slate-700 h-10 px-4 fixed top-0 w-full z-10  ${
        showSiderbarCatalogue ? " sm:ml-64 sm:pr-[18rem] " : " sm:ml-0 "
      }`}
    >
      <button
        type="button"
        onClick={toggleShowSiderbarCatalogue}
        className=" dark:hover:text-slate-50"
      >
        <AlignJustify />
      </button>
      <div className="flex justify-center items-center gap-4">
        <ThemeSwitcherBtn />
        <NotificationDropdown />
        <UserDropdown />
      </div>
    </div>
  );
}
