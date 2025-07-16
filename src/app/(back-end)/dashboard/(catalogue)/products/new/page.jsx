import React from "react";
import { getData } from "@/lib/getData";
import FormHeader from "@/components/backoffice/FormHeader";
import NewProductForm from "@/components/backoffice/forms/NewProductForm";

export default async function NewProdutc() {
  const categoriesData = await getData("categories");
  const usersData = await getData("users");

  const categories = categoriesData?.map((caterory) => {
    return {
      id: caterory.id,
      title: caterory.title,
    };
  });

  const suppliers = usersData
    ?.filter((user) => user.role === "SUPPLIER")
    ?.map((supplier) => {
      return { id: supplier.id, title: supplier.name };
    });

  return (
    <div className="h-[calc(100vh-40px)] flex flex-col pb-4">
      <FormHeader title="Nuevo Producto" />
      <div className="flex-1 overflow-auto">
        <NewProductForm
          categories={categories}
          suppliers={suppliers}
        />
      </div>
    </div>
  );
}
