import NewProductForm from "@/components/backoffice/NewProductForm";
import { getData } from "@/lib/getData";
import React from "react";

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
    <NewProductForm
      isUpdate={false}
      categories={categories}
      suppliers={suppliers}
    />
  );
}
