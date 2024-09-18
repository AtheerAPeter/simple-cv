export interface Experience {
  title: string;
  employer: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Education {
  degree: string;
  university: string;
  startDate: string;
  endDate: string;
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export interface Language {
  language: string;
  proficiency: string;
}

export interface Project {
  title: string;
  description: string;
  link?: string;
}
