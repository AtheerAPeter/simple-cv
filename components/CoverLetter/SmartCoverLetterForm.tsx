import { useAI } from "@/hooks/useAI";
import { MagicalTextarea } from "../magical-textarea";
import { useState } from "react";
import { Button } from "../ui/button";
import { Experience, SkillCategory } from "@/interfaces/IFormTypes";
import { useTranslations } from "next-intl";
import { useUser } from "@/hooks/useUser";
import { useToast } from "@/hooks/use-toast";

interface Props {
  mockCoverLetter: string;
  experience?: Experience[];
  skills?: SkillCategory[];
  onGenerate: (value: string) => void;
  disabled: boolean;
}

const SmartCoverLetterForm = (props: Props) => {
  const t = useTranslations("coverLetterPage");
  const t2 = useTranslations("smartUpdateSkillsSection");
  const [jobDesction, setJobDescription] = useState("");
  const { AIMutataion } = useAI();
  const { user, userQuery } = useUser();
  const { toast } = useToast();
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
    try {
      const response = await AIMutataion.mutateAsync({
        message: prompt,
        mode: "text",
      });
      await userQuery.refetch();
      props.onGenerate(response);

      toast({
        title: t2("updateSuccess.description"),
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
    <div>
      <MagicalTextarea
        value={jobDesction}
        onChange={onChangeJobDescriptionInput}
        placeholder={t("placeholder")}
      />
      <div className="mt-6 flex items-center">
        <Button
          onClick={onSubmit}
          isLoading={AIMutataion.isPending}
          disabled={
            jobDesction.trim().length < 20 ||
            AIMutataion.isPending ||
            props.disabled
          }
          className="mr-2"
        >
          {t("generate")}
        </Button>
      </div>
    </div>
  );
};

export default SmartCoverLetterForm;
