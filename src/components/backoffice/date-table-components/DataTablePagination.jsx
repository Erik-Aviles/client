import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function DataTablePagination({ table }) {
  const selectedRowsCount =
    table.getFilteredSelectedRowModel().rows.length || 0;
  const selectedRowsCountTotal = table.getFilteredRowModel().rows.length || 0;
  const selectedText =
    selectedRowsCount === 1 ? "fila seleccionada" : "filas seleccionadas";
  return (
    <div className="flex flex-col gap-1 md:gap-2 md:flex-row md:items-center justify-between py-2 text-muted-foreground">
      <div className="flex-1 text-sm  whitespace-nowrap">
        {`  (${selectedRowsCount}) de (${selectedRowsCountTotal}) ${selectedText}`}
        .
      </div>
      <div className="flex items-center justify-end space-x-6 lg:space-x-8 ">
        <div className="flex items-center space-x-2">
          <p className="hidden md:block text-sm font-medium">Fila por pagina</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[5, 10, 15].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Pag. {table.getState().pagination.pageIndex + 1} de{" "}
          {table.getPageCount()}
        </div>
        <div className="flex items-center space-x-2 text-muted-foreground">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Ir a la primera pagina</span>
            <ChevronsLeft />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Ir a la pagina anterior</span>
            <ChevronLeft />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Ir a la pagina siguiente</span>
            <ChevronRight />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Ir a la ultima pagina</span>
            <ChevronsRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
