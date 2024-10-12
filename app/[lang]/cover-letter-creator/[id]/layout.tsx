"use client";
import { Toaster } from "@/components/ui/toaster";
import { FONT_CONFIG } from "@/lib/fontConfig";
import { queryClientRoot } from "@/lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${FONT_CONFIG.className} antialiased`}>
        <QueryClientProvider client={queryClientRoot}>
          <Toaster />
          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}
