"use client";

import { Checkbox } from "@/components/ui/checkbox";
import ImageColumns from "@/components/backoffice/data-table-columns/ImageColumns";
import { AllDatesColumn } from "@/components/backoffice/data-table-columns/DateColumns";
import ActionsColumns from "@/components/backoffice/data-table-columns/ActionsColumns";
import { SortableColumn } from "@/components/backoffice/data-table-columns/SortableColumn";
import {
  TextLongColumn,
  TextShortColumn,
  TitleColumn,
} from "@/components/backoffice/data-table-columns/TextColumn";

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
    accessorKey: "name",
    header: ({ column }) => <SortableColumn column={column} title="Nombre" />,
    cell: ({ row }) => {
      const email = row.original.email;
      const phone = row.original.phone;
      return (
        <>
          <TitleColumn row={row} column="name" />
          <div className="pl-2 flex flex-col gap-2 whitespace-nowrap">
            <div className="leading-none">
              <p className="text-xs font-semibold text-slate-700 dark:text-slate-500">
                Correo:
              </p>
              <TextShortColumn row={row} fallback={email} />
            </div>
            <div className="leading-none">
              <p className="text-xs font-semibold text-slate-700 dark:text-slate-500">
                Telefono:
              </p>
              <TextShortColumn row={row} fallback={phone} />
            </div>
          </div>
        </>
      );
    },
  },
  {
    accessorKey: "profileImageUrl",
    header: "Imagen",
    cell: ({ row }) => (
      <ImageColumns row={row} imageTitle="profileImageUrl" title="name" />
    ),
  },
  {
    accessorKey: "idDocument",
    header: ({ column }) => (
      <SortableColumn column={column} title="Identificacion" />
    ),
    cell: ({ row }) => {
      const codeSupplier = row.original.codeSupplier;
      return (
        <div className="pl-2 flex flex-col gap-2 whitespace-nowrap">
          <div className="leading-none">
            <p className="text-xs font-semibold text-slate-700 dark:text-slate-500">
              Cedula:
            </p>
            <TextShortColumn row={row} column="idDocument" />
          </div>
          <div className="leading-none">
            <p className="text-xs font-semibold text-slate-700 dark:text-slate-500">
              Codigo:
            </p>
            <TextShortColumn row={row} fallback={codeSupplier} />
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "role",
    header: ({ column }) => <SortableColumn column={column} title="Cargo" />,
    cell: ({ row }) => <TextShortColumn row={row} column="role" />,
  },
  {
    accessorKey: "contactPerson",
    header: ({ column }) => <SortableColumn column={column} title="Contacto" />,
    cell: ({ row }) => {
      const phone = row.original.contactPersonPhone;
      return (
        <div className="flex flex-col gap-2 whitespace-nowrap">
          <div className="leading-none">
            <p className="text-xs font-semibold text-slate-700 dark:text-slate-500">
              Contacto:
            </p>
            <TextShortColumn row={row} column="contactPerson" />
          </div>
          <div className="leading-none">
            <p className="text-xs font-semibold text-slate-700 dark:text-slate-500">
              Telefono:
            </p>
            <TextShortColumn row={row} fallback={phone} />
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "notes",
    header: "Observacion",
    cell: ({ row }) => <TextLongColumn row={row} column="notes" />,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => <SortableColumn column={column} title="Fechas" />,
    cell: ({ row }) => <AllDatesColumn row={row} />,
  },
  // {
  //   accessorKey: "isActive",
  //   header: ({ column }) => <SortableColumn column={column} title="¿Activo?" />,
  //   cell: ({ row }) => <BooleanColumns row={row} />,
  // },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => (
      <ActionsColumns row={row} endpoint="suppliers" title="name" />
    ),
  },
];
