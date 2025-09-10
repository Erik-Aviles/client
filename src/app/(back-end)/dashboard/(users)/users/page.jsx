import React from "react";
import { getUsers } from "./actions";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import Heading from "@/components/backoffice/styledComponent/Heading";
import { columns, fieldsToSearch, initialColumnVisibility } from "./columns";
import { DataTable } from "@/components/backoffice/date-table-components/DataTable";

export default async function UserPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return <p className="text-center text-gray-500">No autorizado</p>;
  }

  const { success, data: users, message } = await getUsers();

  if (!success) {
    return (
      <p className="text-center text-red-500">
        {message || "Error cargando usuarios"}
      </p>
    );
  }

  return (
    <div className="h-[calc(100vh-40px)] flex flex-col gap-3">
      <div className="px-4 md:px-6">
        <Heading title="Usuarios" />
      </div>
      <div className="flex-1">
        <DataTable
          columns={columns}
          data={users}
          initialColumnVisibility={initialColumnVisibility}
          fieldsToSearch={fieldsToSearch}
          inputPlaceholder="Buscar usuario por nombre, email."
          endpoint="users"
          title="usuarios"
        />
      </div>
    </div>
  );
}
