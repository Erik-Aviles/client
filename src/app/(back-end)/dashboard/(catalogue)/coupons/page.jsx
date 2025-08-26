import Heading from "@/components/backoffice/styledComponent/Heading";

import React from "react";
import { getData } from "@/lib/getData";
import { columns } from "./columns";
import { DataTable } from "@/components/backoffice/date-table-components/DataTable";

export default async function page() {
  const data = await getData("coupons");

  const fieldsToSearch = ["title", "id"];

  return (
    <div className="h-[calc(100vh-40px)] flex flex-col gap-3">
      <div className="px-4 md:px-6">
        <Heading title="Cupones" />
      </div>
      <div className="flex-1">
        <DataTable
          columns={columns}
          data={data}
          fieldsToSearch={fieldsToSearch}
          InputPlaceholder="Buscar cupón por nombre..."
          endpoint="coupons"
          title="Cupones"
        />
      </div>
    </div>
  );
}
