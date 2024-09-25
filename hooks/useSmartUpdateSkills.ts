import { HttpClient } from "@/Httpclient";
import { useMutation } from "@tanstack/react-query";

```
/**
 * Custom hook for smart updating skills using a mutation.
 * @returns {Object} An object containing the smartUpdateSkillsMutation.
 * @returns {Object} smartUpdateSkillsMutation - The mutation object for updating skills.
 */
```
export const useSmartUpdateSkills = () => {
  const smartUpdateSkillsMutation = useMutation({
    mutationFn: HttpClient.SkillsUpdateApi.update,
  });
  return { smartUpdateSkillsMutation };
};
