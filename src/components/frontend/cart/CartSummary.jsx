import Link from "next/link";
import SummaryLine from "./SummaryLine";
import CouponInput from "./CouponInput";
import { findCoupon } from "@/lib/couponService";
import Notification from "@/components/Notification";
import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCartTotals } from "../../../../redux/slices/cartSlice";
import toast from "react-hot-toast";

export default function CartSummary() {
  const dispatch = useDispatch();
  const { subtotal,subtotalWithoutTax, tax, coupon, discountAmount,taxableBase, taxTotal, total } =
    useSelector((store) => store.cart.totals);

  const [couponApplied, setCouponApplied] = useState(coupon?.name || "");


  const handleApplyCoupon = useCallback(
    async (codeInput) => {
      const couponFound = await findCoupon(codeInput);
      if (!couponFound) {
        setCouponApplied("");
        dispatch(updateCartTotals({ coupon: { name: "", percent: 0 } }));
        toast.error("Cupón no válido");
        return false;
      }
      setCouponApplied(couponFound.name);
      dispatch(
        updateCartTotals({
         coupon: { name: couponFound.name, percent: couponFound.percent },
        })
      );
      toast.success("Cupón aplicado con éxito");
      return true;
    },
    [dispatch]
  );

  const handleClearCoupon = useCallback(() => {
    setCouponApplied("");
    dispatch(updateCartTotals({ coupon: { name: "", percent: 0 } }));
  }, [dispatch]);

  return (
    <div className="h-min md:col-span-full lg:col-span-4 bg-white border rounded-lg dark:bg-slate-800 text-slate-800 overflow-hidden px-6 py-4 lg:p-7">
      <h2 className="dark:text-slate-300 text-xl font-semibold mb-4">
        Resumen del pedido
      </h2>
      <div className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
        <SummaryLine label="Subtotal" value={subtotalWithoutTax} />
        <SummaryLine label={`Impuesto (${tax}%)`} value={taxTotal} />
        <div className="pt-2">
          <CouponInput
            code={couponApplied}
            setCode={setCouponApplied}
            onApply={handleApplyCoupon}
            onClear={handleClearCoupon}
          />
        </div>
        {discountAmount > 0 && (
          <div className="flex justify-between border-b pb-2 text-lime-600 font-medium text-xs">
            <span>Cupon: ({couponApplied})</span>
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
              {coupon.percent > 0
                ? "Total estimado con descuento"
                : "Total estimado"}
            </span>
            <span>${taxableBase.toFixed(2)}</span>
          </div>

          <Notification
            title="Costo total estimado"
            text="El precio final se calcula según el método de pago y el costo por envío."
          />
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <Link
          href={"/checkout"}
          className="w-full text-center font-semibold px-6 py-3 bg-blue-600 dark:bg-white text-white dark:text-slate-900 rounded-lg hover:bg-blue-700 dark:hover:bg-slate-200"
        >
          Continuar a pagar
        </Link>
      </div>
    </div>
  );
}
