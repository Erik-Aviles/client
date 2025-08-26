import React from "react";
import { columns } from "./columns";
import { getData } from "@/lib/getData";
import Heading from "@/components/backoffice/styledComponent/Heading";
import { DataTable } from "@/components/backoffice/date-table-components/DataTable";

export default async function Supplier() {
  const suppliersData = await getData("suppliers");
  if (!suppliersData) {
    return <div className="text-center">No hay datos disponibles</div>;
  }

  const initialColumnVisibility = {
    logoUrl: false,
    address: false,
    paymentTerms: false,
    notes: false,
    products: false,
  };
  const fieldsToSearch = ["firstName", "idDocument", "email", "id"];

  return (
    <div className="h-[calc(100vh-40px)] flex flex-col gap-3">
      <div className="px-4 md:px-6">
        <Heading title="Proveedores" />
      </div>
      <div className="flex-1">
        <DataTable
          columns={columns}
          data={suppliersData}
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
