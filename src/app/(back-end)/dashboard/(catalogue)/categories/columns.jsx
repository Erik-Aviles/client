"use client";

import { Checkbox } from "@/components/ui/checkbox";
import ImageColumns from "@/components/backoffice/data-table-columns/ImageColumns";
import { AllDatesColumn } from "@/components/backoffice/data-table-columns/DateColumns";
import BooleanColumns from "@/components/backoffice/data-table-columns/BooleanColumns";
import MapColumns from "@/components/backoffice/data-table-columns/MapColumns";
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
    header: ({ column }) => <SortableColumn column={column} title="¿Activo?" />,
    cell: ({ row }) => <BooleanColumns row={row} />,
  },
  {
    accessorKey: "products",
    header: "Productos",
    cell: ({ row }) => <MapColumns row={row} column="products" />,
  },
  {
    accessorKey: "trainings",
    header: "Capacitaciones",
    cell: ({ row }) => <MapColumns row={row} column="trainings" />,
  },
  {
    accessorKey: "marketIds",
    header: "Mercados",
    cell: ({ row }) => <MapColumns row={row} column="marketIds" />,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => (
      <ActionsColumns row={row} endpoint="categories" title="title" />
    ),
  },
];
