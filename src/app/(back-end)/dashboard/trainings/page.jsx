import ButtonActions from "@/components/backoffice/ButtonActions";
import { DataTable } from "@/components/backoffice/date-table-components/DataTable";
import SearchForm from "@/components/backoffice/SearchForm";
import Heading from "@/components/backoffice/styledComponent/Heading";
import SubTitle2 from "@/components/backoffice/styledComponent/SubTitle2";
import { getData } from "@/lib/getData";
import React from "react";
import { columns } from "./columns";

export default async function page() {
  const data = await getData("trainings");
  const initialColumnVisibility = {
    categoryId: false,
  };
  const fieldsToSearch = ["title", "id"];
  return (
    <div className="flex flex-col gap-4">
      <div className="h-[calc(100vh-40px)] flex flex-col gap-3">
        <div className="px-4 md:px-6">
          <Heading title="capacitaciones" />
        </div>
        <div className="flex-1">
          <DataTable
            columns={columns}
            data={data}
            initialColumnVisibility={initialColumnVisibility}
            fieldsToSearch={fieldsToSearch}
            inputPlaceholder="Buscar capacitación por nombre..."
            addLink="dashboard/trainings"
            title="capacitaciones"
          />
        </div>
      </div>
    </div>
  );
}
