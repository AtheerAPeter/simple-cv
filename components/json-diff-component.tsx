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
import parse from "html-react-parser";

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

    if (typeof oldObj !== typeof newObj) {
      diffs.push(createDifference(path, oldObj, newObj));
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
      diffs.push(createDifference(path, oldObj, newObj));
    }

    return diffs;
  };

  const createDifference = (
    path: string[],
    oldValue: any,
    newValue: any
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
    return { path, oldValue, newValue, displayPath };
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
    onSubmit(updatedJson);
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

  return (
    <div className="w-full mx-auto lg:p-6 pt-6 space-y-6">
      <p>Please select the changes you want to apply to your CV below</p>
      <div className="flex justify-between mb-4">
        <Button onClick={handleDeselectAll} variant="outline">
          Deselect All
        </Button>
        <Button onClick={handleSubmit}>Submit Changes</Button>
      </div>
      <ScrollArea className="h-[600px] w-full border rounded-md p-4">
        <Accordion type="single" collapsible className="w-full">
          {Object.entries(groupedDifferences).map(
            ([category, diffs], index) => (
              <AccordionItem value={category} key={index}>
                <AccordionTrigger className="text-lg font-semibold">
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </AccordionTrigger>
                <AccordionContent>
                  {diffs.map((diff, diffIndex) => (
                    <div
                      key={diffIndex}
                      className="flex items-start space-x-2 mb-4 p-2 bg-gray-100 rounded"
                    >
                      <Checkbox
                        id={`diff-${category}-${diffIndex}`}
                        checked={selectedDiffs.has(diff.path.join("."))}
                        onCheckedChange={() =>
                          handleCheckboxChange(diff.path.join("."))
                        }
                      />
                      <div className="flex-grow">
                        <p className="font-semibold">{diff.displayPath}</p>
                        <div className="text-red-500">
                          - {renderValue(diff.oldValue)}
                        </div>
                        <div className="text-green-500">
                          + {renderValue(diff.newValue)}
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
    </div>
  );
}
