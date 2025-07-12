import NewSupplierForm from "@/components/backoffice/forms/NewSupplierForm";

export default async function NewSupplier({
  initialData = {},
  isUpdate = false,
}) {
  // const usersData = await getData("users");
  // const suppliers = usersData
  //   ?.filter((user) => user.role === "SUPPLIER")
  //   ?.map((supplier) => {
  //     return { id: supplier.id, title: supplier.name };
  //   });
  return (
    <NewSupplierForm
      isUpdate={isUpdate}
      initialData={initialData}
      // user={suppliers}
    />
  );
}
