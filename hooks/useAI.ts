import { HttpClient } from "@/Httpclient";
import { useMutation } from "@tanstack/react-query";

export default function useAI() {
  const AIMutataion = useMutation({
    mutationFn: HttpClient.SkillsUpdateApi.update,
  });
  return { AIMutataion };
}
