import FormHeader from "@/components/backoffice/FormHeader";
import NewTrainingForm from "@/components/backoffice/forms/NewTrainingForm";
import { getData } from "@/lib/getData";
import React from "react";

export default async function NewTraining() {
  const categoriesData = await getData("categories");
  const categories = categoriesData?.map((caterory) => {
    return {
      id: caterory.id,
      title: caterory.title,
    };
  });
  return (
    <div className="h-[calc(100vh-40px)] flex flex-col pb-4">
      <FormHeader title="Nueva Capacitación" />
      <div className="flex-1 overflow-auto">
        <NewTrainingForm categories={categories} />
      </div>
    </div>
  );
}
