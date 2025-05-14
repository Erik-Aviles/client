import React from "react";
import WeeklySalesCharts from "./WeeklySalesCharts";
import BestSellingProductsChart from "./BestSellingProductsChart";
import SubTitle2 from "../styledComponent/SubTitle2";

export default function DashboardCharts() {
  return (
    <section className="flex flex-col gap-4">
      <SubTitle2 title="Grafica de ventas" classNameName="text-blue-500" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <WeeklySalesCharts />
        <BestSellingProductsChart />
      </div>
    </section>
  );
}
