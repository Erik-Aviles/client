"use client";

import React from "react";
import { useSelector } from "react-redux";
import OrderSummary from "./StepForms/OrderSummary";
import useCurrentUser from "@/hooks/useCurrentUser";
import Heading from "../backoffice/styledComponent/Heading";
import { checkoutSteps } from "@/utils/general/checkoutSteps";
import PaymentMethodForm from "./StepForms/PaymentMethodForm";
import PersonaDetailsForm from "./StepForms/PersonaDetailsForm";
import ShippingDetailsForm from "./StepForms/ShippingDetailsForm";

export default function StepForm() {
  const currentStep = useSelector((state) => state.checkout.currentStep);
  const currentStepData = checkoutSteps.find((step) => step.id === currentStep);
  const { user, isLoading } = useCurrentUser();

  function renderStepForms(step) {
    switch (step) {
      case 1:
        return <PersonaDetailsForm user={user} isLoading={isLoading} />;
      case 2:
        return <ShippingDetailsForm user={user} isLoading={isLoading} />;
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
