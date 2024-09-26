import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle, X } from "lucide-react";
import { useTranslations } from "next-intl";

interface Props {
  hobbies: string[];
  currentHobby: string;
  setCurrentHobby: (hobby: string) => void;
  addHobby: () => void;
  removeHobby: (index: number) => void;
}

const HobbiesSection = (props: Props) => {
  const t = useTranslations("hobbiesSection");
  const { hobbies, currentHobby, setCurrentHobby, addHobby, removeHobby } =
    props;
  return (
    <>
      <div className="mb-4 p-4 bg-white">
        <div className="flex flex-wrap gap-2 mb-2">
          {hobbies?.map((hobby, index) => (
            <Badge key={index} variant="secondary" className="px-2 py-1">
              {hobby}
              <button
                onClick={() => removeHobby(index)}
                className="ml-2 text-xs"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
        <div className="flex gap-2">
          <Input
            value={currentHobby}
            onChange={(e) => setCurrentHobby(e.target.value)}
            placeholder={t("title")}
            className="border-gray-100"
          />
          <Button type="button" size={"icon"} onClick={addHobby}>
            <PlusCircle size={20} />
          </Button>
        </div>
      </div>
    </>
  );
};

export default HobbiesSection;
