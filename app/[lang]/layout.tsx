import "../globals.css";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { ScrollToTopButtonComponent } from "@/components/scroll-to-top-button";
import { Providers } from "../providers";

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
      <head>
        <title>Simple CV</title>
        <meta
          name="description"
          content="Ai powered CV creator for tailoring your CV to better match job description"
        />
      </head>
      <body className="antialiased font-montserrat">
        <Providers>
          <NextIntlClientProvider messages={messages}>
            {children}
            <ScrollToTopButtonComponent />
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  );
}
