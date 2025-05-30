"use client";

import FormHeader from "@/components/backoffice/FormHeader";
import NewSupplierForm from "@/components/backoffice/NewSupplierForm";
import ImageInput from "@/components/FormInputs/ImageInput";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import TextareaInput from "@/components/FormInputs/TextareaInput";
import TextInput from "@/components/FormInputs/TextInput";
import ToggleInput from "@/components/FormInputs/ToggleInput";
import { makePostRequest } from "@/lib/apiRequest";
import { generatePersonCode } from "@/lib/generateCode";
import { companyData } from "@/utils/general/companyData";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

export default function NewSupplier({ initialData = {}, isUpdate = false }) {
  return (
    <div>
      <FormHeader
        title={isUpdate ? "Actualizar Proveedor" : "Nuevo proveedor"}
      />
      <NewSupplierForm initialData={initialData} isUpdate={isUpdate} />
    </div>
  );
}
