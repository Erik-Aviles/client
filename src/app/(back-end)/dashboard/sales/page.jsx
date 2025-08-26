import React from "react";
import { columns } from "./columns";
import { getData } from "@/lib/getData";
import Heading from "@/components/backoffice/styledComponent/Heading";
import { DataTable } from "@/components/backoffice/date-table-components/DataTable";

export default async function Sales() {
  const sales = await getData("sales");
  if (!sales) {
    return <div className="text-center">No hay datos disponibles</div>;
  }

  const initialColumnVisibility = {
    orderId: false,
    productId: false,
    vendorId: false,
  };
  const fieldsToSearch = ["title", "orderId", "vendorId", "id"];

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
          endpoint="suppliers"
          title="sales"
        />
      </div>
    </div>
  );
}
