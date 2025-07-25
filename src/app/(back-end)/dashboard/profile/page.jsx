import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import Heading from "@/components/backoffice/styledComponent/Heading";

export default async function Profile() {
  const session = await getServerSession(authOptions);

  if (!session) return;

  const name = session?.user?.name;
  return (
    <div className="h-[calc(100vh-48px)] flex flex-col gap-3 px-4 md:px-6">
      <Heading title="Mi cuenta" />
      <h2 className="text-white capitalize">Bienvenida! {name}.</h2>
      <div className="flex-1">
        <div className="overflow-auto ">hola</div>
      </div>
    </div>
  );
}
