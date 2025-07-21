import { Info } from "lucide-react";
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
          electrónico con un enlace de verifiacion a tu correo registrado, ingresa en tu bandeja de entrada para completar el
          proceso de verifiación.
        </div>
        <div className="flex">
          <button
            type="button"
            className="text-white bg-amber-800 hover:bg-amber-900 focus:ring-4 focus:outline-none focus:ring-amber-200 font-medium rounded-lg text-xs px-3 py-1.5 me-2 text-center inline-flex items-center dark:bg-amber-600 dark:hover:bg-amber-700 dark:focus:ring-amber-800"
          >
            <svg
              className="me-2 h-3 w-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 14"
            >
              <path d="M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
            </svg>
            View more
          </button>
        </div>
      </div>
    </section>
  );
}
