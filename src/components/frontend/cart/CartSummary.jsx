import Link from "next/link";
import React, { useCallback, useMemo, useState } from "react";
import SummaryLine from "./SummaryLine";
import { ENVIO, IVA_PERCENTAGE } from "@/utils/general/constantsGenerals";
import calcularImpuesto from "@/lib/calcularImpuesto";
import CouponInput from "./CouponInput";
import { findCoupon } from "@/lib/couponService";

export default function CartSummary({ subTotal }) {
  const [discount, setDiscount] = useState(0);
  const [couponApplied, setCouponApplied] = useState("");

  const tax = useMemo(
    () => calcularImpuesto(subTotal, IVA_PERCENTAGE),
    [subTotal]
  );
  const total = useMemo(() => subTotal + ENVIO, [subTotal]);

  const finalTotal = Math.max(0, total - discount);

  const handleApplyCoupon = useCallback(
    async (codeInput) => {
      const coupon = await findCoupon(codeInput);
      if (!coupon) {
        setDiscount(0);
        setCouponApplied("");
        return false;
      }

      const calculated = (subTotal * coupon.value) / 100;
      setDiscount(calculated);
      setCouponApplied(coupon.code);
      return true;
    },
    [subTotal]
  );

  const handleClearCoupon = useCallback(() => {
    setDiscount(0);
    setCouponApplied("");
  }, []);

  return (
    <div className="h-min md:col-span-full lg:col-span-4 bg-white border rounded-lg dark:bg-slate-800 text-slate-800 overflow-hidden px-6 py-4 lg:p-7">
      <h2 className="dark:text-slate-300 text-xl font-semibold mb-4">
        Resumen de pago
      </h2>
      <div className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
        <SummaryLine label="Subtotal" value={subTotal} />
        <SummaryLine label={`Impuesto (${IVA_PERCENTAGE}%)`} value={tax} />
        <SummaryLine label="Envío" value={ENVIO} />
        <p className="text-xs text-gray-500 mt-2">
          El costo de envío puede ajustarse según la direccion del envio.
        </p>

        <div className="pt-2">
          <CouponInput
            onApply={handleApplyCoupon}
            onClear={handleClearCoupon}
          />
        </div>

        {discount > 0 && (
          <div className="flex justify-between border-b pb-2 text-lime-600 font-medium text-xs">
            <span>Cupon: ({couponApplied})</span>
            <span className="font-bold">- ${discount.toFixed(2)}</span>
          </div>
        )}

        {/* Totales finales */}
        <div className="space-y-1 pt-2">
          {discount > 0 ? (
            <>
              <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                <span>Total sin descuento</span>
                <span className="line-through">${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-base font-semibold text-gray-800 dark:text-gray-200">
                <span>Total con descuento</span>
                <span>${finalTotal.toFixed(2)}</span>
              </div>
            </>
          ) : (
            <div className="flex justify-between text-base font-semibold text-gray-800 dark:text-gray-200">
              <span>Total a pagar</span>
              <span>${total.toFixed(2)}</span>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <Link
          href={"#"}
          className="w-full text-center font-semibold px-6 py-3 bg-blue-600 dark:bg-white text-white dark:text-slate-900 rounded-lg hover:bg-blue-700 dark:hover:bg-slate-200"
        >
          Continuar a pagar
        </Link>
      </div>
    </div>
  );
}
