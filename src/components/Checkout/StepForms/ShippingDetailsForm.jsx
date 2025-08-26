"use client";

import React, { useEffect, useState } from "react";
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

export default function ShippingDetailsForm({ user, isLoading }) {
  const dispatch = useDispatch();
  const shippingInfo = useSelector((state) => state.checkout.shippingInfo);
  const shippingCost = useSelector((state) => state.cart.totals.shippingCost);
  const [loading, setLoading] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const profile = user
    ? (user.profile ?? user.supplierProfile ?? user.staffProfile ?? null)
    : null;

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const hasShippingInfo =
      shippingInfo && Object.keys(shippingInfo).length > 0;
    const hasProfile = profile && Object.keys(profile).length > 0;

    if (!initialized && !isLoading && (hasShippingInfo || hasProfile)) {
      reset(
        hasShippingInfo
          ? {
              ...(shippingInfo || {}),
              shippingCost: String(shippingCost ?? ""),
            }
          : {
              streetAddress: profile?.address ?? "",
              city: profile?.city ?? "",
              province: profile?.province ?? "",
              country: profile?.country ?? "",
              zipCode: profile?.zipCode ?? "",
              shippingCost: String(shippingCost ?? ""),
            }
      );
      setInitialized(true);
    }
  }, [profile, shippingInfo, shippingCost, isLoading, initialized, reset]);

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
        title="Esta información se utilizará para el envio y/o la facturación del pedido."
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
            name="province"
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
