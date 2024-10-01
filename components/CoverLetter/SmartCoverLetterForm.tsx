import { useAI } from "@/hooks/useAI";
import { MagicalTextarea } from "../magical-textarea";
import { useState } from "react";
import { Button } from "../ui/button";
import { Experience, SkillCategory } from "@/interfaces/IFormTypes";

interface Props {
  mockCoverLetter: string;
  experience: Experience[];
  skills: SkillCategory[];
  onGenerate: (value: string) => void;
}

const SmartCoverLetterForm = (props: Props) => {
  const [jobDesction, setJobDescription] = useState("");
  const { AIMutataion } = useAI();

  const prompt = `based on this job description ${jobDesction}, i want you to write me a cover letter similar to this ${
    props.mockCoverLetter
  } without opening or closing phrases, which better matches the job description given and skills and experiences which are experience: ${JSON.stringify(
    props.experience
  )} and skills: ${JSON.stringify(
    props.skills
  )}, make it simple, professional, and without any extra words which are not needed. Make them as paragraphs with break lines in between. Finally, return it to me in the same html format as the example cover letter.`;

  const onChangeJobDescriptionInput: React.ChangeEventHandler<
    HTMLTextAreaElement
  > = (event) => setJobDescription(event.target.value);

  const onSubmit = async () => {
    const response = await AIMutataion.mutateAsync({
      message: prompt,
      mode: "text",
    });
    props.onGenerate(response);
  };

  return (
    <div className="mb-4 p-4 bg-white">
      <MagicalTextarea
        value={jobDesction}
        onChange={onChangeJobDescriptionInput}
        placeholder="Enter the job description to automatically generate your cover letter based on your CV details"
      />
      <div className="mt-6 flex items-center">
        <Button
          onClick={onSubmit}
          isLoading={AIMutataion.isPending}
          disabled={jobDesction.trim().length < 20 || AIMutataion.isPending}
          className="mr-2"
        >
          Generate
        </Button>
      </div>
    </div>
  );
};

export default SmartCoverLetterForm;
