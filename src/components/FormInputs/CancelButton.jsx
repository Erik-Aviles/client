import React from "react";

export default function CancelButton({
  onClick,
  text = "Cancelar",
  className = "text-white bg-red-700 focus:ring-red-200 dark:focus:ring-red-900 hover:bg-red-800",
  type = "button",
}) {
  const baseClass =
    "inline-flex items-center justify-center font-medium text-center transition-all duration-200 gap-1 px-3 py-2 text-xs sm:text-sm rounded-lg focus:ring-4";

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClass} ${className}`}
    >
      {text}
    </button>
  );
}
