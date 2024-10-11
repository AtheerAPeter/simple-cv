import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslations } from "next-intl";

interface Props {
  name: string;
  email: string;
  phone: string;
  address: string;
  date: string;
  handlePersonalDetailsChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PersonalDetails = (props: Props) => {
  const { name, email, phone, address, handlePersonalDetailsChange, date } =
    props;
  const t = useTranslations("coverLetterPage");
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">{t("name")}</Label>
          <Input
            id="name"
            name="name"
            value={name}
            onChange={handlePersonalDetailsChange}
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
          />
        </div>
        <div>
          <Label htmlFor="phone">{t("phone")}</Label>
          <Input
            id="phone"
            name="phone"
            value={phone}
            onChange={handlePersonalDetailsChange}
          />
        </div>
        <div>
          <Label htmlFor="address">{t("address")}</Label>
          <Input
            id="address"
            name="address"
            value={address}
            onChange={handlePersonalDetailsChange}
          />
        </div>
        <div>
          <Label htmlFor="date">{t("date")}</Label>
          <Input
            id="date"
            name="date"
            value={date}
            onChange={handlePersonalDetailsChange}
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalDetails;
