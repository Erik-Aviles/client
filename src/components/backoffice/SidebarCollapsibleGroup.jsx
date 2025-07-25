"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";

export default function SidebarCollapsibleItem({
  link,
  pathname,
  isOpen,
  toggleOpen,
  styles,
  activeLink,
  activeLinkDefaul,
  toggleSidebar,
}) {
  const Icon = link.icon;
  const isActive = link.children?.some((child) => child.href === pathname);

  return (
    <div>
      <button
        className={`${styles} px-6 py-1 justify-between ${isActive ? activeLink : ""}`}
        onClick={() => toggleOpen(isOpen ? null : link.key)}
      >
        <span className="flex items-center space-x-3">
          <Icon className="w-4 h-4" />
          <span>{link.name}</span>
        </span>
        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="pl-8 space-y-1 py-1">
          {link.children.map((child) => {
            const ChildIcon = child.icon;
            return (
              <Link
                onClick={toggleSidebar}
                key={child.key}
                href={child.href || "#"}
                className={`${styles} px-6 py-1 ${child.href === pathname ? activeLinkDefaul : ""}`}
              >
                <ChildIcon className="w-4 h-4" />
                <span>{child.name}</span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
