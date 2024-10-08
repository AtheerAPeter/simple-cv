import { HttpClient } from "@/Httpclient";
import { useQuery } from "@tanstack/react-query";

export const useUser = () => {
  const { data: user, ...userQuery } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await HttpClient.UserApi.get();
      return response;
    },
    refetchOnWindowFocus: false,
  });

  return { user, userQuery };
};
