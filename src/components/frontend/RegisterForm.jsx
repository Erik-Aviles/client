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

export default function RegisterForm({ role = "USER" }) {
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
          label="Nombre completo"
          name="name"
          register={register}
          errors={errors}
        />
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
        buttonTitle={"Registrarse"}
        buttonLoading={"Creando, por favor espere..."}
        className="w-full"
      />
      {/*    <div className="flex items-center ">
        <div className="w-full bg-slate-500 h-[1px]"></div>
        <span className="mx-2">or</span>
        <div className="w-full bg-slate-500 h-[1px]"></div>
      </div>
    <div className="">
        <button
          type="button"
          //   onClick={() => signIn("google")}
          className="w-full text-slate-950 bg-white hover:bg-slate-50 focus:ring-4 focus:outline-none focus:ring-slate-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center justify-center flex items-center dark:focus:ring-slate-100 me-2 mb-4 border border-slate-200"
        >
         <FaGoogle className="mr-2 text-red-600 w-4 h-4" /> 
          Registrarse con Google
        </button>
      </div> */}
      <p className="text-sm font-light text-gray-500 dark:text-gray-400 mt-3">
        Ya tienes una cuenta?{" "}
        <Link
          href="/login"
          className="font-medium text-purple-600 hover:underline dark:text-purple-500"
        >
          Iniciar sesión
        </Link>
      </p>
    </form>
  );
}
