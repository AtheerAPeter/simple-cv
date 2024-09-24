"use client";
import type { Metadata } from "next";
import "./globals.css";
import Head from "next/head";
import { Nunito } from "next/font/google";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-nunito",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
        {children}
      </body>
    </html>
  );
}
