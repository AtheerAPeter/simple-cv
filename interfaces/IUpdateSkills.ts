import { ICvPdf } from "./ICvPdf";

export interface IUpdateSkillsInputs {
  cv: Partial<ICvPdf>;
  job_description: string;
}
