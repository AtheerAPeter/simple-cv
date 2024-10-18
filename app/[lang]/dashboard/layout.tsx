"use client";
import { NavBar } from "@/components/NavBar";
import { Toaster } from "@/components/ui/toaster";
import { FONT_CONFIG } from "@/lib/fontConfig";
import { queryClientRoot } from "@/lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";

interface Props {
  children: React.ReactNode;
}

export default function RootLayout(props: Props) {
  return (
    <QueryClientProvider client={queryClientRoot}>
      <SessionProvider>
        <Toaster />
        <div
          className={`h-screen flex flex-col justify-between ${FONT_CONFIG.className}`}
        >
          <NavBar />
          {props.children}
        </div>
      </SessionProvider>
    </QueryClientProvider>
  );
}
