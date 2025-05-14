"use client";

import React from "react";

const Pagination = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const rangeStart = (currentPage - 1) * itemsPerPage + 1;
  const rangeEnd = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <nav className="flex flex-col md:flex-row items-center justify-between gap-4 pt-4 w-full" aria-label="Table navigation">
      {/* Información de los elementos mostrados */}
      <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
        Mostrando{" "}
        <span className="font-semibold text-gray-900 dark:text-white">
          {rangeStart}-{rangeEnd}
        </span>{" "}
        de{" "}
        <span className="font-semibold text-gray-900 dark:text-white">
          {totalItems}
        </span>
      </span>

      {/* Contenedor de paginación con scroll en móviles */}
      <div className="w-full md:w-auto overflow-x-auto">
        <ul className="inline-flex items-center space-x-1 text-sm">
          {/* Botón "Anterior" */}
          <li>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              className={`px-3 h-8 rounded-l-lg transition-colors ${
                currentPage === 1
                  ? "text-gray-300 bg-gray-600 cursor-not-allowed"
                  : "text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              }`}
              disabled={currentPage === 1}
              aria-disabled={currentPage === 1}
            >
              Anterior
            </button>
          </li>

          {/* Números de página */}
          <div className="flex space-x-1">
            {[...Array(totalPages)].map((_, index) => {
              const pageNum = index + 1;
              return (
                <li key={pageNum}>
                  <button
                    onClick={() => handlePageChange(pageNum)}
                    className={`px-3 h-8 transition-colors ${
                      pageNum === currentPage
                        ? "text-blue-600 bg-blue-100 border-2 dark:bg-yellow-400 dark:border-yellow-400 dark:text-slate-900 dark:hover:bg-transparent dark:hover:text-white"
                        : "text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    }`}
                  >
                    {pageNum}
                  </button>
                </li>
              );
            })}
          </div>

          {/* Botón "Siguiente" */}
          <li>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className={`px-3 h-8 rounded-r-lg transition-colors ${
                currentPage === totalPages
                  ? "text-gray-300 bg-gray-600 cursor-not-allowed"
                  : "text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              }`}
              disabled={currentPage === totalPages}
              aria-disabled={currentPage === totalPages}
            >
              Siguiente
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Pagination;
