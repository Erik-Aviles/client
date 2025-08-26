import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import FormHeader from "@/components/backoffice/FormHeader";
import NewSupplierForm from "@/components/backoffice/forms/NewSupplierForm";

export default async function NewSupplier() {
  const session = await getServerSession(authOptions);

  return (
    <div className="h-[calc(100vh-40px)] flex flex-col pb-4">
      <FormHeader title="Nuevo proveedor" />
      <div className="flex-1 overflow-auto px-4">
        <NewSupplierForm currentRole={session?.user?.role} />
      </div>
    </div>
  );
}
