"use client";

import { Checkbox } from "@/components/ui/checkbox";
import ImageColumns from "@/components/backoffice/data-table-columns/ImageColumns";
import { AllDatesColumn } from "@/components/backoffice/data-table-columns/DateColumns";
import ActionsColumns from "@/components/backoffice/data-table-columns/ActionsColumns";
import { SortableColumn } from "@/components/backoffice/data-table-columns/SortableColumn";
import {
  TextShortColumn,
  TitleColumn,
} from "@/components/backoffice/data-table-columns/TextColumn";
import { fmt } from "@/utils/formats/currencyFormat";

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
    accessorKey: "productTitle",
    header: ({ column }) => (
      <SortableColumn column={column} title="Nombre del Producto" />
    ),
    cell: ({ row }) => <TitleColumn row={row} column="productTitle" />,
  },
  {
    accessorKey: "productImageUrl",
    header: "Imagen",
    cell: ({ row }) => (
      <ImageColumns
        row={row}
        imageUrl={row.original.productImageUrl}
        title={row.original.productImageUrl}
      />
    ),
  },
  {
    accessorKey: "productPrice",
    header: () => <div className="whitespace-nowrap">precio</div>,
    cell: ({ row }) => {
      const productPrice = row.getValue("productPrice");
      return (
        <small
          className={productPrice ? "font-medium " : "text-red-600 capitalize"}
        >
          {productPrice ? fmt(productPrice) : "Sin registro"}
        </small>
      );
    },
  },
  {
    accessorKey: "productQuantity",
    header: "Cant. ",
    cell: ({ row }) => {
      return <TextShortColumn row={row} column="productQuantity" />;
    },
  },
  {
    accessorKey: "total",
    header: () => <div className="whitespace-nowrap">Total</div>,
    cell: ({ row }) => {
      const total = row.getValue("total");
      return (
        <small className={total ? "font-medium " : "text-red-600 capitalize"}>
          {total ? fmt(total) : "Sin registro"}
        </small>
      );
    },
  },
  {
    accessorKey: "productId",
    header: "Producto ID",
    cell: ({ row }) => <TextShortColumn row={row} column="productId" />,
  },
  {
    accessorKey: "orderId",
    header: "Pedido ID",
    cell: ({ row }) => <TextShortColumn row={row} column="orderId" />,
  },
  {
    accessorKey: "vendorId",
    header: "Proveedor ID",
    cell: ({ row }) => <TextShortColumn row={row} column="vendorId" />,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => <SortableColumn column={column} title="Fechas" />,
    cell: ({ row }) => <AllDatesColumn row={row} />,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => (
      <ActionsColumns row={row} endpoint="sales" title="productTitle" />
    ),
  },
];
