import React from "react";
import HeroCarousel from "./HeroCarousel";
import SideBarCategories from "./SideBarCategories";
import Advs from "./Advs";
import { getData } from "@/lib/getData";
export default async function Hero() {
  const banners = await getData("banners");

  return (
    // <div className="grid grid-cols-12 gap-4 mb-6">
    <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-10 gap-4 mb-6">
     
      {/* SIDEBAR */}
      <section className="hidden md:col-span-2 md:block bg-white border rounded-lg overflow-y-auto dark:bg-slate-800 ">
        <SideBarCategories />
      </section>
     
      {/*CARRUCEL */}
      <section className="col-span-full md:col-span-6">
        <HeroCarousel slides={banners} />
      </section>

      {/*Anuncios */}
      <section className="hidden lg:col-span-2 lg:flex flex-col gap-4 rounded-md">
        <Advs />
      </section>
    </div>
  );
}
