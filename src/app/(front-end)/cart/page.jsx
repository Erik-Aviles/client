"use client";

import React, { useState, useMemo, useCallback } from "react";
import BreadcrumbAuto from "@/components/frontend/BreadcrumbAuto";
import CartItem from "@/components/frontend/cart/CartItem";
import EmptyCart from "@/components/frontend/cart/EmptyCart";
import calcularImpuesto from "@/lib/calcularImpuesto";
import { Trash2 } from "lucide-react";
import { cartItems } from "@/utils/general/cartItems";
import CouponInput from "@/components/frontend/cart/CouponInput";
import { coupons } from "@/utils/general/coupons";
import SummaryLine from "@/components/frontend/cart/SummaryLine";
import { ENVIO, IVA_PERCENTAGE } from "@/utils/general/constantsGenerals";
import { findCoupon } from "@/lib/couponService";
import Link from "next/link";

export default function Cart() {
  const [items, setItems] = useState(cartItems);
  const [discount, setDiscount] = useState(0);
  const [couponApplied, setCouponApplied] = useState("");

  // --- Cálculos derivados ---
  const totalItems = useMemo(
    () => items.reduce((acc, item) => acc + item.quantity, 0),
    [items]
  );

  const subTotal = useMemo(
    () => items.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [items]
  );

  const tax = useMemo(
    () => calcularImpuesto(subTotal, IVA_PERCENTAGE),
    [subTotal]
  );
  const total = useMemo(() => subTotal + tax + ENVIO, [subTotal, tax]);
  const finalTotal = Math.max(0, total - discount);

  // --- Handlers ---
  const handleQuantityChange = useCallback((id, newQty) => {
    const qty = parseInt(newQty);
    if (!qty || qty < 1) return;

    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: qty } : item))
    );
  }, []);

  const handleRemove = useCallback((id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const handleClearCart = useCallback(() => {
    setItems([]);
  }, []);

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
  // --- Render ---
  if (items.length === 0)
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
        {/* Productos */}
        <div className="md:col-span-6 lg:col-span-8 flex flex-col gap-3">
          <div className="flex items-center justify-between py-2 mb-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Tu carrito
            </h1>
            <p className="text-xs capitalize">
              {totalItems} {totalItems === 1 ? "producto" : "productos"}
            </p>
          </div>

          {/* Cabecera tabla */}
          <div className="hidden md:grid grid-cols-6 gap-4 border-b pb-2 mb-4 text-sm font-medium text-gray-600 dark:text-gray-400">
            <div className="col-span-3">Producto</div>
            <div className="text-center">Cantidad</div>
            <div className="text-center">P. Unitario</div>
            <div className="text-center">Subtotal</div>
          </div>

          {/* Lista de productos */}
          <div className="space-y-4">
            {items.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onChange={(qty) => handleQuantityChange(item.id, qty)}
                handleRemove={handleRemove}
              />
            ))}
          </div>

          {/* Acciones */}
          <div className="mt-6 flex  justify-between items-center">
            <button
              onClick={handleClearCart}
              className="flex items-center gap-1 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Trash2 className="w-5 h-5" />
              <span className="text-xs md:text-sm whitespace-nowrap">Vaciar carrito</span>
            </button>
            <p className="text-sm md:text-lg font-medium text-center  text-gray-800 dark:text-gray-200">
              Total estimado:{" "}
              <span className="font-bold">${subTotal.toFixed(2)}</span>
            </p>
          </div>
        </div>

        {/* Resumen de pago */}
        <div className="md:col-span-6 lg:col-span-4 bg-white border rounded-lg dark:bg-slate-800 text-slate-800 overflow-hidden px-6 py-4 lg:p-7">
          <h2 className="dark:text-slate-300 text-xl font-semibold mb-4">
            Resumen de pago
          </h2>
          <div className="space-y-4 text-sm text-gray-700 dark:text-gray-300">
            <SummaryLine label="Subtotal" value={subTotal} />
            <SummaryLine label={`Impuesto (${IVA_PERCENTAGE}%)`} value={tax} />
            <SummaryLine label="Envío" value={ENVIO} />
            <p className="text-xs text-gray-500 mt-2">
              El costo de envío puede ajustarse según el peso final del pedido.
            </p>

            <div className="pt-2">
              <CouponInput
                onApply={handleApplyCoupon}
                onClear={handleClearCoupon}
              />
            </div>

            {discount > 0 && (
              <div className="flex justify-between border-b pb-2 text-lime-600 font-medium">
                <span>Descuento: ({couponApplied})</span>
                <span className="font-bold">- ${discount.toFixed(2)}</span>
              </div>
            )}

            {/* Totales finales */}
            <div className="space-y-1 pt-4">
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
            <Link href={"#"} className="w-full text-center font-semibold px-6 py-3 bg-blue-600 dark:bg-white text-white dark:text-slate-900 rounded-lg hover:bg-blue-700 dark:hover:bg-slate-200">
              Continuar a pagar
            </Link>
          </div>
        </div>

        {/* Relleno o futuro contenido */}
        <div className="md:col-span-4 lg:col-span-6" />
      </div>
    </div>
  );
}
