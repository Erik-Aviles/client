import React from "react";
import MarketCarousel from "./MarketCarousel";
import CategoryCarousel from "./CategoryCarousel";

export default function MarketList() {
  return (
    <div className=" dark:text-white p-4 mb-6  rounded-lg">
      <h2 className="dark:text-slate-50 text-center text-2xl font-semibold uppercase">
        Lista de categorias
      </h2>
      <MarketCarousel />
    </div>
  );
}
