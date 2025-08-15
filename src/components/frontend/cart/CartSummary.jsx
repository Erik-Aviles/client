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
    <div className="h-min md:col-span-full lg:col-span-4 bg-slate-50 border rounded-lg dark:bg-slate-800 text-slate-800 overflow-hidden px-6 py-4 lg:p-7">
      <h2 className="dark:text-slate-300 text-xl font-bold mb-4">
        Resumen del pedido
      </h2>
      <div className="mt-4 space-y-2 text-sm">
        <SummaryLine
          label="Subtotal (sin impuestos)"
          value={subtotalWithoutTax}
        />
        <SummaryLine label={`Impuesto (${tax}%)`} value={taxTotal} />
        <div className="pt-2">
          <CouponInput coupon={coupon.couponCode} />
        </div>
        {discountAmount > 0 && (
          <SummaryLine
            label={`Cupon: (${coupon.couponCode})`}
            value={-Math.abs(discountAmount)}
            emphasis
          />
        )}
        {/* Totales finales */}

        {discountAmount > 0 && (
          <>
            <div className="my-3 border-slate-200 dark:border-slate-700">
              <SummaryLine
                label="Total estimado sin descuento"
                value={subtotal}
                crossed
              />
            </div>
            <div className="my-3 border-t border-slate-200 dark:border-slate-700" />
          </>
        )}
        <SummaryLine
          label={
            coupon.value > 0 ? "Total estimado con descuento" : "Total estimado"
          }
          value={taxableBase}
          big
          strong
        />
      </div>
      <Notification
        title="Costo total estimado"
        text="El precio final se calculará en el momento del pago. Total estimado incluye impuesto y descuento (si aplica)"
      />
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
