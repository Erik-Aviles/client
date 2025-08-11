"use client";

import React from "react";
import { useSelector } from "react-redux";
import OrderSummary from "./StepForms/OrderSummary";
import Heading from "../backoffice/styledComponent/Heading";
import { checkoutSteps } from "@/utils/general/checkoutSteps";
import PaymentMethodForm from "./StepForms/PaymentMethodForm";
import PersonaDetailsForm from "./StepForms/PersonaDetailsForm";
import ShippingDetailsForm from "./StepForms/ShippingDetailsForm";

export default function StepForm() {
  const currentStep = useSelector((state) => state.checkout.currentStep);
  const currentStepData = checkoutSteps.find((step) => step.id === currentStep);

  function renderStepForms(step) {
    switch (step) {
      case 1:
        return <PersonaDetailsForm />;
      case 2:
        return <ShippingDetailsForm />;
      case 3:
        return <PaymentMethodForm />;
      case 4:
        return <OrderSummary />;
      default:
        return null;
    }
  }
  return (
    <div className="mt-4">
      <Heading title={currentStepData?.title} />
      {renderStepForms(currentStep)}
    </div>
  );
}
