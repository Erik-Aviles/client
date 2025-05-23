"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import logo from "../../../public/betimesCompany.png";
import { catalogueLinks, sideBarLinks } from "@/utils/general/siderBarLinks";
import { usePathname } from "next/navigation";
import { LogOut, ChevronRight, ChevronDown, X } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export default function Sidebar({
  showSiderbarCatalogue,
  toggleShowSiderbarCatalogue,
}) {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState(false);

  const sidebarWidth = showSiderbarCatalogue ? " w-64 " : " w-0 ";
  const imagepadding = showSiderbarCatalogue ? " px-6 py-2 " : "px-0 py-0";

  const styles =
    " w-full space-x-3 flex items-center capitalize dark:hover:bg-slate-500 hover:bg-slate-300 hover:text-amber-400";
  const activeLinkDefaul =
    " border-amber-400 bg-slate-500 dark:bg-slate-600 text-amber-400 font-medium dark:text-slate-100 ";
  const activeLink = `${activeLinkDefaul} border-l-8`;

  return (
    <div
      className={`mt-0 space-y-3  transition-all fomt duration-500 ease-in-out z-20 bg-slate-50 dark:bg-slate-700  h-screen text-slate-500 dark:text-slate-100 fixed left-0 top-0 bottom-0 ${sidebarWidth}`}
    >
      <div className="overflow-y-auto h-screen">
        <div
          className={`h-20 flex justify-between items-center bg-slate-50 dark:bg-slate-700 border-b border-border fixed transition-all duration-500 ease-in-out ${sidebarWidth} ${imagepadding} `}
        >
          <Link className="" href="/dashboard">
            <Image
              src={logo}
              alt="Betimes Logo"
              className="w-36"
              onClick={toggleShowSiderbarCatalogue}
            />
          </Link>
          <X
            className="sm:hidden cursor-pointer"
            onClick={toggleShowSiderbarCatalogue}
          />
        </div>

        <div className="space-y-3 flex flex-col mt-24 h-[calc(100vh-100px)] ">
          {sideBarLinks.map((link) =>
            link.name === "catalogo" ? (
              <Collapsible key={link.name} className=" ">
                <CollapsibleTrigger
                  onClick={() => setOpenMenu(!openMenu)}
                  className={`${styles} px-6 py-2 ${
                    link.href === pathname ? activeLink : ""
                  }`}
                >
                  <div className={styles}>
                    {link.icon}
                    <span>{link.name}</span>
                  </div>
                  {openMenu ? <ChevronDown /> : <ChevronRight />}
                </CollapsibleTrigger>
                <CollapsibleContent
                  className="my-2 mx-5 px-3 pl-5 py-2 border border-border dark:bg-slate-800 rounded-lg overflow-hidden
    data-[state=open]:animate-slideDown
    data-[state=closed]:animate-slideUp"
                >
                  {catalogueLinks.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        onClick={toggleShowSiderbarCatalogue}
                        key={item.name}
                        href={item.href}
                        className={`${styles} text-sm pl-2 py-2 ${
                          item.href === pathname ? activeLinkDefaul : ""
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{item.name}</span>
                      </Link>
                    );
                  })}
                </CollapsibleContent>
              </Collapsible>
            ) : (
              <Link
                onClick={toggleShowSiderbarCatalogue}
                key={link.name}
                href={link.href}
                className={`${styles} px-6 py-2 ${
                  link.href === pathname ? activeLink : ""
                }`}
              >
                {link.icon} <span>{link.name}</span>
              </Link>
            )
          )}
          <div className="px-6 pb-4 flex flex-grow items-end ">
            <button
              className={`${styles} px-6 py-2 justify-center w-full rounded-md bg-amber-400 text-slate-100 `}
              onClick={() => alert("Cerrar sesion")}
            >
              <LogOut />
              <span>Cerrar sesion</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
