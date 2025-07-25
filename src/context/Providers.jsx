"use client";

import React from "react";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import { store } from "../../redux/store";
import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "@/app/api/uploadthing/core";

export default function Providers({ children }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
      <Toaster position="top-right" reverseOrder={false} />
      <SessionProvider>
        <Provider store={store}>{children}</Provider>
      </SessionProvider>
    </ThemeProvider>
  );
}
