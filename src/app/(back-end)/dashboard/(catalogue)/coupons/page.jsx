import React from "react";
import { fetchCoupons } from "./actions";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { columns, fieldsToSearch, initialColumnVisibility } from "./columns";
import Heading from "@/components/backoffice/styledComponent/Heading";
import { DataTable } from "@/components/backoffice/date-table-components/DataTable";

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return <p className="text-center text-gray-500">No autorizado</p>;
  }

  const { id, role } = session?.user ?? {};
  let coupons = [];

  try {
    const allCoupons = await fetchCoupons();
    coupons =
      role === "ADMIN"
        ? allCoupons
        : allCoupons.filter((coupon) => coupon?.vendorId === id);
  } catch (error) {
    console.error("Error cargando cupones:", error);
    return <p className="text-center text-red-500">Error cargando cupones</p>;
  }

  return (
    <div className="h-[calc(100vh-40px)] flex flex-col gap-3">
      <div className="px-4 md:px-6">
        <Heading title="Cupones" />
      </div>
      <div className="flex-1">
        <DataTable
          columns={columns}
          data={coupons}
          fieldsToSearch={fieldsToSearch}
          initialColumnVisibility={initialColumnVisibility}
          InputPlaceholder="Buscar cupón por nombre..."
          endpoint="coupons"
          title="Cupones"
        />
      </div>
    </div>
  );
}
