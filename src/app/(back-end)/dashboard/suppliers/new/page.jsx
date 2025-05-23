"use client";

import FormHeader from "@/components/backoffice/FormHeader";
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
  const [loading, setLoading] = useState(false);
  const nameCompany = companyData.name;
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      isActive: true,
    },
  });

  const name = watch("name");
  const idDocument = watch("idDocument");
  const isActive = watch("isActive");

  const supplierCodeGenerated = useMemo(() => {
    if (
      name &&
      typeof name === "string" &&
      name.trim() !== "" &&
      idDocument !== ""
    ) {
      return generatePersonCode(nameCompany, name, idDocument, "proveedor");
    }
    return "";
  }, [name, idDocument]);

  useEffect(() => {
    if (supplierCodeGenerated) {
      setValue("codeSupplier", supplierCodeGenerated);
    }
  }, [supplierCodeGenerated, setValue]);

  async function onSubmit(data) {
    /* {
      id, 
      name, 
      idDocument,
      codeSupplier,
      phone, 
      email, 
      address,
      contactPerson,
      contactPersonPhone,
      paymentTerms,
      notes,
      isActive,
    } */
    console.log(data);
    makePostRequest(setLoading, "api/suppliers", data, "Proveedor", reset);
    router.back();
  }

  return (
    <div>
      <FormHeader
        title={isUpdate ? "Actualizar Proveedor" : "Nuevo proveedor"}
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="dark:text-slate-100 text-slate-900 border border-border dark:bg-slate-800 rounded-lg p-4 sm:mx-6 md:mx-10 lg:mx-14 xl:mx-20 2xl:mx-24"
      >
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <ToggleInput
            label="Estado del proveedor"
            name="isActive"
            isActive={isActive}
            trueTitle="Activo"
            falseTitle="Inactivo"
            register={register}
          />
          <TextInput
            label="Nombre completo"
            name="name"
            register={register}
            errors={errors}
            className="w-full"
          />
          <TextInput
            label="Documento de identificación"
            name="idDocument"
            register={register}
            errors={errors}
            className="w-full"
          />
          <TextInput
            label="Código (se genera automáticamente)"
            name="codeSupplier"
            register={register}
            errors={errors}
            readOnly={true}
            className="w-full"
          />
          <TextInput
            label="Teléfono del proveedor"
            name="phone"
            type="tel"
            register={register}
            errors={errors}
            className="w-full"
          />
          <TextInput
            label="Correo"
            name="email"
            type="email"
            register={register}
            errors={errors}
            className="w-full"
          />
          <TextInput
            label="Dirección"
            name="address"
            register={register}
            errors={errors}
            className="w-full"
          />
          <TextInput
            label="Nombre del contacto"
            name="contactPerson"
            register={register}
            errors={errors}
            className="w-full"
          />
          <TextInput
            label="Teléfono del contacto"
            name="contactPersonPhone"
            type="tel"
            register={register}
            errors={errors}
            className="w-full"
          />

          <TextareaInput
            label="Condiciones de pago"
            name="paymentTerms"
            register={register}
            errors={errors}
            isRequired={false}
          />
          <TextareaInput
            label="Notas"
            name="notes"
            register={register}
            errors={errors}
            isRequired={false}
          />
        </div>

        <div className="sm:col-span-2 flex gap-3 justify-end py-4">
          <SubmitButton
            isLoading={loading}
            buttonTitle={isUpdate ? "Actualizar" : "Crear"}
            buttonLoading={"Creando proveedor..."}
          />
        </div>
      </form>
    </div>
  );
}
