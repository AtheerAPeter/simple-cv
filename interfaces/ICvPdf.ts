import {
  Experience,
  Education,
  SkillCategory,
  Language,
  Project,
} from "./IFormTypes";

export interface ICvPdf {
  personalDetails: {
    name: string;
    title: string;
    email: string;
    phone: string;
    address: string;
    github: string;
    image: any;
  };
  experiences: Experience[];
  educations: Education[];
  skills: SkillCategory[];
  languages: Language[];
  hobbies: string[];
  projects: Project[];
}
