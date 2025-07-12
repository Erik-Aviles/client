import { Plus } from "lucide-react";
import Link from "next/link";

export default function AddBtn({ endpoint, title }) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  return (
    <Link
      title={`Agregar ${title}`}
      href={`${baseUrl}/dashboard/${endpoint}/new`}
      className="capitalize text-white bg-blue-700 hover:bg-blue-600 focus:ring-4 focus:ring-blue-bg-blue-400/50 focus:outline-none font-medium rounded-lg text-xs px-3 py-2 text-center inline-flex gap-2 items-center dark:focus:ring-blue-bg-blue-400/50"
    >
      <Plus className="w-4 h-4" />
      <span className="hidden lg:inline">Agregar</span>
    </Link>
  );
}
