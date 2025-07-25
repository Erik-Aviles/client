"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export function LogoutButton({ redirect = "/", className = "" }) {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push(redirect);
  };

  return (
    <button
      type="button"
      className={`px-4 py-2 flex items-center space-x-2 transition-colors ${className}`}
      onClick={handleLogout}
    >
      <LogOut className="w-4 h-4" /> <span>Cerrar sesión</span>
    </button>
  );
}
