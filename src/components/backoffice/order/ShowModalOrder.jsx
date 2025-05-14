"use client";
import React, { useRef, useState } from "react";

const ShowModalOrder = ({ order }) => {
  const [showOrderModal, setShowOrderModal] = useState(false);
  const modalRef = useRef(null);

  const openModal = () => {
    setShowOrderModal(true);
    setTimeout(() => {
      modalRef.current?.focus();
    }, 100);
  };

  const closeModal = () => {
    setShowOrderModal(false);
  };

  const iva = order?.totalAmount * 0.15;

  const subtotal = order?.totalAmount - iva;

  return (
    <div>
      {/* Botón para abrir el modal */}
      <button
        className="block text-white bg-blue-700 hover:bg-blue-800 dark:text-slate-900 dark:bg-amber-400 dark:hover:bg-amber-500 dark:hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-amber-500"
        type="button"
        onClick={openModal}
      >
        Ver
      </button>

      {/* Modal */}
      {showOrderModal && (
        <div
          ref={modalRef}
          tabIndex="-1"
          aria-hidden={showOrderModal ? "false" : "true"}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 dark:bg-opacity-70"
        >
          <div className="relative p-4 w-full max-w-md bg-white rounded-lg shadow dark:bg-gray-800">
            {/* Header */}
            <div className="flex items-center justify-between py-4 border-b rounded-t dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-amber-400">
                MODO FACTURA
              </h3>
              <button
                type="button"
                className="text-gray-400 dark:text-amber-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={closeModal}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Cerrar modal</span>
              </button>
            </div>

            <div className="flex justify-between items-center mt-2 mb-4 md:mb-6">
              {/* Logo de la empresa */}
              <img src="/logo.jpg" alt="Logo" className="h-12 sm:h-18" />
              {/* Información de la empresa */}
              <div className="text-right leading-4">
                <p className="font-bold text-xs md:text-sm text-gray-800 dark:text-white">
                  Bodero Racing Development
                </p>
                <p className="text-[10px] md:text-xs text-gray-600 dark:text-gray-300">
                  Av. Walter Andrade, San José y c. primera
                </p>
                <p className="text-[10px] md:text-xs text-gray-600 dark:text-gray-300">
                  Teléfono: 0996501072
                </p>
              </div>
            </div>

            {/* Encabezado de la factura */}
            <div className="flex items-center gap-1 sm:gap-3">
              <div className="flex flex-col gap-2 w-full mb-4 md:mb-6">
                <div className="leading-[12px]">
                  <p className="text-gray-600 text-[10px] md:text-xs dark:text-gray-300">
                    Comprobante #:{" "}
                    <span className="font-bold">{order?.orderId}</span>
                  </p>
                  <p className="text-gray-600 text-[10px] md:text-xs dark:text-gray-300">
                    Fecha: <span className="font-bold">{order?.date}</span>
                  </p>
                </div>
                <div className="leading-[10px]">
                  <h5 className="text-xs">Dtos del cliente</h5>
                  <p className="text-gray-600 text-[10px] dark:text-gray-300">
                    {"Nombre: "}
                    <span className="font-semibold capitalize">
                      {order?.billing?.firstName} {order?.billing?.lastName}
                    </span>
                  </p>
                  <p className="text-gray-600 text-[10px] dark:text-gray-300">
                    {"Cell: "}
                    <span className="font-semibold">
                      {order?.billing?.phone}
                    </span>
                  </p>
                  <p className="text-gray-600 text-[10px] dark:text-gray-300">
                    {"Email: "}
                    <span className="font-semibold">
                      {order?.billing?.email || ""}
                    </span>
                  </p>
                  <p className="text-gray-600 text-[10px] dark:text-gray-300">
                    {"País/Cdad: "}
                    <span className="font-semibold capitalize">
                      {order?.billing?.city} - {order?.billing?.province}
                    </span>
                  </p>
                  <p className="text-gray-600 text-[10px] dark:text-gray-300">
                    {"Dir: "}
                    <span className="font-semibold capitalize">
                      {order?.billing?.address}
                    </span>
                  </p>
                </div>
              </div>
              <div className="flex w-full justify-center">
                <h4 className="text-sm xs:text-base text-secondary md:text-xl dark:text-amber-400">
                  NOTA DE VENTA
                </h4>
              </div>
            </div>

            {/* Detalle de la orden */}
            <table className="w-full mb-1 md:mb-2 border-collapse border-gray-200 dark:border-gray-600">
              <thead>
                <tr className="bg-gray-200 dark:bg-gray-700">
                  <th className="p-2 md:py-2 md:px-4 text-left border border-gray-200 dark:border-gray-600 text-xs md:text-sm">
                    Artículo
                  </th>
                  <th className="p-2 md:py-2 md:px-4 text-left border border-gray-200 dark:border-gray-600 text-xs md:text-sm">
                    Precio
                  </th>
                  <th className="p-2 md:py-2 md:px-4 text-left border border-gray-200 dark:border-gray-600 text-xs md:text-sm">
                    Cant.
                  </th>
                  <th className="p-2 md:py-2 md:px-4 text-left border border-gray-200 dark:border-gray-600 text-xs md:text-sm">
                    Subtotal
                  </th>
                </tr>
              </thead>
              <tbody>
                {order?.orders?.map((pro, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-100 dark:hover:bg-gray-600"
                  >
                    <td className="p-2 md:py-2 md:px-4 border border-gray-200 dark:border-gray-600 text-[10px] md:text-xs capitalize">
                      {pro?.productName}
                      <br />
                      <span className="p-1 text-[9px] font-bold">
                        Codigo: {pro?.code || "xxx"}
                      </span>
                    </td>
                    <td className="p-2 md:py-2 md:px-4 border border-gray-200 dark:border-gray-600 text-[10px] md:text-xs">
                      {pro?.price}
                    </td>
                    <td className="p-2 md:py-2 md:px-4 border border-gray-200 dark:border-gray-600 text-[10px] md:text-xs">
                      {pro?.quantity}
                    </td>
                    <td className="p-2 md:py-2 md:px-4 border border-gray-200 dark:border-gray-600 text-[10px] md:text-xs text-right">
                      {pro?.totalPrice}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Totales */}
            <div className="w-full flex justify-end">
              <div className="w-32 text-right border border-gray-200 dark:border-gray-600 py-2 pl-4 pr-5">
                <p className="text-gray-600 text-[10px] md:text-xs dark:text-gray-300">
                  Subtotal:
                </p>
                <p className="text-gray-600 text-[10px] md:text-xs dark:text-gray-300">
                  Descuento (0%):
                </p>
                <p className="text-gray-600 text-[10px] md:text-xs dark:text-gray-300">
                  IVA (15%):
                </p>
                <p className="font-semibold text-xs md:text-sm text-gray-800 dark:text-white">
                  Total a pagar:
                </p>
              </div>
              <div className="w-24 text-right border border-gray-200 dark:border-gray-600 py-2 pl-4 pr-2 md:pr-5">
                <p className="text-[10px] md:text-xs dark:text-gray-300">
                  ${subtotal.toFixed(2)}
                </p>
                <p className="text-[10px] md:text-xs dark:text-gray-300">
                  ${0}
                </p>
                <p className="text-[10px] md:text-xs dark:text-gray-300">
                  ${iva.toFixed(2)}
                </p>
                <p className="font-semibold text-xs md:text-sm text-gray-800 dark:text-white">
                  ${order?.totalAmount.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowModalOrder;
