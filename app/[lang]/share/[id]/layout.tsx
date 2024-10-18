"use client";
import { Analytics } from "@vercel/analytics/react";
import { SessionProvider } from "next-auth/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClientRoot } from "@/lib/queryClient";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  return (
    <html lang={params.locale}>
      <body className="antialiased font-montserrat">
        <QueryClientProvider client={queryClientRoot}>
          <SessionProvider>
            <div className="h-screen flex flex-col justify-between">
              <ToastContainer position="top-center" />
              <Analytics />
              {children}
            </div>
          </SessionProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
