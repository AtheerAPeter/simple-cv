"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
      const employer =
        oldData.experiences[expIndex]?.employer ||
        newData.experiences[expIndex]?.employer;
      displayPath = `${expTitle} at ${employer}`;
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

  const handleSelectAll = () => {
    const allPaths = differences.map((diff) => diff.path.join("."));
    if (selectedDiffs.size === differences.length) {
      setSelectedDiffs(new Set());
    } else {
      setSelectedDiffs(new Set(allPaths));
    }
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
    setDifferences([]);
    setSelectedDiffs(new Set());
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

  const getChangeColor = (type: "added" | "removed" | "changed") => {
    switch (type) {
      case "added":
        return "text-green-500";
      case "removed":
        return "text-red-500";
      case "changed":
        return "text-yellow-500";
    }
  };

  if (differences.length === 0) {
    return null;
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <div>
          <CardTitle>{t("jsonDiffViewer")}</CardTitle>
          <CardDescription>{t("plsSelect")}</CardDescription>
        </div>
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={handleSelectAll}
            title={t("selectAll")}
          >
            {t("selectAll")}
          </Button>

          <Button onClick={handleSubmit} title={t("submitChanges")}>
            {t("submitChanges")}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="w-full rounded-md border p-4">
          {Object.entries(groupedDifferences).map(
            ([category, diffs], index) => (
              <div key={index} className="mb-6">
                <h3 className="text-lg font-semibold mb-2">
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </h3>
                {diffs.map((diff, diffIndex) => (
                  <div
                    key={diffIndex}
                    className="flex items-start space-x-2 mb-2"
                  >
                    <Checkbox
                      id={`diff-${category}-${diffIndex}`}
                      checked={selectedDiffs.has(diff.path.join("."))}
                      onCheckedChange={() =>
                        handleCheckboxChange(diff.path.join("."))
                      }
                    />
                    <label
                      htmlFor={`diff-${category}-${diffIndex}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      <span className="font-semibold">{diff.displayPath}</span>
                      <br />
                      {diff.type !== "added" && (
                        <span className={getChangeColor("removed")}>
                          {renderValue(diff.oldValue)}
                        </span>
                      )}
                      {diff.type === "changed" && <br />}
                      {diff.type !== "removed" && (
                        <span className={getChangeColor("added")}>
                          {renderValue(diff.newValue)}
                        </span>
                      )}
                    </label>
                  </div>
                ))}
              </div>
            )
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
