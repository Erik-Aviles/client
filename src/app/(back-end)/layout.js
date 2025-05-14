"use client";

import Navbar from "@/components/backoffice/Navbar";
import Sidebar from "@/components/backoffice/Sidebar";
import useActions from "@/hooks/useActions";

export default function Layout({ children }) {
  const { showSiderbarCatalogue, toggleShowSiderbarCatalogue } = useActions();

  return (
    <div className="overflow-hidden">
      <Sidebar
        showSiderbarCatalogue={showSiderbarCatalogue}
        toggleShowSiderbarCatalogue={toggleShowSiderbarCatalogue}
      />
     <div
        className="h-full flex flex-col transition-all duration-500 ease-in-out"
      >

      <Navbar
        toggleShowSiderbarCatalogue={toggleShowSiderbarCatalogue}
        showSiderbarCatalogue={showSiderbarCatalogue}
      />
      <main
        className={`pt-24 min-h-screen p-8 overflow-y-auto bg-slate-100 dark:bg-slate-900 dark:text-slate-50 transition-all duration-500 ${showSiderbarCatalogue ? "sm:ml-64" : " sm:ml-0 "} `}
      >
        {children}
      </main>
      </div>
    </div>
  );
}
