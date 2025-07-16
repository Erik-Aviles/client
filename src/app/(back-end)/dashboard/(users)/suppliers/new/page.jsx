import FormHeader from "@/components/backoffice/FormHeader";
import NewSupplierForm from "@/components/backoffice/forms/NewSupplierForm";

export default async function NewSupplier() {
  return (
    <div className="h-[calc(100vh-40px)] flex flex-col pb-4">
      <FormHeader title="Nuevo proveedor" />
      <div className="flex-1 overflow-auto">
        <NewSupplierForm />
      </div>
    </div>
  );
}
