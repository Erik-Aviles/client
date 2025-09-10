import React from "react";
import { getData } from "@/lib/getData";
import FormHeader from "@/components/backoffice/FormHeader";
import ProductForm from "@/components/backoffice/forms/ProductForm";

export default async function NewProdutc() {
  const categoriesData = await getData("categories");
  const suppliersData = await getData("suppliers");

  const categories = categoriesData?.map((caterory) => {
    return {
      id: caterory.id,
      title: caterory.title,
    };
  });

  const suppliers = suppliersData.map((supplier) => {
    return {
      id: supplier.id,
      title: `${supplier.firstName} ${supplier.lastName}`,
    };
  });

  return (
    <div className="h-[calc(100vh-40px)] flex flex-col pb-4">
      <FormHeader title="Nuevo Producto" />
      <div className="flex-1 overflow-auto">
        <ProductForm categories={categories} suppliers={suppliers} />
      </div>
    </div>
  );
}
