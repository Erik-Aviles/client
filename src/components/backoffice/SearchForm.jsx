"use client";

import { Search, X } from "lucide-react";
import React from "react";

export default function SearchForm({
  placeholder,
  className = " text-slate-800 border border-border dark:bg-slate-700 rounded-lg p-4",
  value = "",
  onChange = () => {},
}) {
  return (
    <div className={`flex items-center ${className}`}>
      {/* Solo input de busqueda */}
      <form className="flex items-center w-full ">
        <label htmlFor="voice-search" className="sr-only">
          {placeholder}
        </label>
        <div className="relative w-full">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <Search className="w-4 h-4 text-slate-500 dark:text-slate-400" />
          </div>
          <input
            type="text"
            id="voice-search"
            value={value}
            onChange={onChange}
            className="py-3 px-8 text-sm text-slate-800 border border-slate-300 w-full rounded-lg bg-slate-50 focus:ring-amber-600 focus:border-amber-600 dark:bg-slate-800  dark:placeholder-slate-500 dark:text-white "
            placeholder={placeholder}
            required
          />
          <button
            type="button"
            className="absolute inset-y-0 end-0 flex items-center pe-3"
            onClick={() => onChange({ target: { value: "" } })}
          >
            <X className="w-4 h-4 text-amber-600 " />
          </button>
        </div>
      </form>
    </div>
  );
}

// md:w-[75%] lg:w-[50%]
