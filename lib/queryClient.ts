import { QueryClient } from "@tanstack/react-query";

export const queryClientRoot = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      gcTime: 1000 * 60 * 60 * 24 * 7,
    },
  },
});
