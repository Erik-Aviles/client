import { Pencil } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function EditBtn({ id, endpoint, title }) {
  const [loading, setLoading] = useState(false);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  console.log(title)

  return (
    <Link
      href={`${baseUrl}/dashboard/${endpoint}/update/${id}`}
      className="font-medium text-lime-600 flex items-center space-x-2"
    >
      <Pencil className="w-2 h-2 text-lime-600" />
      <span>Editar</span>
    </Link>
  );
}
