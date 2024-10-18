import { HttpClient } from "@/Httpclient";
import { useMutation } from "@tanstack/react-query";

export default function useSmartUpdateSkills() {
  const smartUpdateSkillsMutation = useMutation({
    mutationFn: HttpClient.SkillsUpdateApi.update,
  });
  return { smartUpdateSkillsMutation };
}
