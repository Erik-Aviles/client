import React from "react";
import FormHeader from "@/components/backoffice/FormHeader";
import NewBannerForm from "@/components/backoffice/forms/NewBannerForm";

export default function NewBanner() {
  return (
    <div className="h-[calc(100vh-40px)] flex flex-col pb-4">
      <FormHeader title="Nuevo Banner" />
      <div className="flex-1 overflow-auto">
        <NewBannerForm />
      </div>
    </div>
  );
}
