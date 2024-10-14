"use client";
import { useMessages } from "next-intl";
import { Analytics } from "@vercel/analytics/react";
import { FONT_CONFIG } from "@/lib/fontConfig";
import { SessionProvider } from "next-auth/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClientRoot } from "@/lib/queryClient";

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  return (
    <html lang={params.locale} className={FONT_CONFIG.className}>
      <body className="antialiased font-montserrat">
        <QueryClientProvider client={queryClientRoot}>
          <SessionProvider>
            <div className="h-screen flex flex-col justify-between">
              <Analytics />
              {children}
            </div>
          </SessionProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
