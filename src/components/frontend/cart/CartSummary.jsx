import React from "react";
import Link from "next/link";
import SummaryLine from "./SummaryLine";
import CouponInput from "./CouponInput";
import { useSelector } from "react-redux";
import Notification from "@/components/Notification";
import { ChevronRight } from "lucide-react";

export default function CartSummary() {
  const {
    subtotal,
    subtotalWithoutTax,
    tax,
    coupon,
    discountAmount,
    taxableBase,
    taxTotal,
  } = useSelector((store) => store.cart.totals);

  return (
    <div className="h-min md:col-span-full lg:col-span-4 bg-white border rounded-lg dark:bg-slate-800 text-slate-800 overflow-hidden px-6 py-4 lg:p-7">
      <h2 className="dark:text-slate-300 text-xl fon t-semibold mb-4">
        Resumen del pedido
      </h2>
      <div className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
        <SummaryLine label="Subtotal (sin impuestos)" value={subtotalWithoutTax} />
        <SummaryLine label={`Impuesto (${tax}%)`} value={taxTotal} />
        <div className="pt-2">
          <CouponInput coupon={coupon.couponCode} />
        </div>
        {discountAmount > 0 && (
          <div className="flex justify-between border-b pb-2 text-lime-600 font-medium text-xs">
            <span>Cupon: ({coupon.couponCode})</span>
            <span className="font-bold">- ${discountAmount.toFixed(2)}</span>
          </div>
        )}

        {/* Totales finales */}
        <div className="space-y-1 pt-2">
          {discountAmount > 0 && (
            <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
              <span>Total estimado sin descuento</span>
              <span className="line-through">${subtotal.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between text-base font-semibold text-gray-800 dark:text-gray-200 py-1">
            <span>
              {coupon.value > 0
                ? "Total estimado con descuento"
                : "Total estimado"}
            </span>
            <span>${taxableBase?.toFixed(2)}</span>
          </div>

          <Notification
            title="Costo total estimado"
            text="El precio final se calculará en el momento del pago. Total estimado incluye impuesto y descuento (si aplica)"
          />
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <Link
          href={"/checkout"}
          className="w-full inline-flex items-end gap-1 justify-center px-6 py-3 font-bold transition-all duration-200 bg-blue-600 dark:bg-white text-white dark:text-slate-900 rounded-lg hover:bg-blue-700 dark:hover:bg-slate-200"
        >
          <span>Continuar</span>
          <ChevronRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
}
