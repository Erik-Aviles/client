"use client";

import React from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { ChevronRight } from "lucide-react";
import { checkoutSteps } from "@/utils/general/checkoutSteps";

export default function Steps() {
  const currentStep = useSelector((state) => state.checkout.currentStep);
  return (
    <nav className="flex items-center mb-8">
      <ol
        role="list"
        className="flex flex-wrap gap-y-5 md:gap-y-0 items-center gap-x-1.5"
      >
        <li>
          <div className="-m-1">
            <Link
              href="/cart"
              title="Carrito"
              className="inline-flex items-center p-1 text-sm md:text-base font-medium text-gray-500 rounded-md focus:outline-none focus:ring-2 focus:text-gray-900 focus:ring-gray-900 hover:text-gray-700"
            >
              Carrito
            </Link>
          </div>
        </li>

        {checkoutSteps?.map((step) => {
          const isActive = currentStep === step.id;
          return (
            <li key={step.id}>
              <div className="flex items-center">
                <ChevronRight className="flex-shrink-0 w-4 h-4 text-gray-400" />
                <div className="-m-1">
                  <p
                    title={step?.title}
                    className={`p-1 ml-1.5 text-xs md:text-sm font-medium rounded-md ${
                      isActive ? "text-white bg-gray-900" : "text-gray-500"
                    }`}
                  >
                    {step?.title}
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
