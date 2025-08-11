"use client";

import React from "react";
import Steps from "@/components/Checkout/Steps";
import StepForm from "@/components/Checkout/StepForm";
import CartBanner from "@/components/Checkout/CartBanner";

export default function page() {
  return (
    <section className="min-h-screen  dark:bg-transparent">
      <div className="mx-auto max-w-3xl ">
        <Steps />
        <div className="w-full p-4 bg-white border rounded-lg shadow-sm sm:p-6 dark:bg-slate-800 dark:border-slate-700">
          <CartBanner />
          <StepForm />
        </div>
      </div>
    </section>
  );
}
