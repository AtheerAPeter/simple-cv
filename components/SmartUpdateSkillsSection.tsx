import { Experience, SkillCategory } from "@/interfaces/IFormTypes";
import { useRef, useState } from "react";
import { Button } from "./ui/button";
import { ICvPdf } from "@/interfaces/ICvPdf";
import _ from "lodash";
import useSmartUpdateSkills from "@/hooks/useSmartUpdateSkills";
import { Input } from "./ui/input";
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
  const { userQuery } = useUser();
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
        <div className="bg-white border rounded-full p-1 mb-2 w-fit">
          {Object.keys(MODIFICATION_AGGRESSION).map((key) => (
            <button
              onClick={() => setModificationAggression(key as any)}
              className={`px-2 py-1 rounded-full capitalize text-xs ${
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

      <div className="mt-4">
        <JsonDiffComponentComponent
          oldData={_.pick(props.cvData, ["skills", "experiences"])}
          newData={{
            skills: [
              {
                title: "Frontend",
                skills: [
                  "React.js",
                  "Next.js",
                  "React Native",
                  "TypeScript",
                  "Prisma",
                  "JavaScript (ES6)",
                  "Redux",
                  "Zustand",
                  "Testing",
                  "D3.js",
                ],
              },
              {
                title: "Backend",
                skills: [
                  "Node.js",
                  "Express.js",
                  "Hono",
                  "REST API",
                  "Prisma",
                  "PostgreSQL",
                  "Kotlin",
                  "Java",
                  "Docker",
                  "AWS",
                  "GraphQL",
                ],
              },
              {
                title: "Data Analysis & Machine Learning",
                skills: [
                  "Python",
                  "scikit-learn",
                  "Tensorflow",
                  "SQL",
                  "Jupyter Notebook",
                  "Data Processing",
                ],
              },
              {
                title: "Cloud & DevOps",
                skills: [
                  "AWS",
                  "Docker",
                  "Kubernetes",
                  "CI/CD Pipelines",
                  "Vercel",
                  "Cloud Deployments",
                ],
              },
            ],
            experiences: [
              {
                title: "Software Developer",
                employer: "United Nations Development Programme",
                startDate: "04/2023",
                endDate: "08/2024",
                description:
                  "<ul><li>Developed and maintained a scalable management platform using Next.js, Node.js, Prisma, and PostgreSQL to manage fund distributions.  Contributed to system scalability and performance.</li><li>Developed and delivered web solutions and tools (React.js, Next.js, Node.js) for project teams and other UNDP teams, improving team efficiency and collaboration.</li><li>Built a Next.js verification portal with integrated machine learning models (Python, scikit-learn) for fraud prevention and data validation, significantly enhancing security and data integrity.</li><li>Conducted extensive data analysis using Python, SQL, PostgreSQL, and scikit-learn, providing valuable insights for decision-making.</li><li>Provided technical solutions and creative ideas to overcome project challenges, demonstrating problem-solving skills and initiative.</li></ul>",
              },
              {
                title: "Senior Frontend Developer",
                employer: "ClubFeast",
                startDate: "06/2021",
                endDate: "04/2023",
                description:
                  "<ul><li>Developed high-performance mobile apps (React Native, TypeScript), B2B management systems (React.js, Node.js), and websites (Next.js) (https://app.clubfeast.com), showcasing expertise in multiple frontend technologies.</li><li>Managed app publishing on the App Store and Google Play, utilizing CI/CD pipelines to streamline deployment processes.</li><li>Wrote efficient, well-tested code with end-to-end and automated testing for web and mobile applications, ensuring high-quality deliverables.</li><li>Leveraged GraphQL to connect frontend and backend, and integrated third-party APIs seamlessly, demonstrating strong integration capabilities.</li><li>Collaborated effectively with an international team using Agile scrum with GitFlow, Jira, and Confluence, exhibiting team-oriented collaboration skills.</li><li>Conducted thorough code reviews, implemented robust security measures, and continuously stayed abreast of emerging technological trends, indicating a proactive approach to development.</li></ul>",
              },
              {
                title: "Software Tutor",
                employer: "FikraSpace",
                startDate: "03/2021",
                endDate: "06/2021",
                description:
                  "<ul><li>Led the frontend curriculum of a coding bootcamp (Next.js, React.js, and other frontend tools) in collaboration with GIZ and Expertise France, demonstrating strong teaching and mentoring abilities.</li></ul>",
              },
              {
                title: "Full Stack Developer",
                employer: "SOLO Creative Studio",
                startDate: "11/2020",
                endDate: "06/2021",
                description:
                  "<ul><li>Developed comprehensive systems (websites, dashboards, mobile apps) using React.js, Node.js, and React Native, delivering complete end-to-end solutions.</li><li>Focused on creating reusable components and enhancing UIs with design systems, improving code maintainability and efficiency.</li><li>Collaborated effectively with designers and backend developers using Agile Scrum, Git, Adobe XD, Figma, and Linear, highlighting strong teamwork and communication skills.</li><li>Successfully engaged with clients to understand requirements and deliver customized software solutions, demonstrating client management skills.</li></ul>",
              },
              {
                title: "Full Stack Web and Mobile Apps Developer",
                employer: "Freelancer",
                startDate: "04/2018",
                endDate: "11/2020",
                description:
                  "<ul><li>Independently managed and completed numerous freelance projects using React.js, Node.js, and React Native, demonstrating strong problem-solving and independent working capabilities.</li><li>Successfully delivered diverse projects including e-commerce platforms, POS systems, and video conferencing platforms, showcasing versatility across various project types.</li></ul>",
              },
            ],
          }}
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
    </div>
  );
}
