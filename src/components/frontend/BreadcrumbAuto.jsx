"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";

export default function BreadcrumbAuto() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  // Construye la ruta progresiva para cada segmento
  const buildHref = (index) => "/" + segments.slice(0, index + 1).join("/");

  return (
    <nav
      className="mb-8 flex text-sm text-gray-600 dark:text-gray-300"
      aria-label="Breadcrumb"
    >
      <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
        {/* HOME */}
        <li className="inline-flex items-center">
          <Link
            href="/"
            className="inline-flex items-center text-xs font-medium hover:text-amber-600 dark:hover:text-white"
          >
            <Home className="flex-shrink-0 w-4 h-4 text-gray-400 me-1.5" />
            Inicio
          </Link>
        </li>

        {/* OTROS SEGMENTOS */}
        {segments.map((segment, index) => {
          const isLast = index === segments.length - 1;
          const href = buildHref(index);

          return (
            <li key={href} className="flex items-center">
              <ChevronRight className="flex-shrink-0 w-4 h-4 text-gray-400" />

              {isLast ? (
                <span className="ms-1 text-xs font-medium text-gray-500 md:ms-2 dark:text-gray-400">
                  {decodeURIComponent(segment)}
                </span>
              ) : (
                <Link
                  href={href}
                  className="ms-1 text-xs font-medium hover:text-amber-600 md:ms-2 dark:hover:text-white"
                >
                  {decodeURIComponent(segment)}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
