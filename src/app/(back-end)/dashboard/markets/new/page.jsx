import React from "react";
import { getData } from "@/lib/getData";
import FormHeader from "@/components/backoffice/FormHeader";
import MarketForm from "@/components/backoffice/forms/MarketForm";

export default async function NewMarket() {
  const categoriesData = await getData("categories");
  const categories = categoriesData?.map((caterory) => {
    return {
      id: caterory.id,
      title: caterory.title,
    };
  });
  return (
    <div className="h-[calc(100vh-40px)] flex flex-col pb-4">
      <FormHeader title="Nuevo mercado" />
      <div className="flex-1 overflow-auto">
        <MarketForm categories={categories} />
      </div>
    </div>
  );
}
