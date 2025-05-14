"use client";

import FormHeader from "@/components/backoffice/FormHeader";
import ArrayItemsInput from "@/components/FormInputs/ArrayItemsInput";
import ImageInput from "@/components/FormInputs/ImageInput";
import SelectInput from "@/components/FormInputs/SelectInput";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import TextareaInput from "@/components/FormInputs/TextareaInput";
import TextInput from "@/components/FormInputs/TextInput";
import { makePostRequest } from "@/lib/apiRequest";
import { generateSlug } from "@/lib/generateSlug";
import { categories } from "@/utils/general/categories";
import { discounts } from "@/utils/general/discounts";
import { farmers } from "@/utils/general/farmers";
import { tagsData } from "@/utils/general/tagsData";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function NewProduct({ initialData = {}, isUpdate = false }) {
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState(tagsData || []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: initialData,
  });

  async function onSubmit(data) {
    /* {
    id, 
    title, 
    sku, 
    slug, 
    barcode,
    description, 
    price, 
    salePrice,
    quantity, 
    tags, 
    discount,
    category, 
    categoryDefault, 
    farmer, 
    imageUrl,
    } */
    setLoading(true);
    const slug = generateSlug(data.title);
    data.slug = slug;
    data.imageUrl = imageUrl;
    data.tags = tags;
    console.log(data);
    makePostRequest(setLoading, "api/products", data, "Producto", reset);
    setImageUrl("");
  }
  return (
    <div>
      <FormHeader title={isUpdate ? "Actualizar producto" : "Nuevo Producto"} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="dark:text-slate-100 text-slate-900 border border-border dark:bg-slate-800 rounded-lg p-4 sm:mx-6 md:mx-10 lg:mx-14 xl:mx-20 2xl:mx-24"
      >
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
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
            name="farmerIds"
            register={register}
            errors={errors}
            className="w-full"
            options={farmers}
            multiple={false}
          />

          <TextInput
            label="Precio (costo)"
            name="price"
            type="number"
            register={register}
            errors={errors}
            className="w-full"
          />
          <TextInput
            label="Precio (venta)"
            name="salePrice"
            type="number"
            register={register}
            errors={errors}
            className="w-full"
          />
          <TextInput
            label="Cantidad"
            name="quantity"
            type="number"
            register={register}
            errors={errors}
            className="w-full"
          />
          <SelectInput
            label="selecciona un descuento"
            name="discount"
            isRequired={false}
            register={register}
            errors={errors}
            className="w-full"
            options={discounts}
            multiple={false}
          />
          <TextareaInput
            label="Descripción "
            name="description"
            register={register}
            errors={errors}
          />
          {/* Tags */}
          <ArrayItemsInput
            itemTitle="etiqueta"
            items={tags}
            setItems={setTags}
          />
          <ImageInput
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            endpoint="productImageUploader"
            label="Imagen del producto"
          />
        </div>

        <div className="sm:col-span-2 flex gap-3 justify-end py-4">
          <button className="inline-flex items-center px-3 py-2.5 text-sm font-medium text-center text-white bg-red-700 rounded-lg focus:ring-4 focus:ring-red-200 dark:focus:ring-red-900 hover:bg-red-800">
            Cancelar
          </button>
          <SubmitButton
            isLoading={loading}
            buttonTitle={isUpdate ? "Actualizar" : "Crear"}
            buttonLoading={"Creando..."}
          />
        </div>
      </form>
    </div>
  );
}
