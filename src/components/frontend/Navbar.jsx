import SearchForm from "../backoffice/SearchForm";
import logo from "../../../public/logo.png";
import Link from "next/link";
import Image from "next/image";
import { companyData } from "@/utils/general/companyData";
import { Menu, ShoppingCart, User } from "lucide-react";
import { ThemeSwitcherBtn } from "../ThemeSwitcherBtn";
import HelpModal from "../frontend/HelpModal";

export default function Navbar() {
  const nameCompany = companyData?.name;
  return (
    <div className=" flex flex-col ">
      {/* <div className=" flex items-center justify-between py-3 max-w-6xl mx-auto px-8 gap-8"> */}
      <div className="w-full flex items-center justify-between py-4 px-6 dark:bg-slate-700  md:max-w-7xl md:mx-auto gap-8">
        <div className="flex items-center justify-center space-x-1">
          {/* Logo */}
          <button type="button" className="inline-block md:hidden" href="/">
            <Menu />
          </button>
          <Link className="" href="/">
            <Image src={logo} alt={nameCompany} className="w-14" priority />
          </Link>
        </div>

        {/* SEARCH */}
        <div className="hidden lg:block flex-grow ">
          <SearchForm
            placeholder="Buscar productos, marca y categorias..."
            className=""
          />
        </div>
        <Link
          href="/login"
          className="flex items-center text-sm space-x-1 hover:scale-110 active:scale-100 transition-all duration-300  dark:text-slate-50 text-amber-600 hover:text-amber-500"
        >
          <User />
          <span className="hidden sm:block">Cuenta</span>
        </Link>

        <HelpModal /* openModal={setOpenModal} setOpenModal={ setOpenModal} */
        />
        <Link
          href="/cart"
          type="button"
          className="relative inline-flex items-center p-3 text-sm font-medium text-center hover:scale-110 active:scale-100 transition-all duration-300 dark:text-slate-50 text-amber-600 hover:text-amber-500 dark:hover:text-slate-50 "
        >
          <div className="absolute inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500  rounded-full -top-0 start-6  dark:border-gray-900">
            20
          </div>
          <ShoppingCart className="" />
          <span className="hidden sm:block pl-1">Cart</span>
        </Link>
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
