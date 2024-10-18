import {
  Experience,
  Education,
  SkillCategory,
  Language,
  Project,
} from "@/interfaces/IFormTypes";
import { useState } from "react";

export default function useCvForm() {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [github, setGithub] = useState("");
  const [image, setImage] = useState<any>("");
  // experience
  const [experiences, setExperiences] = useState<Experience[]>([]);
  // education
  const [educations, setEducations] = useState<Education[]>([]);
  // skills
  const [skills, setSkills] = useState<SkillCategory[]>([]);
  // languages
  const [languages, setLanguages] = useState<Language[]>([]);
  // hobbies
  const [hobbies, setHobbies] = useState<string[]>([]);

  const [projects, setProjects] = useState<Project[]>([]);

  const [currentHobby, setCurrentHobby] = useState("");

  return {
    name,
    setName,
    title,
    setTitle,
    email,
    setEmail,
    phone,
    setPhone,
    address,
    setAddress,
    github,
    setGithub,
    experiences,
    setExperiences,
    educations,
    setEducations,
    skills,
    setSkills,
    languages,
    setLanguages,
    hobbies,
    setHobbies,
    currentHobby,
    setCurrentHobby,
    image,
    setImage,
    projects,
    setProjects,
  };
}
