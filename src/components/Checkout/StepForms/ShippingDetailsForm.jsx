"use client";

import React, { useState } from "react";
import NavButtons from "../NavButtons";
import { useForm } from "react-hook-form";
import { MoveRight, Truck } from "lucide-react";
import Notification from "@/components/Notification";
import TextInput from "@/components/FormInputs/TextInput";
import RadioGroupInput from "@/components/FormInputs/RadioGroupInput";
import { useDispatch, useSelector } from "react-redux";
import {
  nextStep,
  setShippingInfo,
} from "../../../../redux/slices/checkoutSlice";
import { companyData } from "@/utils/general/companyData";
import { updateCartTotals } from "../../../../redux/slices/cartSlice";

export default function ShippingDetailsForm() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const shippingInfo = useSelector((state) => state.checkout.shippingInfo);
  const shippingCost = useSelector((state) => state.cart.totals.shippingCost);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ...(shippingInfo || {}),
      shippingCost: shippingCost.toString() || "",
    },
  });

  /* {streetAddress, city, country, zipCode} */
  async function proccessData(data) {
    setLoading(true);

    const { shippingCost, ...addressData } = data;
    dispatch(setShippingInfo(addressData));
    dispatch(
      updateCartTotals({
        shippingCost: Number(shippingCost),
      })
    );
    dispatch(nextStep());
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit(proccessData)}>
      <Notification
        title="Esta información se utilizará para el envio y/o la facturacion del pedido."
        text="Por favor, lea cuidadosamente si los campos con la información guardada
      son los correctos, caso contrario pueden ser editados y guardados."
      />
      <div className="grid gap-4 grid-cols-2 sm:gap-6 pt-4 pb-8">
        <TextInput
          label="Dirreción - calle"
          name="streetAddress"
          register={register}
          errors={errors}
          placeholder="Av. Jaime roldos aguilera y cuadragesima septima, callejon 5A"
          className="col-span-2"
        />
        <div className="col-span-2 flex gap-4 ">
          <TextInput
            label="Ciudad"
            name="city"
            register={register}
            errors={errors}
            className="w-full"
          />
          <TextInput
            label="Provincia"
            name="city"
            register={register}
            errors={errors}
            className="w-full"
          />
        </div>
        <div className="col-span-2 flex gap-4 ">
          <TextInput
            label="Pais"
            name="country"
            register={register}
            errors={errors}
            className="w-full"
          />
          <TextInput
            label="Código postal"
            name="zipCode"
            register={register}
            errors={errors}
            className="w-full"
            isRequired={false}
          />
        </div>
        <RadioGroupInput
          name="shippingCost"
          label="¿Como deseas recibir tu pedido?"
          control={control}
          errors={errors}
          isRequired={true}
          message="Por favor escojer una opcion de envio."
          options={companyData?.shippingOptions.map((option) => ({
            id: option.id,
            value: option.value.toString(),
            title: `$${option.value}`,
            subTitle: option.title,
            description: option.description,
            tooltip: option.estimatedTime,
            iconLeft: Truck,
            iconRight: MoveRight,
          }))}
          className="w-full col-span-2"
        />
      </div>
      <NavButtons loading={loading} />
    </form>
  );
}
