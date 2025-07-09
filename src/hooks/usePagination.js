import { useCallback, useState } from "react";

/**
 * Hook personalizado para controlar paginación.
 * @param {number} initialPageSize
 */
export function usePagination(initialPageSize = 5) {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: initialPageSize,
  });

  return {
    pagination,
    setPagination,
  };
}
