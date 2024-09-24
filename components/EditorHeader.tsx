"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ICvPdf } from "@/interfaces/ICvPdf";
import useTemplateStore from "@/stores/templateStore";
import Template1 from "@/templates/Template1";
import Template2 from "@/templates/Template2";
import Template3 from "@/templates/Template3";
import Template4 from "@/templates/Template4";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  SaveIcon,
  TrashIcon,
} from "lucide-react";

interface Props {
  onClearAll: () => void;
  onSave: () => void;
  onBack: () => void;
}

export const templates = {
  simple: (data: ICvPdf, accentColor: string) => (
    <Template1 data={data} accentColor={accentColor} />
  ),
  "simple 2": (data: ICvPdf, accentColor: string) => (
    <Template4 data={data} accentColor={accentColor} />
  ),
  header: (data: ICvPdf, accentColor: string) => (
    <Template2 data={data} accentColor={accentColor} />
  ),
  modern: (data: ICvPdf, accentColor: string) => (
    <Template3 data={data} accentColor={accentColor} />
  ),
};

export type Templates = keyof typeof templates;

const colors = [
  {
    tailwindValue: "bg-blue-500",
    hex: "#3b82f6",
  },
  {
    tailwindValue: "bg-green-500",
    hex: "#22c55e",
  },
  {
    tailwindValue: "bg-purple-500",
    hex: "#8b5cf6",
  },
  {
    tailwindValue: "bg-rose-500",
    hex: "#ef4444",
  },
  {
    tailwindValue: "bg-yellow-500",
    hex: "#eab308",
  },
  {
    tailwindValue: "bg-black",
    hex: "#000000",
  },
];

export function EditorHeader(props: Props) {
  const { color, setColor, template, setTemplate } = useTemplateStore();
  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <header className="flex justify-between mb-8">
        <Button variant="outline" size="icon" onClick={props.onBack}>
          <ArrowLeftIcon className="h-4 w-4" />
        </Button>
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="icon" onClick={props.onClearAll}>
            <TrashIcon className="h-4 w-4" />
            <span className="sr-only">Clear</span>
          </Button>
          <Button variant="outline" size="icon" onClick={props.onSave}>
            <SaveIcon className="h-4 w-4" />
            <span className="sr-only">Save</span>
          </Button>
        </div>
      </header>
      <main>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.keys(templates).map((t, index) => (
            <Card
              key={index}
              className={`cursor-pointer ${
                t === template ? "bg-blue-500" : ""
              }`}
              onClick={() => setTemplate(t as Templates)}
            >
              <CardContent className="p-4">
                <p className="text-center font-medium">{t}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-8">
          <div className="flex justify-center space-x-4 mb-8">
            {colors.map((c, index) => (
              <button
                onClick={() => setColor(c.hex)}
                key={index}
                className={`w-5 h-5 rounded-full ${c.tailwindValue} hover:ring-2 ring-offset-2 ring-gray-300 transition-all focus:outline-none focus:ring-2`}
                aria-label={`Select ${
                  c.tailwindValue.split("-")[1]
                } color scheme`}
              />
            ))}
          </div>
        </div>
        <div>
          {/* <div className="flex justify-center mt-6 space-x-4">
            <Button variant="outline" size="icon">
              <ArrowLeftIcon className="h-4 w-4" />
              <span className="sr-only">Previous templates</span>
            </Button>
            <Button variant="outline" size="icon">
              <ArrowRightIcon className="h-4 w-4" />
              <span className="sr-only">Next templates</span>
            </Button>
          </div> */}
        </div>
      </main>
    </div>
  );
}
