import useAI from "@/hooks/useAI";
import { useEffect, useRef, useState } from "react";
import { Experience, SkillCategory } from "@/interfaces/IFormTypes";
import { useTranslations } from "next-intl";
import useUser from "@/hooks/useUser";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Props {
  mockCoverLetter: string;
  experience?: Experience[];
  skills?: SkillCategory[];
  onGenerate: (value: string) => void;
  disabled: boolean;
}

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SmartCoverLetterForm = (props: Props) => {
  const messageBoxRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("coverLetterPage");
  const t3 = useTranslations("common");
  const [currentMessage, setCurrentMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello! I'm here to help you write a cover letter. Please provide a job description to get started.",
    },
  ]);
  const { AIMutataion } = useAI();
  const { user, userQuery } = useUser();

  const onChangeMessageInput: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => setCurrentMessage(event.target.value);

  useEffect(() => {
    messageBoxRef.current?.scrollTo({
      top: messageBoxRef.current?.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  const sendMessage = async () => {
    try {
      setMessages((prev) => [
        ...prev,
        { role: "user", content: currentMessage },
      ]);

      const prompt = `based on this either job description or message ${currentMessage}, i want you to write me a cover letter similar to this ${
        props.mockCoverLetter
      } without opening or closing phrases, which better matches the job description or the request message given my skills and experiences are experience: ${JSON.stringify(
        props.experience
      )} and skills: ${JSON.stringify(
        props.skills
      )}, make it simple, professional, and without any extra words which are not needed. Make them as paragraphs with break lines in between. Finally, return it to me in the same html format as the example cover letter.`;

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

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I've generated a cover letter based on your job description. You can see it in the preview.",
        },
      ]);
      setCurrentMessage("");
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col">
      {messages.length > 0 && (
        <div
          className="h-[300px] overflow-y-auto p-4 space-y-4 bg-gray-50 rounded-lg mb-4"
          ref={messageBoxRef}
        >
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.role === "user"
                    ? "bg-primary text-white"
                    : "bg-white border"
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="flex gap-2">
        <Input
          value={currentMessage}
          onChange={onChangeMessageInput}
          placeholder={t("placeholder")}
          className="flex-1"
        />
        <Button
          onClick={sendMessage}
          isLoading={AIMutataion.isPending}
          disabled={
            currentMessage.trim().length < 5 ||
            AIMutataion.isPending ||
            props.disabled
          }
        >
          Send
        </Button>
      </div>
    </div>
  );
};

export default SmartCoverLetterForm;
