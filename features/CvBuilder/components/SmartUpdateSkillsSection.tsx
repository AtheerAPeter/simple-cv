import { Experience, SkillCategory } from "@/interfaces/IFormTypes";
import { useRef, useState } from "react";
import { Button } from "../../../components/ui/button";
import { ICvPdf } from "@/interfaces/ICvPdf";
import _ from "lodash";
import useSmartUpdateSkills from "@/hooks/useSmartUpdateSkills";
import { Input } from "../../../components/ui/input";
import { JsonDiffComponentComponent } from "./json-diff-component";
import { useTranslations } from "next-intl";
import useUser from "@/hooks/useUser";

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

const MODIFICATION_AGGRESSION = {
  low: {
    message:
      "Please be easy and do not modify the CV too much only slight modifications",
  },
  medium: {
    message:
      "Please be moderate and do not modify the CV too much, you can add new skills and remove some if needed only",
  },
  high: {
    message: "",
  },
};

export default function SmartUpdateSkillsSection(props: Props) {
  const messgaeBoxRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("smartUpdateSkillsSection");
  const t2 = useTranslations("common");

  const MODIFICATION_AGGRESSION = {
    low: {
      message:
        "Please be easy and do not modify the CV too much only slight modifications",
      buttonTitle: t("modificationAggression.low"),
    },
    medium: {
      message:
        "Please be moderate and do not modify the CV too much, you can add new skills and remove some if needed only",
      buttonTitle: t("modificationAggression.medium"),
    },
    high: {
      message: "",
      buttonTitle: t("modificationAggression.high"),
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

  const sendMessage = async () => {
    if (currentMessage.trim().length < 20) return;

    try {
      setMessages((prev) => [
        ...prev,
        { role: "user", content: currentMessage },
      ]);
      messgaeBoxRef.current?.scrollIntoView({ behavior: "smooth" });
      const response = await smartUpdateSkillsMutation.mutateAsync({
        message:
          `Please update the provided CV JSON based on the user's message, following these guidelines:

              1. Skills:
              - Modify and reorganize the skills section
              - Match skills to any provided job description
              - Keep the skills structure as Array<{title: string; skills: string[];}>

              2. Experience:
              - Rephrase and reorder experience bullet points to better match context
              - Maintain all original dates
              - Do not reorder the experiences keep them ordered by date, most recent first
              - Keep HTML formatting in descriptions

              3. Output:
              - Return updated JSON with same structure
              - Ensure natural, human-like language
              - Adapt content based on whether input is a job description or other requests by the user

              ${MODIFICATION_AGGRESSION[modificationAggression].message}

              CV JSON: ${JSON.stringify(
                _.pick(props.cvData, ["skills", "experiences"])
              )}`
            .replace(/(\r\n|\n|\r)/gm, " ")
            .trim(),
        mode: "json",
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
    <div className="flex flex-col">
      {messages.length > 0 && (
        <div
          className="h-[300px] overflow-y-auto p-4 space-y-4 bg-gray-50 rounded-lg mb-4"
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
      <div>
        <p className="text-sm text-gray-500">
          {t("modificationAggression.label")}
        </p>
        <div className="bg-white border rounded-lg p-1 mb-2 w-fit">
          {Object.keys(MODIFICATION_AGGRESSION).map((key) => (
            <button
              onClick={() => setModificationAggression(key as any)}
              className={`px-2 py-1 rounded-md capitalize ${
                key === modificationAggression
                  ? "bg-primary text-white"
                  : "bg-white"
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
