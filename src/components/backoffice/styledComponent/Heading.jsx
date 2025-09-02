import React from "react";

export default function Heading({ title, className="border-b" }) {
  return (
    <h2
      className={`uppercase py-3 text-base md:text-2xl  font-semibold text-slate-800 dark:text-yellow-500 ${className} `}
    >
      {title}
    </h2>
  );
}
