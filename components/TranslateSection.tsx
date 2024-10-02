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

interface Props {
  cvData: ICvPdf;
  onTranslate: (cvData: Partial<ICvPdf>) => void;
}

const availableLanguages = ["English", "Deutsch"];

export const TranslateSection = (props: Props) => {
  const t = useTranslations("translateSection");
  const { AIMutataion } = useAI();
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");

  const onSubmit = async () => {
    if (!selectedLanguage) return;

    const response = await AIMutataion.mutateAsync({
      message: `translate the values of this cv json to ${selectedLanguage}: ${JSON.stringify(
        _.omit(props.cvData, "personalDetails")
      )}`,
      mode: "json",
    });
    const result = JSON.parse(response);
    props.onTranslate(result);
  };

  return (
    <div className="mb-4 p-4 bg-white">
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
