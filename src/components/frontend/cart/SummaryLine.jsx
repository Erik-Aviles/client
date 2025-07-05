import React from "react";

export default function SummaryLine({ label, value }) {
  return (
    <div className="flex justify-between border-b pb-2">
      <span>{label}</span>
      <span className="font-semibold">${value.toFixed(2)}</span>
    </div>
  );
}
