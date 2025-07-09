import Heading from "@/components/backoffice/styledComponent/Heading";
import React from "react";
import { columns } from "./columns";
import { getData } from "@/lib/getData";
import { DataTable } from "@/components/backoffice/date-table-components/DataTable";

export default async function page() {
  const data = await getData("categories");
  const initialColumnVisibility = {
    marketIds: false,
    products: false,
    trainings: false,
  };
  const fieldsToSearch = ["title", "description", "id"];

  return (
    <div className="h-[calc(100vh-40px)] flex flex-col gap-3">
      <div className="px-4 md:px-6">
        <Heading title="Categorias" />
      </div>
      <div className="flex-1">
        <DataTable
          columns={columns}
          data={data}
          initialColumnVisibility={initialColumnVisibility}
          fieldsToSearch={fieldsToSearch}
          inputPlaceholder="Buscar categoria por título, descripción o ID"
          addLink="dashboard/categories"
          title="categorias"
        />
      </div>
    </div>
  );
}
