"use client";
import React, { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
import { tabsData } from "@/utils/order/data";
import SubTitle3 from "../styledComponent/SubTitle3";

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: false,
      text: "Graficos Line Chart",
    },
  },
};

export default function WeeklySalesCharts() {
  const [chatTodDisplay, setChatTodDisplay] = useState("sales");
  return (
    <div className="dark:bg-slate-700 bg-white rounded-lg p-8 ">
      <SubTitle3 title="Gráficos de ventas semanales" />
        <div className="text-sm font-medium text-center text-gray-400 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
          <ul className="flex flex-wrap -mb-px">
            {tabsData?.map((tab, i) => (
              <li key={i} className="me-2">
                <button
                  onClick={() => setChatTodDisplay(tab?.type)}
                  className={`inline-block p-4 border-b-2 rounded-t-lg ${
                    chatTodDisplay === tab?.type
                      ? "text-orange-600 border-orange-600 active dark:text-orange-500 dark:border-orange-500"
                      : "border-transparent hover:text-gray-600 hover:border-gray-100 dark:hover:text-gray-300"
                  }`}
                >
                  {tab?.title}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {tabsData.map((tab, i) => {
          if (chatTodDisplay === tab?.type) {
            return <Line key={i} options={options} data={tab?.data} />;
          }
          return null;
        })}
      </div>
  );
}
