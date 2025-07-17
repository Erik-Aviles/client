import React from "react";
import MarketCarousel from "./MarketCarousel";
import { getData } from "@/lib/getData";

export default async function MarketList() {
  const markets = await getData("/markets");
  if (!markets || markets.length === 0) {
    return null;
  }
  return (
    <div className=" dark:text-white mb-6 rounded-lg">
      <h2 className="dark:text-slate-50 text-center text-2xl font-semibold uppercase">
        Lista de Negocios
      </h2>
      <MarketCarousel markets={markets} />
    </div>
  );
}
