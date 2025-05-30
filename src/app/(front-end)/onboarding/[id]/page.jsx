import NewSupplierForm from "@/components/backoffice/NewSupplierForm";
import { getData } from "@/lib/getData";
import React from "react";

export default async function page({ params }) {
  const { id } = await params;
  const user = await getData(`users/${id}`);

  return (
    <div className="flex flex-col gap-6 p-16">
      <div className="max-w-4xl p-4 mx-auto">
        <h2>Hola {user?.name}, Cuenta más sobre ti</h2>
      </div>
      <NewSupplierForm user={user} isUpdate={true} />
    </div>
  );
}
