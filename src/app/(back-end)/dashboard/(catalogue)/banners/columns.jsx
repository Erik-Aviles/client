"use client";

import { Checkbox } from "@/components/ui/checkbox";
import BooleanColumns from "@/components/backoffice/data-table-columns/BooleanColumns";
import ActionsColumns from "@/components/backoffice/data-table-columns/ActionsColumns";
import ImageColumns from "@/components/backoffice/data-table-columns/ImageColumns";
import { SortableColumn } from "@/components/backoffice/data-table-columns/SortableColumn";
import { AllDatesColumn } from "@/components/backoffice/data-table-columns/DateColumns";
import { TitleColumn } from "@/components/backoffice/data-table-columns/TextColumn";

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
    header: ({ column }) => <SortableColumn column={column} title="Nombre" />,
    cell: ({ row }) => <TitleColumn row={row} column="title" />,
  },
  {
    accessorKey: "imageUrl",
    header: "Imagen",
    cell: ({ row }) => <ImageColumns row={row} imageTitle="imageUrl" />,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => <SortableColumn column={column} title="Fecha" />,
    cell: ({ row }) => <AllDatesColumn row={row} />,
  },
  {
    accessorKey: "isActive",
    header: ({ column }) => <SortableColumn column={column} title="¿Activo?" />,
    cell: ({ row }) => <BooleanColumns row={row} />,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => (
      <ActionsColumns row={row} endpoint="banners" title="title" />
    ),
  },
];
