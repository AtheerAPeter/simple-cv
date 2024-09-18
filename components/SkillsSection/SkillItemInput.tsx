import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface Props {
  onAddSkill: (skill: string) => void;
}
export default function SkillItemInput(props: Props) {
  const [currentSkill, setCurrentSkill] = useState("");

  const onAddSkill = () => {
    props.onAddSkill(currentSkill);
    setCurrentSkill("");
  };

  return (
    <div className="flex gap-2">
      <Input
        value={currentSkill}
        onChange={(e) => setCurrentSkill(e.target.value)}
        placeholder="Add a skill"
        className="border-gray-100"
      />
      <Button type="button" onClick={onAddSkill}>
        Add
      </Button>
    </div>
  );
}
