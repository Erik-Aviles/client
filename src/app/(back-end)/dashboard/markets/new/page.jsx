import NewMarketForm from "@/components/backoffice/NewMarketForm";
import { getData } from "@/lib/getData";
import React from "react";

export default async function NewMarket() {
  const categoriesData = await getData("categories");
  const categories = categoriesData?.map((caterory) => {
    return {
      id: caterory.id,
      title: caterory.title,
    };
  });
  return <NewMarketForm categories={categories} isUpdate={false} />;
}
