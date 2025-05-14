"use client";

import React, { useState } from "react";
import SubTitle2 from "../styledComponent/SubTitle2";
import { columnTableRecentOrder } from "@/utils/general/columnTables";
import { orders, orderStatus } from "@/utils/order/data";
import ShowModalOrder from "./ShowModalOrder";
import Pagination from "../Pagination";

export default function CustomDataTable() {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  // Calcular los índices de los elementos a mostrar
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentOrders = orders.slice(startIndex, endIndex);

  return (
    <section className="flex flex-col gap-4">
      <SubTitle2 title="Ordenes Recientes" />
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="p-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-all-search"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label htmlFor="checkbox-all-search" className="sr-only">
                    checkbox
                  </label>
                </div>
              </th>
              {columnTableRecentOrder.map((item, ix) => (
                <th key={ix} scope="col" className="px-6 py-3 dark:text-amber-400">
                  {item.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentOrders.map((item, ix) => {
              return(
              <tr
                key={ix}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-900"
              >
                <td className="w-4 p-4">
                  <div className="flex items-center">
                    <input
                      id={`checkbox-table-search-${ix}`}
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor={`checkbox-table-search-${ix}`}
                      className="sr-only"
                    >
                      checkbox
                    </label>
                  </div>
                </td>
              
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {item?.name}
                </th>
                <td className="px-6 py-4">{item.orderId}</td>
                <td className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {item?.customer.firstName} {item?.customer.lastName}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    {" "}
                    {item?.customer.email}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    <strong className="text-gray-700 dark:text-gray-300">
                      Teléfono:
                    </strong>{" "}
                    {item?.customer.phone}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    <strong className="text-gray-700 dark:text-gray-300">
                      DNI:
                    </strong>{" "}
                    {item?.customer.dni}
                  </div>
                </td>
                <td className="px-6 py-4 border-b whitespace-nowrap border-gray-200 dark:border-gray-700">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {item?.shipping?.firstName} {item?.shipping?.lastName}
                  </div>
                  <div className="text-sm  text-gray-600 dark:text-gray-400 mt-2">
                    <strong className="text-gray-700 dark:text-gray-300">
                      Dirección:
                    </strong>{" "}
                    {item?.shipping?.address}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    <strong className="text-gray-700 dark:text-gray-300">
                      Ciudad:
                    </strong>{" "}
                    {item?.shipping?.city}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    <strong className="text-gray-700 dark:text-gray-300">
                      Provincia:
                    </strong>{" "}
                    {item?.shipping?.province}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    <strong className="text-gray-700 dark:text-gray-300">
                      Teléfono:
                    </strong>{" "}
                    {item?.shipping?.phone}
                  </div>
                </td>
                <td className="px-6 py-4 border-b whitespace-nowrap border-gray-200 dark:border-gray-700">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {item?.billing?.firstName} {item?.billing?.lastName}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    <strong className="text-gray-700 dark:text-gray-300">
                      Dirección:
                    </strong>{" "}
                    {item?.billing?.address}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    <strong className="text-gray-700 dark:text-gray-300">
                      Ciudad:
                    </strong>{" "}
                    {item?.billing?.city}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    <strong className="text-gray-700 dark:text-gray-300">
                      Provincia:
                    </strong>{" "}
                    {item?.billing?.province}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    <strong className="text-gray-700 dark:text-gray-300">
                      Teléfono:
                    </strong>{" "}
                    {item?.billing?.phone}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{item.date}</td>
                <td className="px-6 py-4">{item?.quantity}un.</td>
                <td className="px-6 py-4">${item.totalAmount}</td>
                <td className={`px-6 py-4 ${orderStatus[item?.status]}`}>
                  {item?.status === "delivered"
                        ? "Entregado"
                        : item?.status === "sending"
                        ? "Enviado"
                        : item?.status === "processing"
                        ? "Procesado"
                        : item?.status === "pending"
                        ? "Pendiente"
                        : "Cancelado"}
                </td>
                <td className="px-6 py-4 ">
                  <ShowModalOrder order={item} />
                </td>
              </tr>
            )})}
          </tbody>
        </table>
      </div>
      <Pagination
        totalItems={orders?.length}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />
    </section>
  );
}
