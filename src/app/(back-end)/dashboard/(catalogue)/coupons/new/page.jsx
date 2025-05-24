"use client";

import FormHeader from "@/components/backoffice/FormHeader";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import TextInput from "@/components/FormInputs/TextInput";
import ToggleInput from "@/components/FormInputs/ToggleInput";
import { makePostRequest } from "@/lib/apiRequest";
import { generateCouponCode } from "@/lib/generateCode";
import { parseISODate } from "@/lib/parseISODate";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

export default function NewCoupon({ initialData = {}, isUpdate = false }) {
  const [loading, setLoading] = useState(false);
  const datapath = "coupons";
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
    },
  });
  const title = watch("title");
  const expiryDate = watch("expiryDate");
  const isActive = watch("isActive");
  console.log(isActive);

  const couponCodeGenerated = useMemo(() => {
    if (
      title &&
      typeof title === "string" &&
      title.trim() !== "" &&
      expiryDate !== ""
    ) {
      return generateCouponCode(title, expiryDate);
    }
    return "";
  }, [title, expiryDate]);

  useEffect(() => {
    if (couponCodeGenerated) {
      setValue("couponCode", couponCodeGenerated);
    }
  }, [couponCodeGenerated, setValue]);

  async function onSubmit(data) {
    /* {
      id, 
      title, 
      couponCode, 
      expiryDate, 
      isActive,
    } */
    const formattedExpiryDate = parseISODate(expiryDate);
    data.expiryDate = formattedExpiryDate;
    console.log(data);
    makePostRequest(
      setLoading,
      `api/${datapath}`,
      data,
      "Cupon",
      reset,
      redirect
    );
  }

  return (
    <div>
      <FormHeader title={isUpdate ? "Actualizar cupones" : "Nuevo cupon"} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="dark:text-slate-100 text-slate-900 border border-border dark:bg-slate-800 rounded-lg p-4 sm:mx-6 md:mx-10 lg:mx-14 xl:mx-20 2xl:mx-24"
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
          <SubmitButton
            isLoading={loading}
            buttonTitle={isUpdate ? "Actualizar" : "Crear cupón"}
            buttonLoading={"Creando cupón..."}
          />
        </div>
      </form>
    </div>
  );
}
