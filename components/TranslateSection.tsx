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
import { useToast } from "@/hooks/use-toast";

interface Props {
  cvData: ICvPdf;
  onTranslate: (cvData: Partial<ICvPdf>) => void;
}

const availableLanguages = ["English", "Deutsch"];

export const TranslateSection = (props: Props) => {
  const t = useTranslations("translateSection");
  const t2 = useTranslations("smartUpdateSkillsSection");
  const { AIMutataion } = useAI();
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");
  const { userQuery } = useUser();
  const { toast } = useToast();

  const onSubmit = async () => {
    if (!selectedLanguage) return;

    try {
      const response = await AIMutataion.mutateAsync({
        message: `translate the values of this cv json to ${selectedLanguage}: ${JSON.stringify(
          _.omit(props.cvData, "personalDetails")
        )}`,
        mode: "json",
      });
      await userQuery.refetch();
      const result = JSON.parse(response);
      props.onTranslate(result);

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
