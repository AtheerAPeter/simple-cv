import { SkillCategory } from "@/interfaces/IFormTypes";
import { Textarea } from "./ui/textarea";
import { TextareaHTMLAttributes, useState } from "react";
import { Button } from "./ui/button";
import { useSmartUpdateSkills } from "@/hooks/useSmartUpdateSkills";
import { ICvPdf } from "@/interfaces/ICvPdf";
import _ from "lodash";

interface Props {
  skills: SkillCategory[];
  setSkills: React.Dispatch<React.SetStateAction<SkillCategory[]>>;
  cvData: ICvPdf;
}
export const SmartUpdateSkillsSection = (props: Props) => {
  const [jobDesction, setJobDescription] = useState("");
  const { smartUpdateSkillsMutation } = useSmartUpdateSkills();

  const onChangeJobDescriptionInput: TextareaHTMLAttributes<HTMLTextAreaElement>["onChange"] =
    (event) => setJobDescription(event.target.value);

  const onSubmit = async () => {
    try {
      const response = await smartUpdateSkillsMutation.mutateAsync({
        job_description: jobDesction,
        cv: _.omit(props.cvData, ["personalDetails.image"]),
      });

      const updatedSkills = response.updated.skills;
      const currentSkills = props.skills;

      updatedSkills?.forEach((newSkill) => {
        const existingSkillIndex = currentSkills.findIndex(
          (skill) => skill.title === newSkill.title
        );

        if (existingSkillIndex > -1) {
          newSkill.skills.forEach((skill) => {
            if (!currentSkills[existingSkillIndex].skills.includes(skill)) {
              currentSkills[existingSkillIndex].skills.push(skill);
            }
          });
        } else {
          currentSkills.push(newSkill);
        }
      });

      props.setSkills([...currentSkills]);
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
      <Button
        onClick={onSubmit}
        isLoading={smartUpdateSkillsMutation.isPending}
        disabled={
          jobDesction.trim().length < 20 || smartUpdateSkillsMutation.isPending
        }
        className="mt-6"
      >
        Update Skills
      </Button>
    </div>
  );
};
