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
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationFirst,
  PaginationItem,
  PaginationLast,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronDown } from "lucide-react";
import SearchForm from "@/components/backoffice/SearchForm";

import { usePagination } from "@/hooks/usePagination";
import { createGlobalFilterFn } from "@/utils/table/globalFilterFn";
import { useColumnVisibility } from "@/hooks/useColumnVisibility";

export function DataTable({
  columns,
  data = [],
  initialColumnVisibility = {},
  fieldsToSearch = ["title", "id"],
  inputPlaceholder = "Busqueda...",
}) {
  const { pagination, setPagination, goToPage } = usePagination(6);
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

  const selectedRowsCount = table.getFilteredSelectedRowModel().rows.length;
  const selectedText =
    selectedRowsCount === 1 ? "fila seleccionada" : "filas seleccionadas";

  return (
    <div className="flex-1 flex flex-col h-full px-4 md:px-6 ">
      {/* FILTROS Y VISIBILIDAD */}
      <div className="dark:bg-slate-900 flex items-center gap-3 pb-4">
        <SearchForm
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder={inputPlaceholder}
          className="w-full max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              <span className="hidden sm:block">Columnas </span>
              <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize text-xs"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* TABLA */}
      <div className="flex-1 overflow-auto">
        <div className="h-[calc(100vh-298.67px)]">
          <div className="w-max overflow-auto pb-2">
            <Table className="w-[calc(100vw-60px)] border dark:bg-slate-800 rounded-lg overflow-hidden">
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
      <div className="dark:bg-slate-900 flex-shrink-0 border-t">
        <div className="flex flex-col md:gap-2 md:flex-row md:items-center justify-between py-2">
          <div className="text-sm text-muted-foreground whitespace-nowrap">
            {selectedRowsCount} {selectedText}
          </div>
          <Pagination className="flex md:justify-end">
            <PaginationContent>
              <PaginationItem>
                <PaginationFirst
                  onClick={(e) => {
                    e.preventDefault();
                    goToPage(0);
                  }}
                  disabled={!table.getCanPreviousPage()}
                  className="hover:bg-orange-200 hover:text-amber-600 dark:hover:bg-slate-700 dark:hover:text-amber-400"
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationPrevious
                  onClick={(e) => {
                    e.preventDefault();
                    table.previousPage();
                  }}
                  disabled={!table.getCanPreviousPage()}
                  className="hover:bg-orange-200 hover:text-amber-600 dark:hover:bg-slate-700 dark:hover:text-amber-400"
                />
              </PaginationItem>

              <PaginationItem className="flex items-center gap-1">
                {Array.from({
                  length: Math.min(table.getPageCount(), 2),
                }).map((_, index) => (
                  <PaginationLink
                    key={index}
                    onClick={(e) => {
                      e.preventDefault();
                      goToPage(index);
                    }}
                    isActive={table.getState().pagination.pageIndex === index}
                    className="cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:bg-orange-200 hover:text-amber-600 dark:hover:bg-slate-700 dark:hover:text-amber-400"
                  >
                    {index + 1}
                  </PaginationLink>
                ))}
                {table.getPageCount() > 2 && (
                  <>
                    <PaginationEllipsis />
                    <PaginationLink
                      onClick={(e) => {
                        e.preventDefault();
                        goToPage(table.getPageCount() - 1);
                      }}
                      isActive={
                        table.getState().pagination.pageIndex ===
                        table.getPageCount() - 1
                      }
                      className="cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:bg-orange-200 hover:text-amber-600 dark:hover:bg-slate-700 dark:hover:text-amber-400"
                    >
                      {table.getPageCount()}
                    </PaginationLink>
                  </>
                )}
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  onClick={(e) => {
                    e.preventDefault();
                    table.nextPage();
                  }}
                  disabled={!table.getCanNextPage()}
                  className="hover:bg-orange-200 hover:text-amber-600 dark:hover:bg-slate-700 dark:hover:text-amber-400"
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationLast
                  onClick={(e) => {
                    e.preventDefault();
                    goToPage(table.getPageCount() - 1);
                  }}
                  disabled={!table.getCanNextPage()}
                  className="hover:bg-orange-200 hover:text-amber-600 dark:hover:bg-slate-700 dark:hover:text-amber-400"
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
}
