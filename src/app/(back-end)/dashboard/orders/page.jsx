import React from "react";
import Heading from "@/components/backoffice/styledComponent/Heading";

export default async function Orders() {
  return (
    <div className="h-[calc(100vh-40px)] flex flex-col gap-3">
      <div className="px-4 md:px-6">
        <Heading title="Pedidos" />
      </div>
    </div>
  );
}
