"use client";

import React, { useMemo, useCallback } from "react";
import { Trash2 } from "lucide-react";
import { useSelector } from "react-redux";
import BreadcrumbAuto from "@/components/frontend/BreadcrumbAuto";
import EmptyCart from "@/components/frontend/cart/EmptyCart";
import CartProduct from "@/components/frontend/cart/CartProduct";
import CartSummary from "@/components/frontend/cart/CartSummary";

export default function Cart() {
  const cartItems = useSelector((store) => store.cart);
  console.log(cartItems);

  // --- Cálculos derivados ---
  const subTotal = useMemo(() => {
    return cartItems.reduce((acc, item) => {
      const price = item.salePrice ?? item.price;
      return acc + price * item.qty;
    }, 0)
  }, [cartItems]);

  // --- Render ---
  if (cartItems.length === 0)
    return (
      <>
        <BreadcrumbAuto />
        <EmptyCart />
      </>
    );

  return (
    <div>
      <BreadcrumbAuto />
      <div className="grid gap-8 md:grid-cols-6 lg:grid-cols-12">
        {/* Lista de Productos */}
        <CartProduct cartItems={cartItems} subTotal={subTotal} />

        {/* Resumen de pago del pedido*/}
        <CartSummary subTotal={subTotal} />
      </div>
    </div>
  );
}
