import { Experience, SkillCategory } from "@/interfaces/IFormTypes";
import { TextareaHTMLAttributes, useState } from "react";
import { Button } from "./ui/button";
import { ICvPdf } from "@/interfaces/ICvPdf";
import _ from "lodash";
import { useSmartUpdateSkills } from "@/hooks/useSmartUpdateSkills";
import { MagicalTextarea } from "./magical-textarea";
import { JsonDiffComponentComponent } from "./json-diff-component";
import { useTranslations } from "next-intl";
import { useUser } from "@/hooks/useUser";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

interface Props {
  skills: SkillCategory[];
  setSkills: React.Dispatch<React.SetStateAction<SkillCategory[]>>;
  setExperiences: React.Dispatch<React.SetStateAction<Experience[]>>;
  cvData: ICvPdf;
}
export const SmartUpdateSkillsSection = (props: Props) => {
  const t = useTranslations("smartUpdateSkillsSection");
  const t2 = useTranslations("common");
  const { user, userQuery } = useUser();
  const [aiUpdatedData, setAiUpdatedData] = useState();
  const [jobDesction, setJobDescription] = useState("");
  const { smartUpdateSkillsMutation } = useSmartUpdateSkills();

  const onChangeJobDescriptionInput: TextareaHTMLAttributes<HTMLTextAreaElement>["onChange"] =
    (event) => setJobDescription(event.target.value);

  const onSubmit = async () => {
    try {
      const response = await toast.promise(
        smartUpdateSkillsMutation.mutateAsync({
          message:
            `based on this job description: ${jobDesction} modify my skills and rearrange and slightly modify my experinces points without messing with the dates and do not introduce significant change to experience to fit the job description better and give me back the same json structure with the same html description format also the skills types look like this if no skills were provided so you know the structure: Array<{title: string; skills: string[];}>. my cv json: ${JSON.stringify(
              _.pick(props.cvData, ["skills", "experiences"])
            )} try to make it as human as possible`
              .replace(/(\r\n|\n|\r)/gm, " ")
              .trim(),
          mode: "json",
        }),
        {
          pending: t2("loading"),
          success: t2("success"),
          error: {
            render({ data }: { data: any | AxiosError }) {
              if (data?.response) {
                return data.response.data.error;
              } else {
                return t2("error");
              }
            },
          },
        }
      );

      await userQuery.refetch();
      const result = JSON.parse(response);
      setAiUpdatedData(result);
      setJobDescription("");
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div>
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
