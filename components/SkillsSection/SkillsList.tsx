import React, { useState } from "react";
import { PlusCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { SkillCategory } from "@/interfaces/IFormTypes";
import SkillItemInput from "./SkillItemInput";

interface SkillsSectionProps {
  skills: SkillCategory[];
  setSkills: React.Dispatch<React.SetStateAction<SkillCategory[]>>;
}

export default function SkillsSection({
  skills,
  setSkills,
}: SkillsSectionProps) {
  const [currentSkill, setCurrentSkill] = useState("");

  const handleCategoryTitleChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSkills((prevSkills) =>
      prevSkills.map((skill, i) =>
        i === index ? { ...skill, title: e.target.value } : skill
      )
    );
  };
  const addSkill = (newSkill: string, index: number) => {
    setSkills((prevSkills) =>
      prevSkills.map((skillCategory, i) =>
        i === index
          ? { ...skillCategory, skills: [...skillCategory.skills, newSkill] }
          : skillCategory
      )
    );
  };

  const addSkillCategory = () => {
    setSkills((prevSkills) => [...prevSkills, { title: "", skills: [] }]);
  };

  const removeSkillCategory = (index: number) => {
    setSkills((prevSkills) => prevSkills.filter((_, i) => i !== index));
  };

  const removeSkill = (index: number, skillIndex: number) => {
    setSkills((prevSkills) =>
      prevSkills.map((skillCategory, i) =>
        i === index
          ? {
              ...skillCategory,
              skills: skillCategory.skills.filter((_, i) => i !== skillIndex),
            }
          : skillCategory
      )
    );
  };
  return (
    <>
      {skills?.map((skillCategory, index) => (
        <div key={index} className="mb-4 p-4 bg-white">
          <div className="flex justify-between items-center mb-2">
            <Label htmlFor={`skillTitle-${index}`}>Skill Category</Label>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeSkillCategory(index)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <Input
            id={`skillTitle-${index}`}
            value={skillCategory.title}
            onChange={(e) => handleCategoryTitleChange(index, e)}
            className="outline-none border-none mb-2"
          />
          <div className="flex flex-wrap gap-2 mb-2">
            {skillCategory.skills.map((skill, skillIndex) => (
              <Badge key={skillIndex} variant="secondary">
                {skill}
                <X
                  size={16}
                  className="ml-2 cursor-pointer text-gray-500"
                  onClick={() => removeSkill(index, skillIndex)}
                />
              </Badge>
            ))}
          </div>

          <SkillItemInput onAddSkill={(skill) => addSkill(skill, index)} />
        </div>
      ))}
      <Button type="button" onClick={addSkillCategory} className="mt-2">
        <PlusCircle className="mr-2 h-4 w-4" /> Add Skill Category
      </Button>
    </>
  );
}
