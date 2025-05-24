"use client";

import FormHeader from "@/components/backoffice/FormHeader";
import ImageInput from "@/components/FormInputs/ImageInput";
import RichTextEditorInput from "@/components/FormInputs/RichTextEditorInput";
import SelectInput from "@/components/FormInputs/SelectInput";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import TextareaInput from "@/components/FormInputs/TextareaInput";
import TextInput from "@/components/FormInputs/TextInput";
import ToggleInput from "@/components/FormInputs/ToggleInput";
import { makePostRequest } from "@/lib/apiRequest";
import { generateSlug } from "@/lib/generateSlug";
import { categories } from "@/utils/general/categories";
import { contentMain } from "@/utils/general/content";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function NewTraining({ initialData = {}, isUpdate = false }) {
  const [imageUrl, setImageUrl] = useState("");
  const [content, setContent] = useState(contentMain);
  const [loading, setLoading] = useState(false);
  const datapath = "trainings";
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
    /* {id, title, expertId, categoryId, slug, description, content, imageUrl, isActive} */
    const slug = generateSlug(data.title);
    data.slug = slug;
    data.imageUrl = imageUrl;
    data.content = content;
    console.log(data);
    makePostRequest(
      setLoading,
      `api/${datapath}`,
      data,
      "Capacitación ",
      reset,
      redirect
    );
    setImageUrl("");
    setContent("");
  }

  return (
    <div>
      <FormHeader
        title={isUpdate ? "Actualizar Capacitación" : "Nueva Capacitación"}
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="dark:text-slate-100 text-slate-900 border border-border dark:bg-slate-800 rounded-lg p-4 sm:mx-6 md:mx-10 lg:mx-14 xl:mx-20 2xl:mx-24"
      >
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <ToggleInput
            label="Estado de la Capacitación"
            name="isActive"
            isActive={isActive}
            trueTitle="Activo"
            falseTitle="Inactivo"
            register={register}
          />

          <TextInput
            label="Título la capacitación"
            name="title"
            register={register}
            errors={errors}
            className="w-full"
          />
          <SelectInput
            label="seleccionar categoria"
            name="categoryId"
            register={register}
            errors={errors}
            className="w-full"
            options={categories}
          />
          <TextareaInput
            label="Descripción de la Capacitación"
            name="description"
            register={register}
            errors={errors}
          />

          <ImageInput
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            endpoint="trainingImageUploader"
            label="Imagen de la capacitación"
          />
          {/* content editor */}
          <RichTextEditorInput
            label="Contenido de la capacitación"
            content={content}
            onChange={setContent}
            placeholder="Escribe tu capacitación"
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
            buttonTitle={isUpdate ? "Actualizar" : "Crear Capacitación"}
            buttonLoading={"Creando capacitación..."}
          />
        </div>
      </form>
    </div>
  );
}
