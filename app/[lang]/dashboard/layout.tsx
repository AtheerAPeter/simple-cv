"use client";
import { NavBar } from "@/components/NavBar";
import { QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { persistQueryClient } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { queryClientRoot } from "@/lib/queryClient";

const localStoragePersister = createSyncStoragePersister({
  storage: window.localStorage,
});

persistQueryClient({
  queryClient: queryClientRoot,
  persister: localStoragePersister,
});

interface Props {
  children: React.ReactNode;
}

export default function RootLayout(props: Props) {
  return (
    <QueryClientProvider client={queryClientRoot}>
      <SessionProvider>
        <div>
          <ToastContainer position="top-center" />
          <NavBar />
          {props.children}
        </div>
      </SessionProvider>
    </QueryClientProvider>
  );
}
