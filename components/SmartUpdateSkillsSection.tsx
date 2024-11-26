import { Experience, SkillCategory } from "@/interfaces/IFormTypes";
import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { ICvPdf } from "@/interfaces/ICvPdf";
import _ from "lodash";
import useSmartUpdateSkills from "@/hooks/useSmartUpdateSkills";
import { Input } from "./ui/input";
import { JsonDiffComponentComponent } from "./json-diff-component";
import { useTranslations } from "next-intl";
import useUser from "@/hooks/useUser";
import { PlusIcon } from "lucide-react";

interface Props {
  skills: SkillCategory[];
  setSkills: React.Dispatch<React.SetStateAction<SkillCategory[]>>;
  setExperiences: React.Dispatch<React.SetStateAction<Experience[]>>;
  cvData: ICvPdf;
  onBuyMore: () => void;
}

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function SmartUpdateSkillsSection(props: Props) {
  const messgaeBoxRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("smartUpdateSkillsSection");
  const t2 = useTranslations("common");

  const MODIFICATION_AGGRESSION = {
    low: {
      message:
        "slightly modify my experinces points without messing with the dates to fit the job description better",
      buttonTitle: t("modificationAggression.low"),
      temperature: 0.8,
    },
    medium: {
      message:
        "modify my experinces points without messing with the dates to fit the job description better",
      buttonTitle: t("modificationAggression.medium"),
      temperature: 0.9,
    },
    high: {
      message:
        "make comprehensive modifications to the CV without messing with the dates to fit the job description better",
      buttonTitle: t("modificationAggression.high"),
      temperature: 1,
    },
  };
  const { user, userQuery } = useUser();
  const [modificationAggression, setModificationAggression] =
    useState<keyof typeof MODIFICATION_AGGRESSION>("low");
  const [aiUpdatedData, setAiUpdatedData] = useState();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello! I'm here to help you modify and refine your CV. Please provide a message or a job description to get started.",
    },
  ]);
  const [currentMessage, setCurrentMessage] = useState("");
  const { smartUpdateSkillsMutation } = useSmartUpdateSkills();

  const onChangeMessageInput: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => setCurrentMessage(event.target.value);

  useEffect(() => {
    messgaeBoxRef.current?.scrollTo({
      top: messgaeBoxRef.current?.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  const sendMessage = async () => {
    if (currentMessage.trim().length < 20) return;

    try {
      setMessages((prev) => [
        ...prev,
        { role: "user", content: currentMessage },
      ]);
      const response = await smartUpdateSkillsMutation.mutateAsync({
        message:
          `based on this job description or message: ${currentMessage}, modify my skills, rearrange the experinces points but do not rearrange the experiences themselves and ${
            MODIFICATION_AGGRESSION[modificationAggression].message
          } and give me back the same json structure with the same html description format also the skills types look like this if no skills were provided so you know the structure: Array<{title: string; skills: string[];}>. my cv json: ${JSON.stringify(
            _.pick(props.cvData, ["skills", "experiences"])
          )} try to make it as human as possible`
            .replace(/(\r\n|\n|\r)/gm, " ")
            .trim(),
        mode: "json",
        temperature:
          MODIFICATION_AGGRESSION[modificationAggression].temperature,
      });

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
      messgaeBoxRef.current?.scrollIntoView({ behavior: "smooth" });
    } catch (data: any) {
      console.log(data);
      if (data?.response) {
        return data.response.data.error;
      } else {
        return t2("error");
      }
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {messages.length > 0 && (
        <div
          className="h-48 overflow-y-auto bg-gray-50 rounded-lg p-3 space-y-2"
          ref={messgaeBoxRef}
        >
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] p-2 rounded-md text-sm ${
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

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">
            {t("modificationAggression.label")}
          </span>
          <div className="bg-white border rounded-full p-0.5 flex">
            {Object.keys(MODIFICATION_AGGRESSION).map((key) => (
              <button
                onClick={() => setModificationAggression(key as any)}
                className={`px-2 py-0.5 rounded-full capitalize text-xs ${
                  key === modificationAggression ? "bg-primary text-white" : ""
                }`}
                key={key}
              >
                {
                  MODIFICATION_AGGRESSION[
                    key as keyof typeof MODIFICATION_AGGRESSION
                  ].buttonTitle
                }
              </button>
            ))}
          </div>
        </div>

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
              currentMessage.trim().length < 5 ||
              smartUpdateSkillsMutation.isPending
            }
          >
            Send
          </Button>
        </div>
        <div className="flex items-center justify-between gap-4 mt-4 p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">
                {t2("usageTokens")}:
              </span>
              <span className="text-sm font-bold">
                {user?.usage?.toLocaleString()}
              </span>
            </div>
            <Button size={"sm"} onClick={props.onBuyMore} variant="outline">
              {t2("buyMore")}
            </Button>
          </div>
        </div>
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
}
