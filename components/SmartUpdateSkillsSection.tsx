import { Experience, SkillCategory } from "@/interfaces/IFormTypes";
import { Textarea } from "./ui/textarea";
import { TextareaHTMLAttributes, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { ICvPdf } from "@/interfaces/ICvPdf";
import _ from "lodash";
import { useToast } from "@/hooks/use-toast";
import { useSmartUpdateSkills } from "@/hooks/useSmartUpdateSkills";

interface Props {
  skills: SkillCategory[];
  setSkills: React.Dispatch<React.SetStateAction<SkillCategory[]>>;
  setExperiences: React.Dispatch<React.SetStateAction<Experience[]>>;
  cvData: ICvPdf;
}
export const SmartUpdateSkillsSection = (props: Props) => {
  const [jobDesction, setJobDescription] = useState("");
  const [usageCount, setUsageCount] = useState<number>(0);
  const { smartUpdateSkillsMutation } = useSmartUpdateSkills();
  const { toast } = useToast();
  const useageCountLimit = 10;
  useEffect(() => {
    const storedCount = localStorage.getItem("F4wD4#$f!?/wdf");
    const storedTime = localStorage.getItem("F4wD4#$f!?/wdf_time");
    const oneDay = 24 * 60 * 60 * 1000;

    if (storedCount && storedTime) {
      const currentTime = new Date().getTime();
      const savedTime = JSON.parse(atob(storedTime));

      if (currentTime - savedTime > oneDay) {
        localStorage.removeItem("F4wD4#$f!?/wdf");
        localStorage.removeItem("F4wD4#$f!?/wdf_time");
      } else {
        const decryptedCount = JSON.parse(atob(storedCount));
        setUsageCount(decryptedCount);
      }
    }
  }, []);

  const increaseUsageCount = () => {
    const newCount = (usageCount ?? 0) + 1;
    setUsageCount(newCount);
    localStorage.setItem("F4wD4#$f!?/wdf", btoa(JSON.stringify(newCount)));
    localStorage.setItem(
      "F4wD4#$f!?/wdf_time",
      btoa(JSON.stringify(new Date().getTime()))
    );
  };

  const onChangeJobDescriptionInput: TextareaHTMLAttributes<HTMLTextAreaElement>["onChange"] =
    (event) => setJobDescription(event.target.value);

  const onSubmit = async () => {
    if (usageCount >= useageCountLimit) {
      toast({
        title: "You have reached the usage limit",
        description: "Limit will reset in 24 hours",
        duration: 3000,
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await smartUpdateSkillsMutation.mutateAsync({
        message:
          `based on this job description: ${jobDesction} modify my skills and rearrange and slightly modify my experinces points to fit the job description better and give me back the same json structure with the same html description format. my cv json: ${JSON.stringify(
            _.pick(props.cvData, ["skills", "experiences"])
          )}`
            .replace(/(\r\n|\n|\r)/gm, " ")
            .trim(),
      });
      const result = JSON.parse(response);
      if (result.experiences) {
        props.setExperiences(result.experiences);
      }
      if (result.skills) {
        props.setSkills(result.skills);
      }
      increaseUsageCount();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mb-4 p-4 bg-white">
      <div className="animate-border bg-gradient-to-r from-red-400 via-purple-400 to-blue-400 bg-[length:400%_400%] p-1 rounded-md">
        <Textarea
          value={jobDesction}
          onChange={onChangeJobDescriptionInput}
          placeholder="Enter the job description to automatically adjust your skills for a better match"
          className="bg-white rounded-md"
        />
      </div>
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
          Update Skills
        </Button>
        <span>
          {useageCountLimit}/{usageCount}
        </span>
      </div>
    </div>
  );
};
