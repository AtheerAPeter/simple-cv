import { ICvPdf } from "@/interfaces/ICvPdf";
import { IUpdateSkillsInputs } from "@/interfaces/IUpdateSkills";
import { Axios } from "axios";

export const skillsUpdateApi = (request: Axios) => ({
  update: async (inputs: any): Promise<any> => {
    const response = await request.post("/chat", inputs);
    return response.data;
  },
});
