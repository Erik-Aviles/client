import SearchForm from "../backoffice/SearchForm";
import logo from "../../../public/logo.png";
import Link from "next/link";
import Image from "next/image";
import { companyData } from "@/utils/general/companyData";
import { Menu, User } from "lucide-react";
import { ThemeSwitcherBtn } from "../ThemeSwitcherBtn";
import HelpModal from "../frontend/HelpModal";
import CartCount from "./cart/CartCount";

export default function Navbar() {
  const nameCompany = companyData?.name;
  return (
    <div className="flex flex-col ">
      {/* <div className=" flex items-center justify-between py-3 max-w-6xl mx-auto px-8 gap-8"> */}
      <div className="w-full flex items-center justify-between py-4 px-6 dark:bg-slate-700 bg-white md:max-w-7xl md:mx-auto gap-8 shadow-md lg:shadow-none">
        <div className="flex items-center justify-center space-x-1">
          {/* Logo */}
          <button type="button" className="inline-block md:hidden">
            <Menu />
          </button>
          <Link href="/">
            <Image src={logo} alt={nameCompany} className="w-14" priority />
          </Link>
        </div>

        {/* SEARCH */}
        <div className="hidden lg:block flex-grow">
          <SearchForm
            placeholder="Buscar productos, marca y categorias..."
            className=""
          />
        </div>

        <Link
          href="/login"
          className="flex items-center text-sm space-x-1 hover:scale-110 active:scale-100 transition-all duration-300 dark:text-slate-50 text-amber-600 hover:text-amber-500"
        >
          <User />
          <span className="hidden sm:block">Cuenta</span>
        </Link>
        <HelpModal />
        <CartCount />
        <ThemeSwitcherBtn />
      </div>

      <div className="lg:hidden block p-4">
        <SearchForm
          placeholder="Buscar productos, marca y categorias..."
          className=""
        />
      </div>
    </div>
  );
}
