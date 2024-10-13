import { HttpClient } from "@/Httpclient";
import { useQuery } from "@tanstack/react-query";

export const useShadredDocument = (id: string) => {
  const { data: document, ...documentQuery } = useQuery({
    queryKey: HttpClient.DocumentAPi.getSharedDocument.key(id),
    queryFn: HttpClient.DocumentAPi.getSharedDocument.exec,
  });

  return {
    document,
    documentQuery,
  };
};
