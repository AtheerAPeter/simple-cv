"use client";
import { Toaster } from "@/components/ui/toaster";
import { FONT_CONFIG } from "@/lib/fontConfig";
import { queryClientRoot } from "@/lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`${FONT_CONFIG.className} antialiased`}>
      <SessionProvider>
        <QueryClientProvider client={queryClientRoot}>
          <Toaster />
          {children}
        </QueryClientProvider>
      </SessionProvider>
    </div>
  );
}
