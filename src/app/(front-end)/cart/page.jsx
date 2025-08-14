"use client";

import React from "react";
import { useSelector } from "react-redux";
import BreadcrumbAuto from "@/components/frontend/BreadcrumbAuto";
import EmptyCart from "@/components/frontend/cart/EmptyCart";
import CartProduct from "@/components/frontend/cart/CartProduct";
import CartSummary from "@/components/frontend/cart/CartSummary";

export default function Cart() {
  const { items, totals } = useSelector((state) => state.cart);

  if (!items.length) {
    return (
      <>
        <BreadcrumbAuto />
        <EmptyCart />
      </>
    );
  }

  return (
    <section>
      <BreadcrumbAuto />
      <div className="grid gap-8 md:grid-cols-6 lg:grid-cols-12 pb-20">
        <CartProduct cartItems={items} subTotal={totals.subtotal} />
        <CartSummary />
      </div>
    </section>
  );
}
