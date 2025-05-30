"use client";

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
import ArrayItemsInput from "../FormInputs/ArrayItemsInput";

export default function NewSupplierForm({ user, isUpdate = false }) {
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const nameCompany = companyData.name;
  const datapath = "suppliers";
  const router = useRouter();

  function redirect() {
    router.push(`/dashboard/${datapath}`);
  }

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
      ...user,
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

  async function onSubmit(data) {
    /* {id, name, idDocument, codeSupplier, phone, profileImageUrl, email, address, contactPerson, contactPersonPhone, products, paymentTerms, notes, isActive, userId} */
    data.profileImageUrl = imageUrl;
    data.userId = user?.id;
    data.products = products;
    console.log(data);
    makePostRequest(setLoading, `api/${datapath}`, data, "Proveedor", reset, redirect);
    setImageUrl("");
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-4xl p-4 sm:p-6 md:p-8 mx-auto my-3 dark:text-slate-100 text-slate-900 border border-border dark:bg-slate-800 rounded-lg shadow "
    >
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        {user?.role === "ADMIN" && (
          <ToggleInput
            label="Estado del proveedor"
            name="isActive"
            isActive={isActive}
            trueTitle="Activo"
            falseTitle="Inactivo"
            register={register}
          />
        )}
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
        {user?.id === "ADMIN" && (
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
          label="Nombre del contacto"
          name="contactPerson"
          register={register}
          errors={errors}
          className="w-full"
          isRequired={false}
        />
        <TextInput
          label="Teléfono del contacto"
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
        <SubmitButton
          isLoading={loading}
          buttonTitle={isUpdate ? "Actualizar perfil" : "Crear perfil"}
          buttonLoading={"Creando proveedor..."}
        />
      </div>
    </form>
  );
}
