"use client";

import SearchForm from "../SearchForm";
import { DataTableViewOptions } from "./DataTableViewOptions";
import ButtonActions from "../ButtonActions";

export function DataTableToolbar({
  table,
  title,
  endpoint,
  globalFilter,
  setGlobalFilter,
  inputPlaceholder,
}) {
  const handleInputChange = (e) => setGlobalFilter(e.target.value);
  const handleResetColumnsFilter = () => table.resetColumnFilters();

  return (
    <div className="flex flex-col-reverse md:flex-row md:items-center gap-3 md:gap-2">
      <SearchForm
        value={globalFilter}
        onChange={handleInputChange}
        onResetInput={handleResetColumnsFilter}
        placeholder={inputPlaceholder}
        className="w-full max-w-sm"
      />
      <div className="inline-flex justify-between gap-2 md:ml-auto">
        <DataTableViewOptions table={table} />
        <ButtonActions title={title} endpoint={endpoint} />
      </div>
    </div>
  );
}
