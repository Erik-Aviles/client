"use client";

import React, { useEffect, useState } from "react";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import TextInput from "@/components/FormInputs/TextInput";
import ToggleInput from "@/components/FormInputs/ToggleInput";
import { makePostRequest, makePutRequest } from "@/lib/apiRequest";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import CancelButton from "@/components/FormInputs/CancelButton";
import ImageInput from "@/components/FormInputs/ImageInput";

export default function NewBannerForm({ initialData = {} }) {
  const router = useRouter();
  const datapath = "banners";
  const id = initialData?.id ?? "";
  const [imageUrl, setImageUrl] = useState(initialData?.imageUrl ?? "");
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
      isActive: initialData?.isActive ?? true,
      imageUrl: initialData?.imageUrl ?? "",
    },
  });

  useEffect(() => {
    setValue("imageUrl", imageUrl);
  }, [imageUrl, setValue]);

  const isActive = watch("isActive");

  async function onSubmit(data) {
    /* {id, title, link, imageUrl, isActive,} */
    data.imageUrl = imageUrl;

    const isUpdating = !!data.id;
    const requestFn = isUpdating ? makePutRequest : makePostRequest;
    const endpoint = isUpdating
      ? `api/${datapath}/${data.id}`
      : `api/${datapath}`;

    requestFn(
      setLoading,
      endpoint,
      data,
      "Banner",
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
          label="Estado del banner"
          name="isActive"
          isActive={isActive}
          trueTitle="Activo"
          falseTitle="Inactivo"
          register={register}
        />
        <TextInput
          label="Titulo del banner"
          name="title"
          register={register}
          errors={errors}
        />
        <TextInput
          label="Enlace del banner"
          name="link"
          type="url"
          register={register}
          errors={errors}
        />
        <ImageInput
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          endpoint="bannerImageUploader"
          label="Imagen del banner"
        />
      </div>

      <div className="sm:col-span-2 flex gap-3 justify-end py-4">
        <CancelButton onClick={redirect} />
        <SubmitButton isLoading={loading} isEditing={id} itemName="banner" />
      </div>
    </form>
  );
}
