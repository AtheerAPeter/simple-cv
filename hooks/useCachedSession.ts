import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export const useCachedSession = () => {
  const { data, status } = useSession();

  const { data: session, ...sessionQuery } = useQuery({
    queryKey: ["userSession"],
    queryFn: async () => {
      return { data, status };
    },
    enabled: !!data,
    staleTime: 86400000,
    refetchOnMount: false,
    placeholderData: keepPreviousData,
  });

  return { session, sessionQuery };
};
