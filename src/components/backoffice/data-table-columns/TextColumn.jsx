import { formatDateToEcuador } from "@/utils/formats/formatDateToEcuador";
import React from "react";

export function TitleColumn({ row, column }) {
  const title = row.getValue(column);
  return (
    <div className="ml-2 uppercase min-w-48 max-w-28">
      <small>{title}</small>
    </div>
  );
}

export function TextShorthColumn({ row, title, column }) {
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

export function TextLongColumn({ row, column }) {
  const textLong = row.getValue(column);
  return (
    <div className="min-w-48 max-w-80 capitalize">
      <small>{textLong}</small>
    </div>
  );
}
