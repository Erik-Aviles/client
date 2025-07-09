import React from "react";
import { displayByMap, getTextColorClass } from "@/utils/getStockStatus";

export default function BooleanColumns({ row, column = "isActive" }) {
  const value = row.getValue(column);

  const text = displayByMap(
    value,
    {
      true: "SI",
      false: "NO",
    },
    "Desconocido"
  );

  const textColor = getTextColorClass(value, {
    true: "text-lime-400 dark:text-green-400",
    false: "text-red-600 dark:text-red-700",
  });

  return <span className={`font-semibold ${textColor} `}>{text}</span>;
}
