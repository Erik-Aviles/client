"use client";

import React, { startTransition, useState } from "react";
import toast from "react-hot-toast";
import NavButtons from "../NavButtons";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import CartItems from "@/components/frontend/cart/CartItems";
import { emptyCart } from "../../../../redux/slices/cartSlice";
import SummaryLine from "@/components/frontend/cart/SummaryLine";
import { resetCheckout } from "../../../../redux/slices/checkoutSlice";
import SubTitle3 from "@/components/backoffice/styledComponent/SubTitle3";

export default function OrderSummary() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { personalInfo, paymentInfo, shippingInfo } = useSelector(
    (state) => state.checkout
  );
  const cart = useSelector((state) => state.cart);
  const {
    subtotal,
    tax,
    taxableBase,
    taxTotal,
    total,
    coupon,
    discountAmount,
    shippingCost,
    subtotalWithoutTax,
  } = cart.totals;

  async function submitData() {
    const orderData = {
      personalInfo,
      shippingInfo,
      paymentInfo,
      cart,
    };
    try {
      setLoading(true);
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      const response = await fetch(`${baseUrl}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        setLoading(false);
        toast.success(`Pedido enviado exitosamente`);
        dispatch(emptyCart());
        dispatch(resetCheckout());
        startTransition(() => {
          router.push("/order-confirmation");
        });
      } else {
        setLoading(false);
        toast.error("Algo salió mal, Por favor intenta nuevamente");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      {cart.items?.map((item, i) => {
        return <CartItems key={item.id + i} item={item} />;
      })}
      <div>
        <SubTitle3
          title="Resumen de pago"
          className="text-base md:text-xl font-semibold mb-1"
        />
        <div className="text-xs md:text-sm text-gray-700 dark:text-gray-300 py-2">
          <SummaryLine
            label={`Subtotal (antes de impuesto)`}
            value={subtotalWithoutTax}
          />
          <SummaryLine
            label={`Impuesto (${tax}%)`}
            value={taxTotal}
            className="border border-b-slate-700"
          />
          <SummaryLine label="Subtotal (Con imp)" value={subtotal} />
          <SummaryLine
            label={`Desc. aplicado (${coupon.value}%)`}
            value={discountAmount}
            className={discountAmount > 0 ? "border border-b-slate-700" : ""}
          />
          {discountAmount > 0 && (
            <SummaryLine label="Subtotal (con desc.)" value={taxableBase} />
          )}
          <SummaryLine label="Costo de envío" value={shippingCost} />
        </div>
        <SummaryLine
          label="Total a pagar"
          value={total}
          className="text-sm md:text-xl border-t dark:border-t-slate-300 py-2 font-semibold"
        />
      </div>
      <NavButtons onSubmit={submitData} loading={loading} />
    </div>
  );
}
