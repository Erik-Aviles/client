"use client";

import { formatDateToEcuador } from "@/utils/formats/formatDateToEcuador";
import { displayByMap, getTextColorClass } from "@/utils/getStockStatus";
import Image from "next/image";
import defaulImage from "../../../../../../public/categories/defaultImage.png";
import {
  Copy,
  MoreHorizontal,
  ArrowUpDown,
  Pencil,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const columns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          className="uppercase"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nombre
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const title = row.getValue("title");
      return (
        <div className="uppercase min-w-48 max-w-28">
          <small>{title}</small>
        </div>
      );
    },
  },
  {
    accessorKey: "imageUrl",
    header: "Imagen",
    cell: ({ row }) => {
      const imageUrl = row.getValue("imageUrl");
      const title = row.getValue("title");
      const index = row.index;
      return (
        <div className="relative w-[100px] h-auto rounded-sm overflow-hidden ">
          <Image
            src={imageUrl || defaulImage}
            width={556}
            height={556}
            alt={title || "Imagen de una categoria"}
            priority={index < 4}
          />
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          className="uppercase"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Fecha
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const createdAt = formatDateToEcuador(row.getValue("createdAt"));
      const updatedAt = formatDateToEcuador(row.original.updatedAt);
      return (
        <div className="flex flex-col gap-2 whitespace-nowrap">
          <div className="leading-none">
            <p className="text-xs font-semibold text-purple-700 dark:text-purple-500">
              Creación:{" "}
            </p>
            <small>{createdAt}</small>
          </div>
          <div className="leading-none">
            <p className="text-xs font-semibold text-purple-700 dark:text-purple-500">
              Actualización:{" "}
            </p>
            <small>{updatedAt}</small>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "isActive",
    header: ({ column }) => {
      return (
        <Button
          className="uppercase"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ¿Activo?
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
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
        false: "text-red-600 dark:text-red-700",
      });

      return <span className={`font-semibold  ${textColor}`}>{text}</span>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const categoryId = row.original.id;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(categoryId)}
            >
              <Copy className="w-2 h-2 " /> Copiar ID
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Pencil className="w-2 h-2 " /> Editar
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Trash2 /> Eliminar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
