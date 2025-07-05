"use client";

import { formatDateToEcuador } from "@/utils/formats/formatDateToEcuador";
import { displayByMap, getTextColorClass } from "@/utils/getStockStatus";
import Image from "next/image";

export const columns = [
  {
    accessorKey: "title",
    header: "Nombre",
    cell: ({ row }) => {
      const title = row.getValue("title");
      return <div className="uppercase">{title}</div>;
    },
  },
  {
    accessorKey: "imageUrl",
    header: "Imagen",
    cell: ({ row }) => {
      const imageUrl = row.getValue("imageUrl");
      const title = row.getValue("title");
      return <Image src={imageUrl} width={100} height={100} alt={title} />;
    },
  },
  {
    accessorKey: "description",
    header: "Descripción",
    cell: ({ row }) => {
      const description = row.getValue("description");
      return <div className="min-w-48 max-w-72">{description}</div>;
    },
  },
  {
    accessorKey: "isActive",
    header: "¿Activo?",
    cell: ({ row }) => {
      const isActive = row.getValue("isActive");

      const text = displayByMap(
        isActive,
        {
          true: "SI",
          false: "NO",
        },
        "Desconocido"
      );

      const textColor = getTextColorClass(isActive, {
        true: "text-lime-400 dark:text-green-400",
        false: "text-red-600 dark:text-red-400",
      });

      return <span className={`font-semibold ${textColor}`}>{text}</span>;
    },
  },

  {
    accessorKey: "createdAt",
    header: "Fecha",
    cell: ({ row }) => {
      const createdAt = formatDateToEcuador(row.getValue("createdAt"));
      return (
        <div className=" whitespace-nowrap">
          <small> {createdAt}</small>
        </div>
      );
    },
  },
  {
    accessorKey: "products",
    header: "Productos",
    cell: ({ row }) => {
      const products = row.getValue("products");
      return (
        <div className="flex flex-col gap-1">
          <p className="capitalize text-blue-700">
            ({products.length}) productos
          </p>
          {products?.map((product, index) => (
            <small
              key={index}
              className="leading-none text-gray-700 dark:text-gray-200 whitespace-nowrap  capitalize"
            >
              {"- "}
              {product.title}
            </small>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "marketIds",
    header: "Negocios",
  },
];
