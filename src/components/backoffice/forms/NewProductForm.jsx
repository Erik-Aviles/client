"use client";

import ArrayItemsInput from "@/components/FormInputs/ArrayItemsInput";
import ImageInput from "@/components/FormInputs/ImageInput";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import TextareaInput from "@/components/FormInputs/TextareaInput";
import TextInput from "@/components/FormInputs/TextInput";
import ToggleInput from "@/components/FormInputs/ToggleInput";
import { makePostRequest, makePutRequest } from "@/lib/apiRequest";
import { generateSlug } from "@/lib/generateSlug";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import SelectInput from "@/components/FormInputs/SelectInput";
import CancelButton from "@/components/FormInputs/CancelButton";

export default function NewProductForm({
  initialData = {},
  categories,
  suppliers,
}) {
  const router = useRouter();
  const datapath = "products";
  const isEditing = Boolean(initialData?.id);

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ...(initialData || {}),
      tags: initialData?.tags ?? [],
      suppliers: initialData?.userId,
    },
  });

  const [loading, setLoading] = useState(false);

  // Watches ----------------------------------------------------------
  const isActive = watch("isActive");
  const hasDiscount = watch("hasDiscount");

  function redirect() {
    router.push(`/dashboard/${datapath}`);
  }

  async function onSubmit(data) {
    const slug = generateSlug(data.title);

    const formattedData = {
      ...data,
      slug,
    };

    if (isEditing) {
      delete formattedData.code;
    }

    const requestFn = isEditing ? makePutRequest : makePostRequest;
    const endpoint = isEditing
      ? `api/${datapath}/${initialData?.id}`
      : `api/${datapath}`;

    await requestFn(
      setLoading,
      endpoint,
      formattedData,
      "Producto",
      redirect,
      reset
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="dark:text-slate-100 text-slate-900 border border-border dark:bg-slate-800 rounded-lg pt-4 px-4 my-2 mx-4 sm:mx-6 md:mx-10 lg:mx-14 xl:mx-20 2xl:mx-24"
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
          className={isEditing ? "w-full" : "sm:col-span-2"}
        />
        {isEditing && (
          <TextInput
            label="Codigo"
            name="code"
            register={register}
            errors={errors}
            className="w-full"
            readOnly
          />
        )}

        <TextInput
          label="Codigo sku"
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
          name="quantity"
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
        <Controller
          control={control}
          name="tags"
          render={({ field }) => (
            <ArrayItemsInput
              {...field}
              setItems={field.onChange}
              items={field.value}
              itemTitle="Etiquetas"
            />
          )}
        />

        <Controller
          control={control}
          name="imageUrl"
          render={({ field }) => (
            <ImageInput
              {...field}
              setImageUrl={field.onChange}
              imageUrl={field.value}
              endpoint="productImageUploader"
              label="Imagen del producto"
            />
          )}
        />
      </div>
      <div className="sm:col-span-2 flex gap-3 justify-end py-4">
        <CancelButton onClick={redirect} />
        <SubmitButton
          isLoading={loading}
          isEditing={isEditing}
          itemName="producto"
        />
      </div>
    </form>
  );
}
