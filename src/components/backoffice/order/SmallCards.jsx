import React from "react";
import { ordenData } from "@/utils/order/data";
import SmallCard from "./SmallCard";
import SubTitle2 from "../styledComponent/SubTitle2";

export default function SmallCards() {
  return (
    <section className="flex flex-col gap-4">
      <SubTitle2 title="Ordenes Totales " />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {ordenData?.map((items, index) => (
          <SmallCard key={index} items={items} />
        ))}
      </div>
    </section>

  );
}
