import { formatDateToEcuador } from "@/utils/formats/formatDateToEcuador";
import React from "react";

export function AllDatesColumn({ row }) {
  const createdAt = formatDateToEcuador(row.getValue("createdAt"));
  const updatedAt = formatDateToEcuador(row.original.updatedAt);
  return (
    <div className="flex flex-col gap-2 whitespace-nowrap">
      <div className="leading-none">
        <p className="text-xs font-semibold text-purple-700 dark:text-purple-500">
          Creación:
        </p>
        <small>{createdAt}</small>
      </div>
      <div className="leading-none">
        <p className="text-xs font-semibold text-purple-700 dark:text-purple-500">
          Actualización:
        </p>
        <small>{updatedAt}</small>
      </div>
    </div>
  );
}
export function DateColumn({ row, title, column }) {
  const dateData = formatDateToEcuador(row.getValue(column));
  return (
    <div className="leading-none whitespace-nowrap">
      <p className="capitalize text-xs font-semibold text-purple-700 dark:text-purple-500">
        {title}
      </p>
      <small>{dateData}</small>
    </div>
  );
}
