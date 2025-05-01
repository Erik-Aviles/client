import React from "react";
import LargeCards from "@/components/backend/order/LargeCards";
import SmallCards from "@/components/backend/order/SmallCards";
import DashboardCharts from "@/components/backend/sales/DashboardCharts";
import CustomDataTable from "@/components/backend/order/CustomDataTable";
import Heading from "@/components/backend/styledComponent/Heading";

export default function page() {
  return (
    <div className="w-full flex flex-col gap-10">
      <Heading title="PANEL GENERAL" />
      <LargeCards />
      <SmallCards />
      <DashboardCharts />
      <CustomDataTable />
    </div>
  );
}
