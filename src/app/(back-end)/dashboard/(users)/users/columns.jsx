"use client";

import { Checkbox } from "@/components/ui/checkbox";
import ImageColumns from "@/components/backoffice/data-table-columns/ImageColumns";
import { TextShortColumn } from "@/components/backoffice/data-table-columns/TextColumn";
import { AllDatesColumn } from "@/components/backoffice/data-table-columns/DateColumns";
import { SortableColumn } from "@/components/backoffice/data-table-columns/SortableColumn";

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
            USER: "USUARIO",
            CUSTOMER: "CLIENTE",
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
    accessorKey: "createdAt",
    header: ({ column }) => <SortableColumn column={column} title="Fechas" />,
    cell: ({ row }) => <AllDatesColumn row={row} />,
  },
];

const initialColumnVisibility = {
  emailVerified: false,
};
const fieldsToSearch = ["firstName", "lastName", "email", "id"];

export { columns, initialColumnVisibility, fieldsToSearch };
