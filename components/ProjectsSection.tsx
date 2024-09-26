import { Project } from "@/interfaces/IFormTypes";
import { Label } from "@radix-ui/react-label";
import { X, PlusCircle } from "lucide-react";
import dynamic from "next/dynamic";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useTranslations } from "next-intl";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface Props {
  projects: Project[];
  handleProjectChange: (index: number, field: string, value: string) => void;
  removeProject: (index: number) => void;
  addProject: () => void;
}
const ProjectsSection = (props: Props) => {
  const t = useTranslations("projectsSection");
  const { handleProjectChange, projects, removeProject, addProject } = props;

  return (
    <>
      {projects?.map((pro, index) => (
        <div key={index} className="mb-4 p-4 bg-white">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-medium">
              {t("project")} {index + 1}
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeProject(index)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div>
            <Label htmlFor={`title-${index}`}>{t("title")}</Label>
            <Input
              id={`title-${index}`}
              name="title"
              value={pro.title}
              onChange={(e) =>
                handleProjectChange(index, "title", e.target.value)
              }
              className="border-gray-100"
            />
          </div>
          <div>
            <Label htmlFor={`title-${index}`}>{t("link")}</Label>
            <Input
              id={`link-${index}`}
              name="link"
              value={pro.link}
              onChange={(e) =>
                handleProjectChange(index, "link", e.target.value)
              }
              className="border-gray-100"
            />
          </div>

          <div className="mt-4">
            <Label htmlFor={`description-${index}`}>{t("description")}</Label>
            <ReactQuill
              theme="snow"
              value={pro.description}
              onChange={(content) =>
                handleProjectChange(index, "description", content)
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
      <Button type="button" onClick={addProject} className="mt-2">
        <PlusCircle className="mr-2 h-4 w-4" /> {t("addProject")}
      </Button>
    </>
  );
};

export default ProjectsSection;
