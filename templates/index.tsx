import { ICvPdf, ITitles } from "@/interfaces/ICvPdf";
import Template1 from "./Template1";
import Template2 from "./Template2";
import Template3 from "./Template3";
import Template4 from "./Template4";
import Template5 from "./Template5";
import Template6 from "./Template6";
import Template7 from "./Template7";

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
  deutschland: (data: ICvPdf, accentColor: string, titles: ITitles) => (
    <Template7 data={data} accentColor={accentColor} titles={titles} />
  ),
};

export type Templates = keyof typeof templates;
