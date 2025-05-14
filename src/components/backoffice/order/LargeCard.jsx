import React from "react";
export default function LargeCard({ items}) {
  return (
    <div
      className={`rounded-lg text-slate-50 shadow-md p-8 flex items-center flex-col gap-2 bg-${items?.color}`}
    >
     {items?.icon}
      <h4>{items?.period}</h4>
      <h2 className="text-xl lg:text-2xl">$ {items?.sales}</h2>
    </div>
  );
}
