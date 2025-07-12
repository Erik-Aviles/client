import React from "react";
import { getData } from "@/lib/getData";
import FormHeader from "@/components/backoffice/FormHeader";
import NewBannerForm from "@/components/backoffice/forms/NewBannerForm";

export default async function UpdateBanner({ params }) {
  const { id } = await params;
  const banner = await getData(`banners/${id}`);
  return (
    <div className="h-[calc(100vh-40px)] flex flex-col pb-4">
      <FormHeader title="Editar Banner" />
      <div className="flex-1 overflow-auto">
        <NewBannerForm initialData={banner} />
      </div>
    </div>
  );
}
