import { getData } from "@/lib/getData";
import { columns, Payment } from "./columns";
import { DataTable } from "./data-table";

// async function getData() {
//   // Fetch data from your API here.
//   return [
//     {
//       id: "728ed52f",
//       imageUrl: "peque",
//       title: "pending",
//       isActive: "Activo",
//       description: "erikam@example.com",
//       createdAt: "2025-06-14T19:47:29.061Z",
//       products: "1",
//       marketIds: "2",
//     },
//     // ...
//   ];
// }

export default async function DemoPage() {
  const data = await getData("categories");
  

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
