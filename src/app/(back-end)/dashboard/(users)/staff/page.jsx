import React from "react";
import { getStaff } from "./actions";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import Heading from "@/components/backoffice/styledComponent/Heading";
import { columns, fieldsToSearch, initialColumnVisibility } from "./columns";
import { DataTable } from "@/components/backoffice/date-table-components/DataTable";

export default async function StaffPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return <p className="text-center text-gray-500">No autorizado</p>;
  }

  let staff = [];

  try {
    const allStaff = await getStaff();
    staff = allStaff;
    console.log("Personal cargado:", staff);
  } catch (error) {
    console.error("Error cargando personal:", error);
    return <p className="text-center text-red-500">Error cargando personal</p>;
  }

  return (
    <div className="h-[calc(100vh-40px)] flex flex-col gap-3">
      <div className="px-4 md:px-6">
        <Heading title="Personal" />
      </div>
      <div className="flex-1">
        <DataTable
          columns={columns}
          data={staff}
          initialColumnVisibility={initialColumnVisibility}
          fieldsToSearch={fieldsToSearch}
          inputPlaceholder="Buscar personal por nombre, cédula, email, código de usuario."
          endpoint="staff"
          title="personal"
        />
      </div>
    </div>
  );
}
