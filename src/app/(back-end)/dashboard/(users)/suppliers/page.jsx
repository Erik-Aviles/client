import React from "react";
import { getSuppliers } from "./actions";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import Heading from "@/components/backoffice/styledComponent/Heading";
import { DataTable } from "@/components/backoffice/date-table-components/DataTable";
import { columns, fieldsToSearch, initialColumnVisibility } from "./columns";

export default async function Supplier() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return <p className="text-center text-gray-500">No autorizado</p>;
  }

    const { success, data: suppliers, message } = await getSuppliers();

  if (!success) {
    return <p className="text-center text-red-500">{message || "Error cargando proveedores"}</p>;
  }


  return (
    <div className="h-[calc(100vh-40px)] flex flex-col gap-3">
      <div className="px-4 md:px-6">
        <Heading title="Proveedores" />
      </div>
      <div className="flex-1">
        <DataTable
          columns={columns}
          data={suppliers}
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
