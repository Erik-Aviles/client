import { LoadingIcon } from "@/components/Icons/Loading";
import React from "react";

export default function LoadingButton({
  text = "Cargando...",
  className = "",
  textClass = "text-white",
  type = "button",
}) {
  return (
    <button
      disabled
      type={type}
      className={`inline-flex items-center justify-center text-center transition-all duration-200 cursor-not-allowed gap-2 px-3 py-2 rounded-lg font-medium text-xs sm:text-sm ${className}`}
    >
      <LoadingIcon />
      <span className={textClass}>{text}</span>
    </button>
  );
}
