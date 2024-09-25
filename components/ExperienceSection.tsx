import React from "react";
import { PlusCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import { Experience } from "@/interfaces/IFormTypes";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";

interface Props {
  experiences: Experience[];
  handleExperienceChange: (index: number, field: string, value: string) => void;
  removeExperience: (index: number) => void;
  addExperience: () => void;
}

const ExperienceSection = (props: Props) => {
  const t = useTranslations("experienceSection");
  const {
    experiences,
    handleExperienceChange,
    removeExperience,
    addExperience,
  } = props;

  return (
    <>
      {experiences?.map((exp, index) => (
        <div key={index} className="mb-4 p-4 bg-white">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-medium">
              {t("title")} {index + 1}
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeExperience(index)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor={`title-${index}`}>{t("jobTitle")}</Label>
              <Input
                id={`title-${index}`}
                name="title"
                value={exp.title}
                onChange={(e) =>
                  handleExperienceChange(index, "title", e.target.value)
                }
                className="border-gray-100"
              />
            </div>
            <div>
              <Label htmlFor={`employer-${index}`}>{t("employer")}</Label>
              <Input
                id={`employer-${index}`}
                name="employer"
                value={exp.employer}
                onChange={(e) =>
                  handleExperienceChange(index, "employer", e.target.value)
                }
                className="border-gray-100"
              />
            </div>
            <div>
              <Label htmlFor={`startDate-${index}`}>{t("startDate")}</Label>
              <Input
                id={`startDate-${index}`}
                name="startDate"
                type="text"
                placeholder="MM/YYYY"
                value={exp.startDate}
                onChange={(e) =>
                  handleExperienceChange(index, "startDate", e.target.value)
                }
                className="border-gray-100"
              />
            </div>
            <div>
              <Label htmlFor={`endDate-${index}`}>{t("endDate")}</Label>
              <Input
                id={`endDate-${index}`}
                name="endDate"
                type="text"
                placeholder="MM/YYYY"
                value={exp.endDate}
                onChange={(e) =>
                  handleExperienceChange(index, "endDate", e.target.value)
                }
                className="border-gray-100"
              />
            </div>
          </div>
          <div className="mt-4">
            <Label htmlFor={`description-${index}`}>{t("description")}</Label>
            <ReactQuill
              theme="snow"
              value={exp.description}
              onChange={(content) =>
                handleExperienceChange(index, "description", content)
              }
              modules={{
                toolbar: [
                  [{ list: "bullet" }],
                  ["bold", "italic", "underline"],
                  ["clean"],
                ],
              }}
              formats={["list", "bold", "italic", "underline"]}
              className="bg-white text-gray-900"
            />
          </div>
        </div>
      ))}
      <Button type="button" onClick={addExperience} className="mt-2">
        <PlusCircle className="mr-2 h-4 w-4" /> {t("addExperience")}
      </Button>
    </>
  );
};

export default ExperienceSection;
