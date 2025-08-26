"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { generatePersonCode } from "@/lib/generateCode";
import { companyData } from "@/utils/general/companyData";
import TextInput from "@/components/FormInputs/TextInput";
import ImageInput from "@/components/FormInputs/ImageInput";
import { cleanEmptyFields } from "@/utils/cleanEmptyFields";
import ToggleInput from "@/components/FormInputs/ToggleInput";
import ArrayItemsInput from "../../FormInputs/ArrayItemsInput";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import CancelButton from "@/components/FormInputs/CancelButton";
import TextareaInput from "@/components/FormInputs/TextareaInput";
import { makePostRequest, makePutRequest } from "@/lib/apiRequest";

export default function NewSupplierForm({
  initialData = {},
  currentRole = "",
}) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const router = useRouter();
  const datapath = "suppliers";
  const nameCompany = companyData.name;

  const supplierProfile = initialData?.supplierProfile;
  const isEditing = Boolean(initialData?.supplierProfile?.id);

  // React Hook Form --------------------------------------------------
  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ...initialData,
      ...supplierProfile,
      logoUrl: supplierProfile?.logoUrl ?? "",
      products: supplierProfile?.products ?? [],
      isActive: supplierProfile?.isActive ?? false,
      role: initialData?.role || "SUPPLIER",
    },
  });

  const [loading, setLoading] = useState(false);

  // Watches ----------------------------------------------------------
  const firstName = watch("firstName");
  const lastName = watch("lastName");
  const idDocument = watch("idDocument");
  const role = watch("role");

  // Generar código de proveedor cuando name + idDocument (y opcional role) cambian.
  const supplierCodeGenerated = useMemo(() => {
    if (firstName && lastName && idDocument) {
      return generatePersonCode(
        nameCompany,
        `${firstName} ${lastName}`,
        idDocument,
        role
      );
    }
    return "";
  }, [firstName, lastName, idDocument, role, nameCompany]);

  // Empujar el código al form cuando se genera.
  useEffect(() => {
    if (supplierCodeGenerated) {
      setValue("codeSupplier", supplierCodeGenerated, { shouldValidate: true });
    }
  }, [supplierCodeGenerated, setValue]);

  async function onSubmit(formValues) {
    const payload = {
      ...formValues,
      codeSupplier:
        supplierCodeGenerated || formValues.codeSupplier || undefined,
      userId: initialData.id,
    };

    const cleanedData = cleanEmptyFields(payload) || {};

    const endpoint = isEditing
      ? `api/${datapath}/${supplierProfile.id}`
      : `api/${datapath}`;

    const requestFn = isEditing ? makePutRequest : makePostRequest;
    await requestFn(
      setLoading,
      endpoint,
      cleanedData,
      "Proveedor",
      () => {
        if (isEditing) {
          router.back();
        } else {
          router.push(`${baseUrl}/login`);
        }
      },
      reset
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="dark:text-slate-100 text-slate-900 border border-border dark:bg-slate-800 rounded-lg pt-4 px-4 my-2 sm:mx-6 md:mx-10 lg:mx-14 xl:mx-20 2xl:mx-24"
    >
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        {/* Estado */}
        {currentRole === "ADMIN" && (
          <ToggleInput
            label="Estado del proveedor"
            name="isActive"
            isActive={watch("isActive")}
            trueTitle="Activo"
            falseTitle="Inactivo"
            register={register}
          />
        )}
        {/* Nombre */}
        <TextInput
          label="Nombre"
          name="firstName"
          register={register}
          errors={errors}
          className="w-full"
        />
        <TextInput
          label="Apellido"
          name="lastName"
          register={register}
          errors={errors}
          className="w-full"
        />

        {/* Documento */}
        <TextInput
          label="Documento de identificación"
          name="idDocument"
          register={register}
          errors={errors}
          className="w-full"
        />
        <TextInput
          label="Código (auto-generado)"
          name="codeSupplier"
          register={register}
          errors={errors}
          readOnly={true}
          className="w-full"
        />
        <TextInput
          label="Nombre de la empresa"
          name="name"
          register={register}
          errors={errors}
          className={`${currentRole === "ADMIN" ? "w-full" : "sm:col-span-2"}`}
        />

        {/* Código auto-generado: visible si usuario ADMIN o si ya existe */}
        {currentRole === "ADMIN" && (
          <TextInput
            label="Correo Electrónico"
            name="email"
            register={register}
            errors={errors}
            className="w-full"
          />
        )}

        {/* Teléfono proveedor */}
        <TextInput
          label="Teléfono de la empresa"
          name="phone"
          type="tel"
          register={register}
          errors={errors}
          className="w-full"
        />
        {/* Dirección */}
        <TextInput
          label="Dirección de la empresa"
          name="address"
          register={register}
          errors={errors}
          className="w-full"
          isRequired={false}
        />
        {/* Contacto */}
        <TextInput
          label="Nombre de contacto"
          name="contactPerson"
          register={register}
          errors={errors}
          className="w-full"
          isRequired={false}
        />
        <TextInput
          label="Teléfono de contacto"
          name="contactPersonPhone"
          type="tel"
          register={register}
          errors={errors}
          className="w-full"
          isRequired={false}
        />

        {/* Productos */}
        <Controller
          control={control}
          name="products"
          render={({ field }) => (
            <ArrayItemsInput
              {...field}
              setItems={field.onChange}
              items={field.value}
              itemTitle="Producto"
            />
          )}
        />

        {/* Condiciones de pago */}
        <TextareaInput
          label="Condiciones de pago"
          name="paymentTerms"
          register={register}
          errors={errors}
          isRequired={false}
        />
        {/* Notas */}
        <TextareaInput
          label="Notas"
          name="notes"
          register={register}
          errors={errors}
          isRequired={false}
        />

        {/* Imágenes */}
        <Controller
          control={control}
          name="imageUrl"
          render={({ field }) => (
            <ImageInput
              {...field}
              setImageUrl={field.onChange}
              imageUrl={field.value}
              endpoint="supplierImageUploader"
              label="Foto del proveedor"
            />
          )}
        />
        <Controller
          control={control}
          name="logoUrl"
          render={({ field }) => (
            <ImageInput
              {...field}
              setImageUrl={field.onChange}
              imageUrl={field.value}
              endpoint="supplierLogoUploader"
              label="Logo de la empresa"
            />
          )}
        />
      </div>

      <div className="sm:col-span-2 flex gap-3 justify-end py-4">
        <CancelButton onClick={() => router.push(`${baseUrl}/login`)} />
        <SubmitButton
          isLoading={loading}
          isEditing={isEditing}
          itemName="proveedor"
        />
      </div>
    </form>
  );
}
