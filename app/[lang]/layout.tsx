import type { Metadata } from "next";
import "../globals.css";
import Head from "next/head";
import { Nunito } from "next/font/google";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-nunito",
});

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
      <Head>
        <title>Simple AI CV Builder</title>
        <meta
          name="description"
          content="  Our AI-powered CV maker helps you build a professional CV that
              stands out and matches job descriptions. Get started for free!"
        />{" "}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body
        className={`${nunito.className} antialiased`} // Use the Nunito font
      >
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
