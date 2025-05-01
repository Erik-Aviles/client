import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Sidebar() {
  return (
    <div className="bg-slate-50 dark:bg-slate-700 space-y-6 w-52 h-screen text-slate-500 dark:text-amber-400  fixed left-0 top-0">
      <span className="p-3 flex items-center justify-center h-16" >
        {/* <Image
          src="/betimesCompany.png"
          alt="Logo de la empresa"
          width={150}
          height={40}
        /> */}
       <Link href={"/"}> BETIMES COMPANY</Link>
      </span>
      <div className=" space-y-3 flex flex-col p-3">
        <Link href={"#"}>Panel</Link>
        <Link href={"#"}>Catalogo</Link>
        <Link href={"#"}>Clientes</Link>
        <Link href={"#"}>Mercados</Link>
        <Link href={"#"}>Farmers</Link>
        <Link href={"#"}>Ordenes</Link>
        <Link href={"#"}>Empleados</Link>
        <Link href={"#"}>Configuración</Link>
        <Link href={"#"}>Tienda en línea</Link>
      </div>
    </div>
  );
}
