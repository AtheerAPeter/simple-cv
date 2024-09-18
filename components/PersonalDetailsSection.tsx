import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Props {
  name: string;
  title: string;
  email: string;
  phone: string;
  address: string;
  github: string;
  handlePersonalDetailsChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  toast: any;
}

const PersonalDetails = (props: Props) => {
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
  return (
    <div className="mb-4 p-4 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            value={name}
            onChange={handlePersonalDetailsChange}
            className="border-gray-100"
          />
        </div>
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            name="title"
            value={title}
            onChange={handlePersonalDetailsChange}
            className="border-gray-100"
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
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
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            name="phone"
            value={phone}
            onChange={handlePersonalDetailsChange}
            className="border-gray-100"
          />
        </div>
        <div>
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            name="address"
            value={address}
            onChange={handlePersonalDetailsChange}
            className="border-gray-100"
          />
        </div>
        <div>
          <Label htmlFor="github">GitHub</Label>
          <Input
            id="github"
            name="github"
            value={github}
            onChange={handlePersonalDetailsChange}
            className="border-gray-100"
          />
        </div>
        <div>
          <Label htmlFor="profilePhoto">Profile Photo</Label>
          <Input
            id="profilePhoto"
            name="profilePhoto"
            type="file"
            onChange={(e) => {
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
            }}
            className="border-gray-100"
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalDetails;
