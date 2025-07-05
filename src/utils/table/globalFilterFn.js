import { normalizeText, removePluralEnding, removeStopWords } from "@/utils/formats/normalized";

/**
 * Función de filtrado global personalizada.
 * @param {string[]} fieldsToSearch - Campos a comparar del objeto original.
 * @returns {Function} - Función compatible con `globalFilterFn` de TanStack Table.
 */
export function createGlobalFilterFn(fieldsToSearch) {
  return (row, _columnId, filterValue) => {
    if (!filterValue || filterValue.trim().length < 3) return true;

    const cleanFilter = removeStopWords(normalizeText(filterValue));
    const searchParts = cleanFilter.split(" ").map(removePluralEnding);

    return fieldsToSearch.some((key) => {
      const fieldValue = normalizeText(row.original[key] ?? "");
      return searchParts.every((part) => fieldValue.includes(part));
    });
  };
}
