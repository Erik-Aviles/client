"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { AllDatesColumn } from "@/components/backoffice/data-table-columns/DateColumns";
import { SortableColumn } from "@/components/backoffice/data-table-columns/SortableColumn";
import { TextShortColumn } from "@/components/backoffice/data-table-columns/TextColumn";
import { fmt } from "@/utils/formats/currencyFormat";
import ActionsColumns from "@/components/backoffice/data-table-columns/order/ActionsColumns";
import ShowModalOrder from "@/components/backoffice/Modals/order/ShowModalOrder";

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
    accessorKey: "orderNumber",
    header: "Código de orden",
    cell: ({ row }) => {
      return <TextShortColumn row={row} column="orderNumber" />;
    },
  },
  {
    accessorKey: "firstName",
    header: ({ column }) => (
      <SortableColumn column={column} title="Datos del Cliente" />
    ),
    cell: ({ row }) => {
      const firstName = row.getValue("firstName");
      const emailAddress = row.original.emailAddress || "";
      const phoneNumber = row.original.phoneNumber || "";
      const idDocument = row.original.idDocument || "";
      const lastName = row.original.lastName || "";
      const fullName = firstName + " " + lastName;
      return (
        <div className="ml-2 min-w-44 max-w-48 flex flex-col gap-0.5">
          <div
            className={`text-xs capitalize flex gap-1 text-slate-600 dark:text-slate-400 ${(!firstName || !lastName) && "text-red-600"}`}
          >
            <strong className="text-slate-700 dark:text-slate-300">
              {fullName || "Sin registro"}
            </strong>
          </div>
          <div
            className={`text-xs capitalize flex gap-1 text-slate-600 dark:text-slate-400 ${!emailAddress && "text-red-600"}`}
          >
            <p>{emailAddress || "Sin registro"}</p>
          </div>
          <div
            className={`text-xs capitalize flex gap-1 text-slate-600 dark:text-slate-400 ${phoneNumber && "text-red-600"}`}
          >
            <strong className="text-slate-700 dark:text-slate-300">
              {" "}
              Tel.:
            </strong>
            <p>{phoneNumber || "Sin registro"}</p>
          </div>{" "}
          <div
            className={`text-xs capitalize flex gap-1 text-slate-600 dark:text-slate-400 ${idDocument && "text-red-600"}`}
          >
            <strong className="text-slate-700 dark:text-slate-300">
              Cedula:
            </strong>

            <p> {idDocument || "Sin registro"}</p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "orderItems",
    header: "Productos",
    cell: ({ row }) => {
      const items = row.getValue("orderItems") || [];
      return items.length > 0 ? (
        <div className="flex flex-col gap-1">
          <small>({items.length}) Item/s</small>
          {items?.map((item, index) => (
            <div
              key={index}
              className="min-w-48 max-w-80 leading-none flex gap-1 font-semibold"
            >
              <small className="text-red-700 ">{"-"}</small>
              <small className="text-lime-700 capitalize"> {item?.title}</small>
              <small className="text-purple-500 ">(x{item?.quantity})</small>
              <small className=" text-slate-900 dark:text-slate-50">a</small>
              <small className="text-pink-500">{fmt(item?.price || 0)}</small>
            </div>
          ))}
        </div>
      ) : (
        <small>"Sin registro"</small>
      );
    },
  },
  {
    accessorKey: "total",
    header: () => <div className="whitespace-nowrap">Monto</div>,
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
    accessorKey: "orderStatus",
    header: ({ column }) => <SortableColumn column={column} title="Estado" />,
    cell: ({ row }) => {
      const order = row.original;
      return (
        <span
          className={[
            "font-semibold",
            {
              PENDING: "text-yellow-500",
              PROCESSING: "text-blue-500",
              SHIPPED: "text-purple-500",
              DELIVERED: "text-green-500",
              CANCELED: "text-red-500",
            }[order.orderStatus] || "text-gray-500",
          ].join(" ")}
        >
          {{
            PENDING: "Pendiente",
            PROCESSING: "En proceso",
            SHIPPED: "Enviado",
            DELIVERED: "Entregado",
            CANCELED: "Cancelado",
          }[order.orderStatus] || "—"}
        </span>
      );
    },
  },
  {
    accessorKey: "shippingCost",
    header: () => <div className="whitespace-nowrap">C. Envío</div>,
    cell: ({ row }) => {
      const shippingCost = row.getValue("shippingCost");
      return (
        <small
          className={
            shippingCost ? "font-medium " : "text-orange-600 capitalize"
          }
        >
          {shippingCost ? fmt(shippingCost) : "Gratis"}
        </small>
      );
    },
  },
  {
    accessorKey: "discountAmount",
    header: "Descuento",
    cell: ({ row }) => <TextShortColumn row={row} column="discountAmount" />,
  },
  {
    accessorKey: "couponId",
    header: "ID de Cupón",
    cell: ({ row }) => <TextShortColumn row={row} column="couponId" />,
  },
  {
    accessorKey: "paymentMethod",
    header: "Método de Pago",
    cell: ({ row }) => {
      const order = row.original;
      return (
        <small>
          {{
            CASH: "EFECTIVO",
            CARD: "TARJETA DE CREDITO",
            TRANSFER: "TRANSFERENCIA",
            OTHER: "OTROS",
          }[order.paymentMethod] ||
            order.paymentMethod ||
            "—"}
        </small>
      );
    },
  },
  {
    accessorKey: "billingInfo",
    header: "Info. de facturación",
    cell: ({ row }) => {
      const streetAddress = row.original.streetAddress || "";
      const city = row.original.city || "";
      const province = row.original.province || "";
      const country = row.original.country || "";
      const zipCode = row.original.zipCode || "";

      return (
        <div className="ml-2 min-w-44 max-w-48 leading-10">
          <div
            className={`text-xs capitalize flex gap-1 text-slate-600 dark:text-slate-400 ${!streetAddress && "text-red-600"}`}
          >
            <strong className="text-slate-700 dark:text-slate-300">
              Dirección:
            </strong>
            <p>{streetAddress || "Sin registro"}</p>
          </div>
          <div
            className={`text-xs capitalize flex items-end gap-1 text-slate-600 dark:text-slate-400  ${!city && "text-red-600"}`}
          >
            <strong className="text-slate-700 dark:text-slate-300">
              Ciudad:
            </strong>
            <p>{city || "Sin registro"}</p>
          </div>
          <div
            className={`text-xs capitalize flex items-end gap-1 text-slate-600 dark:text-slate-400  ${!province && "text-red-600"}`}
          >
            <p className="text-slate-700 dark:text-slate-300">Provincia:</p>
            <p>{province || "Sin registro"}</p>
          </div>
          <div
            className={`text-xs capitalize flex items-end gap-1 text-slate-600 dark:text-slate-400  ${!country && "text-red-600"}`}
          >
            <strong className="text-slate-700 dark:text-slate-300">
              País:
            </strong>
            <p>{country || "Sin registro"}</p>
          </div>
          <div
            className={`text-xs capitalize flex items-end gap-1 text-slate-600 dark:text-slate-400  ${!zipCode && "text-red-600"}`}
          >
            <strong className="text-slate-700 dark:text-slate-300">
              Código Postal:
            </strong>
            <p>{zipCode || "Sin registro"}</p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "shippingInfo",
    header: "Info. de envío",
    cell: ({ row }) => {
      const streetAddress = row.original.streetAddress || "";
      const city = row.original.city || "";
      const province = row.original.province || "";
      const country = row.original.country || "";
      const zipCode = row.original.zipCode || "";

      return (
        <div className="ml-2 min-w-44 max-w-48 leading-10">
          <div
            className={`text-xs capitalize flex gap-1 text-slate-600 dark:text-slate-400 ${!streetAddress && "text-red-600"}`}
          >
            <strong className="text-slate-700 dark:text-slate-300">
              Dirección:
            </strong>
            <p>{streetAddress || "Sin registro"}</p>
          </div>
          <div
            className={`text-xs capitalize flex items-end gap-1 text-slate-600 dark:text-slate-400  ${!city && "text-red-600"}`}
          >
            <strong className="text-slate-700 dark:text-slate-300">
              Ciudad:
            </strong>
            <p>{city || "Sin registro"}</p>
          </div>
          <div
            className={`text-xs capitalize flex items-end gap-1 text-slate-600 dark:text-slate-400  ${!province && "text-red-600"}`}
          >
            <p className="text-slate-700 dark:text-slate-300">Provincia:</p>
            <p>{province || "Sin registro"}</p>
          </div>
          <div
            className={`text-xs capitalize flex items-end gap-1 text-slate-600 dark:text-slate-400  ${!country && "text-red-600"}`}
          >
            <strong className="text-slate-700 dark:text-slate-300">
              País:
            </strong>
            <p>{country || "Sin registro"}</p>
          </div>
          <div
            className={`text-xs capitalize flex items-end gap-1 text-slate-600 dark:text-slate-400  ${!zipCode && "text-red-600"}`}
          >
            <strong className="text-slate-700 dark:text-slate-300">
              Código Postal:
            </strong>
            <p>{zipCode || "Sin registro"}</p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => <SortableColumn column={column} title="Fechas" />,
    cell: ({ row }) => <AllDatesColumn row={row} />,
  },
  {
    id: "show",
    header: "Acciones",
    cell: ({ row }) => {
      const order = row.original;
      return <ShowModalOrder order={order} />;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => (
      <ActionsColumns row={row} endpoint="orders-admin" title="productTitle" />
    ),
  },
];

const initialColumnVisibility = {
  shippingCost: false,
  shippingInfo: false,
  billingInfo: false,
  discountAmount: false,
  couponId: false,
  productId: false,
  vendorId: false,
};
const fieldsToSearch = ["title", "orderId", "vendorId", "id"];

export { columns, initialColumnVisibility, fieldsToSearch };
