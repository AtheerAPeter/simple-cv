import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslations } from "next-intl";

interface Props {
  companyName: string;
  managerName: string;
  companyAddress: string;
  position: string;
  handleEmployerDetailsChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const EmployerDetailsSection = (props: Props) => {
  const t = useTranslations("coverLetterPage");
  return (
    <div className="mb-4 p-4 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="companyName">{t("recipient.companyName")}</Label>
          <Input
            id="companyName"
            name="companyName"
            value={props.companyName}
            onChange={props.handleEmployerDetailsChange}
            className="border-gray-100"
          />
        </div>
        <div>
          <Label htmlFor="managerName">{t("recipient.recipientName")}</Label>
          <Input
            id="managerName"
            name="managerName"
            value={props.managerName}
            onChange={props.handleEmployerDetailsChange}
            className="border-gray-100"
          />
        </div>
        <div>
          <Label htmlFor="companyAddress">{t("address")}</Label>
          <Input
            id="companyAddress"
            name="companyAddress"
            value={props.companyAddress}
            onChange={props.handleEmployerDetailsChange}
            className="border-gray-100"
          />
        </div>
        <div>
          <Label htmlFor="position">{t("recipient.position")}</Label>
          <Input
            id="position"
            name="position"
            value={props.position}
            onChange={props.handleEmployerDetailsChange}
            className="border-gray-100"
          />
        </div>
      </div>
    </div>
  );
};

export default EmployerDetailsSection;
