import React from "react";
import { columns, fieldsToSearch, initialColumnVisibility } from "./columns";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import Heading from "@/components/backoffice/styledComponent/Heading";
import { DataTable } from "@/components/backoffice/date-table-components/DataTable";
import { fetchProducts } from "./actions";

export default async function ProductsPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <p className="text-center text-gray-500">No autorizado</p>;
  }

  const { id, role } = session?.user ?? {};
  let products = [];

  try {
    const allProducts = await fetchProducts();  
    products =
      role === "ADMIN"
        ? allProducts
        : allProducts.filter((product) => product.userId === id);
  } catch (error) {
    console.error("Error cargando productos:", error);
    return <p className="text-center text-red-500">Error cargando productos</p>;
  }

  return (
    <div className="h-[calc(100vh-40px)] flex flex-col gap-3">
      <div className="px-4 md:px-6">
        <Heading title="productos" />
      </div>
      <div className="flex-1">
        <DataTable
          columns={columns}
          data={products}
          initialColumnVisibility={initialColumnVisibility}
          fieldsToSearch={fieldsToSearch}
          inputPlaceholder="Buscar producto por título, código o ID"
          endpoint="products"
          title="Productos"
        />
      </div>
    </div>
  );
}
