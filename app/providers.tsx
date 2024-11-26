"use client";

import {
  QueryClient,
  QueryClientProvider,
  isServer,
} from "@tanstack/react-query";
import { Analytics } from "@vercel/analytics/react";
import * as React from "react";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { persistQueryClient } from "@tanstack/react-query-persist-client";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// const localStoragePersister = createSyncStoragePersister({
//   storage: window.localStorage,
// });

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (isServer) {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

export function Providers(props: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  // persistQueryClient({
  //   queryClient: queryClient,
  //   persister: localStoragePersister,
  // });

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <Analytics />
        <ToastContainer position="top-center" />
        {props.children}
      </QueryClientProvider>
    </SessionProvider>
  );
}
