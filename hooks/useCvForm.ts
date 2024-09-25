import {
  Experience,
  Education,
  SkillCategory,
  Language,
  Project,
} from "@/interfaces/IFormTypes";
import { useState } from "react";

/**
 * A custom React hook for managing CV form state.
 * @returns {Object} An object containing state variables and their setter functions for various CV fields:
 *   - name: {string} The name of the CV owner
 *   - title: {string} The professional title
 *   - email: {string} The email address
 *   - phone: {string} The phone number
 *   - address: {string} The physical address
 *   - github: {string} The GitHub profile URL
 *   - image: {any} The profile image
 *   - experiences: {Experience[]} An array of work experiences
 *   - educations: {Education[]} An array of educational backgrounds
 *   - skills: {SkillCategory[]} An array of skill categories
 *   - languages: {Language[]} An array of languages known
 *   - hobbies: {string[]} An array of hobbies
 *   - projects: {Project[]} An array of projects
 *   - currentHobby: {string} The current hobby being entered
 */
export const useCvForm = () => {
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
};
