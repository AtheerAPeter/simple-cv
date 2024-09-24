"use client";
import { useState, useEffect, useCallback } from "react";
import { X, Save, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import "react-quill/dist/quill.snow.css";
import { useToast } from "@/hooks/use-toast";
import { useCvForm } from "@/hooks/useCvForm";
import Link from "next/link";
import { placeholderData } from "@/lib/placeholderData";
import EducationSection from "@/components/EducationSection";
import ExperienceSection from "@/components/ExperienceSection";
import PreviewCvModal from "@/components/modals/PreviewCvModal";
import PersonalDetails from "@/components/PersonalDetailsSection";
import SkillsSection from "@/components/SkillsSection/SkillsList";
import PDFPreview from "@/components/PDFPreview";
import LanguagesSection from "@/components/LanguagesSection";
import HobbiesSection from "@/components/HobbiesSection";
import ProjectsSection from "@/components/ProjectsSection";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import useTemplateStore from "@/stores/templateStore";
import { SmartUpdateSkillsSection } from "@/components/SmartUpdateSkillsSection";
import { EditorHeader } from "@/components/EditorHeader";
import { useRouter } from "next/navigation";
import { JsonDiffComponentComponent } from "@/components/json-diff-component";

export default function Page() {
  const router = useRouter();
  const { toast } = useToast();
  const {
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
  } = useCvForm();

  const { template, setTemplate, color, setColor } = useTemplateStore();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem("cvData");
    if (!savedData) {
      setName(placeholderData.name);
      setTitle(placeholderData.title);
      setEmail(placeholderData.email);
      setPhone(placeholderData.phone);
      setAddress(placeholderData.address);
      setGithub(placeholderData.github);
      setImage(placeholderData.image);
      setExperiences(placeholderData.experiences);
      setEducations(placeholderData.educations);
      setSkills(placeholderData.skills);
      setLanguages(placeholderData.languages);
      setHobbies(placeholderData.hobbies);
      setProjects(placeholderData.projects);
    } else {
      const parsedData = JSON.parse(savedData);
      setName(parsedData.name);
      setTitle(parsedData.title);
      setEmail(parsedData.email);
      setPhone(parsedData.phone);
      setAddress(parsedData.address);
      setGithub(parsedData.github);
      setExperiences(parsedData.experiences);
      setEducations(parsedData.educations);
      setSkills(parsedData.skills);
      setLanguages(parsedData.languages);
      setHobbies(parsedData.hobbies);
      setImage(parsedData.image);
      setProjects(parsedData.projects);
    }
  }, []);

  const handlePersonalDetailsChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value, files } = e.target;
      switch (name) {
        case "name":
          setName(value);
          break;
        case "title":
          setTitle(value);
          break;
        case "email":
          setEmail(value);
          break;
        case "phone":
          setPhone(value);
          break;
        case "address":
          setAddress(value);
          break;
        case "github":
          setGithub(value);
          break;
        case "profilePhoto":
          if (files && files[0]) {
            const reader = new FileReader();
            reader.onload = (e) => {
              const base64String = e.target?.result;
              setImage(base64String);
            };
            reader.readAsDataURL(files[0]);
          }
          break;
        default:
          break;
      }
    },
    []
  );

  const handleExperienceChange = useCallback(
    (index: number, field: string, value: string) => {
      if (Array.isArray(experiences)) {
        setExperiences((prevExperiences) =>
          prevExperiences.map((exp, i) => {
            if (i === index) return { ...exp, [field]: value };
            return exp;
          })
        );
      }
    },
    [experiences]
  );

  const addExperience = useCallback(() => {
    const prev = experiences || [];
    setExperiences([
      ...prev,
      {
        title: "",
        employer: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ]);
  }, [experiences]);

  const removeExperience = useCallback(
    (index: number) => {
      if (Array.isArray(experiences)) {
        setExperiences((prevExperiences) =>
          prevExperiences.filter((_, i) => i !== index)
        );
      }
    },
    [experiences]
  );

  const handleProjectChange = useCallback(
    (index: number, field: string, value: string) => {
      if (Array.isArray(projects)) {
        setProjects((prevProject) =>
          prevProject.map((exp, i) => {
            if (i === index) return { ...exp, [field]: value };
            return exp;
          })
        );
      }
    },
    [projects]
  );
  const addProject = () => {
    const prev = projects || [];
    setProjects([
      ...prev,
      {
        title: "",
        description: "",
      },
    ]);
  };

  const removeProject = useCallback(
    (index: number) => {
      if (Array.isArray(projects)) {
        setProjects((prevProjects) =>
          prevProjects.filter((_, i) => i !== index)
        );
      }
    },
    [projects]
  );

  const handleEducationChange = useCallback(
    (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
      if (Array.isArray(educations)) {
        setEducations((prevEducations) =>
          prevEducations.map((edu, i) => {
            if (i === index) return { ...edu, [e.target.name]: e.target.value };
            return edu;
          })
        );
      }
    },
    [educations]
  );

  const addEducation = useCallback(() => {
    const prev = educations || [];
    setEducations([
      ...prev,
      { degree: "", university: "", startDate: "", endDate: "" },
    ]);
  }, [educations]);

  const removeEducation = useCallback(
    (index: number) => {
      if (Array.isArray(educations)) {
        setEducations((prevEducations) =>
          prevEducations.filter((_, i) => i !== index)
        );
      }
    },
    [educations]
  );

  const handleLanguageChange = useCallback(
    (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
      if (Array.isArray(languages)) {
        setLanguages((prevLanguages) =>
          prevLanguages.map((lang, i) => {
            if (i === index)
              return { ...lang, [e.target.name]: e.target.value };
            return lang;
          })
        );
      }
    },
    [languages]
  );

  const addLanguage = useCallback(() => {
    const prev = languages || [];
    setLanguages([...prev, { language: "", proficiency: "" }]);
  }, [languages]);

  const removeLanguage = useCallback(
    (index: number) => {
      if (Array.isArray(languages)) {
        setLanguages((prevLanguages) =>
          prevLanguages.filter((_, i) => i !== index)
        );
      }
    },
    [languages]
  );

  const addHobby = useCallback(() => {
    if (currentHobby.trim() !== "") {
      setHobbies((prevHobbies) => [...prevHobbies, currentHobby.trim()]);
      setCurrentHobby("");
    }
  }, [currentHobby]);

  const removeHobby = useCallback(
    (index: number) => {
      if (Array.isArray(hobbies)) {
        setHobbies((prevHobbies) => prevHobbies.filter((_, i) => i !== index));
      }
    },
    [hobbies]
  );

  const data = {
    personalDetails: { name, title, email, phone, address, github, image },
    experiences,
    educations,
    skills,
    languages,
    hobbies,
    projects,
  };

  const clearAll = () => {
    setName("");
    setTitle("");
    setEmail("");
    setPhone("");
    setAddress("");
    setGithub("");
    setExperiences([]);
    setEducations([]);
    setSkills([]);
    setLanguages([]);
    setHobbies([]);
    setImage("");
    setProjects([]);
  };

  const saveToLocalStorage = () => {
    const dataToSave = {
      name,
      title,
      email,
      phone,
      address,
      github,
      experiences,
      educations,
      skills,
      languages,
      hobbies,
      image,
      projects,
    };
    localStorage.setItem("cvData", JSON.stringify(dataToSave));
    toast({
      title: "CV Data Saved",
      description: "Your CV data has been successfully saved to local storage.",
      duration: 3000,
    });
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <Button
        onClick={() => setOpen(true)}
        className="fixed bottom-4 right-4 lg:hidden z-10"
      >
        Preview CV
      </Button>
      <div className="w-full lg:w-1/2 h-screen bg-white shadow-md hidden lg:flex flex-col">
        <PDFPreview data={data} />
      </div>
      <div className="w-full lg:w-1/2 h-screen overflow-y-auto p-2 lg:p-8 bg-gray-100 text-gray-900">
        <EditorHeader
          onClearAll={clearAll}
          onSave={saveToLocalStorage}
          onBack={() => router.replace("/")}
        />
        {/* <div className="bg-gray-100 pb-4">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6">
            <h1 className="text-3xl font-bold mb-4 lg:mb-0">CV Creator</h1>
            <div className="grid lg:flex grid-cols-2 gap-2 items-center justify-between w-full lg:w-auto">
              <Button
                onClick={clearAll}
                variant="outline"
                className="flex items-center"
              >
                <X className="mr-1" size={16} />
                <span className="text-sm">Clear</span>
              </Button>
              <Button
                onClick={saveToLocalStorage}
                variant="outline"
                className="flex items-center"
              >
                <Save className="mr-1" size={16} />
                <span className="text-sm">Save</span>
              </Button>
              <Button
                onClick={() => setOpen(true)}
                size="sm"
                variant="outline"
                className="flex items-center lg:hidden"
              >
                <ExternalLink className="mr-1" size={16} />
                <span className="text-sm">Preview</span>
              </Button>
              <Select
                value={template}
                onValueChange={(value) =>
                  setTemplate(value as "simple" | "sky")
                }
              >
                <SelectTrigger className="w-full bg-white">
                  <SelectValue placeholder="Template" />
                </SelectTrigger>
                <SelectContent className="w-full">
                  {Object.keys(templates).map((template) => (
                    <SelectItem key={template} value={template}>
                      {template}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div> */}
        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-4">Personal Details</h2>
            <PersonalDetails
              name={name}
              title={title}
              email={email}
              phone={phone}
              address={address}
              github={github}
              handlePersonalDetailsChange={handlePersonalDetailsChange}
              toast={toast}
            />
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-4">Experience</h2>
            <ExperienceSection
              experiences={experiences}
              handleExperienceChange={handleExperienceChange}
              removeExperience={removeExperience}
              addExperience={addExperience}
            />
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-4">Eductaion</h2>
            <EducationSection
              educations={educations}
              handleEducationChange={handleEducationChange}
              removeEducation={removeEducation}
              addEducation={addEducation}
            />
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-4">Skills</h2>
            <SkillsSection skills={skills} setSkills={setSkills} />
          </section>
          <section>
            <div className="flex items-start gap-2 mb-4">
              <h2 className="text-xl font-semibold">Job Description</h2>
              <p className="text-gray-400 text-xs">Beta</p>
            </div>
            <SmartUpdateSkillsSection
              cvData={data}
              skills={skills}
              setSkills={setSkills}
              setExperiences={setExperiences}
            />
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-4">Projects</h2>
            <ProjectsSection
              projects={projects}
              handleProjectChange={handleProjectChange}
              removeProject={removeProject}
              addProject={addProject}
            />
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-4">Languages</h2>
            <LanguagesSection
              languages={languages}
              addLanguage={addLanguage}
              removeLanguage={removeLanguage}
              handleLanguageChange={handleLanguageChange}
            />
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-4">Hobbies</h2>
            <HobbiesSection
              hobbies={hobbies}
              currentHobby={currentHobby}
              setCurrentHobby={setCurrentHobby}
              addHobby={addHobby}
              removeHobby={removeHobby}
            />
          </section>
        </div>
        <p className="text-gray-500 text-xs mt-4">
          This project is a work in progress. More templates and features will
          be added soon
          <Link
            className="pl-1 text-black font-bold"
            href="https://github.com/AtheerAPeter/simple-cv"
            target="_blank"
          >
            GitHub
          </Link>
        </p>
      </div>
      <PreviewCvModal
        children={<PDFPreview data={data} />}
        open={open}
        setOpen={setOpen}
      />
    </div>
  );
}
