import React from "react";
import LargeCards from "@/components/backoffice/order/LargeCards";
import SmallCards from "@/components/backoffice/order/SmallCards";
import DashboardCharts from "@/components/backoffice/sales/DashboardCharts";
import CustomDataTable from "@/components/backoffice/order/CustomDataTable";
import Heading from "@/components/backoffice/styledComponent/Heading";

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
