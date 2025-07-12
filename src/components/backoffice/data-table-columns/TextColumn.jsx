import React from "react";

export function TitleColumn({ row, column, className = "uppercase" }) {
  const title = row.getValue(column);
  return (
    <div className="ml-2 min-w-44 max-w-48">
      <small className={title ? `${className}` : "text-red-600 capitalize"}>
        {title || "Sin registro"}
      </small>
    </div>
  );
}

export function TextShortColumn({
  row,
  column,
  fallback,
  className = "capitalize",
}) {
  const text = column ? row.getValue(column) : null;
  const content = text || fallback;

  return (
    <small className={content ? `${className}` : "text-red-600 capitalize"}>
      {content || "Sin registro"}
    </small>
  );
}

export function TextLongColumn({ row, column, className = "capitalize" }) {
  const textLong = row.getValue(column);
  return (
    <div className="min-w-48 max-w-80">
      <small className={textLong ? `${className}` : "text-red-600 capitalize"}>
        {textLong || "Sin registro"}
      </small>
    </div>
  );
}
