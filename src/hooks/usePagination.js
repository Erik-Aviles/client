
import { useCallback, useState } from "react";

/**
 * Hook personalizado para controlar paginación.
 * @param {number} initialPageSize
 */
export function usePagination(initialPageSize = 6) {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: initialPageSize,
  });

  const goToPage = useCallback((index) => {
    setPagination((prev) => ({
      ...prev,
      pageIndex: index,
    }));
  }, []);

  return {
    pagination,
    setPagination,
    goToPage,
  };
}
