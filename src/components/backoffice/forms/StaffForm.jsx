"use client";

import { useEffect, useMemo, useTransition } from "react";
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
import {
  createStaff,
  updateStaff,
} from "@/app/(back-end)/dashboard/(users)/staff/actions";
import TextareaInput from "@/components/FormInputs/TextareaInput";
import { generatePersonCode } from "@/lib/generateCode";
import { companyData } from "@/utils/general/companyData";

export default function StaffForm({
  initialData = {},
  currentRole = "MODERATOR",
  currentUserId, // 👈 lo pasas desde el server component (id del user logueado)
}) {
  const router = useRouter();
  const datapath = "staff";
  const staffProfile = initialData?.staffProfile;

  const [isPending, startTransition] = useTransition();

  const defaultValues = useMemo(() => {
    return {
      firstName: initialData?.firstName || "",
      lastName: initialData?.lastName || "",
      email: initialData?.email || "",
      idDocument: initialData?.idDocument || "",
      role: initialData?.role || "MODERATOR",
      imageUrl: initialData?.imageUrl || "",

      // Campos del perfil
      isActive: staffProfile?.isActive ?? false,
      codeUser: staffProfile?.codeUser || "",
      phone: staffProfile?.phone || "",
      streetAddress: staffProfile?.streetAddress || "",
      notes: staffProfile?.notes || "",
      workScope: staffProfile?.workScope || "",
      dob: staffProfile?.dob
        ? new Date(staffProfile.dob).toISOString().split("T")[0]
        : "",

      password: "",
      confirmPassword: "",
    };
  }, [initialData, staffProfile]);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm({ defaultValues });

  const firstName = watch("firstName");
  const lastName = watch("lastName");
  const idDocument = watch("idDocument");
  const role = watch("role");

  useEffect(() => {
    if (firstName && lastName && idDocument) {
      const newCode = generatePersonCode(
        companyData.name || "MyCompany",
        `${firstName} ${lastName}`,
        idDocument,
        role || "MODERATOR"
      );
      setValue("codeUser", newCode, { shouldValidate: true });
    }
  }, [firstName, lastName, idDocument, role, setValue]);

  const redirect = () => router.push(`/dashboard/${datapath}`);

  async function onSubmit(formValues) {
    const cleanedData = cleanEmptyFields(formValues) || {};

    const isCreating = !initialData?.id;
    const wantsPasswordChange =
      cleanedData.password || cleanedData.confirmPassword;

    if (isCreating || wantsPasswordChange) {
      if (!cleanedData.password || !cleanedData.confirmPassword) {
        toast.error("Debe ingresar la contraseña y confirmarla");
        return;
      }
      if (cleanedData.password !== cleanedData.confirmPassword) {
        toast.error("Las contraseñas no coinciden");
        return;
      }
    }

    startTransition(async () => {
      try {
        let staff;

        if (initialData?.id) {
          staff = await updateStaff(initialData.id, cleanedData);
          if (staff.success) {
            toast.success(
              staff.message || "Personal actualizado correctamente"
            );
          } else {
            toast.error(staff.message || "Error al actualizar");
          }
        } else {
          staff = await createStaff(cleanedData);
          if (staff.success) {
            toast.success(staff.message || "Personal creado correctamente");
          } else {
            toast.error(staff.message || "Error al crear");
          }
        }

        if (staff.success) redirect();
      } catch (err) {
        toast.error(err.message || "Error al guardar el personal");
      }
    });
  }

  const showPasswordFields =
    !initialData?.id ||
    currentRole === "ADMIN" ||
    currentUserId === initialData?.id;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="h-max max-w-3xl mx-auto p-4 sm:p-6 md:p-8 rounded-lg border dark:border-slate-600 shadow-md dark:bg-slate-800 dark:text-slate-100 text-slate-900 bg-white"
    >
      {/* Estado del personal */}
      {currentRole === "ADMIN" && (
        <ToggleInput
          label="Estado del personal"
          name="isActive"
          isActive={watch("isActive")}
          trueTitle="Activo"
          falseTitle="Inactivo"
          register={register}
        />
      )}

      {/* Datos personales */}
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
            name="dob"
            type="date"
            register={register}
            errors={errors}
            className="w-full"
          />
          <TextInput
            label="Teléfono"
            name="phone"
            type="tel"
            register={register}
            errors={errors}
            className="w-full"
          />
        </div>
      </section>

      {/* Credenciales de acceso */}
      <section>
        <SubTitle3 title="Credenciales de acceso" className="text-amber-500" />
        <div className="grid gap-4 border-b pt-2 pb-6 dark:border-slate-700 sm:px-4 mb-4 sm:grid-cols-2 sm:gap-6">
          <TextInput
            label="Correo Electrónico"
            name="email"
            type="email"
            register={register}
            errors={errors}
          />

          {showPasswordFields && (
            <>
              <TextInput
                label="Contraseña"
                name="password"
                type="password"
                register={register}
                errors={errors}
                className="w-full"
                isRequired={!!initialData?.id ? false : true}
              />
              <TextInput
                label="Confirmar Contraseña"
                name="confirmPassword"
                type="password"
                register={register}
                errors={errors}
                className="w-full"
                isRequired={!!initialData?.id ? false : true}
              />
            </>
          )}
        </div>
      </section>

      {/* Dirección */}
      <section>
        <SubTitle3 title="Dirección" className="text-amber-500" />
        <div className="grid gap-4 border-b pt-2 pb-6 dark:border-slate-700 sm:px-4 mb-4 sm:grid-cols-2 sm:gap-6">
          <TextInput
            label="Dirección completa"
            name="streetAddress"
            register={register}
            errors={errors}
            placeholder="Calle, número, departamento, ciudad, provincia, etc."
            isRequired={false}
          />
        </div>
      </section>

      {/* Datos laborales */}
      <section>
        <SubTitle3 title="Datos laborales" className="text-amber-500" />
        <div className="grid gap-4 border-b pt-2 pb-6 dark:border-slate-700 sm:px-4 mb-4 sm:grid-cols-2 sm:gap-6">
          <TextInput
            label="Código interno"
            name="codeUser"
            register={register}
            errors={errors}
            className="w-full"
          />
          <TextInput
            label="Área de trabajo"
            name="workScope"
            register={register}
            errors={errors}
            className="w-full"
          />
          <TextareaInput
            label="Notas"
            name="notes"
            register={register}
            errors={errors}
            isRequired={false}
          />
        </div>
      </section>

      {/* Imagen */}
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
                endpoint="staffImageUploader"
                label="Fotografía del personal"
              />
            )}
          />
        </div>
      </section>

      {/* Botones de acción */}
      <div className="sm:col-span-2 flex gap-3 justify-end py-4">
        <CancelButton onClick={() => router.back()} />
        <SubmitButton
          isLoading={isPending}
          isEditing={!!initialData?.id}
          itemName="personal"
        />
      </div>
    </form>
  );
}
