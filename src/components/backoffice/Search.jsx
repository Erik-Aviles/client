import { SearchIcon, X } from "lucide-react";
import React from "react";

export default function Search({ placeholder }) {
  return (
    <div className="flex items-center justify-end text-slate-800 border border-border dark:bg-slate-700 rounded-lg p-4">
      {/* Solo input de busqueda */}
      <div className="relative w-full md:w-[75%] lg:w-[50%]">
        {" "}
        <label htmlFor="table-search" className="sr-only">
          {placeholder}
        </label>
        <div className="relative w-full">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <SearchIcon className="w-4 h-4 text-slate-500 dark:text-slate-400" />
          </div>

          <input
            type="text"
            id="table-search"
            className="block py-3 px-8 text-sm text-slate-800 border border-slate-300 w-full rounded-lg bg-slate-50 focus:ring-amber-400 focus:border-amber-400 dark:bg-slate-800  dark:placeholder-slate-500 dark:text-white dark:focus:ring-amber-400 dark:focus:border-amber-400"
            placeholder={placeholder}
          />
          <button className="absolute inset-y-0 end-0 flex items-center pe-3">
            <X className="w-4 h-4 text-red-500 dark:text-red-400" />
          </button>
        </div>
      </div>
    </div>
  );
}
