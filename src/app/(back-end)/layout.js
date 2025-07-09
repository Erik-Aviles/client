"use client";

import Navbar from "@/components/backoffice/Navbar";
import Sidebar from "@/components/backoffice/Sidebar";
import useActions from "@/hooks/useActions";

export default function Layout({ children }) {
  const { showSiderbarCatalogue, toggleShowSiderbarCatalogue } = useActions();

  return (
    <div>
      <Sidebar
        showSiderbarCatalogue={showSiderbarCatalogue}
        toggleShowSiderbarCatalogue={toggleShowSiderbarCatalogue}
      />
      <div className="h-full flex flex-col transition-all duration-500 ease-in-out">
        <Navbar
          toggleShowSiderbarCatalogue={toggleShowSiderbarCatalogue}
          showSiderbarCatalogue={showSiderbarCatalogue}
        />
        <main
          className={` pt-[40px]  
            fixed w-full bg-slate-100 dark:bg-slate-900 dark:text-slate-50 transition-all duration-300 ${
            showSiderbarCatalogue ? "sm:pr-[16rem] sm:ml-64 " : " sm:ml-0 "
          } `}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
