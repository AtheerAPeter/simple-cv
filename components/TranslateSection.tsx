import { ICvPdf } from "@/interfaces/ICvPdf";
import { Button } from "./ui/button";
import { useAI } from "@/hooks/useAI";
import _ from "lodash";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useTranslations } from "next-intl";
import { useUser } from "@/hooks/useUser";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

interface Props {
  cvData: ICvPdf;
  onTranslate: (cvData: Partial<ICvPdf>) => void;
}

const availableLanguages = ["English", "Deutsch"];

export const TranslateSection = (props: Props) => {
  const t = useTranslations("translateSection");
  const t3 = useTranslations("common");
  const { AIMutataion } = useAI();
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");
  const { userQuery } = useUser();

  const onSubmit = async () => {
    if (!selectedLanguage) return;

    try {
      const response = await toast.promise(
        AIMutataion.mutateAsync({
          message: `translate the values of this cv json to ${selectedLanguage}: ${JSON.stringify(
            _.omit(props.cvData, "personalDetails")
          )}`,
          mode: "json",
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
      const result = JSON.parse(response);
      props.onTranslate(result);
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="flex items-center space-x-4">
        <Select onValueChange={setSelectedLanguage} value={selectedLanguage}>
          <SelectTrigger className="w-full bg-white">
            <SelectValue placeholder={t("selectLanguage")} />
          </SelectTrigger>
          <SelectContent>
            {availableLanguages.map((lang) => (
              <SelectItem key={lang} value={lang}>
                {lang}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          onClick={onSubmit}
          disabled={!selectedLanguage || AIMutataion.isPending}
          isLoading={AIMutataion.isPending}
        >
          {t("button")}
        </Button>
      </div>
    </div>
  );
};
