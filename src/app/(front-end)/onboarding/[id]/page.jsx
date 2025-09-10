import React from "react";
import { getData } from "@/lib/getData";
import SupplierForm from "@/components/backoffice/forms/SupplierForm";

export default async function OnboardingPage({ params }) {
  const { id } = await params;
  const user = await getData(`users/${id}`);

  if (!user) {
    return <p>Usuario no encontrado</p>;
  }

  return (
    <section className="flex flex-col gap-3">
      <h2>
        Hola{" "}
        <span className="font-medium capitalize">
          {user?.firstName} {user?.lastName}
        </span>
        , cuenta más sobre ti...
      </h2>
      <SupplierForm initialData={user} />
    </section>
  );
}
