import React from "react";
import { columns, fieldsToSearch, initialColumnVisibility } from "./columns";
import Heading from "@/components/backoffice/styledComponent/Heading";
import { DataTable } from "@/components/backoffice/date-table-components/DataTable";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { fetchSales } from "./actions";

export default async function SalesPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return <p className="text-center text-gray-500">No autorizado</p>;
  }

  const { id, role } = session?.user ?? {};
  let sales = [];
  
  try {
    const allSales = await fetchSales();
    sales =
      role === "ADMIN"
        ? allSales
        : allSales.filter((sale) => sale?.vendorId === id);
  } catch (error) {
    console.error("Error cargando ventas:", error);
    return <p className="text-center text-red-500">Error cargando ventas</p>;
  }

  return (
    <div className="h-[calc(100vh-40px)] flex flex-col gap-3">
      <div className="px-4 md:px-6">
        <Heading title="Ventas realizadas" />
      </div>
      <div className="flex-1">
        <DataTable
          columns={columns}
          data={sales}
          initialColumnVisibility={initialColumnVisibility}
          fieldsToSearch={fieldsToSearch}
          inputPlaceholder="Buscar venta por producto, numero de pedido, proveedor."
          endpoint="sales"
          title="sales"
        />
      </div>
    </div>
  );
}
