"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Minus, Edit } from "lucide-react";
import parse from "html-react-parser";
import { removeUndefined } from "@/lib/utils";
import { useTranslations } from "next-intl";

type JsonData = {
  experiences: Array<{
    title: string;
    employer: string;
    startDate: string;
    endDate: string;
    description: string;
  }>;
  skills: Array<{
    title: string;
    skills: string[];
  }>;
};

type Difference = {
  path: string[];
  oldValue: any;
  newValue: any;
  displayPath: string;
  type: "added" | "removed" | "changed";
};

interface JsonDiffComponentProps {
  oldData: JsonData;
  newData: JsonData;
  onSubmit: (newJson: JsonData) => void;
}

export function JsonDiffComponentComponent({
  oldData,
  newData,
  onSubmit,
}: JsonDiffComponentProps) {
  const t = useTranslations("jsonDiff");

  const [differences, setDifferences] = useState<Difference[]>([]);
  const [selectedDiffs, setSelectedDiffs] = useState<Set<string>>(new Set());

  useEffect(() => {
    const diffs = findDifferences(oldData, newData);
    setDifferences(diffs);
    setSelectedDiffs(new Set(diffs.map((diff) => diff.path.join("."))));
  }, [oldData, newData]);

  const findDifferences = (
    oldObj: any,
    newObj: any,
    path: string[] = []
  ): Difference[] => {
    let diffs: Difference[] = [];

    if (oldObj === undefined && newObj !== undefined) {
      diffs.push(createDifference(path, oldObj, newObj, "added"));
    } else if (oldObj !== undefined && newObj === undefined) {
      diffs.push(createDifference(path, oldObj, newObj, "removed"));
    } else if (typeof oldObj !== typeof newObj) {
      diffs.push(createDifference(path, oldObj, newObj, "changed"));
    } else if (Array.isArray(oldObj) && Array.isArray(newObj)) {
      const maxLength = Math.max(oldObj.length, newObj.length);
      for (let i = 0; i < maxLength; i++) {
        diffs = diffs.concat(
          findDifferences(oldObj[i], newObj[i], [...path, i.toString()])
        );
      }
    } else if (
      typeof oldObj === "object" &&
      oldObj !== null &&
      newObj !== null
    ) {
      const allKeys = Array.from(
        new Set([...Object.keys(oldObj), ...Object.keys(newObj)])
      );
      for (const key of allKeys) {
        diffs = diffs.concat(
          findDifferences(oldObj[key], newObj[key], [...path, key])
        );
      }
    } else if (oldObj !== newObj) {
      diffs.push(createDifference(path, oldObj, newObj, "changed"));
    }

    return diffs;
  };

  const createDifference = (
    path: string[],
    oldValue: any,
    newValue: any,
    type: "added" | "removed" | "changed"
  ): Difference => {
    let displayPath = path.join(".");
    if (path[0] === "skills") {
      const skillIndex = parseInt(path[1]);
      const skillTitle =
        oldData.skills[skillIndex]?.title || newData.skills[skillIndex]?.title;
      displayPath = `Skills - ${skillTitle}`;
      if (path[2] === "skills") {
        displayPath += ` - ${path[3]}`;
      }
    } else if (path[0] === "experiences") {
      const expIndex = parseInt(path[1]);
      const expTitle =
        oldData.experiences[expIndex]?.title ||
        newData.experiences[expIndex]?.title;
      displayPath = `Experience - ${expTitle} - ${path[2]}`;
    }
    return { path, oldValue, newValue, displayPath, type };
  };

  const handleCheckboxChange = (path: string) => {
    setSelectedDiffs((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(path)) {
        newSet.delete(path);
      } else {
        newSet.add(path);
      }
      return newSet;
    });
  };

  const handleDeselectAll = () => {
    setSelectedDiffs(new Set());
  };

  const handleSubmit = () => {
    let updatedJson = JSON.parse(JSON.stringify(oldData));
    differences.forEach((diff) => {
      if (selectedDiffs.has(diff.path.join("."))) {
        let current = updatedJson;
        for (let i = 0; i < diff.path.length - 1; i++) {
          if (current[diff.path[i]] === undefined) {
            current[diff.path[i]] = {};
          }
          current = current[diff.path[i]];
        }
        current[diff.path[diff.path.length - 1]] = diff.newValue;
      }
    });
    onSubmit(removeUndefined(updatedJson));
  };

  const renderValue = (value: any) => {
    if (typeof value === "string" && value.startsWith("<")) {
      return <div className="mt-2">{parse(value)}</div>;
    }
    return JSON.stringify(value);
  };

  const groupDifferencesByCategory = () => {
    const groups: { [key: string]: Difference[] } = {};
    differences.forEach((diff) => {
      const category = diff.path[0];
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(diff);
    });
    return groups;
  };

  const groupedDifferences = groupDifferencesByCategory();

  const getIcon = (type: "added" | "removed" | "changed") => {
    switch (type) {
      case "added":
        return <Plus className="w-4 h-4" />;
      case "removed":
        return <Minus className="w-4 h-4" />;
      case "changed":
        return <Edit className="w-4 h-4" />;
    }
  };

  if (differences.length === 0) {
    return null;
  }

  return (
    <Card className="w-full max-w-4xl mx-auto mt-6">
      <CardHeader className="border-b">
        <CardTitle>{t("jsonDiffViewer")}</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <p className="mb-6 text-muted-foreground">{t("plsSelect")}</p>
        <div className="flex justify-between mb-6">
          <Button onClick={handleDeselectAll} variant="outline">
            {t("disselectAll")}
          </Button>
          <Button onClick={handleSubmit}>{t("submitChanges")}</Button>
        </div>
        <ScrollArea className="h-[600px] w-full">
          <Accordion
            type="multiple"
            defaultValue={Object.keys(groupedDifferences)}
            className="w-full"
          >
            {Object.entries(groupedDifferences).map(
              ([category, diffs], index) => (
                <AccordionItem
                  value={category}
                  key={index}
                  className="border-b"
                >
                  <AccordionTrigger className="text-lg font-semibold py-4">
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </AccordionTrigger>
                  <AccordionContent>
                    {diffs.map((diff, diffIndex) => (
                      <div key={diffIndex} className="mb-4 p-4 border">
                        <div className="flex items-start space-x-4">
                          <Checkbox
                            id={`diff-${category}-${diffIndex}`}
                            checked={selectedDiffs.has(diff.path.join("."))}
                            onCheckedChange={() =>
                              handleCheckboxChange(diff.path.join("."))
                            }
                            className="mt-1"
                          />
                          <div className="flex-grow">
                            <div className="flex items-center gap-2 mb-2">
                              {getIcon(diff.type)}
                              <p className="font-semibold">
                                {diff.displayPath}
                              </p>
                            </div>
                            {diff.type !== "added" && (
                              <div className="bg-red-100 p-3 mt-2">
                                {renderValue(diff.oldValue)}
                              </div>
                            )}
                            {diff.type !== "removed" && (
                              <div className="bg-green-100 p-3 mt-2">
                                {renderValue(diff.newValue)}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              )
            )}
          </Accordion>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
