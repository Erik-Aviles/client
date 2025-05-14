import React from "react";
import { Download, Plus, Share } from "lucide-react";
import Link from "next/link";

export default function ButtonActions({ title, href }) {
  return (
    <div className="flex items-center flex-wrap sm:flex-nowrap gap-3 justify-between text-slate-800 border border-border dark:bg-slate-700 rounded-lg p-4">
      <div className="flex items-center gap-2">
        <button
          type="button"
          className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 hover:border-gray-500 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-xs px-3 py-2.5 text-center inline-flex gap-2 items-center dark:focus:ring-gray-600 dark:bg-gray-900 dark:border-gray-400 dark:text-white dark:hover:bg-gray-800"
        >
          <Share />
          <span className="hidden lg:inline">{"Exportar"}</span>
        </button>
        <button
          type="button"
          className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 hover:border-gray-500  focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-xs px-3 py-2.5 text-center inline-flex gap-2 items-center dark:focus:ring-gray-600 dark:bg-gray-900 dark:border-gray-400 dark:text-white dark:hover:bg-gray-700"
        >
          <Download />
          <span className="hidden lg:inline">{"Importar"}</span>
        </button>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          className="capitalize text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-bg-green-400/50 focus:outline-none font-medium rounded-lg text-xs px-3 py-2 text-center inline-flex gap-2 items-center dark:focus:ring-green-bg-green/50 "
        >
          <Plus />
          <span className="hidden lg:inline">{"Editar " + title}</span>
        </button>
        <button
          type="button"
          className="capitalize text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-bg-red-400/50 focus:outline-none font-medium rounded-lg text-xs px-3 py-2 text-center inline-flex gap-2 items-center dark:focus:ring-red-bg-red/50 "
        >
          <Plus />
          <span className="hidden lg:inline">{"Eliminar " + title}</span>
        </button>
        <Link
          href={href}
          className="capitalize text-white bg-amber-400 hover:bg-amber-400/90 focus:ring-4 focus:ring-amber-bg-amber-400/50 focus:outline-none font-medium rounded-lg text-xs px-3 py-2 text-center inline-flex gap-2 items-center dark:focus:ring-amber-bg-amber-400/50 "
        >
          <Plus />
          <span className="hidden lg:inline">{"Agregar " + title}</span>
        </Link>
      </div>
    </div>
  );
}
