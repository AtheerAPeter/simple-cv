"use client";

import { queryClientRoot } from "@/lib/queryClient";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { QueryClientProvider } from "@tanstack/react-query";
import { persistQueryClient } from "@tanstack/react-query-persist-client";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const localStoragePersister = createSyncStoragePersister({
  storage: window.localStorage,
});

persistQueryClient({
  queryClient: queryClientRoot,
  persister: localStoragePersister,
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <SessionProvider>
        <QueryClientProvider client={queryClientRoot}>
          <ToastContainer position="top-center" />
          {children}
        </QueryClientProvider>
      </SessionProvider>
    </div>
  );
}
