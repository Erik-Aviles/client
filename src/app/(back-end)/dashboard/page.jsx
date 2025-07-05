import React from "react";
import LargeCards from "@/components/backoffice/order/LargeCards";
import SmallCards from "@/components/backoffice/order/SmallCards";
import DashboardCharts from "@/components/backoffice/sales/DashboardCharts";
import Heading from "@/components/backoffice/styledComponent/Heading";
import DataOrders from "@/components/backoffice/order/DataOrders";

export default function page() {
  return (
    // <div className="w-full flex flex-col gap-10">
    <div className="h-[calc(100vh-40px)] w-full flex flex-col gap-6">
      <div className="pl-6">
        <Heading title="PANEL GENERAL" />
      </div>
      <div className="flex-1 flex flex-col h-full overflow-auto px-6">
        <div className="h-20">
          <LargeCards />
          <SmallCards />
          <DashboardCharts />
          <DataOrders />
        </div>
      </div>
    </div>
  );
}
