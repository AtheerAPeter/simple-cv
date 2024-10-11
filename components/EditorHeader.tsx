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
import Template6 from "@/templates/Template6";
import { GradientPicker } from "./GradientPicker";

interface Props {
  onClearAll: () => void;
  onSave: () => void;
  onBack: () => void;
  isSaving: boolean;
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
  "projects up": (data: ICvPdf, accentColor: string, titles: ITitles) => (
    <Template6 data={data} accentColor={accentColor} titles={titles} />
  ),
};

export type Templates = keyof typeof templates;

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
          <Button
            isLoading={props.isSaving}
            disabled={props.isSaving}
            variant="outline"
            size="icon"
            onClick={props.onSave}
          >
            <SaveIcon className="h-4 w-4" />
            <span className="sr-only">Save</span>
          </Button>
        </div>
      </header>

      <main className="mb-4 p-4 bg-white">
        <div className="flex justify-end mb-4">
          <GradientPicker background={color} setBackground={setColor} />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 px-4 lg:px-0">
          {Object.keys(templates).map((t, index) => (
            <Card
              key={index}
              className={`cursor-pointer transition-all rounded-sm  ${
                t === template ? "ring-2 ring-black" : "ring-0"
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
      </main>
    </div>
  );
}
