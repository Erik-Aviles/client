import ButtonActions from "@/components/backoffice/ButtonActions";
import Heading from "@/components/backoffice/styledComponent/Heading";

import React from "react";
import { getData } from "@/lib/getData";
import { columns } from "./columns";
import { DataTable } from "@/components/backoffice/DataTable";

export default async function page() {
  const data = await getData("coupons");

  const fieldsToSearch = ["title", "id"];

  return (
    <div className="h-[calc(100vh-40px)] flex flex-col">
      <div className="px-4">
      <Heading title="Cupones" />
      <ButtonActions title="cupones" href="/dashboard/coupons/new" />
      </div>
      <div className="flex-1">
        <DataTable
          columns={columns}
          data={data}
          fieldsToSearch={fieldsToSearch}
          InputPlaceholder="Buscar cupón por nombre..."
        />
      </div>
    </div>
  );
}
