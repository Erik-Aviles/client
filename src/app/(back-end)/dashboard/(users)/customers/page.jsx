import React from "react";
import { getCustomers } from "./actions";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import Heading from "@/components/backoffice/styledComponent/Heading";
import { columns, fieldsToSearch, initialColumnVisibility } from "./columns";
import { DataTable } from "@/components/backoffice/date-table-components/DataTable";

export default async function CustomerPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return <p className="text-center text-gray-500">No autorizado</p>;
  }
  let customers = [];

  try {
    const allCustomers = await getCustomers();
    customers = allCustomers;
  } catch (error) {
    console.error("Error cargando clientes:", error);
    return <p className="text-center text-red-500">Error cargando clientes</p>;
  }

  return (
    <div className="h-[calc(100vh-40px)] flex flex-col gap-3">
      <div className="px-4 md:px-6">
        <Heading title="Clientes" />
      </div>
      <div className="flex-1">
        <DataTable
          columns={columns}
          data={customers}
          initialColumnVisibility={initialColumnVisibility}
          fieldsToSearch={fieldsToSearch}
          inputPlaceholder="Buscar cliente por nombre, cedula, email."
          endpoint="customers"
          title="clientes"
        />
      </div>
    </div>
  );
}
