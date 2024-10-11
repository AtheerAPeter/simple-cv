import { Experience, SkillCategory } from "@/interfaces/IFormTypes";
import { TextareaHTMLAttributes, useState } from "react";
import { Button } from "./ui/button";
import { ICvPdf } from "@/interfaces/ICvPdf";
import _ from "lodash";
import { useToast } from "@/hooks/use-toast";
import { useSmartUpdateSkills } from "@/hooks/useSmartUpdateSkills";
import { MagicalTextarea } from "./magical-textarea";
import { JsonDiffComponentComponent } from "./json-diff-component";
import { useTranslations } from "next-intl";
import { useUser } from "@/hooks/useUser";

interface Props {
  skills: SkillCategory[];
  setSkills: React.Dispatch<React.SetStateAction<SkillCategory[]>>;
  setExperiences: React.Dispatch<React.SetStateAction<Experience[]>>;
  cvData: ICvPdf;
}
export const SmartUpdateSkillsSection = (props: Props) => {
  const t = useTranslations("smartUpdateSkillsSection");
  const { user, userQuery } = useUser();
  const [aiUpdatedData, setAiUpdatedData] = useState();
  const [jobDesction, setJobDescription] = useState("");
  const { smartUpdateSkillsMutation } = useSmartUpdateSkills();
  const { toast } = useToast();
  const useageCountLimit = 10;

  const onChangeJobDescriptionInput: TextareaHTMLAttributes<HTMLTextAreaElement>["onChange"] =
    (event) => setJobDescription(event.target.value);

  const onSubmit = async () => {
    try {
      const response = await smartUpdateSkillsMutation.mutateAsync({
        message:
          `based on this job description: ${jobDesction} modify my skills and rearrange and slightly modify my experinces points but do not introduce significant change to experience to fit the job description better and give me back the same json structure with the same html description format. my cv json: ${JSON.stringify(
            _.pick(props.cvData, ["skills", "experiences"])
          )} try to make it as human as possible`
            .replace(/(\r\n|\n|\r)/gm, " ")
            .trim(),
        mode: "json",
      });
      await userQuery.refetch();
      const result = JSON.parse(response);
      setAiUpdatedData(result);
      setJobDescription("");
      toast({
        title: t("updateSuccess.title"),
        description: t("updateSuccess.description"),
        duration: 5000,
      });
    } catch (error: any) {
      if (error.response) {
        toast({
          title: error.response.data.error,
          duration: 5000,
          className: "bg-red-500",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Something went wrong",
          duration: 5000,
          className: "bg-red-500",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="mb-4 p-4 bg-white">
      <MagicalTextarea
        value={jobDesction}
        onChange={onChangeJobDescriptionInput}
        placeholder={t("placeholder")}
      />
      <div className="mt-6 flex items-center">
        <Button
          onClick={onSubmit}
          isLoading={smartUpdateSkillsMutation.isPending}
          disabled={
            jobDesction.trim().length < 20 ||
            smartUpdateSkillsMutation.isPending
          }
          className="mr-2"
        >
          {t("updateButton")}
        </Button>
        <span>
          {t("usageLimit")}: {useageCountLimit}/{user?.usage}
        </span>
      </div>
      {!!aiUpdatedData && (
        <JsonDiffComponentComponent
          oldData={_.pick(props.cvData, ["skills", "experiences"])}
          newData={aiUpdatedData}
          onSubmit={(newData) => {
            if (newData.skills) {
              props.setSkills(newData.skills);
            }
            if (newData.experiences) {
              props.setExperiences(newData.experiences);
            }
          }}
        />
      )}
    </div>
  );
};
