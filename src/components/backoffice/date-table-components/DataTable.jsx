"use client";

import { useState, useMemo } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { createGlobalFilterFn } from "@/utils/table/globalFilterFn";
import { useColumnVisibility } from "@/hooks/useColumnVisibility";
import { DataTablePagination } from "./DataTablePagination";
import { DataTableToolbar } from "./DataTableToolbar";
import { usePagination } from "@/hooks/usePagination";

export function DataTable({
  columns = [],
  data = [],
  initialColumnVisibility = {},
  fieldsToSearch = ["title", "id"],
  inputPlaceholder = "Busqueda...",
  title = "elemento",
  endpoint,
}) {

  const { pagination, setPagination } = usePagination(4);
  const { columnVisibility, setColumnVisibility } = useColumnVisibility(
    initialColumnVisibility
  );
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState([]);
  const [rowSelection, setRowSelection] = useState({});

  const memoizedData = useMemo(() => data, [data]);
  const memoizedColumns = useMemo(() => columns, [columns]);

  const table = useReactTable({
    data: memoizedData,
    columns: memoizedColumns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
      pagination,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: createGlobalFilterFn(fieldsToSearch),
  });

  return (
    <div className="flex flex-col px-4 md:px-6 gap-3">
      {/* FILTROS Y VISIBILIDAD */}
      <DataTableToolbar
        table={table}
        title={title}
        endpoint={endpoint}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        inputPlaceholder={inputPlaceholder}
      />

      {/* TABLA */}
      <div className="overflow-auto">
        <div className="h-[calc(100vh-292.67px)] md:h-[calc(100vh-224.67px)]">
          <div className="min-w-max overflow-x-auto pb-2">
            <Table className="border dark:bg-slate-900 rounded-lg">
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead
                          key={header.id}
                          className="bg-white dark:bg-slate-700 uppercase text-amber-600 dark:text-amber-500"
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No hay resultados.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {/* PAGINACION y SELECCION */}
      <DataTablePagination table={table} />
    </div>
  );
}
