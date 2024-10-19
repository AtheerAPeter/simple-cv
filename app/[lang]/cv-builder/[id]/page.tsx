"use client";
import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import "react-quill/dist/quill.snow.css";
import useCvForm from "@/hooks/useCvForm";
import EducationSection from "@/components/EducationSection";
import ExperienceSection from "@/components/ExperienceSection";
import PreviewCvModal from "@/components/modals/PreviewCvModal";
import PersonalDetails from "@/components/PersonalDetailsSection";
import SkillsSection from "@/components/SkillsSection/SkillsList";
import PDFPreview from "@/components/PDFPreview";
import LanguagesSection from "@/components/LanguagesSection";
import HobbiesSection from "@/components/HobbiesSection";
import ProjectsSection from "@/components/ProjectsSection";
import SmartUpdateSkillsSection from "@/components/SmartUpdateSkillsSection";
import EditorHeader from "@/components/EditorHeader";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import TranslateSection from "@/components/TranslateSection";
import { ICvPdf } from "@/interfaces/ICvPdf";
import { useSession } from "next-auth/react";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import FloatingSidebarComponent from "@/components/floating-sidebar";
import useDocument from "@/hooks/useDocument";
import useUploadImage from "@/hooks/useUploadImage";
import { toast } from "react-toastify";

export default function Page({ params }: { params: { id: string } }) {
  const t = useTranslations("cvBuilder");
  const locale = useLocale();
  const router = useRouter();
  const { status } = useSession();
  const { document, documentQuery, updateMutation } = useDocument({
    listEnabled: false,
    id: params.id,
  });

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
  const { uploadImageMutation } = useUploadImage();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!document) return;
    const parsedData = JSON.parse(document.content);
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
  }, [document]);

  const handlePersonalDetailsChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
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
            await toast.promise(
              (async () => {
                const response = await uploadImageMutation.mutateAsync(
                  files[0]
                );
                if (response && response.image.url) {
                  setImage(response.image.url);
                }
              })(),
              {
                pending: t("toasts.uploadingImage"),
                success: t("toasts.imageUploaded"),
                error: t("toasts.imageUploadError"),
              }
            );
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

  const onSetData = (data: Partial<ICvPdf>) => {
    setExperiences(data.experiences || experiences);
    setEducations(data.educations || educations);
    setSkills(data.skills || skills);
    setLanguages(data.languages || languages);
    setHobbies(data.hobbies || hobbies);
    setProjects(data.projects || projects);
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

  const onSaveToServer = async () => {
    const dataToSave = JSON.stringify({
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
    });

    await toast.promise(
      async () => {
        const response = await updateMutation.mutateAsync({
          content: dataToSave,
          id: document?.id!,
        });
        if (response) {
          documentQuery.refetch();
        }
      },
      {
        pending: t("cvDataSaved.cvDataSaving"),
        success: t("cvDataSaved.title"),
        error: t("cvDataSaved.cvDataSaveError"),
      }
    );
  };

  const onShare = (template: string, color: string) => {
    const domain = window.location.origin;
    const shareUrl = `${domain}/${locale}/share/${
      document?.id
    }?template=${template}&color=${color.replace("#", "")}`;
    navigator.clipboard
      .writeText(shareUrl)
      .then(() => {
        toast.success(t("shareUrlCopied.title"));
      })
      .catch((error) => {
        console.error("Failed to copy to clipboard: ", error);
      });
  };

  const clearProfilePhoto = () => {
    setImage(null);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <FloatingSidebarComponent
        documentTitle={document?.title!}
        documentId={document?.id!}
      />
      {status === "authenticated" ? (
        <>
          <div className="w-full lg:w-1/2 hidden lg:flex flex-col bg-slate-400">
            <PDFPreview data={data} />
          </div>
          <div className="w-full lg:w-1/2 h-screen overflow-y-auto p-2 lg:p-8">
            <EditorHeader
              onClearAll={clearAll}
              onSave={onSaveToServer}
              isSaving={updateMutation.isPending}
              onBack={() => router.replace(`/${locale}/dashboard`)}
              onShare={onShare}
            />
            <div className="space-y-6">
              <section>
                <h2 className="text-xl font-semibold mb-3 mt-10">
                  {t("personalDetails")}
                </h2>
                <PersonalDetails
                  name={name}
                  title={title}
                  email={email}
                  phone={phone}
                  address={address}
                  github={github}
                  handlePersonalDetailsChange={handlePersonalDetailsChange}
                  toast={toast}
                  isUploadingImage={uploadImageMutation.isPending}
                  onClearProfilePhoto={clearProfilePhoto}
                />
              </section>
              <section>
                <h2 className="text-xl font-semibold mb-3 mt-10">
                  {t("experience")}
                </h2>
                <ExperienceSection
                  experiences={experiences}
                  handleExperienceChange={handleExperienceChange}
                  removeExperience={removeExperience}
                  addExperience={addExperience}
                />
              </section>
              <section>
                <h2 className="text-xl font-semibold mb-3 mt-10">
                  {t("education")}
                </h2>

                <EducationSection
                  educations={educations}
                  handleEducationChange={handleEducationChange}
                  removeEducation={removeEducation}
                  addEducation={addEducation}
                />
              </section>
              <section>
                <h2 className="text-xl font-semibold mb-3 mt-10">
                  {t("skills")}
                </h2>

                <SkillsSection skills={skills} setSkills={setSkills} />
              </section>
              <section>
                <div className="flex items-start gap-2 mb-3 mt-10">
                  <h2 className="text-xl font-semibold">
                    {t("jobDescription")}
                  </h2>
                  <p className="text-gray-400 text-xs">{t("beta")}</p>
                </div>
                <SmartUpdateSkillsSection
                  cvData={data}
                  skills={skills}
                  setSkills={setSkills}
                  setExperiences={setExperiences}
                />
              </section>
              <section>
                <h2 className="text-xl font-semibold mb-3 mt-10">
                  {t("translateTtile")}
                </h2>

                <TranslateSection cvData={data} onTranslate={onSetData} />
              </section>
              <section>
                <h2 className="text-xl font-semibold mb-3 mt-10">
                  {t("projects")}
                </h2>

                <ProjectsSection
                  projects={projects}
                  handleProjectChange={handleProjectChange}
                  removeProject={removeProject}
                  addProject={addProject}
                />
              </section>
              <section>
                <h2 className="text-xl font-semibold mb-3 mt-10">
                  {t("languages")}
                </h2>

                <LanguagesSection
                  languages={languages}
                  addLanguage={addLanguage}
                  removeLanguage={removeLanguage}
                  handleLanguageChange={handleLanguageChange}
                />
              </section>
              <section>
                <h2 className="text-xl font-semibold mb-3 mt-10">
                  {t("hobbies")}
                </h2>

                <HobbiesSection
                  hobbies={hobbies}
                  currentHobby={currentHobby}
                  setCurrentHobby={setCurrentHobby}
                  addHobby={addHobby}
                  removeHobby={removeHobby}
                />
              </section>
            </div>
          </div>
        </>
      ) : status === "loading" ? (
        <div className="flex items-center justify-center h-screen w-screen">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="flex items-center justify-center h-screen w-screen">
          <p>X</p>
        </div>
      )}
      <PreviewCvModal
        children={<PDFPreview data={data} />}
        open={open}
        setOpen={setOpen}
      />
      <Button
        onClick={() => setOpen(true)}
        className="fixed bottom-4 right-4 lg:hidden z-10"
      >
        {t("previewCV")}
      </Button>
    </div>
  );
}
