import SearchForm from "../backoffice/SearchForm";
import logo from "../../../public/betimes.png";
import Link from "next/link";
import Image from "next/image";
import { companyData } from "@/utils/general/companyData";
import { HelpCircle, ShoppingCart, User } from "lucide-react";
import { ThemeSwitcherBtn } from "../ThemeSwitcherBtn";
import HelpModal from "../frontend/HelpModal";

export default function Navbar() {
  const nameCompany = companyData?.name;
  return (
    <div className="bg-white dark:bg-slate-700">
      <div className=" flex items-center justify-between py-3 max-w-7xl mx-auto px-8 gap-8">
        {/* Logo */}
        <Link className="" href="/">
          <Image src={logo} alt={nameCompany} className="w-24" />
        </Link>
        {/* SEARCH */}
        <div className="flex-grow">
          <SearchForm
            placeholder="Buscar productos, categorias..."
            className=""
          />
        </div>
        <Link
          href="/login"
          className="flex items-center space-x-1 hover:scale-110 active:scale-100 duration-200 text-amber-400 hover:text-amber-500 dark:text-amber-400  dark:hover:text-slate-50 bg-transparent"
        >
          <User />
          <span className="hidden sm:block">Acceso</span>
        </Link>
       
        <HelpModal  /* openModal={setOpenModal} setOpenModal={ setOpenModal} *//>
        <Link
          href="/cart"
          type="button"
          className="relative inline-flex items-center p-3 text-sm font-medium text-center hover:scale-110 active:scale-100 duration-200 text-amber-400 hover:text-amber-500 dark:text-amber-400  dark:hover:text-slate-50 bg-transparent rounded-lg "
        >
          <span className="sr-only">Cart</span>
          <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500  rounded-full -top-0 end-6 dark:border-gray-900">
            20
          </div>
          <ShoppingCart className="" />
        </Link>
        <ThemeSwitcherBtn />
      </div>
    </div>
  );
}
