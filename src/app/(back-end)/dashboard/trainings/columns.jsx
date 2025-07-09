"use client";

import { Checkbox } from "@/components/ui/checkbox";
import ImageColumns from "@/components/backoffice/data-table-columns/ImageColumns";
import { AllDatesColumn } from "@/components/backoffice/data-table-columns/DateColumns";
import BooleanColumns from "@/components/backoffice/data-table-columns/BooleanColumns";
import ActionsColumns from "@/components/backoffice/data-table-columns/ActionsColumns";
import { SortableColumn } from "@/components/backoffice/data-table-columns/SortableColumn";
import {
  TextLongColumn,
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
        aria-label="Seleccionar todo"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Seleccionar fila"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => <SortableColumn column={column} title="Nombre" />,
    cell: ({ row }) => <TitleColumn row={row} column="title" />,
  },
  {
    accessorKey: "imageUrl",
    header: "Logo empresarial",
    cell: ({ row }) => <ImageColumns row={row} imageTitle="imageUrl" />,
  },
  {
    accessorKey: "description",
    header: "Descripción",
    cell: ({ row }) => <TextLongColumn row={row} column="description" />,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => <SortableColumn column={column} title="Fecha" />,
    cell: ({ row }) => <AllDatesColumn row={row} />,
  },
  {
    accessorKey: "isActive",
    header: ({ column }) => <SortableColumn column={column} title="Activo" />,
    cell: ({ row }) => <BooleanColumns row={row} />,
  },
  {
    accessorKey: "categoryId",
    header: "Categorias",
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => <ActionsColumns row={row} />,
  },
];
