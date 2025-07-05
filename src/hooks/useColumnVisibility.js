import { useState } from "react";

/**
 * Hook personalizado para manejar la visibilidad de columnas en una tabla.
 * @param {object} initialVisibility - Objeto con los IDs de las columnas y su estado inicial.
 */
export function useColumnVisibility(initialVisibility = {}) {
  const [columnVisibility, setColumnVisibility] = useState(initialVisibility);

  return {
    columnVisibility,
    setColumnVisibility,
  };
}
