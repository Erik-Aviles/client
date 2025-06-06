import Footer from "@/components/frontend/Footer";
import Navbar from "@/components/frontend/Navbar";
import React from "react";

export default function Layout({ children }) {
  return (
    <div className="bg-white dark:bg-slate-800">
      <Navbar />
      <div className="max-w-6xl mx-auto py-4 px-6 "> {children}</div>
      <Footer />
    </div>
  );
}
