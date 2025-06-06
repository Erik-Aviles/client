"use client";

import { categories } from "@/utils/general/categories";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import HeroCarousel from "./HeroCarousel";
import { Building, CircleDollarSign, HelpCircle } from "lucide-react";

export default function Hero() {
  const categoryLength = categories.length;

  return (
    // <div className="grid grid-cols-12 gap-4 mb-6">
    <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-10 gap-4 mb-6">
      {/* SIDEBAR */}
      <div className="hidden md:col-span-2 md:block bg-white border rounded-lg overflow-y-auto dark:bg-slate-800 ">
        <h2 className=" dark:text-slate-300 text-base bg-slate-100 dark:bg-slate-700 py-2 px-3 border-b font-semibold">
          Categorías ({categoryLength})
        </h2>
        <div className="flex flex-col gap-3 py-3 px-4 h-[320px] overflow-y-auto dark:text-slate-300">
          {categories.map((category) => {
            return (
              <Link
                key={category?.id}
                className="capitalize text-sm leading-relaxed flex items-center gap-3 rounded-r-sm rounded-l-3xl hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-amber-500 transition-all duration-300 "
                href="#"
              >
                <Image
                  src={category?.imageUrl}
                  width={100}
                  height={100}
                  alt={category?.title}
                  className="w-10 h-10 rounded-full object-cover border border-amber-200 dark:border-amber-700"
                />
                <span className="">{category?.title}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/*CARRUCEL */}
      <div className="col-span-full md:col-span-6 lg:col-span-6">
        <HeroCarousel />
      </div>

      {/*HELPS */}
      <div className="hidden lg:col-span-2 lg:flex flex-col gap-4 rounded-md">
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
          />
        </article>
      </div>
    </div>
  );
}
