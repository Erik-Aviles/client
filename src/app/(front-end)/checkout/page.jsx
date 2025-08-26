"use client";

import React from "react";
import Steps from "@/components/Checkout/Steps";
import StepForm from "@/components/Checkout/StepForm";
import CartBanner from "@/components/Checkout/CartBanner";
import { useSelector } from "react-redux";
import Link from "next/link";
import { Home } from "lucide-react";

export default function page() {
  const cart = useSelector((state) => state.cart);

  return (
    <section className="min-h-screen dark:bg-transparent">
      {cart?.items.length !== 0 ? (
        <div className="mx-auto max-w-3xl">
          <Steps />
          <div className="w-full p-4 bg-white border rounded-lg shadow-sm sm:p-6 dark:bg-slate-800 dark:border-slate-700">
            <CartBanner />
            <StepForm />
          </div>
        </div>
      ) : (
        <div className="h-full flex justify-center items-center py-60 max-w-3xl">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 dark:border-slate-600 px-4 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/40"
          >
            <Home className="h-4 w-4" />
            Volver al inicio
          </Link>
        </div>
      )}
    </section>
  );
}
