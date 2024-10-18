"use client";
import { FONT_CONFIG } from "@/lib/fontConfig";
import { queryClientRoot } from "@/lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`${FONT_CONFIG.className} antialiased`}>
      <SessionProvider>
        <QueryClientProvider client={queryClientRoot}>
          <ToastContainer position="top-center" />
          {children}
        </QueryClientProvider>
      </SessionProvider>
    </div>
  );
}
