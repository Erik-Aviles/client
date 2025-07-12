import ButtonActions from "@/components/backoffice/ButtonActions";
import Heading from "@/components/backoffice/styledComponent/Heading";

import React from "react";
import { getData } from "@/lib/getData";
import { columns } from "./columns";
import { DataTable } from "@/components/backoffice/date-table-components/DataTable";

export default async function page() {
  const data = await getData("products");
  const initialColumnVisibility = {
    description: false,
    barcode: false,
    categoryId: false,
    sku: false,
  };
  const fieldsToSearch = ["title", "code", "id"];

  return (
    <div className="h-[calc(100vh-40px)] flex flex-col gap-3">
      <div className="px-4 md:px-6">
        <Heading title="productos" />
      </div>
      <div className="flex-1">
        <DataTable
          columns={columns}
          data={data}
          initialColumnVisibility={initialColumnVisibility}
          fieldsToSearch={fieldsToSearch}
          inputPlaceholder="Buscar producto por título, codigo o ID"
          endpoint="products"
          title="productos"
        />
      </div>
    </div>
  );
}
