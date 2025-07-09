import React from "react";

export default function MapColumns({ row, column }) {
  const items = row.getValue(column);
  console.log(items)
  return (
    <div className="flex flex-col gap-1">
      <p className="capitalize text-blue-700">({items.length}) Registro</p>
      {items?.map((item, index) => (
        <small
          key={index}
          className="min-w-48 max-w-80 leading-none text-slate-700 dark:text-slate-200 flex gap-1 capitalize"
        >
          <span className="text-red-700 font-bold">{"-"}</span>
          {item.title || item}
        </small>
      ))}
    </div>
  );
}
