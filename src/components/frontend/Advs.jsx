import { Building, CircleDollarSign, HelpCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Advs() {
  return (
    <>
      {" "}
      <div className="basis-1/2 flex flex-col gap-2 justify-between border bg-white dark:bg-slate-800 dark:border rounded-lg p-3 transition-all duration-300 ">
        <Link href={"#"} className="flex items-center space-x-2">
          <HelpCircle className="shrink-0 w-5 h-5 text-amber-600 dark:text-amber-500" />
          <div>
            <h2 className="text-[0.7rem] uppercase">¿Necesitas ayuda?</h2>
            <p className="text-[0.7rem]">Guia para atención al clientes</p>
          </div>
        </Link>
        <Link href={"#"} className="flex items-center space-x-2">
          <CircleDollarSign className="shrink-0 w-5 h-5 text-amber-600 dark:text-amber-500" />
          <div>
            <h2 className="text-[0.7rem] uppercase">¿Como comprar?</h2>
            <p className="text-[0.7rem]">Guia para atención al clientes</p>
          </div>
        </Link>
        <Link href={"#"} className="flex items-center space-x-2">
          <Building className="shrink-0 w-5 h-5 text-amber-600 dark:text-amber-500" />
          <div>
            <h2 className="text-[0.7rem] uppercase">¿Sobre nosotros?</h2>
            <p className="text-[0.7rem]">Guia para atención al clientes</p>
          </div>
        </Link>
      </div>
      <article className="basis-1/2 flex items-end justify-center  bg-white dark:bg-slate-800  rounded-lg ">
        <Image
          src={"/adv.gif"}
          width={300}
          height={200}
          alt="Hero Image"
          className="w-full h-auto rounded-lg"
          unoptimized
        />
      </article>
    </>
  );
}
