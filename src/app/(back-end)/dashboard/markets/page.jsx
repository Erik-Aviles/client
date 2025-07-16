import React from "react";
import { columns } from "./columns";
import { getData } from "@/lib/getData";
import Heading from "@/components/backoffice/styledComponent/Heading";
import { DataTable } from "@/components/backoffice/date-table-components/DataTable";

export default async function page() {
  const data = await getData("markets");
  const initialColumnVisibility = {
    motto: false,
    categoryIds: false,
  };
  const fieldsToSearch = ["title", "id"];
  return (
    <div className="h-[calc(100vh-40px)] flex flex-col gap-3">
      <div className="px-4 md:px-6">
        <Heading title="Mercados" />
      </div>
      <div className="flex-1">
        <DataTable
          columns={columns}
          data={data}
          initialColumnVisibility={initialColumnVisibility}
          fieldsToSearch={fieldsToSearch}
          inputPlaceholder="Buscar mercado por nombre..."
          endpoint="markets"
          title="mercado"
        />
      </div>
    </div>
  );
}
