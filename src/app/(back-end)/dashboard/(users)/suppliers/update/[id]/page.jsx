import React from "react";
import { getData } from "@/lib/getData";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import FormHeader from "@/components/backoffice/FormHeader";
import NewSupplierForm from "@/components/backoffice/forms/NewSupplierForm";

export default async function UpdateSupplier({ params }) {
  const session = await getServerSession(authOptions);
  const { id } = await params;
  const supplier = await getData(`suppliers/${id}`);

  return (
    <div className="h-[calc(100vh-40px)] flex flex-col pb-4">
      <FormHeader title="Editar proveedor" />
      <div className="flex-1 overflow-auto">
        <NewSupplierForm
          initialData={supplier}
          currentRole={session?.user?.role}
        />
      </div>
    </div>
  );
}
