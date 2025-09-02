"use client";

import { ArrowBigDownDash } from "lucide-react";
import React, { cloneElement, useRef } from "react";
import { useReactToPrint } from "react-to-print";

export default function PdfDownloader({
  children,
  fileName = "document.pdf",
  triggerLabel = "Descargar PDF",
}) {
  const componentRef = useRef(null);

  const handlePrint = useReactToPrint({
    removeAfterPrint: true,
    contentRef: componentRef,
    documentTitle: fileName.replace(/\.pdf$/i, ""),
  });

  const childWithRef = cloneElement(children, { ref: componentRef });

  return (
    <>
      <div className="flex items-end justify-end mt-4">
        <button
          type="button"
          onClick={handlePrint}
          className="inline-flex items-center justify-center px-3 py-2 text-xs font-bold text-gray-900 transition-all duration-200 bg-gray-100 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 hover:bg-gray-200 dark:hover:bg-gray-400"
        >
          <ArrowBigDownDash />
          <span className="hidden sm:block">{triggerLabel}</span>
        </button>
      </div>
      <div style={{ display: "none" }}>{childWithRef}</div>
    </>
  );
}
