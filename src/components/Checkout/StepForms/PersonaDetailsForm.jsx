"use client";

import React, { useEffect, useState } from "react";
import NavButtons from "../NavButtons";
import { useForm } from "react-hook-form";
import Notification from "@/components/Notification";
import { useDispatch, useSelector } from "react-redux";
import TextInput from "@/components/FormInputs/TextInput";
import {
  nextStep,
  setPersonalInfo,
} from "../../../../redux/slices/checkoutSlice";

export default function PersonaDetailsForm({ user, isLoading }) {
  const dispatch = useDispatch();
  const personalInfo = useSelector((state) => state.checkout.personalInfo);

  const [loading, setLoading] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const profile = user
    ? (user.profile ?? user.supplierProfile ?? user.staffProfile ?? null)
    : null;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    const hasPersonalInfo =
      personalInfo && Object.keys(personalInfo).length > 0;

    if (!initialized && !isLoading && (hasPersonalInfo || user)) {
      reset(
        hasPersonalInfo
          ? personalInfo
          : {
              firstName: user.firstName ?? "",
              lastName: user.lastName ?? "",
              email: user.email ?? "",
              phone: profile?.phone ?? "",
            }
      );
      setInitialized(true);
    }
  }, [personalInfo, user, isLoading, initialized, reset]);

  async function proccessData(data) {
    data.userId = user?.id ?? null;
    setLoading(true);
    dispatch(setPersonalInfo(data));
    dispatch(nextStep());
    setLoading(false);
  }
  if (isLoading) return <p>Cargando datos del usuario...</p>;

  return (
    <form onSubmit={handleSubmit(proccessData)}>
      <Notification
        title="Esta información se utilizará para el envio del pedido"
        text="Por favor, lea cuidadosamente si los campos con la información guardada
            son los requeridos, caso contrario pueden ser editados."
      />
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 pt-4 pb-8">
        <TextInput
          label="nombre"
          name="firstName"
          register={register}
          errors={errors}
          className="w-full"
          placeholder="Primer nombre"
          format="capitalize"
        />
        <TextInput
          label="Apellido"
          name="lastName"
          register={register}
          errors={errors}
          className="w-full"
          placeholder="Primer Apellido"
          format="capitalize"
        />
        <TextInput
          label="Correo Electrónico"
          name="email"
          type="email"
          register={register}
          errors={errors}
          className="w-full"
          format="lowercase"
        />
        <TextInput
          label="Número telefónico"
          name="phone"
          type="tel"
          register={register}
          errors={errors}
          className="w-full"
          format="capitalize"
        />
      </div>
      <NavButtons loading={loading} />
    </form>
  );
}
