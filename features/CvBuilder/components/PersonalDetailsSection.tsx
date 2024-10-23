import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2Icon } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "../../../components/ui/button";

interface Props {
  name: string;
  title: string;
  email: string;
  phone: string;
  address: string;
  github: string;
  handlePersonalDetailsChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  toast: any;
  isUploadingImage: boolean;
  onClearProfilePhoto: () => void;
}

export default function PersonalDetails(props: Props) {
  const {
    name,
    title,
    email,
    phone,
    address,
    github,
    handlePersonalDetailsChange,
    toast,
  } = props;
  const t = useTranslations("personalDetailsSection");
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const fileSize = e.target.files[0].size;
      if (fileSize > 1048576) {
        toast({
          title: "File is too big",
          description: "Please select a file smaller than 1MB.",
          duration: 2000,
        });
      } else {
        handlePersonalDetailsChange(e);
      }
    }
  };
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
          <Label htmlFor="title">{t("title")}</Label>
          <Input
            id="title"
            name="title"
            value={title}
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
          <Label htmlFor="github">{t("github")}</Label>
          <Input
            id="github"
            name="github"
            value={github}
            onChange={handlePersonalDetailsChange}
          />
        </div>
        <div>
          <Label htmlFor="profilePhoto">{t("profilePhoto")}</Label>
          <div className="flex items-center gap-2">
            <Input
              className="cursor-pointer"
              disabled={props.isUploadingImage}
              id="profilePhoto"
              name="profilePhoto"
              type="file"
              onChange={onFileChange}
            />
            <Button
              variant={"ghost"}
              size={"icon"}
              onClick={props.onClearProfilePhoto}
            >
              <Trash2Icon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
