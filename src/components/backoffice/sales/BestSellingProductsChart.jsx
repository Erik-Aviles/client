"use client";
import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { salesCharts } from "@/utils/order/data";
import SubTitle3 from "../styledComponent/SubTitle3";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function BestSellingProductsChart() {
  return (
    <div className="dark:bg-slate-700 bg-white rounded-lg p-8">
       <SubTitle3 title="Gráfico de productos más vendidos" />
      <div className="p-4">
        <Pie data={salesCharts} />
      </div>
    </div>
  );
}
