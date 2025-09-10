"use client";

import { useMemo, useTransition } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import SubTitle3 from "../styledComponent/SubTitle3";
import { Controller, useForm } from "react-hook-form";
import TextInput from "@/components/FormInputs/TextInput";
import ImageInput from "@/components/FormInputs/ImageInput";
import { cleanEmptyFields } from "@/utils/cleanEmptyFields";
import ToggleInput from "@/components/FormInputs/ToggleInput";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import CancelButton from "@/components/FormInputs/CancelButton";
import { updateCustomer } from "@/app/(back-end)/dashboard/(users)/customers/actions";

export default function CustomerForm({ initialData = {}, currentRole = "" }) {
  const router = useRouter();
  const datapath = "customers";
  const customerProfile = initialData?.profile;

  const [isPending, startTransition] = useTransition();

  const defaultValues = useMemo(() => {
    return {
      firstName: initialData?.firstName || "",
      lastName: initialData?.lastName || "",
      email: initialData?.email || "",
      idDocument: initialData?.idDocument || "",
      role: initialData?.role || "USER",
      imageUrl: initialData?.imageUrl || "",

      // Campos del perfil
      isActive: customerProfile?.isActive ?? false,
      phone: customerProfile?.phone || "",
      address: customerProfile?.address || "",
      city: customerProfile?.city || "",
      province: customerProfile?.province || "",
      country: customerProfile?.country || "",
      zipCode: customerProfile?.zipCode || "",
      loyaltyPoints: customerProfile?.loyaltyPoints || 0,

      // Formatear dateOfBirth para input type="date"
      dateOfBirth: customerProfile?.dateOfBirth
        ? new Date(customerProfile.dateOfBirth).toISOString().split("T")[0]
        : "",
    };
  }, [initialData, customerProfile]);

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  const redirect = () => router.push(`/dashboard/${datapath}`);

  async function onSubmit(formValues) {
    const cleanedData = cleanEmptyFields(formValues) || {};
    startTransition(async () => {
      try {
        await updateCustomer(initialData?.id, cleanedData);
        toast.success("Cliente actualizado correctamente");
        redirect();
      } catch (err) {
        toast.error(err.message || "Error al actualizar el cliente");
      }
    });
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="h-max max-w-3xl mx-auto p-4 sm:p-6 md:p-8 rounded-lg border dark:border-slate-600 shadow-md dark:bg-slate-800 dark:text-slate-100 text-slate-900 bg-white"
    >
      {currentRole === "ADMIN" && (
        <ToggleInput
          label="Estado de cliente"
          name="isActive"
          isActive={watch("isActive")}
          trueTitle="Activo"
          falseTitle="Inactivo"
          register={register}
        />
      )}
      <section>
        <SubTitle3 title="Datos personales" className="text-amber-500" />
        <div className="grid gap-4 border-b pt-2 pb-6 dark:border-slate-700 sm:px-4 mb-4 sm:grid-cols-2 sm:gap-6">
          <TextInput
            label="Nombres"
            name="firstName"
            register={register}
            errors={errors}
            className="w-full"
          />
          <TextInput
            label="Apellidos"
            name="lastName"
            register={register}
            className="w-full"
            errors={errors}
          />
        </div>
      </section>
      <section>
        <SubTitle3 title="Contacto" className="text-amber-500" />
        <div className="grid gap-4 border-b pt-2 pb-6 dark:border-slate-700 sm:px-4 mb-4 sm:grid-cols-2 sm:gap-6">
          <TextInput
            label="Correo Electrónico"
            name="email"
            register={register}
            errors={errors}
            className="w-full"
          />
          <TextInput
            label="Documento de identificación"
            name="idDocument"
            register={register}
            errors={errors}
            className="w-full"
          />
          <TextInput
            label="Fecha de nacimiento"
            name="dateOfBirth"
            register={register}
            errors={errors}
            type="date"
            className="w-full"
            isRequired={false}
          />
          <TextInput
            label="Teléfono"
            name="phone"
            type="tel"
            register={register}
            errors={errors}
            className="w-full"
            isRequired={false}
          />
        </div>
      </section>
      <section>
        <SubTitle3 title="Dirección" className="text-amber-500" />
        <div className="grid gap-4 border-b pt-2 pb-6 dark:border-slate-700 sm:px-4 mb-4 sm:grid-cols-2 sm:gap-6">
          <TextInput
            label="Calle y número"
            name="address"
            register={register}
            errors={errors}
            className="w-full"
            isRequired={false}
          />
          <TextInput
            label="Ciudad"
            name="city"
            register={register}
            errors={errors}
            isRequired={false}
            className="w-full"
          />{" "}
          <TextInput
            label="Provincia"
            name="province"
            register={register}
            errors={errors}
            isRequired={false}
            className="w-full"
          />{" "}
          <TextInput
            label="País"
            name="country"
            register={register}
            errors={errors}
            isRequired={false}
            className="w-full"
          />
          <TextInput
            label="Código Postal"
            name="zipCode"
            register={register}
            errors={errors}
            isRequired={false}
            className="w-full"
          />
        </div>
      </section>
      <section>
        <SubTitle3 title="Imagen" className="text-amber-500" />
        <div className="px-4 pt-2 mb-4">
          <Controller
            control={control}
            name="imageUrl"
            render={({ field }) => (
              <ImageInput
                {...field}
                setImageUrl={field.onChange}
                imageUrl={field.value}
                endpoint="customerImageUploader"
                label="Fotografía del usuario"
              />
            )}
          />
        </div>
      </section>
      <div className="sm:col-span-2 flex gap-3 justify-end py-4">
        <CancelButton onClick={() => router.back()} />
        <SubmitButton
          isLoading={isPending}
          isEditing={true}
          itemName="cliente"
        />
      </div>
    </form>
  );
}
