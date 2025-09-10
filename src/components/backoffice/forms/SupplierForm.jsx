"use client";

import { useEffect, useMemo, useTransition } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import SubTitle3 from "../styledComponent/SubTitle3";
import { Controller, useForm } from "react-hook-form";
import { generatePersonCode } from "@/lib/generateCode";
import { companyData } from "@/utils/general/companyData";
import TextInput from "@/components/FormInputs/TextInput";
import ImageInput from "@/components/FormInputs/ImageInput";
import { cleanEmptyFields } from "@/utils/cleanEmptyFields";
import ToggleInput from "@/components/FormInputs/ToggleInput";
import ArrayItemsInput from "../../FormInputs/ArrayItemsInput";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import CancelButton from "@/components/FormInputs/CancelButton";
import TextareaInput from "@/components/FormInputs/TextareaInput";
import {
  createSupplier,
  updateSupplier,
} from "@/app/(back-end)/dashboard/(users)/suppliers/actions";

export default function SupplierForm({ initialData = {}, currentRole = "" }) {
  const router = useRouter();
  const datapath = "suppliers";
  const supplierProfile = initialData?.supplierProfile;

  const [isPending, startTransition] = useTransition();

  const defaultValues = useMemo(
    () => ({
      firstName: initialData?.firstName || "",
      lastName: initialData?.lastName || "",
      email: initialData?.email || "",
      idDocument: initialData?.idDocument || "",
      role: initialData?.role || "SUPPLIER",
      imageUrl: initialData?.imageUrl || "",

      // Perfil del proveedor
      isActive: supplierProfile?.isActive ?? false,
      name: supplierProfile?.name || "",
      phone: supplierProfile?.phone || "",
      address: supplierProfile?.address || "",
      contactPerson: supplierProfile?.contactPerson || "",
      contactPersonPhone: supplierProfile?.contactPersonPhone || "",
      products: supplierProfile?.products || [],
      paymentTerms: supplierProfile?.paymentTerms || "",
      notes: supplierProfile?.notes || "",

      // Imágenes

      logoUrl: supplierProfile?.logoUrl || "",

      // Código inicial (si ya existe en la BD)
      codeSupplier: supplierProfile?.codeSupplier || "",
    }),
    [initialData, supplierProfile]
  );

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm({ defaultValues });

  /** Campos observados para regenerar el código */
  const firstName = watch("firstName");
  const lastName = watch("lastName");
  const idDocument = watch("idDocument");
  const role = watch("role");

  /** Generar código dinámico cuando cambian los datos clave */
  useEffect(() => {
    if (firstName && lastName && idDocument) {
      const newCode = generatePersonCode(
        companyData.name || "MyCompany",
        `${firstName} ${lastName}`,
        idDocument,
        role || "SUPPLIER"
      );
      setValue("codeSupplier", newCode, { shouldValidate: true });
    }
  }, [firstName, lastName, idDocument, role, setValue]);

  const redirect = () => router.push(`/dashboard/${datapath}`);

  async function onSubmit(formValues) {
    // Preparar payload y limpiar campos vacíos
    const payload = {
      ...formValues,
      userId: initialData?.id, // siempre existe, indica si es usuario existente
    };
    const cleanedData = cleanEmptyFields(payload) || {};

    startTransition(async () => {
      try {
        let response;

        if (supplierProfile?.userId) {
          // Si ya existe un perfil de proveedor, se trata de actualizar
          response = await updateSupplier(supplierProfile.userId, cleanedData);
        } else {
          // Si no existe, crear un nuevo proveedor
          response = await createSupplier(cleanedData);
        }

        if (response.success) {
          toast.success(response.message || "Operación exitosa");
          redirect();
        } else {
          toast.error(response.message || "Error al guardar el proveedor");
        }
      } catch (err) {
        toast.error(err.message || "Error inesperado al guardar el proveedor");
      }
    });
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="dark:text-slate-100 text-slate-900 dark:bg-slate-800 rounded-lg pt-4 px-4 my-2 sm:mx-6 md:mx-10 lg:mx-14 xl:mx-20 2xl:mx-24"
    >
      {currentRole === "ADMIN" && (
        <ToggleInput
          label="Estado del proveedor"
          name="isActive"
          isActive={watch("isActive")}
          trueTitle="Activo"
          falseTitle="Inactivo"
          register={register}
        />
      )}

      <section>
        <SubTitle3 title="Datos básicos" className="text-amber-500" />
        <div className="grid gap-4 border-b pt-2 pb-6 dark:border-slate-700 mb-4 sm:grid-cols-2 sm:gap-6">
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
            label="Código (auto-generado)"
            name="codeSupplier"
            register={register}
            readOnly
            errors={errors}
            className="w-full"
          />
          <TextInput
            label="Nombre de la empresa"
            name="name"
            register={register}
            errors={errors}
            className="w-full"
          />
          {currentRole === "ADMIN" && (
            <TextInput
              label="Correo Electrónico"
              name="email"
              register={register}
              errors={errors}
              className="w-full"
            />
          )}
        </div>
      </section>

      <section>
        <SubTitle3 title="Contacto" className="text-amber-500" />
        <div className="grid gap-4 border-b pt-2 pb-6 dark:border-slate-700 mb-4 sm:grid-cols-2 sm:gap-6">
          <TextInput
            label="Teléfono de la empresa"
            name="phone"
            type="tel"
            register={register}
            errors={errors}
            className="w-full"
          />
          <TextInput
            label="Dirección de la empresa"
            name="address"
            register={register}
            errors={errors}
            isRequired={false}
            className="w-full"
          />
          <TextInput
            label="Nombre de contacto"
            name="contactPerson"
            register={register}
            errors={errors}
            isRequired={false}
            className="w-full"
          />
          <TextInput
            label="Teléfono de contacto"
            name="contactPersonPhone"
            type="tel"
            register={register}
            errors={errors}
            isRequired={false}
            className="w-full"
          />
        </div>
      </section>

      <section>
        <SubTitle3 title="Productos y notas" className="text-amber-500" />
        <div className="grid gap-4 border-b pt-2 pb-6 dark:border-slate-700 mb-4">
          <Controller
            control={control}
            name="products"
            render={({ field }) => (
              <ArrayItemsInput
                {...field}
                setItems={field.onChange}
                items={field.value}
                itemTitle="Producto"
              />
            )}
          />
          <TextareaInput
            label="Condiciones de pago"
            name="paymentTerms"
            register={register}
            errors={errors}
            isRequired={false}
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

      <section>
        <SubTitle3 title="Imágenes" className="text-amber-500" />
        <div className="px-4 pt-2 mb-4 flex flex-col md:flex-row gap-6">
          <div className="basis-1/2">
            <Controller
              control={control}
              name="imageUrl"
              render={({ field }) => (
                <ImageInput
                  {...field}
                  setImageUrl={field.onChange}
                  imageUrl={field.value}
                  endpoint="supplierImageUploader"
                  label="Foto del proveedor"
                />
              )}
            />
          </div>
          <div className="basis-1/2">
            <Controller
              control={control}
              name="logoUrl"
              render={({ field }) => (
                <ImageInput
                  {...field}
                  setImageUrl={field.onChange}
                  imageUrl={field.value}
                  endpoint="supplierLogoUploader"
                  label="Logo de la empresa"
                />
              )}
            />
          </div>
        </div>
      </section>

      <div className="sm:col-span-2 flex gap-3 justify-end py-4">
        <CancelButton onClick={() => router.back()} />
        <SubmitButton
          isLoading={isPending}
          isEditing={true}
          itemName="proveedor"
        />
      </div>
    </form>
  );
}
