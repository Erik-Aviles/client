"use client";

import Link from "next/link";
import Image from "next/image";
import { X } from "lucide-react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { LogoutButton } from "../LogoutButton";
import React, { useState, useMemo } from "react";
import logo from "../../../public/betimesCompany.png";
import { sideBarLinks, filterLinksByRole } from "@/utils/general/sidebarLinks";
import SidebarCollapsibleItem from "./SidebarCollapsibleGroup";

export default function Sidebar({
  showSiderbarCatalogue,
  toggleShowSiderbarCatalogue,
}) {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [openGroup, setOpenGroup] = useState(null);

  const role = session?.user?.role;

  const userLinks = useMemo(
    () => filterLinksByRole(sideBarLinks, role),
    [role]
  );

  const sidebarWidth = showSiderbarCatalogue ? " w-64 " : " w-0 ";
  const imagepadding = showSiderbarCatalogue ? " px-6 py-2 " : "px-0 py-0";
  const styles =
    "w-full space-x-3 flex items-center capitalize dark:hover:bg-slate-500 hover:bg-slate-300 hover:text-amber-400 transition-colors";
  const activeLinkDefaul =
    "border-amber-400 bg-slate-500 dark:bg-slate-600 text-amber-400 font-medium dark:text-slate-100 ";
  const activeLink = `${activeLinkDefaul} border-l-8`;

  return (
    <div
      className={`mt-0 space-y-3 transition-all duration-300 ease-in-out z-20 bg-slate-50 dark:bg-slate-700 text-slate-500 dark:text-slate-100 fixed left-0 top-0 bottom-0 ${sidebarWidth}`}
    >
      <div className="overflow-y-auto h-screen">
        {/* Logo */}
        <div
          className={`h-167 flex justify-between sm:justify-center items-center bg-slate-50 dark:bg-slate-700 fixed transition-all duration-500 ease-in-out ${sidebarWidth} ${imagepadding}`}
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

        {/* Links */}
        <div className="space-y-1 flex flex-col mt-16 h-[calc(100vh-100px)]">
          {userLinks.map((link) => {
            if (link.children) {
              return (
                <SidebarCollapsibleItem
                  key={link.key}
                  link={link}
                  pathname={pathname}
                  isOpen={openGroup === link.key}
                  toggleOpen={setOpenGroup}
                  styles={styles}
                  activeLink={activeLink}
                  activeLinkDefaul={activeLinkDefaul}
                  toggleSidebar={toggleShowSiderbarCatalogue}
                />
              );
            }
            const Icon = link.icon;
            return (
              <Link
                onClick={toggleShowSiderbarCatalogue}
                key={link.key}
                href={link.href || "#"}
                className={`${styles} px-6 py-1 ${link.href === pathname ? activeLink : ""}`}
              >
                <Icon className="w-4 h-4" />
                <span>{link.name}</span>
              </Link>
            );
          })}
          {/* Logout */}
          <div className="px-6 flex flex-grow items-end">
            <LogoutButton
              className={`${styles} justify-center rounded-md bg-amber-400 text-slate-100`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
