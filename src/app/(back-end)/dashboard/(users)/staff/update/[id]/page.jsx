import React from "react";
import { getServerSession } from "next-auth";
import { getStaffById } from "../../actions";
import { authOptions } from "@/lib/authOptions";
import FormHeader from "@/components/backoffice/FormHeader";
import StaffForm from "@/components/backoffice/forms/StaffForm";

export default async function UpdateStaff({ params }) {
  const session = await getServerSession(authOptions);
  const { id } = await params;

  const staff = await getStaffById(id);

  return (
    <div className="h-[calc(100vh-40px)] flex flex-col pb-4">
      <FormHeader title="Editar personal" />
      <div className="flex-1 overflow-auto p-4">
        <StaffForm initialData={staff} currentRole={session?.user?.role} />
      </div>
    </div>
  );
}
