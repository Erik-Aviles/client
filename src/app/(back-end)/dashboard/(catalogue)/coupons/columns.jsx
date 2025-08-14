"use client";

import { Checkbox } from "@/components/ui/checkbox";

import {
  AllDatesColumn,
  DateColumn,
} from "@/components/backoffice/data-table-columns/DateColumns";
import BooleanColumns from "@/components/backoffice/data-table-columns/BooleanColumns";
import ActionsColumns from "@/components/backoffice/data-table-columns/ActionsColumns";
import { SortableColumn } from "@/components/backoffice/data-table-columns/SortableColumn";
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
    accessorKey: "couponCode",
    header: () => <div className="whitespace-nowrap">codigo</div>,
    cell: ({ row }) => {
      const couponCode = row.getValue("couponCode");
      return <small>{couponCode}</small>;
    },
  },
  {
    accessorKey: "value",
    header: () => <div className="whitespace-nowrap">Valor</div>,
    cell: ({ row }) => {
      const value = row.getValue("value");
      return <small>{value}</small>;
    },
  },
  {
    accessorKey: "expiryDate",
    header: ({ column }) => (
      <SortableColumn column={column} title="Fecha de expiración" />
    ),
    cell: ({ row }) => (
      <DateColumn row={row} title="expiración" column="expiryDate" />
    ),
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
      <ActionsColumns row={row} endpoint="coupons" title="title" />
    ),
  },
];
