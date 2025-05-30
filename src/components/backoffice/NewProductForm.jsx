"use client";

import FormHeader from "@/components/backoffice/FormHeader";
import ArrayItemsInput from "@/components/FormInputs/ArrayItemsInput";
import ImageInput from "@/components/FormInputs/ImageInput";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import TextareaInput from "@/components/FormInputs/TextareaInput";
import TextInput from "@/components/FormInputs/TextInput";
import ToggleInput from "@/components/FormInputs/ToggleInput";
import { makePostRequest } from "@/lib/apiRequest";
import { generateSlug } from "@/lib/generateSlug";
import { tagsData } from "@/utils/general/tagsData";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import SelectInput from "../FormInputs/SelectInput";
import { useRouter } from "next/navigation";

export default function NewProductForm({
  products = {},
  categories,
  suppliers,
  isUpdate = false,
}) {
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState([]);
  const datapath = "products";
  const router = useRouter();

  function redirect() {
    router.push(`/dashboard/${datapath}`);
  }

  const {
    register,
    reset,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      isActive: true,
      hasDiscount: false,
    },
  });
  const isActive = watch("isActive");
  const hasDiscount = watch("hasDiscount");

  async function onSubmit(data) {
    /* {id, title, sku, slug, barcode, description, price, salePrice, quantity, tags, hasDiscount, imageUrl, isActive, categoryId, supplierId} */
    const slug = generateSlug(data.title);

    data.slug = slug;
    data.imageUrl = imageUrl;
    data.tags = tags;
    data.quantity = 1;
    data.isActive = isActive;
    data.hasDiscount = hasDiscount;
    makePostRequest(
      setLoading,
      `api/${datapath}`,
      data,
      "Producto",
      reset,
      redirect
    );
    setImageUrl("");
    setTags([]);
  }
  return (
    <div>
      <FormHeader title={isUpdate ? "Actualizar producto" : "Nuevo Producto"} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="dark:text-slate-100 text-slate-900 border border-border dark:bg-slate-800 rounded-lg p-4 sm:mx-6 md:mx-10 lg:mx-14 xl:mx-20 2xl:mx-24"
      >
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <ToggleInput
            label="Estado del producto"
            name="isActive"
            isActive={isActive}
            trueTitle="Activo"
            falseTitle="Inactivo"
            register={register}
          />
          <TextInput
            label="Nombre"
            name="title"
            register={register}
            errors={errors}
          />

          <TextInput
            label="Codigo del producto"
            name="sku"
            register={register}
            errors={errors}
            className="w-full"
          />

          <TextInput
            label="Codigo de barra"
            name="barcode"
            register={register}
            errors={errors}
            className="w-full"
            isRequired={false}
          />

          <SelectInput
            label="selecciona una categoria"
            name="categoryId"
            register={register}
            errors={errors}
            className="w-full"
            options={categories}
            multiple={false}
          />

          <SelectInput
            label="selecciona un proveedor"
            name="supplierId"
            register={register}
            errors={errors}
            className="w-full"
            options={suppliers}
            multiple={false}
          />

          <TextInput
            label="Cantidad de producto"
            name="stock"
            type="number"
            register={register}
            errors={errors}
            className="w-full"
            isRequired={false}
          />
          <TextInput
            label="Precio (normal)"
            name="price"
            type="number"
            register={register}
            errors={errors}
            className="w-full"
          />

          {hasDiscount && (
            <TextInput
              label="Precio (con descuento)"
              name="salePrice"
              type="number"
              register={register}
              errors={errors}
              className={"w-full"}
            />
          )}
          <ToggleInput
            label="Aplicar descuento"
            name="hasDiscount"
            isActive={hasDiscount}
            trueTitle="Si"
            falseTitle="No"
            register={register}
            className={`justify-end sm:h-[77.64px] ${
              !hasDiscount ? " sm:col-span-2 " : " w-full "
            }`}
          />
          <TextareaInput
            label="Descripción "
            name="description"
            register={register}
            errors={errors}
            isRequired={false}
          />

          {/* Tags */}
          <ArrayItemsInput
            setItems={setTags}
            items={tags}
            itemTitle="etiqueta"
          />

          <ImageInput
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            endpoint="productImageUploader"
            label="Imagen del producto"
          />
        </div>
        <div className="sm:col-span-2 flex gap-3 justify-end py-4">
          <button
            type="button"
            className="inline-flex items-center px-3 py-2.5 text-sm font-medium text-center text-white bg-red-700 rounded-lg focus:ring-4 focus:ring-red-200 dark:focus:ring-red-900 hover:bg-red-800"
          >
            Cancelar
          </button>
          <SubmitButton
            isLoading={loading}
            buttonTitle={isUpdate ? "Actualizar" : "Crear producto"}
            buttonLoading={"Creando producto..."}
          />
        </div>
      </form>
    </div>
  );
}
