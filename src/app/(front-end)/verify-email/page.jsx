import { Info } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function VerifyMail() {
  return (
    <section className="max-w-3xl mx-auto h-[calc(100vh-189.33px)] lg:h-[calc(100vh-120px)] flex justify-center items-center">
      <div
        id="alert-additional-content-1"
        className="p-4 mb-4 text-amber-800 border border-amber-300 rounded-lg bg-amber-50 dark:bg-gray-800 dark:text-amber-400 dark:border-amber-800"
        role="alert"
      >
        <div className="flex items-center">
          <Info className="shrink-0 w-4 h-4 me-2" />
          <span className="sr-only">Info</span>
          <h3 className="text-lg font-medium">
            Revisar correo electrónico - Verificar su cuenta.
          </h3>
        </div>
        <div className="mt-2 mb-4 text-sm">
          Gracias por crear una cuenta con nosotros. Hemos enviado un correo
          electrónico con un enlace de verifiacion a su correo registrado,
          ingresa en tu bandeja de entrada para completar el proceso de
          verifiación.
        </div>
        <div className="flex">
          <Link
            href="/"
            className="text-white bg-amber-800 hover:bg-amber-900 focus:ring-4 focus:outline-none focus:ring-amber-200 font-medium rounded-lg text-xs px-3 py-1.5 me-2 text-center inline-flex items-center dark:bg-amber-600 dark:hover:bg-amber-700 dark:focus:ring-amber-800"
          >
            Ir al inicio
          </Link>
        </div>
      </div>
    </section>
  );
}
