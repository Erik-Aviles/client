import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { getCustomerById } from "../../actions";
import FormHeader from "@/components/backoffice/FormHeader";
import CustomerForm from "@/components/backoffice/forms/CustomerForm";

export default async function UpdateCustomer({ params }) {
  const session = await getServerSession(authOptions);
  const { id } = await params;
  const customer = await getCustomerById(id);

  return (
    <div className="h-[calc(100vh-40px)] flex flex-col pb-4">
      <FormHeader title="Editar cliente" />
      <div className="flex-1 overflow-auto p-4">
        <CustomerForm
          initialData={customer}
          currentRole={session?.user?.role}
        />
      </div>
    </div>
  );
}
