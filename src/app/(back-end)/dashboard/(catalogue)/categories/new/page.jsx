"use client";

import FormHeader from "@/components/backoffice/FormHeader";
import ImageInput from "@/components/FormInputs/ImageInput";
import SelectInput from "@/components/FormInputs/SelectInput";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import TextareaInput from "@/components/FormInputs/TextareaInput";
import TextInput from "@/components/FormInputs/TextInput";
import ToggleInput from "@/components/FormInputs/ToggleInput";
import { makePostRequest } from "@/lib/apiRequest";
import { generateSlug } from "@/lib/generateSlug";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function NewCategory({ initialData = {}, isUpdate = false }) {
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const datapath = "categories";
  const router = useRouter();

  function redirect() {
    router.push(`/dashboard/${datapath}`);
  }

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      isActive: true,
    },
  });
  const isActive = watch("isActive");

  async function onSubmit(data) {
    /* {id, title, slug, description, imageUrl, marketIds, isActive} */
    const slug = generateSlug(data.title);
    data.slug = slug;
    data.imageUrl = imageUrl;
    console.log(data);
    makePostRequest(
      setLoading,
      `api/${datapath}`,
      data,
      "Categoría",
      reset,
      redirect
    );
    setImageUrl("");
  }
  
  return (
    <div>
      <FormHeader
        title={isUpdate ? "Actualizar categoría" : "Nueva categoría"}
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="dark:text-slate-100 text-slate-900 border border-border dark:bg-slate-800 rounded-lg p-4 sm:mx-6 md:mx-10 lg:mx-14 xl:mx-20 2xl:mx-24"
      >
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <ToggleInput
            label="Estado de la categoría"
            name="isActive"
            isActive={isActive}
            trueTitle="Activo"
            falseTitle="Inactivo"
            register={register}
          />
          <TextInput
            label="Nombre de categoría"
            name="title"
            register={register}
            errors={errors}
          />
          <TextareaInput
            label="Descripción "
            name="description"
            register={register}
            errors={errors}
          />
          <ImageInput
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            endpoint="categoryImageUploader"
            label="Imagen de categoria"
          />
        </div>

        <div className="sm:col-span-2 flex gap-3 justify-end py-4">
          <button className="inline-flex items-center px-3 py-2.5 text-sm font-medium text-center text-white bg-red-700 rounded-lg focus:ring-4 focus:ring-red-200 dark:focus:ring-red-900 hover:bg-red-800">
            Cancelar
          </button>
          <SubmitButton
            isLoading={loading}
            buttonTitle={isUpdate ? "Actualizar" : "Crear categoría"}
            buttonLoading={"Creando categoría..."}
          />
        </div>
      </form>
    </div>
  );
}
