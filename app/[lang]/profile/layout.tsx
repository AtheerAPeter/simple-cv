"use client";
import { NavBar } from "@/components/NavBar";
import { queryClientRoot } from "@/lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Props {
  children: React.ReactNode;
}

export default function RootLayout(props: Props) {
  return (
    <QueryClientProvider client={queryClientRoot}>
      <SessionProvider>
        <div>
          <ToastContainer position="top-center" />
          <NavBar />
          {props.children}
        </div>
      </SessionProvider>
    </QueryClientProvider>
  );
}
