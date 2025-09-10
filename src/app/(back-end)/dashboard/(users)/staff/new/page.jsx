import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import FormHeader from "@/components/backoffice/FormHeader";
import StaffForm from "@/components/backoffice/forms/StaffForm";

export default async function NewSupplier() {
  const session = await getServerSession(authOptions);

  return (
    <div className="h-[calc(100vh-40px)] flex flex-col pb-4">
      <FormHeader title="Nuevo personal" />
      <div className="flex-1 overflow-auto px-4">
        <StaffForm currentRole={session?.user?.role} />
      </div>
    </div>
  );
}
