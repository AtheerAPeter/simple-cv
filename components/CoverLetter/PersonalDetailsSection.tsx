import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslations } from "next-intl";

interface Props {
  name: string;
  email: string;
  phone: string;
  address: string;
  handlePersonalDetailsChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PersonalDetails = (props: Props) => {
  const { name, email, phone, address, handlePersonalDetailsChange } = props;
  const t = useTranslations("personalDetailsSection");
  return (
    <div className="mb-4 p-4 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">{t("name")}</Label>
          <Input
            id="name"
            name="name"
            value={name}
            onChange={handlePersonalDetailsChange}
            className="border-gray-100"
          />
        </div>
        <div>
          <Label htmlFor="email">{t("email")}</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={handlePersonalDetailsChange}
            className="border-gray-100"
          />
        </div>
        <div>
          <Label htmlFor="phone">{t("phone")}</Label>
          <Input
            id="phone"
            name="phone"
            value={phone}
            onChange={handlePersonalDetailsChange}
            className="border-gray-100"
          />
        </div>
        <div>
          <Label htmlFor="address">{t("address")}</Label>
          <Input
            id="address"
            name="address"
            value={address}
            onChange={handlePersonalDetailsChange}
            className="border-gray-100"
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalDetails;
