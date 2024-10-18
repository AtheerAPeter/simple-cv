import { FC } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Language } from "@/interfaces/IFormTypes";
import { PlusCircle, X } from "lucide-react";
import { useTranslations } from "next-intl";

interface Props {
  languages: Language[];
  handleLanguageChange: (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  removeLanguage: (index: number) => void;
  addLanguage: () => void;
}

export default function LanguagesSection(props: Props) {
  const t = useTranslations("languagesSection");
  const { languages, handleLanguageChange, removeLanguage, addLanguage } =
    props;
  return (
    <>
      {languages?.map((lang, index) => (
        <div key={index} className="mb-4 border border-input p-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-medium">
              {t("title")} {index + 1}
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeLanguage(index)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor={`language-${index}`}>{t("title")}</Label>
              <Input
                id={`language-${index}`}
                name="language"
                value={lang.language}
                onChange={(e) => handleLanguageChange(index, e)}
              />
            </div>
            <div>
              <Label htmlFor={`proficiency-${index}`}>{t("proficiency")}</Label>
              <Input
                id={`proficiency-${index}`}
                name="proficiency"
                value={lang.proficiency}
                onChange={(e) => handleLanguageChange(index, e)}
              />
            </div>
          </div>
        </div>
      ))}
      <Button type="button" onClick={addLanguage} className="mt-2">
        <PlusCircle className="mr-2 h-4 w-4" /> {t("addLanguage")}
      </Button>
    </>
  );
}
