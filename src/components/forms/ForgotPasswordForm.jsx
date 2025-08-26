"use client";

import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { Alert } from "flowbite-react";
import { useForm } from "react-hook-form";
import { HiInformationCircle } from "react-icons/hi";
import TextInput from "@/components/FormInputs/TextInput";
import SubmitButton from "@/components/FormInputs/SubmitButton";

export default function ForgotPasswordForm() {
  const [showNotification, setShowNotification] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);

  async function onSubmit(data) {
    try {
      setLoading(true);
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

      const response = await fetch(`${baseUrl}/api/users/forgot-password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        setLoading(false);
        setShowNotification(true);
        reset();
        toast.success(
          "Enlace de restablecimiento de contraseña enviado correctamente"
        );
      } else {
        setLoading(false);
        toast.error(response?.statusText || "Something Went wrong");
      }
    } catch (error) {
      setLoading(false);
      console.error("Error de red:", error);
      toast.error("Parece que algo anda mal con tu red.");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {showNotification && (
        <Alert color="failure" icon={HiInformationCircle}>
          <span className="font-medium">
            Por favor revise su correo electrónico!
          </span>{" "}
          Le hemos enviado un enlace para restablecer su contraseña. Haga clic
          en él para crear una nueva.
        </Alert>
      )}
      <div className="my-4 flex flex-col gap-3">
        {/* Correo */}
        <TextInput
          label="Correo electrónico"
          type="email"
          name="email"
          register={register}
          errors={errors}
          placeholder="name@company.com"
          readOnly={showNotification}
        />
      </div>

      <SubmitButton
        isLoading={loading}
        buttonTitle={"Enviar enlace"}
        buttonLoading={"Enviando..."}
        className="w-full text-white bg-amber-400 dark:bg-amber-500 focus:ring-amber-600 hover:bg-amber-500 hover:dark:bg-amber-400"
        withIcon={false}
        disabled={showNotification}
      />
      <div className="flex items-center text-xs gap-1 pt-3">
        <p className="font-light text-slate-500 dark:text-slate-400">
          ¿Recuerdas tu contraseña?
        </p>
        <Link
          href="/login"
          className="font-medium text-purple-600 hover:underline dark:text-purple-500"
        >
          Inicia sesion
        </Link>
      </div>
    </form>
  );
}
