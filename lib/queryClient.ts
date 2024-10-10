import { QueryClient } from "@tanstack/react-query";

export const queryClientRoot = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});
