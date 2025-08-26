"use client";

import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import TextInput from "@/components/FormInputs/TextInput";
import SubmitButton from "@/components/FormInputs/SubmitButton";

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
      setLoading(true);
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

      const response = await fetch(`${baseUrl}/api/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, role }),
      });

      const responseData = await response.json();
      
      if (response.ok) {
        setLoading(false);
        reset();
        
        if (role === "SUPPLIER") {
          router.push(`/verify-email`);
        } else if (role === "USER") {
          const loginData = await signIn("credentials", {
            email: data.email,
            password: data.password,
            redirect: false,
          });
          
          if (loginData?.error) {
            setLoading(false);
            toast.error(
              "Error de inicio de sesión: Verifique sus credenciales"
            );
          } else {
            toast.success("Usuario creado correctamente");
            toast.success("Inicio de sesión exitoso");
            router.push("/");
          }
        }
      } else {
        setLoading(false);
        if (response.status === 409) {
          setEmailErr("Usuario con este correo ya existe.");
        } else {
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4 flex flex-col gap-3">
        <TextInput
          label="Nombre"
          name="firstName"
          register={register}
          errors={errors}
        />
        <TextInput
          label="Apellido"
          name="lastName"
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
        className="w-full text-white bg-amber-400 dark:bg-amber-500 focus:ring-amber-600 hover:bg-amber-500 hover:dark:bg-amber-400"
        withIcon={false}
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
      <div className="flex justify-between text-xs mt-3">
        <p className="flex items-center flex-col sm:flex-row justify-center sm:gap-1 font-light text-slate-500 dark:text-slate-400">
          Ya tienes una cuenta?{" "}
          <Link
            href="/login"
            className="font-medium text-purple-600 hover:underline dark:text-purple-500"
          >
            Iniciar sesión
          </Link>
        </p>
        {role === "SUPPLIER" ? (
          <p className="flex items-center flex-col sm:flex-row justify-center sm:gap-1 font-light text-slate-500 dark:text-slate-400">
            Eres un usuario?{" "}
            <Link
              href="/register"
              className="font-medium text-purple-600 hover:underline dark:text-purple-500"
            >
              Registate aqui
            </Link>
          </p>
        ) : (
          <p className="flex items-center flex-col sm:flex-row justify-center sm:gap-1 font-light text-slate-500 dark:text-slate-400">
            Eres un proveedor?{" "}
            <Link
              href="/register-supplier"
              className="font-medium text-purple-600 hover:underline dark:text-purple-500"
            >
              Registrate aquí
            </Link>
          </p>
        )}
      </div>
    </form>
  );
}
