import { CheckCheck } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function OrderConfirmation() {
  return (
    <section className="min-h-screen  dark:bg-transparent">
      <div className="flex flex-col items-center py-16">
        <div className="flex items-center justify-center self-center w-40 h-40 mb-6 rounded-full text-lime-500 bg-slate-200">
          <CheckCheck className="w-20 h-20" />
        </div>
        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Confirmación de Pedido
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Gracias por tu compra. Tu pedido ha sido confirmado.
        </p>
        <Link
          href="/"
          className="inline-block px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Ir al inicio
        </Link>
      </div>
    </section>
  );
}
