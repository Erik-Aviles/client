"use client";

import Link from "next/link";
import Image from "next/image";
import CartCount from "./cart/CartCount";
import { Menu, User } from "lucide-react";
import { useSession } from "next-auth/react";
import logo from "../../../public/logo.png";
import HelpModal from "../frontend/HelpModal";
import SearchForm from "../backoffice/SearchForm";
import { ThemeSwitcherBtn } from "../ThemeSwitcherBtn";
import { companyData } from "@/utils/general/companyData";
import UserAvatarDropdown from "../backoffice/UserAvatarDropdown";

export default function Navbar() {
  const { data: session, status } = useSession();
  const nameCompany = companyData?.name;

  return (
    <div className="flex flex-col dark:bg-slate-700 ">
      {/* <div className=" flex items-center justify-between py-3 max-w-6xl mx-auto px-8 gap-8"> */}
      <div className="w-full flex items-center justify-between py-1 px-6 md:max-w-7xl md:mx-auto gap-8 shadow-md lg:shadow-none">
        <div className="flex items-center justify-center space-x-1">
          {/* Logo */}
          <button type="button" className="inline-block md:hidden">
            <Menu />
          </button>
          <Link href="/">
            <Image src={logo} alt={nameCompany} className="w-14" priority />
          </Link>
        </div>

        {/* SEARCH: Escritorio*/}
        <div className="hidden lg:block flex-grow">
          <SearchForm placeholder="Buscar productos, marca y categorias..." />
        </div>
        <ThemeSwitcherBtn />

        <HelpModal />
        <CartCount />
        {status === "loading" ? (
          <Link
            href="/login"
            className="flex items-center text-sm space-x-1 hover:scale-110 active:scale-100 transition-all duration-300 dark:text-slate-50 text-amber-600 hover:text-amber-500"
          >
            <User />
            <span className="hidden sm:block">Cuenta</span>
          </Link>
        ) : status === "unauthenticated" ? (
          <Link
            href="/login"
            className="flex items-center text-sm space-x-1 hover:scale-110 active:scale-100 transition-all duration-300 dark:text-slate-50 text-amber-600 hover:text-amber-500"
          >
            <User />
            <span className="hidden sm:block">Cuenta</span>
          </Link>
        ) : (
          <UserAvatarDropdown user={session?.user} />
        )}
      </div>
      {/* SEARCH: Escritorio*/}
      <div className="lg:hidden block p-4 dark:bg-slate-900">
        <SearchForm placeholder="Buscar productos, marca y categorias..." />
      </div>
    </div>
  );
}
