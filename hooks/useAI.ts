import { HttpClient } from "@/Httpclient";
import { useMutation } from "@tanstack/react-query";

export const useAI = () => {
  const AIMutataion = useMutation({
    mutationFn: HttpClient.SkillsUpdateApi.update,
  });
  return { AIMutataion };
};
