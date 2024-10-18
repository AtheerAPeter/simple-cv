"use client";
import { HttpClient } from "@/Httpclient";
import { useMutation, useQuery } from "@tanstack/react-query";

interface Props {
  id?: string;
  listEnabled?: boolean;
}

export default function useDocument(props?: Props) {
  const createMutation = useMutation({
    mutationFn: HttpClient.DocumentAPi.create,
  });

  const { data: list, ...listQuery } = useQuery({
    queryKey: HttpClient.DocumentAPi.list.key(),
    queryFn: HttpClient.DocumentAPi.list.exec,
    enabled: props?.listEnabled ?? false,
  });

  const { data: document, ...documentQuery } = useQuery({
    queryKey: HttpClient.DocumentAPi.show.key(props?.id),
    queryFn: HttpClient.DocumentAPi.show.exec,
    enabled: !!props?.id,
  });

  const updateMutation = useMutation({
    mutationFn: HttpClient.DocumentAPi.update,
  });

  const deleteMutation = useMutation({
    mutationFn: HttpClient.DocumentAPi.delete,
  });

  return {
    createMutation,
    list,
    listQuery,
    document,
    documentQuery,
    updateMutation,
    deleteMutation,
  };
}
