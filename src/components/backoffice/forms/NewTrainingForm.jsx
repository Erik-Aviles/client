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
import { contentMain } from "@/utils/general/content";
// import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

// Cargar solo en cliente para evitar SSR
// const RichTextEditorInput = dynamic(
//   () => import("../FormInputs/RichTextEditorInput"),
//   {
//     ssr: false,
//   }
// );

export default function NewTrainingForm({ initialData, categories }) {
  const router = useRouter();
  const datapath = "trainings";
  const id = initialData?.id ?? "";

  const [imageUrl, setImageUrl] = useState(initialData?.imageUrl ?? "");
  const [content, setContent] = useState(initialData?.contentMain ?? "");
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
      isActive: true,
      isActive: initialData?.isActive ?? true,
      imageUrl: initialData?.imageUrl ?? "",
    },
  });

  useEffect(() => {
    setValue("imageUrl", imageUrl);
  }, [imageUrl, setValue]);

  useEffect(() => {
    setValue("content", content);
  }, [content, setValue]);

  const isActive = watch("isActive");

  async function onSubmit(data) {
    /* {id, title, categoryId, slug, description, content, imageUrl, isActive} */
    const slug = generateSlug(data.title);
    data.slug = slug;
    data.imageUrl = imageUrl;
    data.content = content;

    const isUpdating = !!data.id;
    const requestFn = isUpdating ? makePutRequest : makePostRequest;
    const endpoint = isUpdating
      ? `api/${datapath}/${data.id}`
      : `api/${datapath}`;
    requestFn(
      setLoading,
      endpoint,
      data,
      "Capacitación",
      redirect,
      isUpdating ? null : reset
    );
    if (!isUpdating) {
      setImageUrl("");
      setContent(contentMain);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="dark:text-slate-100 text-slate-900 border border-border dark:bg-slate-800 rounded-lg pt-4 px-4 my-2 mx-4 sm:mx-6 md:mx-10 lg:mx-14 xl:mx-20 2xl:mx-24"
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
        {/* content editor 
            <RichTextEditorInput
              label="Contenido de la capacitación"
              content={content}
              onChange={setContent}
              placeholder="Escribe tu capacitación"
            />*/}
      </div>

      <div className="sm:col-span-2 flex gap-3 justify-end py-4">
        <CancelButton onClick={redirect} />
        <SubmitButton
          isLoading={loading}
          isEditing={id}
          itemName="capacitación"
        />
      </div>
    </form>
  );
}
