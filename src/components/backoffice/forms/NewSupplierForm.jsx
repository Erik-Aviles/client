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
  console.log(initialData)
  const router = useRouter();
  const datapath = "suppliers";
  const id = "";
  const nameCompany = companyData.name;

  const [imageUrl, setImageUrl] = useState(initialData?.profileImageUrl ?? "");
  const [products, setProducts] = useState(initialData?.products ?? []);
  const [loading, setLoading] = useState(false);

  function redirect() {
    router.push(`/login`);
  }

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ...(initialData || {}),
      isActive: initialData?.isActive ?? false,
      imageUrl: initialData?.profileImageUrl ?? "",
      products: initialData?.products ?? [],
    },
  });

  const name = watch("name");
  const idDocument = watch("idDocument");
  const role = watch("role");
  const isActive = watch("isActive");

  const supplierCodeGenerated = useMemo(() => {
    if (
      name &&
      typeof name === "string" &&
      name.trim() !== "" &&
      idDocument !== ""
    ) {
      return generatePersonCode(nameCompany, name, idDocument, role);
    }
    return "";
  }, [name, idDocument]);

  useEffect(() => {
    if (supplierCodeGenerated) {
      setValue("codeSupplier", supplierCodeGenerated);
    }
  }, [supplierCodeGenerated, setValue]);

  useEffect(() => {
    setValue("imageUrl", imageUrl);
  }, [imageUrl, setValue]);

  async function onSubmit(data) {
    /* {id, name, idDocument, codeSupplier, phone, profileImageUrl, email, address, contactPerson, contactPersonPhone, products, paymentTerms, notes, isActive, userId} */

    data.codeSupplier = supplierCodeGenerated;
    data.userId = initialData.id;
    data.products = products;
    data.profileImageUrl = imageUrl;

    data = cleanEmptyFields(data);

    const endpoint = `api/${datapath}`;
    makePostRequest(setLoading, endpoint, data, "Proveedor", redirect, reset);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="dark:text-slate-100 text-slate-900 border border-border dark:bg-slate-800 rounded-lg pt-4 px-4 my-2 sm:mx-6 md:mx-10 lg:mx-14 xl:mx-20 2xl:mx-24"
    >
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        {/* {initialData?.role === "ADMIN" && ( */}
        <ToggleInput
          label="Estado del proveedor"
          name="isActive"
          isActive={isActive}
          trueTitle="Activo"
          falseTitle="Inactivo"
          register={register}
        />
        {/* )} */}
        <TextInput
          label="Nombre completo"
          name="name"
          register={register}
          errors={errors}
        />
        <TextInput
          label="Documento de identificación"
          name="idDocument"
          register={register}
          errors={errors}
          className="w-full"
        />
        {initialData?.id === "ADMIN" && (
          <TextInput
            label="Código (se genera automáticamente)"
            name="codeSupplier"
            register={register}
            errors={errors}
            readOnly={true}
            className="w-full"
          />
        )}
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
          isRequired={false}
        />
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
        <ArrayItemsInput
          setItems={setProducts}
          items={products}
          itemTitle="Producto"
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

        <ImageInput
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          endpoint="supplierImageUploader"
          label="Foto del proveedor"
        />
      </div>

      <div className="sm:col-span-2 flex gap-3 justify-end py-4">
        <CancelButton onClick={redirect} />
        <SubmitButton isLoading={loading} isEditing={id} itemName="proveedor" />
      </div>
    </form>
  );
}
