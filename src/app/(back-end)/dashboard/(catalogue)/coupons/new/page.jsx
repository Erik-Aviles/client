import FormHeader from "@/components/backoffice/FormHeader";
import CouponForm from "@/components/backoffice/forms/CouponForm";

export default function NewCoupon() {
  return (
    <div className="h-[calc(100vh-40px)] flex flex-col pb-4">
      <FormHeader title="Nuevo cupon" />
      <div className="flex-1 overflow-auto">
        <CouponForm />
      </div>
    </div>
  );
}
