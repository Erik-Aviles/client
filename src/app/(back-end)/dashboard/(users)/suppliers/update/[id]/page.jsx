import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { getSupplierById } from "../../actions";
import FormHeader from "@/components/backoffice/FormHeader";
import SupplierForm from "@/components/backoffice/forms/SupplierForm";

export default async function UpdateSupplier({ params }) {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  if (!session) {
    return <p className="text-center text-gray-500">No autorizado</p>;
  }
  const { success, data: supplier, message } = await getSupplierById(id);

  if (!success) {
    return (
      <p className="text-center text-red-500">
        {message || "Error cargando proveedores"}
      </p>
    );
  }

  return (
    <div className="h-[calc(100vh-40px)] flex flex-col pb-4">
      <FormHeader title="Editar proveedor" />
      <div className="flex-1 overflow-auto">
        <SupplierForm
          initialData={supplier}
          currentRole={session?.user?.role}
        />
      </div>
    </div>
  );
}
