import useAI from "@/hooks/useAI";
import { MagicalTextarea } from "../magical-textarea";
import { useState } from "react";
import { Button } from "../ui/button";
import { Experience, SkillCategory } from "@/interfaces/IFormTypes";
import { useTranslations } from "next-intl";
import useUser from "@/hooks/useUser";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

interface Props {
  mockCoverLetter: string;
  experience?: Experience[];
  skills?: SkillCategory[];
  onGenerate: (value: string) => void;
  disabled: boolean;
}

const SmartCoverLetterForm = (props: Props) => {
  const t = useTranslations("coverLetterPage");
  const t3 = useTranslations("common");
  const [jobDesction, setJobDescription] = useState("");
  const { AIMutataion } = useAI();
  const { user, userQuery } = useUser();
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
      const response = await toast.promise(
        AIMutataion.mutateAsync({
          message: prompt,
          mode: "text",
        }),
        {
          pending: t3("loading"),
          success: t3("success"),
          error: {
            render({ data }: { data: any | AxiosError }) {
              if (data?.response) {
                return data.response.data.error;
              } else {
                return t3("error");
              }
            },
          },
        }
      );

      await userQuery.refetch();
      props.onGenerate(response);
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
