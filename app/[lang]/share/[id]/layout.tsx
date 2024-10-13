"use client";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { Analytics } from "@vercel/analytics/react";
import { FONT_CONFIG } from "@/lib/fontConfig";
import { NavBar } from "@/components/NavBar";
import Footer from "@/components/Footer";
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
  const messages = useMessages();
  return (
    <html lang={params.locale} className={FONT_CONFIG.className}>
      <body className="antialiased font-montserrat">
        <QueryClientProvider client={queryClientRoot}>
          <SessionProvider>
            <div className="h-screen flex flex-col justify-between">
              <NavBar />
              {/* <NextIntlClientProvider messages={messages}> */}
              <Analytics />
              {children}
              {/* </NextIntlClientProvider> */}
              <Footer />
            </div>
          </SessionProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
