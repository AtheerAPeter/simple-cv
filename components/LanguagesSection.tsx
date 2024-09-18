import { FC } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Language } from "@/interfaces/IFormTypes";
import { PlusCircle, X } from "lucide-react";

interface Props {
  languages: Language[];
  handleLanguageChange: (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  removeLanguage: (index: number) => void;
  addLanguage: () => void;
}

const LanguagesSection = (props: Props) => {
  const { languages, handleLanguageChange, removeLanguage, addLanguage } =
    props;
  return (
    <>
      {languages?.map((lang, index) => (
        <div key={index} className="mb-4 p-4 bg-white">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-medium">Language {index + 1}</h3>
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
              <Label htmlFor={`language-${index}`}>Language</Label>
              <Input
                id={`language-${index}`}
                name="language"
                value={lang.language}
                onChange={(e) => handleLanguageChange(index, e)}
                className="border-gray-100"
              />
            </div>
            <div>
              <Label htmlFor={`proficiency-${index}`}>Proficiency</Label>
              <Input
                id={`proficiency-${index}`}
                name="proficiency"
                value={lang.proficiency}
                onChange={(e) => handleLanguageChange(index, e)}
                className="border-gray-100"
              />
            </div>
          </div>
        </div>
      ))}
      <Button type="button" onClick={addLanguage} className="mt-2">
        <PlusCircle className="mr-2 h-4 w-4" /> Add Language
      </Button>
    </>
  );
};

export default LanguagesSection;
