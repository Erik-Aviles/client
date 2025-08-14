"use client";

import React, { useState } from "react";
import NavButtons from "../NavButtons";
import { useForm } from "react-hook-form";
import Notification from "@/components/Notification";
import { useDispatch, useSelector } from "react-redux";
import TextInput from "@/components/FormInputs/TextInput";
import {
  nextStep,
  setPersonalInfo,
} from "../../../../redux/slices/checkoutSlice";
import { useSession } from "next-auth/react";

export default function PersonaDetailsForm() {
  const { data: session, status } = useSession();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const personalInfo = useSelector((state) => state.checkout.personalInfo);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ...(personalInfo || {}),
    },
  });

  /* {id, firstName, lastName, expiryDate, isActive} */
  async function proccessData(data) {
    data.userId = status === "authenticated" ? session.user.id : null;
    setLoading(true);
    dispatch(setPersonalInfo(data));
    dispatch(nextStep());
    setLoading(false);
  }

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
        />
        <TextInput
          label="Apellido"
          name="lastName"
          register={register}
          errors={errors}
          className="w-full"
          placeholder="Primer Apellido"
        />
        <TextInput
          label="Correo Electrónico"
          name="email"
          type="email"
          register={register}
          errors={errors}
          className="w-full"
        />
        <TextInput
          label="Número telefónico"
          name="phone"
          type="tel"
          register={register}
          errors={errors}
          className="w-full"
        />
      </div>
      <NavButtons loading={loading} />
    </form>
  );
}
