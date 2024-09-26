"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ICvPdf, ITitles } from "@/interfaces/ICvPdf";
import useTemplateStore from "@/stores/templateStore";
import Template1 from "@/templates/Template1";
import Template2 from "@/templates/Template2";
import Template3 from "@/templates/Template3";
import Template4 from "@/templates/Template4";
import { ArrowLeftIcon, SaveIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import { LanguageSwitcherComponent } from "./language-switcher";
import Template5 from "@/templates/Template5";

interface Props {
  onClearAll: () => void;
  onSave: () => void;
  onBack: () => void;
}

export const templates = {
  simple: (data: ICvPdf, accentColor: string, titles: ITitles) => (
    <Template1 data={data} accentColor={accentColor} titles={titles} />
  ),
  header: (data: ICvPdf, accentColor: string, titles: ITitles) => (
    <Template2 data={data} accentColor={accentColor} titles={titles} />
  ),
  modern: (data: ICvPdf, accentColor: string, titles: ITitles) => (
    <Template3 data={data} accentColor={accentColor} titles={titles} />
  ),
  "simple 2": (data: ICvPdf, accentColor: string, titles: ITitles) => (
    <Template4 data={data} accentColor={accentColor} titles={titles} />
  ),
  "skills up": (data: ICvPdf, accentColor: string, titles: ITitles) => (
    <Template5 data={data} accentColor={accentColor} titles={titles} />
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
  {
    tailwindValue: "bg-pink-500",
    hex: "#ec4899",
  },
  {
    tailwindValue: "bg-indigo-500",
    hex: "#6366f1",
  },
  {
    tailwindValue: "bg-teal-500",
    hex: "#14b8a6",
  },
  {
    tailwindValue: "bg-orange-500",
    hex: "#f97316",
  },
  {
    tailwindValue: "bg-gray-500",
    hex: "#6b7280",
  },
];

export function EditorHeader(props: Props) {
  const { color, setColor, template, setTemplate } = useTemplateStore();
  return (
    <div className="container mx-auto">
      <header className="flex justify-between mb-8">
        <Button variant="outline" size="icon" onClick={props.onBack}>
          <ArrowLeftIcon className="h-4 w-4" />
        </Button>
        <div className="flex items-center space-x-4">
          <LanguageSwitcherComponent />
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
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 px-4 lg:px-0">
          {Object.keys(templates).map((t, index) => (
            <Card
              key={index}
              className={`cursor-pointer transition-all shadow-none rounded-none border-none ${
                t === template ? "ring-2 ring-black" : ""
              }`}
              onClick={() => setTemplate(t as Templates)}
            >
              <CardContent className="p-1">
                <Image
                  alt={t}
                  src={`/templates/${index + 1}.png`}
                  width={100}
                  height={141}
                  className="w-full h-auto"
                />
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-8">
          <div className="flex justify-center space-x-2 mb-8">
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
      </main>
    </div>
  );
}
