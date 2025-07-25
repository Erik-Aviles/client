import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import LargeCards from "@/components/backoffice/order/LargeCards";
import DataOrders from "@/components/backoffice/order/DataOrders";
import SmallCards from "@/components/backoffice/order/SmallCards";
import UserDashboard from "@/components/backoffice/UserDashboard";
import Heading from "@/components/backoffice/styledComponent/Heading";
import SupplierDashboard from "@/components/backoffice/SupplierDashboard";
import DashboardCharts from "@/components/backoffice/sales/DashboardCharts";

export default async function page() {
  const session = await getServerSession(authOptions);
  const role = session?.user?.role;

  if (role === "USER") {
    return <UserDashboard />;
  }
  if (role === "SUPPLIER") {
    return <SupplierDashboard />;
  }

  return (
    <div className="h-[calc(100vh-40px)] w-full flex flex-col gap-6">
      <div className="px-4 md:px-6">
        <Heading title="PANEL GENERAL" />
      </div>
      <div className="flex-1 flex flex-col overflow-auto px-4 md:px-6 pb-6 gap-8">
        <LargeCards />
        <SmallCards />
        <DashboardCharts />
        <DataOrders />
      </div>
    </div>
  );
}
