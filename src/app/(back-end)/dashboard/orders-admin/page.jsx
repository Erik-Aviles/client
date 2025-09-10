import React from "react";
import { fetchOrders } from "./actions";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import Heading from "@/components/backoffice/styledComponent/Heading";
import { DataTable } from "@/components/backoffice/date-table-components/DataTable";
import { columns, fieldsToSearch, initialColumnVisibility } from "./columns";

export default async function OrderAdminPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return <p className="text-center text-gray-500">No autorizado</p>;
  }

  let orders = [];
  try {
    const allOrders = await fetchOrders();
    orders = allOrders;
  } catch (error) {
    console.error("Error cargando pedidos:", error);
    return <p className="text-center text-red-500">Error cargando pedidos</p>;
  }

  return (
    <div className="h-[calc(100vh-40px)] flex flex-col gap-3">
      <div className="px-4 md:px-6">
        <Heading title="Ordenes" />
      </div>
      <div className="flex-1">
        <DataTable
          columns={columns}
          data={orders}
          initialColumnVisibility={initialColumnVisibility}
          fieldsToSearch={fieldsToSearch}
          inputPlaceholder="Buscar pedido por producto, numero de pedido, proveedor."
          endpoint="orders-admin"
          title="orders"
        />
      </div>
    </div>
  );
}
