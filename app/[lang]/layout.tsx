import "../globals.css";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { Analytics } from "@vercel/analytics/react";
import { ScrollToTopButtonComponent } from "@/components/scroll-to-top-button";

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = await getMessages();
  return (
    <html lang={params.locale}>
      <body className="antialiased font-montserrat">
        <NextIntlClientProvider messages={messages}>
          <Analytics />
          {children}
          <ScrollToTopButtonComponent />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
