import Link from "next/link";
import React from "react";
import CategoryCarousel from "./CategoryCarousel";
import { ArrowRight } from "lucide-react";

export default function CategoryList({ category }) {
  return (
    <div className="border overflow-y-auto dark:text-white mb-6 dark:bg-slate-800 rounded-lg">
      <div className="flex items-center justify-between py-2 px-3 border-b font-semibold bg-slate-50  dark:bg-slate-700  overflow-y-auto">
        <h2 className="dark:text-slate-300 text-lg capitalize">{category}</h2>
        <Link
          href={"#"}
          className="px-2 py-1 text-xs text-slate-50 flex items-center gap-1 bg-amber-600  rounded-lg border border-amber-600 hover:bg-amber-500 hover:border-transparent focus:outline-none focus:ring-amber-600 transition-all duration-300"
        >
          Ver todo <ArrowRight width={18} height={18} />
        </Link>
      </div>
      <div className="pb-4 px-2">
        <CategoryCarousel />
      </div>
    </div>
  );
}
