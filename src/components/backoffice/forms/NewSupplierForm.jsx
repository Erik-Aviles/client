"use client";

import ImageInput from "@/components/FormInputs/ImageInput";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import TextareaInput from "@/components/FormInputs/TextareaInput";
import TextInput from "@/components/FormInputs/TextInput";
import ToggleInput from "@/components/FormInputs/ToggleInput";
import { makePostRequest, makePutRequest } from "@/lib/apiRequest";
import { generatePersonCode } from "@/lib/generateCode";
import { companyData } from "@/utils/general/companyData";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import ArrayItemsInput from "../../FormInputs/ArrayItemsInput";
import CancelButton from "@/components/FormInputs/CancelButton";
import { cleanEmptyFields } from "@/utils/cleanEmptyFields";

export default function NewSupplierForm({ initialData = {} }) {
  console.log(initialData);
  const router = useRouter();
  const datapath = "suppliers";
  const supplierProfile = initialData?.supplierProfile ?? initialData;
  const isEditing = Boolean(initialData?.supplierProfile?.id);
  const nameCompany = companyData.name;
  const initialImage =
    supplierProfile?.profileImageUrl ?? supplierProfile?.imageUrl ?? "";
  const initialProducts = supplierProfile?.products ?? [];

  const [imageUrl, setImageUrl] = useState(initialImage);
  const [products, setProducts] = useState(initialProducts);
  const [loading, setLoading] = useState(false);

  function redirect() {
    router.push(`/login`);
  }

  // React Hook Form --------------------------------------------------
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ...supplierProfile,
      profileImageUrl: initialImage,
      products: initialProducts,
      isActive: supplierProfile?.isActive ?? false,
    },
  });

  // Watches ----------------------------------------------------------
  const name = watch("name");
  const idDocument = watch("idDocument");
  const role = watch("role");
  const isActive = watch("isActive");

  // Generar código de proveedor cuando name + idDocument (y opcional role) cambian.
  const supplierCodeGenerated = useMemo(() => {
    if (
      name &&
      typeof name === "string" &&
      name.trim() !== "" &&
      idDocument &&
      idDocument !== ""
    ) {
      return generatePersonCode(nameCompany, name, idDocument, role);
    }
    return "";
  }, [name, idDocument, role, nameCompany]);

  // Empujar el código al form cuando se genera.
  useEffect(() => {
    if (supplierCodeGenerated) {
      setValue("codeSupplier", supplierCodeGenerated, { shouldValidate: true });
    }
  }, [supplierCodeGenerated, setValue]);

  useEffect(() => {
    setValue("profileImageUrl", imageUrl, { shouldValidate: true });
  }, [imageUrl, setValue]);

  useEffect(() => {
    setValue("products", products, { shouldValidate: true });
  }, [products, setValue]);

  /* {id, name, idDocument, codeSupplier, phone, profileImageUrl, email, address, contactPerson, contactPersonPhone, products, paymentTerms, notes, isActive, userId} */
  async function onSubmit(formValues) {
    const payload = {
      ...formValues,
      codeSupplier:
        supplierCodeGenerated || formValues.codeSupplier || undefined,
      userId: initialData.id,
      profileImageUrl: imageUrl || formValues.profileImageUrl,
      products,
    };

    const cleanedData = cleanEmptyFields(payload) || {};

    const endpoint = isEditing
      ? `api/${datapath}/${supplierProfile.id}`
      : `api/${datapath}`;

    if (isEditing) {
      await makePutRequest(
        setLoading,
        endpoint,
        cleanedData,
        "Proveedor",
        redirect,
        reset
      );
    } else {
      await makePostRequest(
        setLoading,
        endpoint,
        cleanedData,
        "Proveedor",
        redirect,
        reset
      );
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="dark:text-slate-100 text-slate-900 border border-border dark:bg-slate-800 rounded-lg pt-4 px-4 my-2 sm:mx-6 md:mx-10 lg:mx-14 xl:mx-20 2xl:mx-24"
    >
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        {/* Estado */}
        <ToggleInput
          label="Estado del proveedor"
          name="isActive"
          isActive={isActive}
          trueTitle="Activo"
          falseTitle="Inactivo"
          register={register}
        />

        {/* Nombre */}
        <TextInput
          label="Nombre completo"
          name="name"
          register={register}
          errors={errors}
        />

        {/* Documento */}
        <TextInput
          label="Documento de identificación"
          name="idDocument"
          register={register}
          errors={errors}
          className="w-full"
        />

        {/* Código auto-generado: visible si usuario ADMIN o si ya existe */}
        {(initialData?.role === "ADMIN" || supplierCodeGenerated) && (
          <TextInput
            label="Código (se genera automáticamente)"
            name="codeSupplier"
            register={register}
            errors={errors}
            readOnly={true}
            className="w-full"
          />
        )}

        {/* Teléfono proveedor */}
        <TextInput
          label="Teléfono del proveedor"
          name="phone"
          type="tel"
          register={register}
          errors={errors}
          className="w-full"
        />

        {/* Correo */}
        <TextInput
          label="Correo"
          name="email"
          type="email"
          register={register}
          errors={errors}
          className="w-full"
        />

        {/* Dirección */}
        <TextInput
          label="Dirección"
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
        <ArrayItemsInput
          setItems={setProducts}
          items={products}
          itemTitle="Producto"
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

        {/* Imagen */}
        <ImageInput
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          endpoint="supplierImageUploader"
          label="Foto del proveedor"
        />
      </div>

      <div className="sm:col-span-2 flex gap-3 justify-end py-4">
        <CancelButton onClick={redirect} />
        <SubmitButton
          isLoading={loading}
          iisEditing={isEditing}
          itemName="proveedor"
        />
      </div>
    </form>
  );
}
