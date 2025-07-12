import { DataTable } from "@/components/backoffice/date-table-components/DataTable";
import Heading from "@/components/backoffice/styledComponent/Heading";
import { getData } from "@/lib/getData";
import React from "react";
import { columns } from "./columns";

export default async function Supplier() {
  const data = await getData("suppliers");

  const initialColumnVisibility = {
    address: false,
    paymentTerms: false,
    notes: false,
  };
  const fieldsToSearch = ["name", "idDocument", "email", "id"];

  return (
    <div className="h-[calc(100vh-40px)] flex flex-col gap-3">
      <div className="px-4 md:px-6">
        <Heading title="Proveedores" />
      </div>
      <div className="flex-1">
        <DataTable
          columns={columns}
          data={data}
          initialColumnVisibility={initialColumnVisibility}
          fieldsToSearch={fieldsToSearch}
          inputPlaceholder="Buscar proveedor por nombre, cedula, email."
          endpoint="suppliers"
          title="proveedores"
        />
      </div>
    </div>
  );
}
