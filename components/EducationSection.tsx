import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Education } from "@/interfaces/IFormTypes";
import { PlusCircle, X } from "lucide-react";
import { useTranslations } from "next-intl";

interface Props {
  educations: Education[];
  handleEducationChange: (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  removeEducation: (index: number) => void;
  addEducation: () => void;
}

const EducationSection = (props: Props) => {
  const t = useTranslations("educationSection");
  const { educations, handleEducationChange, removeEducation, addEducation } =
    props;
  return (
    <>
      {educations?.map((edu, index) => (
        <div key={index} className="mb-4 p-4 border border-input">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-medium">
              {t("title")} {index + 1}
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeEducation(index)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor={`degree-${index}`}>{t("degree")}</Label>
              <Input
                id={`degree-${index}`}
                name="degree"
                value={edu.degree}
                onChange={(e) => handleEducationChange(index, e)}
              />
            </div>
            <div>
              <Label htmlFor={`university-${index}`}>{t("university")}</Label>
              <Input
                id={`university-${index}`}
                name="university"
                value={edu.university}
                onChange={(e) => handleEducationChange(index, e)}
              />
            </div>
            <div>
              <Label htmlFor={`eduStartDate-${index}`}>{t("startDate")}</Label>
              <Input
                id={`eduStartDate-${index}`}
                name="startDate"
                type="text"
                placeholder="MM/YYYY"
                value={edu.startDate}
                onChange={(e) => handleEducationChange(index, e)}
              />
            </div>
            <div>
              <Label htmlFor={`eduEndDate-${index}`}>{t("endDate")}</Label>
              <Input
                id={`eduEndDate-${index}`}
                name="endDate"
                type="text"
                placeholder="MM/YYYY"
                value={edu.endDate}
                onChange={(e) => handleEducationChange(index, e)}
              />
            </div>
          </div>
        </div>
      ))}
      <Button type="button" onClick={addEducation} className="mt-2">
        <PlusCircle className="mr-2 h-4 w-4" /> {t("addEducation")}
      </Button>
    </>
  );
};

export default EducationSection;
