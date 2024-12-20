"use client";
import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import "react-quill/dist/quill.snow.css";
import useCvForm from "@/hooks/useCvForm";
import EducationSection from "@/components/EducationSection";
import ExperienceSection from "@/components/ExperienceSection";
import PreviewCvModal from "@/components/modals/PreviewCvModal";
import SkillsSection from "@/components/SkillsSection/SkillsList";
import LanguagesSection from "@/components/LanguagesSection";
import HobbiesSection from "@/components/HobbiesSection";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { IContent, ICvPdf } from "@/interfaces/ICvPdf";
import FloatingSidebarComponent from "@/components/floating-sidebar";
import useDocument from "@/hooks/useDocument";
import useUploadImage from "@/hooks/useUploadImage";
import { toast } from "react-toastify";
import { debounce } from "lodash";
import { isEqual } from "lodash";
import { AnimatePresence, motion } from "framer-motion";
import PDFPreview from "@/components/PDFPreview";
import EditorHeader from "@/components/EditorHeader";
import SmartUpdateSkillsSection from "@/components/SmartUpdateSkillsSection";
import PersonalDetails from "@/components/PersonalDetailsSectionCV";
import TranslateSection from "@/components/TranslateSection";
import ProjectsSection from "@/components/ProjectsSection";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Page({ params }: { params: { id: string } }) {
  const t = useTranslations("cvBuilder");
  const commonT = useTranslations("common");
  const locale = useLocale();
  const router = useRouter();
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
  const [isSaved, setIsSaved] = useState(false);
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

  const [debouncedData, setDebouncedData] = useState(data);
  const debouncedSetData = useCallback(
    debounce((newData: ICvPdf) => {
      setDebouncedData(newData);
    }, 800),
    []
  );
  useEffect(() => {
    debouncedSetData(data);
  }, [data, debouncedSetData]);

  useEffect(() => {
    const serverData: IContent = JSON.parse(document?.content || "{}");
    setIsSaved(
      isEqual(debouncedData, {
        personalDetails: {
          name: serverData.name,
          title: serverData.title,
          email: serverData.email,
          phone: serverData.phone,
          address: serverData.address,
          github: serverData.github,
          image: serverData.image,
        },
        experiences: serverData.experiences,
        educations: serverData.educations,
        skills: serverData.skills,
        languages: serverData.languages,
        hobbies: serverData.hobbies,
        projects: serverData.projects,
      })
    );
  }, [debouncedData]);

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
    <div className="flex flex-col lg:flex-row min-h-screen relative">
      <AnimatePresence>
        {!isSaved && (
          <motion.div
            className="fixed left-0 bottom-0 lg:bottom-4 lg:left-4 w-full lg:w-fit bg-white p-2 z-50 border flex items-start justify-center rounded-md"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center gap-2 w-full justify-center">
              <p>{commonT("unsavedChanges")}</p>
              <Button
                isLoading={updateMutation.isPending}
                disabled={updateMutation.isPending}
                variant="secondary"
                size={"sm"}
                onClick={onSaveToServer}
              >
                {commonT("saveChanges")}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <FloatingSidebarComponent
        documentTitle={document?.title!}
        documentId={document?.id!}
      />

      <div className="w-full lg:w-1/2 hidden lg:flex flex-col bg-slate-400 h-screen overflow-hidden">
        <PDFPreview data={debouncedData} />
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
            <SmartUpdateSkillsSection
              onBuyMore={() => router.push(`/${locale}/purchase`)}
              cvData={data}
              skills={skills}
              setSkills={setSkills}
              setExperiences={setExperiences}
            />
          </section>
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
            <h2 className="text-xl font-semibold mb-3 mt-10">{t("skills")}</h2>

            <SkillsSection skills={skills} setSkills={setSkills} />
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
            <h2 className="text-xl font-semibold mb-3 mt-10">{t("hobbies")}</h2>

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

      <PreviewCvModal
        children={<PDFPreview data={data} scale={0.5} />}
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
