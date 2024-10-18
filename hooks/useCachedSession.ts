import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export default function useCachedSession() {
  const { data, status } = useSession();

  const { data: session, ...sessionQuery } = useQuery({
    queryKey: ["userSession", data?.user],
    queryFn: async () => {
      return { data, status };
    },
    staleTime: 86400000,
    refetchOnMount: false,
    placeholderData: keepPreviousData,
  });

  return { session, sessionQuery };
}
