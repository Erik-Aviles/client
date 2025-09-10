import React from "react";
import FormHeader from "@/components/backoffice/FormHeader";
import BannerForm from "@/components/backoffice/forms/BannerForm";

export default function NewBanner() {
  return (
    <div className="h-[calc(100vh-40px)] flex flex-col pb-4">
      <FormHeader title="Nuevo Banner" />
      <div className="flex-1 overflow-auto">
        <BannerForm />
      </div>
    </div>
  );
}
