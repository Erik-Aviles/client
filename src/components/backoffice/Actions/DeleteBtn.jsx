"use cliente";

import React, { useState } from "react";
import { Trash2 } from "lucide-react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { LoadingIcon } from "@/components/Icons/Loading";

export default function DeleteBtn({ id, endpoint = "#" }) {
  console.log({ id, endpoint });
  const [loading, setLoading] = useState(false);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const router = useRouter();

  async function handleDelete() {
    setLoading(true);
    Swal.fire({
      title: "Estas seguro?",
      text: "No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminarlo!",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await fetch(`${baseUrl}/api/${endpoint}?id=${id}`, {
          method: "DELETE",
        });
        console.log(res);
        if (res.ok) {
          router.refresh();
          setLoading(false);
          toast.success("Eliminado con éxito");
        }
      } else {
        setLoading(false);
      }
    });
  }
  return (
    <>
      {loading ? (
        <button
          disabled
          type="button"
          className="w-full text-red-600 hover:text-red-800 font-medium text-[0.5rem] px-2 py-1 text-center inline-flex gap-2 items-center cursor-not-allowed"
        >
          <LoadingIcon className="text-red-600" />
          <span>Eliminando...</span>
        </button>
      ) : (
        <button
          onClick={handleDelete}
          className="px-2 font-medium text-red-600 hover:text-red-800 hover:dark:text-red-500 flex items-center space-x-1"
        >
          <Trash2 className="w-4 h-4" />
          <span>Eliminar</span>
        </button>
      )}
    </>
  );
}
