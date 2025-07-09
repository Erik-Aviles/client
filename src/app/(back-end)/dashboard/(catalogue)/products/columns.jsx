"use client";

import { Checkbox } from "@/components/ui/checkbox";
import ImageColumns from "@/components/backoffice/data-table-columns/ImageColumns";
import BooleanColumns from "@/components/backoffice/data-table-columns/BooleanColumns";
import ActionsColumns from "@/components/backoffice/data-table-columns/ActionsColumns";
import { SortableColumn } from "@/components/backoffice/data-table-columns/SortableColumn";
import { AllDatesColumn } from "@/components/backoffice/data-table-columns/DateColumns";
import { TextLongColumn, TitleColumn } from "@/components/backoffice/data-table-columns/TextColumn";

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
    accessorKey: "barcode",
    header: () => <div className="whitespace-nowrap">codigo de barra</div>,
    cell: ({ row }) => {
      const barcode = row.getValue("barcode");
      return (
        <div>
          <small>{barcode}</small>
        </div>
      );
    },
  },
  {
    accessorKey: "title",
    header: ({ column }) => <SortableColumn column={column} title="Nombre" />,
    cell: ({ row }) => <TitleColumn row={row} column="title" />,
  },
  {
    accessorKey: "code",
    header: () => <div className="whitespace-nowrap">codigo</div>,
    cell: ({ row }) => {
      const code = row.getValue("code");
      return <small>{code}</small>;
    },
  },
  {
    accessorKey: "sku",
    header: () => <div className="whitespace-nowrap">cod. unico</div>,
    cell: ({ row }) => {
      const sku = row.getValue("sku");
      return <small>{sku}</small>;
    },
  },
  {
    accessorKey: "imageUrl",
    header: "Imagen",
    cell: ({ row }) => <ImageColumns row={row} imageTitle="imageUrl" />,
  },
  {
    accessorKey: "price",
    header: () => <div className="whitespace-nowrap">precio</div>,
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price);

      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "salePrice",
    header: () => <div className="whitespace-nowrap">precio final</div>,
    cell: ({ row }) => {
      const salePrice = parseFloat(row.getValue("salePrice"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(salePrice);

      return (
        <div className="font-medium whitespace-nowrap">
          {salePrice ? formatted : ""}
        </div>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Descripción",
    cell: ({ row }) => <TextLongColumn row={row} column="description" />,
  },
  {
    accessorKey: "hasDiscount",
    header: ({ column }) => <SortableColumn column={column} title="Desc." />,
    cell: ({ row }) => <BooleanColumns row={row} column="hasDiscount" />,
  },
  {
    accessorKey: "stock",
    header: "Existencia",
    cell: ({ row }) => {
      const stock = row.getValue("stock");
      return <small>{stock}</small>;
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => <SortableColumn column={column} title="Fecha" />,
    cell: ({ row }) => <AllDatesColumn row={row} />,
  },
  {
    accessorKey: "isActive",
    header: ({ column }) => <SortableColumn column={column} title="¿Activo?" />,
    cell: ({ row }) => <BooleanColumns row={row} column="isActive" />,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => (
      <ActionsColumns row={row} endpoint="products" title="title" />
    ),
  },
];
