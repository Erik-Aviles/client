import React from "react";
import { Download, Share, Trash2 } from "lucide-react";
import AddBtn from "./Actions/AddBtn";

export default function ButtonActions({ title, endpoint }) {
  return (
    <div className="flex items-center flex-wrap sm:flex-nowrap gap-2 justify-between text-slate-800 ">
      <button
        title={`Exportar ${title}`}
        type="button"
        className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 hover:border-gray-500 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-xs px-3 py-2 text-center inline-flex gap-2 items-center dark:focus:ring-gray-600 dark:bg-gray-900 dark:border-gray-400 dark:text-white dark:hover:bg-gray-800"
      >
        <Share className="w-4 h-4" />
        <span className="hidden lg:inline">{"Exportar"}</span>
      </button>
      <button
        title={`Importar ${title}`}
        type="button"
        className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 hover:border-gray-500  focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-xs px-3 py-2 text-center inline-flex gap-2 items-center dark:focus:ring-gray-600 dark:bg-gray-900 dark:border-gray-400 dark:text-white dark:hover:bg-gray-700"
      >
        <Download className="w-4 h-4" />
        <span className="hidden lg:inline">{"Importar"}</span>
      </button>
      <button
        title={`Eliminar ${title}`}
        type="button"
        className="capitalize text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-bg-red-400/50 focus:outline-none font-medium rounded-lg text-xs px-3 py-2 text-center inline-flex gap-2 items-center dark:focus:ring-red-bg-red/50"
      >
        <Trash2 className="w-4 h-4" />
        <span className="hidden lg:inline">"Eliminar"</span>
      </button>

      {/* Boton de agregar */}
      <AddBtn endpoint={endpoint} title={title} />
    </div>
  );
}
