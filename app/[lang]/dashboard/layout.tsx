"use client";
import Footer from "@/components/Footer";
import { NavBar } from "@/components/NavBar";
import { queryClientRoot } from "@/lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { Nunito } from "next/font/google";

interface Props {
  children: React.ReactNode;
}

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-nunito",
});

export default function RootLayout(props: Props) {
  return (
    <QueryClientProvider client={queryClientRoot}>
      <SessionProvider>
        <div
          className={`h-screen flex flex-col justify-between ${nunito.className}`}
        >
          <NavBar />
          {props.children}
          <Footer />
        </div>
      </SessionProvider>
    </QueryClientProvider>
  );
}
