import { ICvPdf } from "@/interfaces/ICvPdf";
import { IUpdateSkillsInputs } from "@/interfaces/IUpdateSkills";
import { Axios } from "axios";

export const skillsUpdateApi = (request: Axios) => ({
  update: async (
    inputs: IUpdateSkillsInputs
  ): Promise<{ updated: Partial<ICvPdf> }> => {
    const response = await request.post("/python", inputs);
    return response.data;
  },
});
