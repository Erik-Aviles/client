"use client";
import calcularImpuesto from "@/lib/calcularImpuesto";
import { fmt } from "@/utils/formats/currencyFormat";
import { formatDateToEcuador } from "@/utils/formats/formatDateToEcuador";
import generateColorOpacity from "@/utils/formats/generateColorOpacity";
import { companyData } from "@/utils/general/companyData";
import { X } from "lucide-react";
import Image from "next/image";
import React, { useRef, useState } from "react";

const ShowModalOrder = ({ order }) => {
  const [showOrderModal, setShowOrderModal] = useState(false);
  const modalRef = useRef(null);
  const date = formatDateToEcuador(order?.createdAt);
  const taxTotal = calcularImpuesto(order?.subtotal, order?.tax);

  const openModal = () => {
    setShowOrderModal(true);
    setTimeout(() => {
      modalRef.current?.focus();
    }, 100);
  };

  const closeModal = () => {
    setShowOrderModal(false);
  };

  return (
    <div>
      {/* Botón para abrir el modal */}
      <button
        className="block text-white bg-amber-600 hover:bg-amber-700 dark:text-slate-900 dark:bg-amber-500 dark:hover:bg-amber-400 dark:hover:text-white focus:ring-4 focus:outline-none focus:ring-amber-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-amber-500"
        type="button"
        onClick={openModal}
      >
        Ver
      </button>

      {/*termina Modal */}
      {showOrderModal && (
        <div
          ref={modalRef}
          tabIndex="-1"
          aria-hidden={showOrderModal ? "false" : "true"}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 dark:bg-opacity-70 mx-4"
        >
          <div className="relative max-w-4xl w-full">
            <div className="bg-white rounded-lg shadow dark:bg-gray-800 max-h-[85vh] flex flex-col mt-14">
              <div className="flex items-center justify-between py-4 px-6 border-b rounded-t dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-amber-400">
                  MODO FACTURA
                </h3>
                <button
                  type="button"
                  className="text-gray-400 dark:text-amber-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={closeModal}
                >
                  <X />
                  <span className="sr-only">Cerrar modal</span>
                </button>
              </div>
              <div className="px-10 py-6 overflow-y-auto">
                <div className="w-max md:w-full h-[1123px] flex flex-col">
                  {/*  // Header */}
                  <div className="text-xs md:text-sm flex gap-4 justify-between border-b border-gray-500 pb-8">
                    <div className="flex flex-col">
                      <h2 className="font-semibold text-slate-900 dark:text-slate-50">
                        Factura desde:
                      </h2>
                      <div className="flex flex-col dark:text-slate-400">
                        <p>{companyData?.name}</p>
                        <p>{`${companyData?.streetAddress} - ${companyData?.postal}`}</p>
                        <p>
                          {companyData?.city}, {companyData?.province},
                          {companyData?.country}.
                        </p>
                        <p>{companyData?.email}</p>
                      </div>
                    </div>
                    <div className="w-full flex max-w-[150px]">
                      <Image
                        src={companyData?.logo ?? logo}
                        alt={companyData?.name ?? "Company logo"}
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="w-full h-auto object-contain"
                      />
                    </div>
                  </div>
                  {/*  // Header End */}
                  <div className="text-xs md:text-sm flex gap-3 justify-between border-b border-gray-500 py-8">
                    <div className="flex flex-col">
                      <h2 className="font-semibold text-slate-900 dark:text-slate-50">
                        Factura a:
                      </h2>
                      <div className="flex flex-col dark:text-slate-400">
                        <p>
                          {order?.firstName} {order?.lastName}
                        </p>
                        <p>
                          {order?.streetAddress} - {order?.zipCode}
                        </p>
                        <p>
                          {" "}
                          {order?.city}, {order?.province}, {order?.country}.
                        </p>
                        <p>{order?.emailAddress}</p>
                      </div>
                    </div>
                    <div className="flex flex-col max-w-44">
                      <div className="flex gap-2 justify-between">
                        <p className="font-semibold text-slate-900 dark:text-slate-50">
                          Factura:{" "}
                        </p>
                        <p className="dark:text-slate-400 whitespace-nowrap">
                          #{order?.orderNumber}
                        </p>
                      </div>
                      <div className="flex gap-2 justify-between">
                        <p className="font-semibold text-slate-900 dark:text-slate-50">
                          Fecha:
                        </p>
                        <p className="dark:text-slate-400">{date}</p>
                      </div>
                      <div className="flex gap-2 justify-between">
                        <p className="font-semibold text-slate-900 dark:text-slate-50">
                          Monto:
                        </p>
                        <p className="dark:text-slate-400">
                          {fmt(order?.total)}
                        </p>
                      </div>
                    </div>
                  </div>
                  <table className="w-full text-xs md:text-sm text-right rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead
                      className={`text-xs text-gray-900 uppercase dark:text-gray-100 ${companyData?.primaryColor && "bg-gray-100 dark:bg-gray-700"}`}
                      style={
                        companyData?.primaryColor
                          ? {
                              backgroundColor: generateColorOpacity(
                                companyData?.primaryColor,
                                0.2
                              ),
                            }
                          : null
                      }
                    >
                      <tr>
                        <th scope="col" className="text-left pr-6 pl-1 py-4">
                          Codigo
                        </th>
                        <th scope="col" className="text-left pr-6 pl-1 py-4">
                          Descripción
                        </th>
                        <th scope="col" className="pr-6 pl-1 py-4">
                          Cant.
                        </th>
                        <th scope="col" className="pr-6 pl-1 py-4">
                          P. Uni.
                        </th>
                        <th scope="col" className="pl-6 pr-1 py-4">
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {order?.orderItems.map((item, i) => {
                        return (
                          <tr
                            key={item?.id + i}
                            className=" bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                          >
                            <th scope="row" className="text-left  pl-1 py-4">
                              {item?.code}
                            </th>
                            <td className="text-left py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white capitalize">
                              {" "}
                              {item?.title}
                            </td>
                            <td className="pr-6 pl-1 py-4">{item?.quantity}</td>
                            <td className="pr-6 pl-1 py-4">
                              {fmt(item?.price)}
                            </td>
                            <td className="pl-6 pr-1 py-4">
                              {fmt(item?.price * item?.quantity)}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  <div className="flex justify-between border-b border-gray-500 py-8 text-slate-900 dark:text-slate-50">
                    <div className="text-xs flex flex-col">
                      <h2 className="font-semibold text-slate-900 dark:text-slate-50">
                        NOTAS
                      </h2>
                      <p>Garantía de devolución de dinero durante 30 dias </p>
                    </div>
                    <div className="text-xs md:text-sm flex flex-col mr-1">
                      <div className="flex justify-between">
                        <p>SubTotal:</p>
                        <p>{fmt(order?.subtotal - taxTotal)}</p>
                      </div>
                      <div className="flex gap-4 justify-between">
                        <p>Impuesto {order?.tax}%:</p>
                        <p>{fmt(taxTotal)}</p>
                      </div>
                      <div className="flex gap-4 justify-between">
                        <p>Descuento: </p>
                        <p>{fmt(order?.discountAmount)}</p>
                      </div>
                      <div className="flex gap-4 justify-between">
                        <p>Costo de envío: </p>
                        <p>{fmt(order?.shippingCost)}</p>
                      </div>
                      <div className="flex justify-between">
                        <p>Valor Total:</p>
                        <p>{fmt(order?.total)}</p>
                      </div>
                    </div>
                  </div>
                  {/* Footer */}
                  <div className="flex-1 flex items-end justify-center pt-6">
                    <div className="w-full flex max-w-[150px]">
                      <Image
                        src={companyData?.logo ?? logo}
                        alt={companyData?.name ?? "Company logo"}
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="w-full h-auto object-contain"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowModalOrder;
