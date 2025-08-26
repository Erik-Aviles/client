import React from "react";

export function TitleColumn({
  row,
  column,
  fallback,
  className = "uppercase",
}) {
  const text = column ? row.getValue(column) : null;
  const content = text ?? fallback;
  return (
    <div className="ml-2 min-w-44 max-w-48">
      <small className={content ? `${className}` : "text-red-600 capitalize"}>
        {content || "Sin registro"}
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
  const content = text ?? fallback;

  return (
    <small className={content ? `${className}` : "text-red-600 capitalize"}>
      {content || "Sin registro"}
    </small>
  );
}

export function TextLongColumn({
  row,
  column,
  fallback,
  className = "capitalize",
}) {
  const text = column ? row.getValue(column) : null;
  const content = text ?? fallback;
  return (
    <div className="min-w-48 max-w-80">
      <small className={content ? `${className}` : "text-red-600 capitalize"}>
        {content || "Sin registro"}
      </small>
    </div>
  );
}
