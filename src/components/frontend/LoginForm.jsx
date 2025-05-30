"use client";

// import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import SubmitButton from "../FormInputs/SubmitButton";
import TextInput from "../FormInputs/TextInput";
// import { FaGithub, FaGoogle } from "react-icons/fa";

export default function LoginForm({ role = "USER" }) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      role: role,
    },
  });
  const [loading, setLoading] = useState(false);
  const [emailErr, setEmailErr] = useState("");

  async function onSubmit(data) {
    try {
      console.log(data);
      setLoading(true);
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      const response = await fetch(`${baseUrl}/api/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      if (response.ok) {
        console.log("Usuario creado:", responseData);
        setLoading(false);
        toast.success("Usuario crerado correctamente");
        reset();
        if (role === "USER") {
          router.push("/");
        } else {
          router.push(`onboarding/${responseData?.data?.id}`);
        }
      } else {
        setLoading(false);
        if (response.status === 409) {
          setEmailErr("Usuario con este correo ya existe.");
          toast.error("Usuario con este correo ya existe.");
        } else {
          // Handle other errors
          console.error("Error del servidor:", responseData.error);
          toast.error("Oops Algo salió mal");
        }
      }
    } catch (error) {
      setLoading(false);
      console.error("Error de red:", error);
      toast.error("Algo salió mal, Porfavor intente de nuevo");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="">
      <div className="mb-4 flex flex-col gap-3">
        <TextInput
          label="Correo electrónico"
          name="email"
          register={register}
          errors={errors}
        />
        {emailErr && <small className="text-red-500 text-xs">{emailErr}</small>}
        <TextInput
          label="Contraseña"
          name="password"
          type="password"
          register={register}
          errors={errors}
        />
      </div>
      <SubmitButton
        isLoading={loading}
        buttonTitle={"Iniciar sessión"}
        buttonLoading={"Ingresando, por favor espere..."}
        className="w-full"
      />
      <p className="text-sm font-light text-gray-500 dark:text-gray-400 mt-3">
        No tienes una cuenta?{" "}
        <Link
          href="/register"
          className="font-medium text-purple-600 hover:underline dark:text-purple-500"
        >
          Registrate aquí
        </Link>
      </p>
    </form>
  );
}
