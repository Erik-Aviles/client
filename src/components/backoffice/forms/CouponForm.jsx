"use client";

import React, { useEffect, useRef, useState } from "react";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import TextInput from "@/components/FormInputs/TextInput";
import ToggleInput from "@/components/FormInputs/ToggleInput";
import { makePostRequest, makePutRequest } from "@/lib/apiRequest";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import CancelButton from "@/components/FormInputs/CancelButton";
import { generateCouponCode } from "@/lib/generateCode";
import { parseISODate } from "@/lib/parseISODate";
import { useSession } from "next-auth/react";

export default function CouponForm({ initialData = {} }) {
  const { data: session, status } = useSession();
  const vendorId = session?.user?.id;
  const router = useRouter();

  const datapath = "coupons";
  const id = initialData?.id ?? "";
  const [loading, setLoading] = useState(false);

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
      ...(initialData || {}),
      expiryDate: initialData?.expiryDate
        ? new Date(initialData.expiryDate).toISOString().split("T")[0]
        : "",
    },
  });

  const title = watch("title");
  const expiryDate = watch("expiryDate");
  const isActive = watch("isActive");
  const couponCode = watch("couponCode");

  const originalTitle = useRef(initialData?.title ?? "");
  const originalExpiryDate = useRef(
    initialData?.expiryDate
      ? new Date(initialData.expiryDate).toISOString().split("T")[0]
      : ""
  );
  useEffect(() => {
    const titleChanged = title !== originalTitle.current;
    const expiryChanged = expiryDate !== originalExpiryDate.current;

    if (
      (titleChanged || expiryChanged) &&
      title?.trim() &&
      expiryDate?.trim()
    ) {
      const newCode = generateCouponCode(title, expiryDate);
      if (newCode !== couponCode) {
        setValue("couponCode", newCode);
      }
    }
  }, [title, expiryDate, couponCode, setValue]);

  async function onSubmit(data) {
    /* {id, title, couponCode, expiryDate, isActive} */
    data.expiryDate = parseISODate(expiryDate);
    data.vendorId = vendorId;
    console.log("Datos del cupón:", data);

    const isUpdating = !!data.id;
    const requestFn = isUpdating ? makePutRequest : makePostRequest;
    const endpoint = isUpdating
      ? `api/${datapath}/${data.id}`
      : `api/${datapath}`;

    requestFn(
      setLoading,
      endpoint,
      data,
      "Cupón",
      redirect,
      isUpdating ? null : reset
    );
  }

  if (status === "loading") {
    return <p>Cargando...</p>;
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="dark:text-slate-100 text-slate-900 border border-border dark:bg-slate-800 rounded-lg pt-4 px-4 my-2 mx-4 sm:mx-6 md:mx-10 lg:mx-14 xl:mx-20 2xl:mx-24"
    >
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        <ToggleInput
          label="Estado del cupón"
          name="isActive"
          isActive={isActive}
          trueTitle="Activo"
          falseTitle="Inactivo"
          register={register}
        />
        <TextInput
          label="Nombre de la campaña"
          name="title"
          register={register}
          errors={errors}
          className="w-full"
        />
        <TextInput
          type="number"
          label="Valor del cupón"
          name="value"
          register={register}
          errors={errors}
          className="w-full"
        />

        <TextInput
          label="Fecha de expiración"
          name="expiryDate"
          register={register}
          errors={errors}
          type="date"
          className="w-full"
        />
        <TextInput
          label="Código de la campaña"
          name="couponCode"
          register={register}
          errors={errors}
          readOnly={true}
          className="w-full"
        />
      </div>
      <div className="sm:col-span-2 flex gap-3 justify-end py-4">
        <CancelButton onClick={redirect} />
        <SubmitButton isLoading={loading} isEditing={id} itemName="cupón" />
      </div>
    </form>
  );
}
