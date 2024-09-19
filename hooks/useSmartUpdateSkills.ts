import { HttpClient } from "@/Httpclient";
import { useMutation } from "@tanstack/react-query";

export const useSmartUpdateSkills = () => {
  const smartUpdateSkillsMutation = useMutation({
    mutationFn: HttpClient.SkillsUpdateApi.update,
  });
  return { smartUpdateSkillsMutation };
};
