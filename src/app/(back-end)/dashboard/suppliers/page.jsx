import ButtonActions from "@/components/backoffice/ButtonActions";
import Search from "@/components/backoffice/Search";
import Heading from "@/components/backoffice/styledComponent/Heading";
import SubTitle2 from "@/components/backoffice/styledComponent/SubTitle2";
import React from "react";

export default function Supplier() {
  return (
    <div className="flex flex-col gap-4">
      <Heading title="Proveedores" className="" />
      <ButtonActions title="proveedores" href="/dashboard/suppliers/new" />
      <Search placeholder="Buscar proveedor por nombre..." />
      <div className="overflow-hidden border border-border dark:bg-slate-700 rounded-lg p-4">
       <SubTitle2 title="Tabla" />
       
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Nombre
              </th>
              <th scope="col" className="px-6 py-3">
                Descripcion
              </th>
              <th scope="col" className="px-6 py-3">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </div>
  );
}
