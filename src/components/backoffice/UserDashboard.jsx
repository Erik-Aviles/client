import React from "react";
import Heading from "./styledComponent/Heading";

export default function UserDashboard() {
  return (
    <section className="h-[calc(100vh-40px)] bg-white dark:bg-slate-900">
      <div className="px-4 m-auto sm:px-6 lg:px-8 max-w-7xl">
        <Heading title="PANEL DE USUARIO" />
      </div>
    </section>
  );
}
