import NewSupplierForm from "@/components/backoffice/forms/NewSupplierForm";
import { getData } from "@/lib/getData";
import React from "react";

export default async function page({ params }) {
  const { id } = await params;
  const user = await getData(`users/${id}`);

  return (
    <section className="flex flex-col gap-3">
      <h2>Hola {user?.name}, Cuenta más sobre ti...</h2>
      <NewSupplierForm initialData={user} />
    </section>
  );
}
