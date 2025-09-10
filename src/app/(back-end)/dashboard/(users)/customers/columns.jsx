"use client";

import { Checkbox } from "@/components/ui/checkbox";
import ImageColumns from "@/components/backoffice/data-table-columns/ImageColumns";
import ActionsColumns from "@/components/backoffice/data-table-columns/ActionsColumns";
import { TextShortColumn } from "@/components/backoffice/data-table-columns/TextColumn";
import { AllDatesColumn } from "@/components/backoffice/data-table-columns/DateColumns";
import { SortableColumn } from "@/components/backoffice/data-table-columns/SortableColumn";
import { formatDateToEcuadorWithoutTime } from "@/utils/formats/formatDateToEcuador";

const columns = [
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
    accessorKey: "imageUrl",
    header: "Imagen",
    cell: ({ row }) => {
      const imageUrl = row.getValue("imageUrl");
      return <ImageColumns row={row} imageUrl={imageUrl} title="firstName" />;
    },
  },
  {
    accessorKey: "firstName",
    header: ({ column }) => <SortableColumn column={column} title="Nombres" />,
    cell: ({ row }) => {
      const firstName = row.getValue("firstName");
      const email = row.original.email || "";
      const phone = row.original.profile?.phone || "";
      const lastName = row.original.lastName || "";
      const fullName = firstName + " " + lastName;
      return (
        <div className="ml-2 min-w-44 max-w-48 flex flex-col gap-1">
          <div
            className={`text-xs capitalize flex gap-1 text-slate-600 dark:text-slate-400 ${(!firstName || !lastName) && "text-red-600"}`}
          >
            <strong className="text-slate-700 dark:text-slate-300">
              {fullName || "Sin registro"}
            </strong>
          </div>
          <div>
            <p
              className={`text-xs ${email ? "text-slate-600 dark:text-slate-400" : "text-red-600"}`}
            >
              {email || "Sin registro"}
            </p>
          </div>
          <div className="text-xs capitalize flex gap-1 text-slate-600 dark:text-slate-400">
            <strong className="text-slate-700 dark:text-slate-300">
              Tel.:
            </strong>
            <p
              className={` ${phone ? "text-slate-700 dark:text-slate-300" : "text-red-600"}`}
            >
              {phone || "Sin registro"}
            </p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "address",
    header: "Dirección",
    cell: ({ row }) => {
      const address = row.original.profile?.address || "";
      const city = row.original.profile?.city || "";
      const province = row.original.profile?.province || "";
      const country = row.original.profile?.country || "";
      const zipCode = row.original.profile?.zipCode || "";

      return (
        <div className="ml-2 min-w-44 max-w-48 leading-10">
          <div className="text-xs capitalize flex gap-1">
            <small className="font-bold text-slate-600 dark:text-slate-300">
              Dirección:
            </small>
            <p
              className={` ${address ? "text-slate-700 dark:text-slate-400" : "text-red-600"}`}
            >
              {address || "Sin registro"}
            </p>
          </div>
          <div className="text-xs capitalize flex gap-1">
            <small className="font-bold text-slate-600 dark:text-slate-300">
              Provincia:
            </small>
            <p
              className={` ${province ? "text-slate-700 dark:text-slate-400" : "text-red-600"}`}
            >
              {province || "Sin registro"}
            </p>
          </div>
          <div className="text-xs capitalize flex gap-1">
            <small className="font-bold text-slate-600 dark:text-slate-300">
              Ciudad:
            </small>
            <p
              className={` ${city ? "text-slate-700 dark:text-slate-400" : "text-red-600"}`}
            >
              {city || "Sin registro"}
            </p>
          </div>
          <div className="text-xs capitalize flex gap-1">
            <small className="font-bold text-slate-600 dark:text-slate-300">
              País:
            </small>
            <p
              className={` ${country ? "text-slate-700 dark:text-slate-400" : "text-red-600"}`}
            >
              {country || "Sin registro"}
            </p>
          </div>
          <div className="text-xs capitalize flex gap-1">
            <small className="font-bold text-slate-600 dark:text-slate-300">
              Código Postal:
            </small>
            <p
              className={` ${zipCode ? "text-slate-700 dark:text-slate-400" : "text-red-600"}`}
            >
              {zipCode || "Sin registro"}
            </p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "idDocument",
    header: "Identificación",
    cell: ({ row }) => <TextShortColumn row={row} column="idDocument" />,
  },
  {
    accessorKey: "role",
    header: "Tipo de usuario",
    cell: ({ row }) => {
      const role = row.getValue("role");
      return (
        <small>
          {{
            USER: "CLIENTE",
            SUPPLIER: "PROVEEDOR",
            MODERATOR: "TRABAJADOR",
            ADMIN: "ADMINISTRADOR",
          }[role] ||
            role ||
            "—"}
        </small>
      );
    },
  },
  {
    accessorKey: "emailVerified",
    header: "Email verificado",
    cell: ({ row }) => {
      const emailVerified = row.getValue("emailVerified");
      return (
        <small
          className={[
            "font-semibold",
            {
              true: "text-lime-600",
              false: "text-red-600",
            }[emailVerified] || "text-gray-500",
          ].join(" ")}
        >
          {{
            true: "SI",
            false: "NO",
          }[emailVerified] ||
            emailVerified ||
            "—"}
        </small>
      );
    },
  },
  {
    accessorKey: "orders",
    header: "Órdenes",
    cell: ({ row }) => {
      const orders = row.getValue("orders");
      return (
        <small
          className={[
            "font-semibold",
            orders.length === 0 ? "text-red-600" : "text-sky-600",
          ].join(" ")}
        >
          {orders.length > 0 ? "(" + orders.length + ") Realizadas" : "—"}
        </small>
      );
    },
  },
  {
    accessorKey: "dateOfBirth",
    header: "Fecha de Nacimiento",
    cell: ({ row }) => {
      const dateOfBirth = row.original.profile?.dateOfBirth || "";
      const birthDay = dateOfBirth
        ? formatDateToEcuadorWithoutTime(dateOfBirth)
        : "";
      return (
        <p
          className={`text-xs ${dateOfBirth ? "text-slate-900 dark:text-slate-50" : "text-red-600"}`}
        >
          {birthDay || "Sin registro"}
        </p>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => <SortableColumn column={column} title="Fechas" />,
    cell: ({ row }) => <AllDatesColumn row={row} />,
  },
  {
    accessorKey: "profile.isActive",
    header: "Estado",
    cell: ({ row }) => {
      const isActive = row.original.profile?.isActive;
      return (
        <small
          className={`font-semibold ${
            isActive ? "text-lime-600" : "text-red-600"
          }`}
        >
          {isActive ? "Activo" : "Inactivo"}
        </small>
      );
    },
  },
  // {
  //   id: "actions",
  //   enableHiding: false,
  //   cell: ({ row }) => (
  //     <ActionsColumns row={row} endpoint="customers" title="lastName" />
  //   ),
  // },
];

const initialColumnVisibility = {
  orders: false,
  loyaltyPoints: false,
  emailVerified: false,
};
const fieldsToSearch = ["firstName", "lastName", "idDocument", "email", "id"];

export { columns, initialColumnVisibility, fieldsToSearch };
