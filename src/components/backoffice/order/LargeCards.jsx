import React from "react";
import LargeCard from "./LargeCard";
import { orderPeriod } from "@/utils/order/data";
import SubTitle2 from "../styledComponent/SubTitle2";

export default function LargeCards() {
  return (
    <section className="flex flex-col gap-4">
      <SubTitle2 title="Historial de Ordenes " />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {orderPeriod?.map((items, index) => (
          <LargeCard key={index} items={items} />
        ))}
      </div>
    </section>
  );
}
