import React from "react";

export default function Heading({ title, className }) {
  return (
    <h2 className={`uppercase py-4 text-base md:text-2xl border-b font-semibold text-slate-800 dark:text-yellow-500 ${className} `}>{title}</h2>
  );
}
