"use client";

import { Checkbox } from "@/components/ui/checkbox";
import ImageColumns from "@/components/backoffice/data-table-columns/ImageColumns";
import { AllDatesColumn } from "@/components/backoffice/data-table-columns/DateColumns";
import ActionsColumns from "@/components/backoffice/data-table-columns/ActionsColumns";
import { SortableColumn } from "@/components/backoffice/data-table-columns/SortableColumn";
import {
  TextLongColumn,
  TextShortColumn,
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
    accessorKey: "firstName",
    header: ({ column }) => <SortableColumn column={column} title="Nombres" />,
    cell: ({ row }) => {
      const email = row.original.email;
      const phone = row.original.supplierProfile?.phone;
      const firstName = row.getValue("firstName");
      const lastName = row.original.lastName;
      const fullName = firstName + " " + lastName;
      return (
        <>
          <div className="ml-2 min-w-44 max-w-48">
            <small className={`capitalize ${!firstName && "text-red-600"}`}>
              {fullName || "Sin registro"}
            </small>
          </div>
          <div className="pl-2 flex flex-col gap-2 whitespace-nowrap">
            <div className="leading-none">
              <p className="text-xs font-semibold text-slate-700 dark:text-slate-500">
                Correo:
              </p>
              <TextShortColumn
                row={row}
                fallback={email}
                className="lowercase"
              />
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
    accessorKey: "imageUrl",
    header: "Imagen",
    cell: ({ row }) => (
      <ImageColumns
        row={row}
        imageUrl={row.original.imageUrl}
        title="firstName"
      />
    ),
  },
  {
    accessorKey: "idDocument",
    header: ({ column }) => (
      <SortableColumn column={column} title="Identificacion" />
    ),
    cell: ({ row }) => {
      const codeSupplier = row.original.supplierProfile?.codeSupplier;
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
      const phone = row.original.supplierProfile?.contactPersonPhone;
      const name = row.original.supplierProfile?.contactPerson;
      return (
        <div className="flex flex-col gap-2 whitespace-nowrap">
          <div className="leading-none">
            <p className="text-xs font-semibold text-slate-700 dark:text-slate-500">
              Nombre:
            </p>
            <TextShortColumn row={row} fallback={name} />
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
    accessorKey: "logoUrl",
    header: "Logo de la empresa",
    cell: ({ row }) => {
      const logoUrl = row.original.supplierProfile?.logoUrl;
      const name = row.original.supplierProfile?.name;
      return (
        <ImageColumns row={row} imageUrl={logoUrl} fallback={name} />
      );
    },
  },
  {
    accessorKey: "address",
    header: "Direccion",
    cell: ({ row }) => {
      const address = row.original.supplierProfile?.address;
      return <TextLongColumn row={row} fallback={address} />;
    },
  },
  {
    accessorKey: "paymentTerms",
    header: "Terminos de pago",
    cell: ({ row }) => {
      const paymentTerms = row.original.supplierProfile?.paymentTerms;
      return <TextLongColumn row={row} fallback={paymentTerms} />;
    },
  },
  {
    accessorKey: "notes",
    header: "Observacion",
    cell: ({ row }) => {
      const notes = row.original.supplierProfile?.notes;
      return <TextLongColumn row={row} fallback={notes} />;
    },
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
      <ActionsColumns row={row} endpoint="suppliers" title="lastName" />
    ),
  },
];
