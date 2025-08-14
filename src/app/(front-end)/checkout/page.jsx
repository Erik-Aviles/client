"use client";

import React from "react";
import Steps from "@/components/Checkout/Steps";
import StepForm from "@/components/Checkout/StepForm";
import CartBanner from "@/components/Checkout/CartBanner";
import { useSelector } from "react-redux";

export default function page() {
  const cartItems = useSelector((state) => state.cart.items);

  return (
    <section className="min-h-screen  dark:bg-transparent">
      {cartItems.length > 0 && (
        <div className="mx-auto max-w-3xl ">
          <Steps />
          <div className="w-full p-4 bg-white border rounded-lg shadow-sm sm:p-6 dark:bg-slate-800 dark:border-slate-700">
            <CartBanner />
            <StepForm />
          </div>
        </div>
      )}
    </section>
  );
}
