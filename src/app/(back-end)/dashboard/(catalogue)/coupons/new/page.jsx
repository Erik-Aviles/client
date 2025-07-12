import FormHeader from "@/components/backoffice/FormHeader";
import NewCouponForm from "@/components/backoffice/forms/NewCouponForm";

export default function NewCoupon() {
  return (
    <div className="h-[calc(100vh-40px)] flex flex-col pb-4">
      <FormHeader title="Nuevo cupon" />
      <div className="flex-1 overflow-auto">
        <NewCouponForm />
      </div>
    </div>
  );
}
