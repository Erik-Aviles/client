import React from "react";

export default function SmallCard({ items }) {
  return (
    <div className={`rounded-lg shadow-lg bg-white dark:bg-slate-700 p-4 text-slate-800 dark:text-slate-50`}>
      <div className="flex space-x-4">
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center  text-slate-50 dark:text-slate-700 ${items?.iconBg}`}
        >
          {items?.icon}
        </div>
        <div className="">
          <p>{items?.title}</p>
          <h3 className="text-2xl font-bold">{items?.quantity}</h3>
        </div>
      </div>
    </div>
  );
}
