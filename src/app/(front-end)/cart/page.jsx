"use client";

import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import BreadcrumbAuto from "@/components/frontend/BreadcrumbAuto";
import EmptyCart from "@/components/frontend/cart/EmptyCart";
import CartProduct from "@/components/frontend/cart/CartProduct";
import CartSummary from "@/components/frontend/cart/CartSummary";
import { updateCartTotals } from "../../../../redux/slices/cartSlice";

export default function Cart() {
  const dispatch = useDispatch();
  const { items: cartItems, totals } = useSelector((state) => state.cart);


  if (!cartItems.length) {
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
        <CartProduct cartItems={cartItems} subTotal={totals.subtotal} />
        <CartSummary />
      </div>
    </section>
  );
}