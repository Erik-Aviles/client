"use client";

import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import SubmitButton from "../FormInputs/SubmitButton";
import TextInput from "../FormInputs/TextInput";

export default function LoginForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);

  async function onSubmit(data) {
    console.log(data);
    try {
      setLoading(true);
      console.log("Intentando iniciar sesión con credenciales:", data);
      const loginData = await signIn("credentials", {
        ...data,
        redirect: false,
      });
      console.log("Respuesta de inicio de sesión:", loginData);
      if (loginData?.error) {
        setLoading(false);
        toast.error("Error de inicio de sesión: Verifique sus credenciales");
      } else {
        // Sign-in was successful
        toast.success("Inicio de sesión exitoso");
        reset();
        router.push("/");
      }
    } catch (error) {
      setLoading(false);
      console.error("Error de red:", error);
      toast.error("Parece que algo anda mal con tu red.");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4 flex flex-col gap-3">
        {/* Correo */}
        <TextInput
          label="Correo electrónico"
          type="email"
          name="email"
          register={register}
          errors={errors}
          placeholder="name@company.com"
        />

        {/* Contraseña */}
        <TextInput
          label="Contraseña"
          type="password"
          name="password"
          register={register}
          errors={errors}
          placeholder="**********"
        />
      </div>

      <SubmitButton
        isLoading={loading}
        buttonTitle={"Iniciar sessión"}
        buttonLoading={"Ingresando..."}
        className="w-full text-white bg-amber-400 dark:bg-amber-500 focus:ring-amber-600 hover:bg-amber-500 hover:dark:bg-amber-400"
        withIcon={false}
      />
      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center flex-col text-xs">
          <p className="text-xs font-light text-slate-500 dark:text-slate-400">
            Has olvidado tu contraseña?
          </p>
          <Link
            href="/forgot-password"
            className="font-medium text-purple-600 hover:underline dark:text-purple-500"
          >
            Recuperala aquí
          </Link>
        </div>

        <div className="flex items-center flex-col text-xs">
          <p className="font-light text-slate-500 dark:text-slate-400">
            Aun no tienes una cuenta?
          </p>
          <Link
            href="/register"
            className="font-medium text-purple-600 hover:underline dark:text-purple-500"
          >
            Registrate aquí
          </Link>
        </div>
      </div>
    </form>
  );
}
