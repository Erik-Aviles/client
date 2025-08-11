import React from "react";
import Navbar from "@/components/frontend/Navbar";
import Footer from "@/components/frontend/Footer";

export default function Layout({ children }) {
  return (
    <div className="bg-white dark:bg-slate-900">
      <div className="sticky top-0 z-50 bg-white dark:bg-slate-900 shadow">
        <Navbar />
      </div>
      <div className="max-w-6xl mx-auto p-4 md:py-4 md:px-6">{children}</div>
      <Footer />
    </div>
  );
}
