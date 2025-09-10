"use client";

import { Checkbox } from "@/components/ui/checkbox";
import ImageColumns from "@/components/backoffice/data-table-columns/ImageColumns";
import ActionsColumns from "@/components/backoffice/data-table-columns/ActionsColumns";
import { TextShortColumn } from "@/components/backoffice/data-table-columns/TextColumn";
import { AllDatesColumn } from "@/components/backoffice/data-table-columns/DateColumns";
import { SortableColumn } from "@/components/backoffice/data-table-columns/SortableColumn";
import { formatDateToEcuadorWithoutTime } from "@/utils/formats/formatDateToEcuador";

const columns = [
  // Selección múltiple
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
  // Imagen de usuario
  {
    accessorKey: "imageUrl",
    header: "Imagen",
    cell: ({ row }) => {
      const imageUrl = row.getValue("imageUrl");
      return <ImageColumns row={row} imageUrl={imageUrl} title="firstName" />;
    },
  },
  // Nombre y datos principales
  {
    accessorKey: "firstName",
    header: ({ column }) => <SortableColumn column={column} title="Nombres" />,
    cell: ({ row }) => {
      const firstName = row.getValue("firstName");
      const lastName = row.original.lastName || "";
      const email = row.original.email || "";
      const phone = row.original.staffProfile?.phone || "";

      const fullName = `${firstName} ${lastName}`.trim();

      return (
        <div className="ml-2 min-w-44 max-w-48 flex flex-col gap-1">
          <div className="text-xs capitalize text-slate-600 dark:text-slate-400">
            <strong className="text-slate-700 dark:text-slate-300">
              {fullName || "Sin registro"}
            </strong>
          </div>
          <div>
            <p
              className={`text-xs ${
                email ? "text-slate-600 dark:text-slate-400" : "text-red-600"
              }`}
            >
              {email || "Sin correo"}
            </p>
          </div>
          <div className="text-xs flex gap-1 text-slate-600 dark:text-slate-400">
            <strong className="text-slate-700 dark:text-slate-300">
              Tel.:
            </strong>
            <p
              className={`${
                phone ? "text-slate-700 dark:text-slate-300" : "text-red-600"
              }`}
            >
              {phone || "Sin teléfono"}
            </p>
          </div>
        </div>
      );
    },
  },
  // Código de empleado
  {
    accessorKey: "staffProfile.codeUser",
    header: "Código",
    cell: ({ row }) => {
      const codeUser = row.original.staffProfile?.codeUser;
      return (
        <p
          className={`text-xs ${
            codeUser ? "text-slate-700 dark:text-slate-300" : "text-red-600"
          }`}
        >
          {codeUser || "Sin registro"}
        </p>
      );
    },
  },
  // Documento de identidad
  {
    accessorKey: "idDocument",
    header: "Identificación",
    cell: ({ row }) => <TextShortColumn row={row} column="idDocument" />,
  },
  // Cargo / ámbito de trabajo
  {
    accessorKey: "staffProfile.workScope",
    header: "Cargo",
    cell: ({ row }) => {
      const workScope = row.original.staffProfile?.workScope;
      return (
        <p
          className={`text-xs ${
            workScope ? "text-slate-700 dark:text-slate-300" : "text-red-600"
          }`}
        >
          {workScope || "Sin registro"}
        </p>
      );
    },
  },
  // Estado (activo/inactivo)
  {
    accessorKey: "staffProfile.isActive",
    header: "Estado",
    cell: ({ row }) => {
      const isActive = row.original.staffProfile?.isActive;
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
  // Fecha de nacimiento
  {
    accessorKey: "staffProfile.dob",
    header: "Nacimiento",
    cell: ({ row }) => {
      const dob = row.original.staffProfile?.dob;
      const birthDay = dob ? formatDateToEcuadorWithoutTime(dob) : "";
      return (
        <p
          className={`text-xs ${
            dob ? "text-slate-900 dark:text-slate-50" : "text-red-600"
          }`}
        >
          {birthDay || "Sin registro"}
        </p>
      );
    },
  },
  // Fechas (creado/actualizado)
  {
    accessorKey: "createdAt",
    header: ({ column }) => <SortableColumn column={column} title="Fechas" />,
    cell: ({ row }) => <AllDatesColumn row={row} />,
  },
  // Acciones
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => (
      <ActionsColumns row={row} endpoint="staff" title="lastName" />
    ),
  },
];

// visibilidad inicial de columnas
const initialColumnVisibility = {
  staffProfile: false,
  isActive: false,
  dob: true,
};

const fieldsToSearch = [
  "firstName",
  "lastName",
  "email",
  "idDocument",
  "staffProfile.codeUser",
];

export { columns, initialColumnVisibility, fieldsToSearch };
