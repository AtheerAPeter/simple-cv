import { Experience, SkillCategory } from "@/interfaces/IFormTypes";
import { useState, useEffect, useRef } from "react";
import { Button } from "../../../components/ui/button";
import { ICvPdf } from "@/interfaces/ICvPdf";
import _ from "lodash";
import useSmartUpdateSkills from "@/hooks/useSmartUpdateSkills";
import { Input } from "../../../components/ui/input";
import { JsonDiffComponentComponent } from "./json-diff-component";
import { useTranslations } from "next-intl";
import useUser from "@/hooks/useUser";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

interface Props {
  skills: SkillCategory[];
  setSkills: React.Dispatch<React.SetStateAction<SkillCategory[]>>;
  setExperiences: React.Dispatch<React.SetStateAction<Experience[]>>;
  cvData: ICvPdf;
}

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function SmartUpdateSkillsSection(props: Props) {
  const t = useTranslations("smartUpdateSkillsSection");
  const t2 = useTranslations("common");
  const { user, userQuery } = useUser();
  const [aiUpdatedData, setAiUpdatedData] = useState();
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const { smartUpdateSkillsMutation } = useSmartUpdateSkills();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const onChangeMessageInput: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => setCurrentMessage(event.target.value);

  const sendMessage = async () => {
    if (currentMessage.trim().length < 20) return;

    try {
      setMessages((prev) => [
        ...prev,
        { role: "user", content: currentMessage },
      ]);

      const response = await toast.promise(
        smartUpdateSkillsMutation.mutateAsync({
          message:
            `based on this job description: ${currentMessage} modify my skills and rearrange and slightly modify my experinces points without messing with the dates to fit the job description better and give me back the same json structure with the same html description format also the skills types look like this if no skills were provided so you know the structure: Array<{title: string; skills: string[];}>. my cv json: ${JSON.stringify(
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
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I've analyzed your job description and updated your CV accordingly. Please review the changes below.",
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
        <div className="h-[300px] overflow-y-auto p-4 space-y-4 bg-gray-50 rounded-lg mb-4">
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
          <div ref={messagesEndRef} />
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
          isLoading={smartUpdateSkillsMutation.isPending}
          disabled={
            currentMessage.trim().length < 20 ||
            smartUpdateSkillsMutation.isPending
          }
        >
          Send
        </Button>
      </div>

      {!!aiUpdatedData && (
        <div className="mt-4">
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
        </div>
      )}
    </div>
  );
}
