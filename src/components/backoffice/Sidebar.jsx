"use client";

import Image from "next/image";
import Link from "next/link";
import React, { cloneElement, useState } from "react";
import logo from "../../../public/betimesCompany.png";
import {
  catalogueLinks,
  sideBarLinks,
  usersLinks,
} from "@/utils/general/siderBarLinks";
import { usePathname } from "next/navigation";
import { LogOut, X } from "lucide-react";
import { SidebarCollapsibleGroup } from "./SidebarCollapsibleGroup";

export default function Sidebar({
  showSiderbarCatalogue,
  toggleShowSiderbarCatalogue,
}) {
  const pathname = usePathname();
  const [openGroup, setOpenGroup] = useState(null);

  const sidebarWidth = showSiderbarCatalogue ? " w-64 " : " w-0 ";
  const imagepadding = showSiderbarCatalogue ? " px-6 py-2 " : "px-0 py-0";

  const styles =
    "w-full space-x-3 flex items-center capitalize dark:hover:bg-slate-500 hover:bg-slate-300 hover:text-amber-400";
  const activeLinkDefaul =
    "border-amber-400 bg-slate-500 dark:bg-slate-600 text-amber-400 font-medium dark:text-slate-100 ";
  const activeLink = `${activeLinkDefaul} border-l-8`;

  return (
    <div
      className={`mt-0 space-y-3  transition-all fomt duration-300 ease-in-out z-20 bg-slate-50 dark:bg-slate-700  text-slate-500 dark:text-slate-100 fixed left-0 top-0 bottom-0 ${sidebarWidth}`}
    >
      <div className="overflow-y-auto h-screen">
        <div
          className={`h-167 flex justify-between sm:justify-center items-center bg-slate-50 dark:bg-slate-700 fixed transition-all duration-500 ease-in-out ${sidebarWidth} ${imagepadding} `}
        >
          <Link href="/dashboard">
            <Image
              src={logo}
              alt="Betimes Logo"
              className="w-28 h-10 object-contain"
              onClick={toggleShowSiderbarCatalogue}
            />
          </Link>
          <X
            className="sm:hidden cursor-pointer"
            onClick={toggleShowSiderbarCatalogue}
          />
        </div>

        <div className="space-y-1 flex flex-col mt-16 h-[calc(100vh-100px)] ">
          {sideBarLinks.map((link) => {
            if (link.name === "catalogo") {
              return (
                <SidebarCollapsibleGroup
                  key={link.name}
                  link={link}
                  isOpen={openGroup}
                  toggleOpen={setOpenGroup}
                  pathname={pathname}
                  activeLink={activeLink}
                  links={catalogueLinks}
                  styles={styles}
                  activeLinkDefaul={activeLinkDefaul}
                  toggleSidebar={toggleShowSiderbarCatalogue}
                />
              );
            }

            if (link.name === "users") {
              return (
                <SidebarCollapsibleGroup
                  key={link.name}
                  link={link}
                  isOpen={openGroup}
                  toggleOpen={setOpenGroup}
                  pathname={pathname}
                  activeLink={activeLink}
                  links={usersLinks}
                  styles={styles}
                  activeLinkDefaul={activeLinkDefaul}
                  toggleSidebar={toggleShowSiderbarCatalogue}
                />
              );
            }

            return (
              <Link
                onClick={toggleShowSiderbarCatalogue}
                key={link.name}
                href={link.href}
                className={`${styles} px-6 py-1 ${
                  link.href === pathname ? activeLink : ""
                }`}
              >
                {cloneElement(link.icon, { className: "w-4 h-4" })}{" "}
                <span>{link.name}</span>
              </Link>
            );
          })}

          <div className="px-6 flex flex-grow items-end ">
            <button
              className={`${styles} px-6 py-2 justify-center w-full rounded-md bg-amber-400 text-slate-100 `}
              onClick={() => alert("Cerrar sesion")}
            >
              <LogOut className="w-4 h-4" />
              <span>Cerrar sesion</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
