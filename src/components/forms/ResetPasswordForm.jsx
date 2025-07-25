"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import TextInput from "../FormInputs/TextInput";
import { useSearchParams } from "next/navigation";
import SubmitButton from "../FormInputs/SubmitButton";

export default function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");
  const id = searchParams.get("id");
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);

  async function onSubmit(data) {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    data.token = token;
    data.id = id;

    if (data.password !== data.confirmPassword) {
      setError("confirmPassword", {
        type: "manual",
        message: "Las contraseñas no coinciden",
      });
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${baseUrl}/api/users/update-password`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const resData = await response.json();

      if (response.ok) {
        router.push("/login");
        toast.success(resData?.message || "Contraseña actualizada ");
      } else {
        toast.error(resData?.message || "Algo salió mal.");
        router.push("/");
      }
    } catch (error) {
      console.error("Error de red:", error);
      toast.error("Parece que algo anda mal con tu red.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4 flex flex-col gap-3">
        {/* Nueva contraseña */}
        <TextInput
          label="Nueva contraseña"
          type="password"
          name="password"
          register={register}
          errors={errors}
          placeholder="Ingresa la Nueva contraseña"
        />
        <TextInput
          label="Repetir contraseña"
          type="password"
          name="confirmPassword"
          register={register}
          errors={errors}
          placeholder="Confirma la contraseña"
        />
      </div>
      <SubmitButton
        isLoading={loading}
        buttonTitle={"Restablecer contraseña"}
        buttonLoading={"Actualizando..."}
        className="w-full text-white bg-amber-400 dark:bg-amber-500 focus:ring-amber-600 hover:bg-amber-500 hover:dark:bg-amber-400"
        withIcon={false}
      />
    </form>
  );
}
