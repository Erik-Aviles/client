"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import RadioGroupInput from "@/components/FormInputs/RadioGroupInput";
import NavButtons from "../NavButtons";
import { HeartHandshake, MoveRight, WalletCards } from "lucide-react";
import Notification from "@/components/Notification";
import { useDispatch, useSelector } from "react-redux";
import {
  nextStep,
  setPaymentInfo,
} from "../../../../redux/slices/checkoutSlice";

export default function PaymentMethodForm() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const paymentInfo = useSelector((state) => state.checkout.paymentInfo);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ...(paymentInfo || {}),
    },
  });

  /* {paymentMethod} */
  async function proccessData(data) {
    setLoading(true);
    dispatch(setPaymentInfo(data));
    dispatch(nextStep());
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit(proccessData)}>
      <Notification title="El proceamiento del pago con tarjeta de credito lo maneja el mismo banco." />
      <div className="grid gap-4 grid-cols-2 sm:gap-6 pt-4 pb-8">
        <RadioGroupInput
          name="paymentMethod"
          label="¿Cúal método de pago prefiere?"
          control={control}
          errors={errors}
          isRequired={true}
          message="Por favor escojer una opcion de pago."
          options={[
            {
              value: "CASH",
              title: "Efectivo",
              subTitle: "Pago en Efectivo",
              description: "Contra entrega al recibir el producto",
              iconLeft: HeartHandshake,
              iconRight: MoveRight,
            },
            {
              value: "CARD",
              title: "Tarjeta",
              subTitle: "Pago con Tarjeta de Credito",
              description: "El banco procesa el pago",
              iconLeft: WalletCards,
              iconRight: MoveRight,
            },
          ]}
          className="w-full col-span-2"
        />
      </div>
      <NavButtons loading={loading} />
    </form>
  );
}
