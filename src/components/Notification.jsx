import { Info, X } from "lucide-react";
import React, { useState } from "react";

export default function Notification({ title = "Advertencia", text }) {
  const [info, setInfo] = useState(true);

  function closeInfo() {
    setInfo(false);
  }
  if (!info) return;

  return (
    <div
      id="alert-additional-content-1"
      className="mt-4 p-3 text-amber-800 border border-amber-300 rounded-lg bg-amber-50 dark:bg-gray-800 dark:text-amber-400 dark:border-amber-800"
      role="alert"
      title="Cerrar"
    >
      <div className="flex items-center justify-between gap-2 ">
        <div className="flex items-center">
          <Info className="shrink-0 w-4 h-4 me-2" />
          <span className="sr-only">Informacion</span>
          <h3 className="text-xs font-medium">{title}</h3>
        </div>
        <button
          type="button"
          className="text-white bg-amber-800 hover:bg-amber-900 focus:ring-4 focus:outline-none focus:ring-amber-200 font-medium rounded-lg text-xs px-2 py-1.5 text-center inline-flex items-center dark:bg-amber-600 dark:hover:bg-amber-700 dark:focus:ring-amber-800"
          onClick={closeInfo}
        >
          <X className="shrink-0 w-3 h-3 " />
        </button>
      </div>
      {text && <p className="mt-1 text-[0.65rem]">{text}</p>}
    </div>
  );
}
