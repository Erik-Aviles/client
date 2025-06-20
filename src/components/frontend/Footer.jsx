"use client";
import { companyData } from "@/utils/general/companyData";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { SocialLinks } from "../SocialLinks";
import FooterLinks from "./FooterLinks";
import TextInput from "../FormInputs/TextInput";
import { useForm } from "react-hook-form";
import SubmitButton from "../FormInputs/SubmitButton";

const Footer = () => {
  const nameCompany = companyData?.name || "Mi Compañía";
  const logo = companyData?.logo || "/logo.png";
  const [loading, setLoading] = useState(false);

  const socialMedia = companyData?.socialMedia || [];
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  async function onSubmit(data) {
    alert("Suscripción exitosa");
    // try {
    //   console.log(data);
    //   const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    //   const response = await fetch(`${baseUrl}/api/newsletter`, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(data),
    //   });

    //   if (response.ok) {
    //     reset();
    //   } else {
    //     const errorData = await response.json();
    //     alert(`Error: ${errorData.message}`);
    //   }
    // } catch (error) {
    //   console.error("Error al enviar el formulario:", error);
    //   alert("Oops, algo salió mal. Inténtalo de nuevo más tarde.");
    // }
  }

  return (
    <>
      <section className="py-10 bg-gray-50 dark:bg-slate-800 sm:pt-16 lg:pt-24">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-2 md:col-span-3 lg:grid-cols-6 gap-y-16 lg:gap-x-12">
            <div className="col-span-2 md:col-span-3 lg:col-span-2 lg:pr-8">
              <div className="flex items-center gap-1">
                <Image
                  width={100}
                  height={100}
                  className="w-auto h-9"
                  src={logo}
                  alt={`logo de ${nameCompany}`}
                />
                <span className="self-center  text-2xl font-semibold whitespace-nowrap dark:text-white">
                  {nameCompany}
                </span>
              </div>

              <p className="text-base leading-relaxed  text-slate-600 dark:text-slate-400 mt-7">
                Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                amet sint. Velit officia consequat duis enim velit mollit.
              </p>
              <div className="mt-7 text-sm font-semibold tracking-widest text-gray-400 uppercase transition-all duration-200">
                Metodo de pago aceptados
                <ul className="flex items-center space-x-3 mt-2">
                  <li>
                    <div className="flex items-center justify-center text-slate-800 transition-all duration-200 bg-white rounded-full w-8 h-8 ">
                      {/* Visa */}
                      <svg
                        className="w-5 h-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 38 24"
                        fill="currentColor"
                      >
                        <text
                          x="0"
                          y="17"
                          fontSize="15"
                          fill="blue"
                          fontFamily="Arial, sans-serif"
                        >
                          VISA
                        </text>
                      </svg>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center justify-center text-slate-800 transition-all duration-200 bg-white rounded-full w-7 h-7 ">
                      {/* Mastercard */}
                      <svg
                        className="w-4 h-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 38 24"
                        fill="currentColor"
                      >
                        <circle cx="12" cy="12" r="8" fill="red" />
                        <circle
                          cx="26"
                          cy="12"
                          r="8"
                          fill="orange"
                          fillOpacity="0.8"
                        />
                      </svg>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold tracking-widest text-gray-400 uppercase">
                Empresa
              </p>

              <ul className="mt-6 space-y-4">
                <FooterLinks title="About" href="#" />
                <FooterLinks title="Features" href="#" />
                <FooterLinks title="Works" href="#" />
                <FooterLinks title="Career" href="#" />
              </ul>
            </div>

            <div>
              <p className="text-sm font-semibold tracking-widest text-gray-400 uppercase ">
                Ayuda
              </p>

              <ul className="mt-6 space-y-4 ">
                <FooterLinks title="Atención al cliente" href="#" />
                <FooterLinks title="Metodos de pago" href="#" />
                <FooterLinks title="Detalles de entrega" href="#" />
                <FooterLinks title="Terminos y condiciones" href="#" />
                <FooterLinks title="Politica de privacidads" href="#" />
              </ul>
            </div>
            <div className="col-span-2 md:col-span-1 lg:col-span-2 lg:pl-8">
              <p className="text-sm font-semibold tracking-widest text-gray-400 uppercase">
                Suscríbete al boletín
              </p>
              <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
                <div>
                  <TextInput
                    name="email"
                    register={register}
                    errors={errors}
                    placeholder="Ingrese su correo electrónico"
                    classNameInput="text-black placeholder-gray-500 rounded-md p-4 focus:outline-none focus:border-blue-600 caret-blue-600"
                  />
                </div>
                <SubmitButton
                  isLoading={loading}
                  buttonTitle={"Suscribirse"}
                  buttonLoading={"Suscribiendo..."}
                  className="focus:ring-4  focus:ring-blue-600 bg-blue-600 rounded-md hover:bg-blue-700 focus:bg-blue-700 px-6 py-4 mt-3 text-white "
                  withIcon={false}
                />
              </form>
            </div>
          </div>

          <hr className="mt-16 mb-10 border-slate-200 dark:border-slate-700 " />
          <div className="flex flex-col items-center justify-center gap-5 sm:flex-row sm:justify-between">
            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400 capitalize">
              © 2025{" "}
              <a href="https://flowbite.com/" className="hover:underline">
                {nameCompany}™
              </a>
              . Todos los derechos reservados
            </span>
            <SocialLinks socialMedia={socialMedia} />
          </div>
        </div>
      </section>
    </>
  );
};
export default Footer;
