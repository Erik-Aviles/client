import FormHeader from "@/components/backoffice/FormHeader";
import NewCategoryForm from "@/components/backoffice/forms/NewCategoryForm";

export default function NewCategory() {
  return (
    <div className="h-[calc(100vh-40px)] flex flex-col pb-4">
      <FormHeader title="Nueva categoría" />
      <div className="flex-1 overflow-auto">
        <NewCategoryForm />
      </div>
    </div>
  );
}
