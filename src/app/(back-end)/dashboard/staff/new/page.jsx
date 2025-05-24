"use client";

import FormHeader from "@/components/backoffice/FormHeader";
import ImageInput from "@/components/FormInputs/ImageInput";
import SelectInput from "@/components/FormInputs/SelectInput";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import TextareaInput from "@/components/FormInputs/TextareaInput";
import TextInput from "@/components/FormInputs/TextInput";
import ToggleInput from "@/components/FormInputs/ToggleInput";
import { makePostRequest } from "@/lib/apiRequest";
import { generatePersonCode } from "@/lib/generateCode";
import { companyData, userRole } from "@/utils/general/companyData";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

export default function NewStaff({ initialData = {}, isUpdate = false }) {
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const nameCompany = companyData?.name;
  const datapath = "staffs";
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

  const isActive = watch("isActive");
  const name = watch("name");
  const idDocument = watch("idDocument");
  const role = watch("role");

  const staffCodeGenerated = useMemo(() => {
    if (
      name &&
      typeof name === "string" &&
      name.trim() !== "" &&
      idDocument !== "" &&
      role !== ""
    ) {
      return generatePersonCode(nameCompany, name, idDocument, role);
    }
    return "";
  }, [name, idDocument]);

  useEffect(() => {
    if (staffCodeGenerated) {
      setValue("codeStaff", staffCodeGenerated);
    }
  }, [staffCodeGenerated, setValue]);

  async function onSubmit(data) {
    /* {id, name, idDocument, codeUser, role, password, email, phone, address, dob, notes, workScope, imageUrl, isActive,} */
    data.imageUrl = imageUrl;
    console.log(data);
    makePostRequest(
      setLoading,
      `api/${datapath}`,
      data,
      "Colaborador",
      reset,
      redirect
    );
  }

  return (
    <div>
      <FormHeader
        title={isUpdate ? "Actualizar Colaborador" : "Nuevo Colaborador"}
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="dark:text-slate-100 text-slate-900 border border-border dark:bg-slate-800 rounded-lg p-4 sm:mx-6 md:mx-10 lg:mx-14 xl:mx-20 2xl:mx-24"
      >
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <ToggleInput
            label="Estado del Colaborador"
            name="isActive"
            isActive={isActive}
            trueTitle="Activo"
            falseTitle="Inactivo"
            register={register}
          />
          <TextInput
            label="Nombre completo"
            name="name"
            register={register}
            errors={errors}
          />
          <TextInput
            label="Documento de identificación"
            name="idDocument"
            register={register}
            errors={errors}
            className="w-full"
          />
          <SelectInput
            label="seleccionar cargo"
            name="role"
            register={register}
            errors={errors}
            className="w-full"
            options={userRole}
          />
          <TextInput
            label="Fecha de nacimiento"
            name="dob"
            type="date"
            register={register}
            errors={errors}
            className="w-full"
            isRequired={false}
          />
          <TextInput
            label="Correo"
            name="email"
            type="email"
            register={register}
            errors={errors}
            className="w-full"
          />
          <TextInput
            label="Contraseña"
            name="password"
            type="password"
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

          <TextInput
            label="Dirección"
            name="address"
            register={register}
            errors={errors}
            className="w-full"
            isRequired={false}
          />

          <TextareaInput
            label="Notas"
            name="notes"
            register={register}
            errors={errors}
            isRequired={false}
          />
          <TextareaInput
            label="Alcance del trabajo"
            name="workScope"
            register={register}
            errors={errors}
            isRequired={false}
          />

          <ImageInput
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            endpoint="staffImageUploader"
            label="Foto del colaborador"
          />
        </div>

        <div className="sm:col-span-2 flex gap-3 justify-end py-4">
          <SubmitButton
            isLoading={loading}
            buttonTitle={isUpdate ? "Actualizar" : "Crear personal"}
            buttonLoading={"Creando personal..."}
          />
        </div>
      </form>
    </div>
  );
}
