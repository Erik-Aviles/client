"use client";

import { useSelector } from "react-redux";
import React, { useState } from "react";
import CartItems from "@/components/frontend/cart/CartItems";
import SummaryLine from "@/components/frontend/cart/SummaryLine";
import SubTitle3 from "@/components/backoffice/styledComponent/SubTitle3";
import NavButtons from "../NavButtons";

export default function OrderSummary() {
  const [loading, setLoading] = useState(false);
  const cartItems = useSelector((store) => store.cart.items);
  const {
    subtotal,
    tax,
    taxableBase,
    taxTotal,
    total,
    discountAmount,
    shippingCost,
    subtotalWithoutTax,
  } = useSelector((state) => state.cart.totals);

  const { personalInfo, paymentInfo, shippingInfo } = useSelector(
    (state) => state.checkout
  );
  const cart = useSelector((state) => state.cart);

  async function submitData() {
    setLoading(true);
    const orderData = {
      personalInfo,
      paymentInfo,
      shippingInfo,
      cart,
    };
    setLoading(false);
    console.log("Order Data:", orderData);
  }

  return (
    <div className="flex flex-col gap-4">
      {cartItems?.map((item, i) => {
        return <CartItems key={item.id + i} item={item} />;
      })}
      <div>
        <SubTitle3
          title="Resumen de pago"
          className="text-base md:text-xl font-semibold mb-1"
        />
        <div className="text-xs md:text-sm text-gray-700 dark:text-gray-300 py-2">
          <SummaryLine
            label={`Subtotal (sin impuesto)`}
            value={subtotalWithoutTax}
          />
          <SummaryLine
            label={`Impuesto (${tax}%)`}
            value={taxTotal}
            className="border border-b-slate-700"
          />
          <SummaryLine label="Subtotal (Con imp)" value={subtotal} />
          <SummaryLine
            label="Desc. aplicado"
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
