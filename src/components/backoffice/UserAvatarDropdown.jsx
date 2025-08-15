"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { LogoutButton } from "../LogoutButton";
import { generateInicials } from "@/lib/generateInicials";
import { LayoutDashboard, Package, User } from "lucide-react";

export default function UserAvatarDropdown({ user }) {
  const [isOpen, setIsOpen] = useState(false);

  const name = user?.name;
  const image = user?.image;
  const email = user?.email;
  const inicials = generateInicials(name);

  return (
    <div className="relative">
      {/* Botón de usuario */}
      <button
        className="relative flex items-center font-medium bg-transparent"
        onClick={() => setIsOpen(!isOpen)}
        type="button"
      >
        <span className="sr-only">Abrir el menu del usuario</span>

        {image ? (
          <Image
            src={image}
            alt={name}
            width={28}
            height={28}
            className="rounded-full w-8 h-8"
          />
        ) : (
          <div className="w-8 h-8 border rounded-full flex items-center justify-center text-sm bg-slate-300 dark:bg-slate-800 text-slate-800 dark:text-yellow-500 hover:opacity-75">
            {inicials}
          </div>
        )}
      </button>

      {/* Menú desplegable */}
      {isOpen && (
        <div className="absolute z-20 right-0 mt-6 w-72 bg-white divide-y divide-gray-100 rounded-lg shadow-sm border dark:bg-slate-800 dark:divide-slate-500 border-slate-200 dark:border-slate-600">
          <div className="px-4 py-4 text-gray-700 bg-slate-300 dark:bg-transparent dark:text-white">
            <div
              title={name}
              className="text-sm font-semibold text-slate-900 dark:text-white capitalize truncate"
            >
              {name}
            </div>
            <div className="text-xs text-gray-900 dark:text-slate-400 truncate">
              {email}
            </div>
          </div>
          <ul className="py-2 flex flex-col gap-3 text-xs text-gray-700 dark:text-gray-200">
            <li>
              <Link
                href="/dashboard"
                className="flex items-center space-x-2 px-4 py-1 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Panel de control</span>
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/profile"
                className="flex items-center space-x-2 px-4 py-1 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <User className="w-4 h-4" />
                <span>Perfil</span>
              </Link>
            </li>
            {user?.role === "USER" && (
              <li>
                <Link
                  href="/dashboard/orders"
                  className="flex items-center space-x-2 px-4 py-1 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <Package className="w-4 h-4" />
                  <span>Mis pedidos</span>
                </Link>
              </li>
            )}
          </ul>

          <div className="py-3">
            <LogoutButton className="w-full text-gray-700 hover:bg-gray-100 rounded-b-lg dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white text-xs" />
          </div>
        </div>
      )}
    </div>
  );
}
