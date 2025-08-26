import React from "react";
import Link from "next/link";
import Image from "next/image";
import { CircleDashed } from "lucide-react";
import { generateSlug } from "@/lib/generateSlug";
import { fmt } from "@/utils/formats/currencyFormat";
import { formatDateToEcuador } from "@/utils/formats/formatDateToEcuador";

export default function OrderCard({ order }) {
  return (
    <li className="overflow-hidden bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md">
      <div className="lg:flex">
        <div className="w-full border-b border-gray-200 dark:border-gray-700 lg:max-w-xs lg:border-b-0 lg:border-r bg-gray-50 dark:bg-gray-800">
          <div className="px-4 py-6 sm:p-6 lg:p-8">
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-1">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Número de pedido
                </p>
                <p className="text-sm font-bold text-gray-900 dark:text-white mt-0.5">
                  {order?.orderNumber || order?.id}
                </p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Fecha realizada
                </p>
                <p className="text-sm font-bold text-gray-900 dark:text-white mt-0.5">
                  {formatDateToEcuador(order?.createdAt)}
                </p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Monto total
                </p>
                <p className="text-sm font-bold text-gray-900 dark:text-white mt-0.5">
                  {fmt(order?.total)}
                </p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Estado del pedido
                </p>
                <div className="mt-0.5 flex items-center">
                  <div
                    className={[
                      "inline-flex items-center justify-center flex-shrink-0 w-3 h-3 rounded-full text-white mr-1.5",
                      {
                        PENDING: "text-yellow-500",
                        PROCESSING: "text-blue-500",
                        SHIPPED: "text-purple-500",
                        DELIVERED: "text-green-500",
                        CANCELED: "text-red-500",
                      }[order?.orderStatus] || "text-gray-500",
                    ].join(" ")}
                  >
                    <CircleDashed />
                  </div>
                  <span className="text-sm font-bold text-gray-900 dark:text-white">
                    {{
                      PENDING: "Pendiente",
                      PROCESSING: "En proceso",
                      SHIPPED: "Enviado",
                      DELIVERED: "Entregado",
                      CANCELED: "Cancelado",
                    }[order?.orderStatus] || "—"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CONTENIDO */}
        <div className="flex-1 px-4 py-6 sm:p-6 lg:p-8">
          <ul className="space-y-7">
            {order?.orderItems?.map((it, i) => {
              const imageUrl = it.imageUrl || "/logo.png";
              const slug = generateSlug(it?.title);

              return (
                <li key={it.id + i} className="relative flex pb-10 sm:pb-0">
                  <div className="flex-shrink-0">
                    <Image
                      className="object-cover rounded-lg w-28 h-28"
                      src={imageUrl}
                      alt={it.title}
                      width={64}
                      height={64}
                    />
                  </div>
                  <div className="flex flex-col justify-between flex-1 ml-5">
                    <div className="sm:grid sm:grid-cols-2 sm:gap-x-5">
                      <div>
                        <p className="text-base font-bold text-gray-900 dark:text-white capitalize">
                          {it.title}
                        </p>
                        <p className="mt-1.5 text-sm font-medium text-gray-500 dark:text-gray-400">
                          {it.brand ? `• ${it.brand}` : ""}
                        </p>
                      </div>

                      <div className="mt-4 sm:mt-0 flex justify-between">
                        <p className="text-base text-left font-medium text-gray-500 dark:text-gray-400 sm:text-right">
                          {fmt(it.price)}
                          <span className="ml-2">x{it.quantity} </span>
                        </p>
                        <p className="text-base font-bold text-left text-gray-900 dark:text-white sm:text-right">
                          {fmt(it.price * it.quantity)}
                        </p>
                      </div>
                    </div>

                    <div className="absolute bottom-0 left-0 sm:relative">
                      <div className="flex space-x-5">
                        <Link
                          href={`/products/${slug}`}
                          title={`Ver detalle de '${it.title}'`}
                          className="p-1 -m-1 text-sm font-medium text-gray-500 dark:text-gray-400 transition-all duration-200 rounded hover:text-gray-900 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 dark:focus:ring-gray-500"
                        >
                          Ver producto
                        </Link>

                        <span className="text-gray-200 dark:text-gray-600">
                          {" "}
                          |{" "}
                        </span>

                        <Link
                          href="#"
                          title={`Ver productos similares a '${it.title}'`}
                          className="p-1 -m-1 text-sm font-medium text-gray-500 dark:text-gray-400 transition-all duration-200 rounded hover:text-gray-900 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 dark:focus:ring-gray-500"
                        >
                          Productos similares
                        </Link>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          <hr className="mt-8 border-gray-200 dark:border-gray-700" />

          <div className="flex items-center mt-8 space-x-5">
            <button
              type="button"
              className="inline-flex items-center justify-center px-4 py-2.5 text-sm font-bold text-gray-900 dark:text-white transition-all duration-200 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Ver pedido
            </button>

            <button
              type="button"
              className="inline-flex items-center justify-center px-4 py-2.5 text-sm font-bold text-gray-900 dark:text-white transition-all duration-200 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Ver factura
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}
