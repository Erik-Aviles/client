import React from "react";
import { getData } from "@/lib/getData";
import FormHeader from "@/components/backoffice/FormHeader";
import CategoryForm from "@/components/backoffice/forms/CategoryForm";

export default async function UpdateCategory({ params }) {
  const { id } = await params;
  const category = await getData(`categories/${id}`);

  return (
    <div className="h-[calc(100vh-40px)] flex flex-col pb-4">
      <FormHeader title="Editar categoría" />
      <div className="flex-1 overflow-auto">
        <CategoryForm initialData={category} />
      </div>
    </div>
  );
}
