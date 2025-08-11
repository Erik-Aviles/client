"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { prevStep } from "../../../redux/slices/checkoutSlice";
import { LoadingIcon } from "../Icons/Loading";

export default function NavButtons({ onSubmit, loading }) {
  const dispatch = useDispatch();
  const currentStep = useSelector((state) => state.checkout.currentStep);

  const handlePreviousStep = () => {
    dispatch(prevStep());
  };

  return (
    <div
      className={
        currentStep === 1 ? "text-end" : "flex items-center justify-between"
      }
    >
      {currentStep > 1 && (
        <button
          type="button"
          onClick={handlePreviousStep}
          className="inline-flex items-center justify-center px-6 py-3 text-sm font-bold text-white transition-all duration-200 bg-gray-900 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 hover:bg-gray-700"
        >
          <ChevronLeft />
          <span className="hidden xs:block text-xs sm:text-md">
            Anterior paso
          </span>
        </button>
      )}
      <button
        type="submit"
        onClick={onSubmit}
        className="inline-flex items-center justify-center px-6 py-3 text-sm font-bold text-white transition-all duration-200 bg-gray-900 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 hover:bg-gray-700 disabled:bg-gray-500"
      >
        {loading ? (
          <LoadingIcon />
        ) : (
          <>
            <span className="hidden xs:block text-xs sm:text-md">
              {currentStep === 4 ? "Proceder al pago" : "Siguiente paso"}
            </span>
            <ChevronRight />
          </>
        )}
      </button>
    </div>
  );
}
