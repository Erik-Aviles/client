"use client";

import CancelButton from "@/components/FormInputs/CancelButton";
import ImageInput from "@/components/FormInputs/ImageInput";
import SelectInput from "@/components/FormInputs/SelectInput";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import TextareaInput from "@/components/FormInputs/TextareaInput";
import TextInput from "@/components/FormInputs/TextInput";
import ToggleInput from "@/components/FormInputs/ToggleInput";
import { makePostRequest, makePutRequest } from "@/lib/apiRequest";
import { generateSlug } from "@/lib/generateSlug";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function NewMarketForm({ initialData = {}, categories }) {
  const router = useRouter();
  const datapath = "markets";
  const id = initialData?.id ?? "";

  const [imageUrl, setImageUrl] = useState(initialData?.logoUrl ?? "");
  const [loading, setLoading] = useState(false);

  function redirect() {
    router.push(`/dashboard/${datapath}`);
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
      imageUrl: initialData?.logoUrl ?? "",
      isActive: true,
    },
  });
  const isActive = watch("isActive");

  useEffect(() => {
    setValue("imageUrl", imageUrl);
  }, [imageUrl, setValue]);

  async function onSubmit(data) {
    /* {id, title, motto, slug, logoUrl, description, categoryIds, isActive,} */
    const slug = generateSlug(data.title);
    const isUpdating = !!id;

    data.slug = slug;
    data.logoUrl = imageUrl;

    const requestFn = isUpdating ? makePutRequest : makePostRequest;
    const endpoint = isUpdating ? `api/${datapath}/${id}` : `api/${datapath}`;

    requestFn(
      setLoading,
      endpoint,
      data,
      "Mercado",
      redirect,
      isUpdating ? null : reset
    );
    if (!isUpdating) {
      setImageUrl("");
    }
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="dark:text-slate-100 text-slate-900 border border-border dark:bg-slate-800 rounded-lg pt-4 px-4 my-2 mx-4 sm:mx-6 md:mx-10 lg:mx-14 xl:mx-20 2xl:mx-24"
    >
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        <ToggleInput
          label="Estado del Mercado"
          name="isActive"
          isActive={isActive}
          trueTitle="Activo"
          falseTitle="Inactivo"
          register={register}
        />
        <TextInput
          label="Nombre del mercado"
          name="title"
          register={register}
          errors={errors}
          className="w-full"
        />
        <SelectInput
          label="seleccionar categorias"
          name="categoryIds"
          register={register}
          errors={errors}
          className="w-full"
          options={categories}
          multiple={true}
        />
        <TextInput
          label="Lema del mercado"
          name="motto"
          register={register}
          errors={errors}
          isRequired={false}
        />

        <TextareaInput
          label="Descripción el mercado"
          name="description"
          register={register}
          errors={errors}
          isRequired={false}
        />
        <ImageInput
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          endpoint="marketLogoImageUploader"
          label="Logo del mercado"
        />
      </div>
      <div className="sm:col-span-2 flex gap-3 justify-end py-4">
        <CancelButton onClick={redirect} />
        <SubmitButton isLoading={loading} isEditing={id} itemName="mercado" />
      </div>
    </form>
  );
}
