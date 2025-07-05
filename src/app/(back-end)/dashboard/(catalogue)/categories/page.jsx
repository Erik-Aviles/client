import ButtonActions from "@/components/backoffice/ButtonActions";
import Heading from "@/components/backoffice/styledComponent/Heading";
import React from "react";
import { columns } from "./columns";
import { getData } from "@/lib/getData";
import { DataTable } from "@/components/backoffice/DataTable";

export default async function page() {
  const data = await getData("categories");
  const initialColumnVisibility = {
    marketIds: false,
    products: false,
    trainings: false,
  };
  const fieldsToSearch = ["title", "description", "id"];
   
  return (
    <div className="h-[calc(100vh-40px)] flex flex-col">
      <div className="px-4">
        <Heading title="Categorias" />
        <ButtonActions title="categoria" href="/dashboard/categories/new" />
      </div>
      <div className="flex-1">
        <DataTable
          columns={columns}
          data={data}
          initialColumnVisibility={initialColumnVisibility}
          fieldsToSearch={fieldsToSearch}
          inputPlaceholder="Buscar categoria por título, descripción o ID"
        />
      </div>
    </div>
  );
}
