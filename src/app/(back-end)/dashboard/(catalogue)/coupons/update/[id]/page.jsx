import React from "react";
import { getData } from "@/lib/getData";
import FormHeader from "@/components/backoffice/FormHeader";
import CouponForm from "@/components/backoffice/forms/CouponForm";

export default async function UptateCoupon({ params }) {
  const { id } = await params;
  const coupon = await getData(`coupons/${id}`);
  return (
    <div className="h-[calc(100vh-40px)] flex flex-col pb-4">
      <FormHeader title="Editar cupon" />
      <div className="flex-1 overflow-auto">
        <CouponForm initialData={coupon} />
      </div>
    </div>
  );
}
