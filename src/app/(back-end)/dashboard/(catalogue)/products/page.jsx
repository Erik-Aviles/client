import ButtonActions from "@/components/backoffice/ButtonActions";
import Heading from "@/components/backoffice/styledComponent/Heading";

import React from "react";
import { getData } from "@/lib/getData";
import { columns } from "./columns";
import { DataTable } from "@/components/backoffice/DataTable";

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
    <div className="h-[calc(100vh-40px)] flex flex-col">
      <div className="px-4">
        <Heading title="productos" />
        <ButtonActions title="producto" href="/dashboard/products/new" />
      </div>
      <div className="flex-1">
        <DataTable
          columns={columns}
          data={data}
          initialColumnVisibility={initialColumnVisibility}
          fieldsToSearch={fieldsToSearch}
          InputPlaceholder="Buscar producto por título, codigo o ID"
        />
      </div>
    </div>
  );
}
