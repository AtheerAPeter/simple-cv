import { IUpdateSkillsInputs } from "@/interfaces/IUpdateSkills";
import { Axios } from "axios";

export const skillsUpdateApi = (request: Axios) => ({
  update: async (inputs: IUpdateSkillsInputs): Promise<string> => {
    const response = await request.post("/chat", inputs);
    return response.data;
  },
});
