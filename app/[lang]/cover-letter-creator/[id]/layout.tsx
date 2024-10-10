"use client";
import { Toaster } from "@/components/ui/toaster";
import { queryClientRoot } from "@/lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
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
      <body className={`${nunito.className} antialiased`}>
        <QueryClientProvider client={queryClientRoot}>
          <Toaster />
          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}
