"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import NavButtons from "../NavButtons";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import CartItems from "@/components/frontend/cart/CartItems";
import { emptyCart } from "../../../../redux/slices/cartSlice";
import SummaryLine from "@/components/frontend/cart/SummaryLine";
import {
  resetCheckout,
  setCompleted,
} from "../../../../redux/slices/checkoutSlice";
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
      const response = await fetch(`/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });
      const responseData = await response.json();
      if (response.ok) {
        setLoading(false);
        router.push(`/order-confirmation/${responseData?.id}`);
        toast.success(`Pedido enviado exitosamente`);
        setTimeout(() => {
          dispatch(emptyCart());
          dispatch(resetCheckout());
        }, 500);
      } else {
        setLoading(false);
        toast.error("Algo salió mal, Por favor intenta nuevamente");
      }
    } catch (error) {
      setLoading(false);
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
        <div className="space-y-2 text-xs md:text-sm text-gray-700 dark:text-gray-300 py-2">
          <SummaryLine label={`Subtotal (a.imp.)`} value={subtotalWithoutTax} />
          <SummaryLine label={`Impuesto (${tax}%)`} value={taxTotal} />
          <SummaryLine label="Subtotal (d.imp.)" value={subtotal} />
          <SummaryLine
            label={`Descuento (${coupon.value}%)`}
            value={discountAmount}
          />
          {discountAmount > 0 && (
            <SummaryLine label="Subtotal (con desc.)" value={taxableBase} />
          )}
          <SummaryLine label="Costo de envío" value={shippingCost} />
        </div>
        <SummaryLine label="Total a pagar" value={total} strong big />
      </div>
      <NavButtons onSubmit={submitData} loading={loading} />
    </div>
  );
}
