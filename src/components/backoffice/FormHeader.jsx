"use client";

import { X } from "lucide-react";
import React from "react";
import SubTitle3 from "./styledComponent/SubTitle3";
import { useRouter } from "next/navigation";

export default function FormHeader({ title }) {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="flex items-center justify-between sm:px-6 py-6 border-b border-border mb-4">
      <SubTitle3 title={title} className="font-semibold" />
      <button
        className="bg-white hover:bg-gray-100 border focus:ring-4 focus:outline-none focus:ring-gray-100 rounded-sm p-1 inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-slate-300 dark:text-white dark:hover:bg-gray-700"
        onClick={handleBack}
      >
        <X />
      </button>
    </div>
  );
}
