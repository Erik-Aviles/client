"use client";

import { useState } from "react";
import Image from "next/image";
import { userData } from "@/utils/user/data";
import { LogOut, Settings, User } from "lucide-react";

export default function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const user = userData[0];
  return (
    <div className="relative py-5">
      {/* Botón de usuario */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-7 h-7 flex items-center text-xs font-medium dark:bg-slate-50 rounded-full dark:hover:text-slate-50 dark:text-yellow-500 bg-transparent"
        type="button"
      >
        <span className="sr-only">Abrir el menu del usuario</span>
        <Image
          className=""
          src="/betimes.png"
          alt="user photo"
          width={28}
          height={28}
        />
      </button>

      {/* Menú desplegable */}
      {isOpen && (
        <div className="absolute right-0 mt-6 w-44 bg-white divide-y divide-gray-100 rounded-lg shadow-sm border dark:bg-slate-800 dark:divide-slate-500 border-slate-200 dark:border-slate-600">
          <div className="px-4 py-3 text-gray-700 bg-gray-100 dark:bg-transparent dark:text-white ">
            <div className="text-sm text-gray-900 dark:text-white">{user?.name}</div>
            <div className="text-xs text-gray-900 dark:text-slate-400 truncate">{user?.email}</div>
          </div>
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
            <li>
              <a
                href="#"
                className="flex items-center space-x-2  px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <User className="w-4 h-4" /> 
                <span>Mi cuenta</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center space-x-2  px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <Settings className="w-4 h-4" /> 
                <span>Editar perfil</span>
              </a>
            </li>
          </ul>
          <div className="py-2">
            <a
              href="#"
              className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >
              <LogOut className="w-4 h-4" /> 
              <span>Cerrar sesión</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
