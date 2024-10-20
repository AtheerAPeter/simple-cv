import { Trash2, EllipsisVertical, Copy, Share2, Eye } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { documents } from "@/drizzle/schema";
import { format, formatDistanceToNow } from "date-fns";
import { enUS, de } from "date-fns/locale";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { useTranslations } from "next-intl";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import CVIcon from "../icons/CVIcon";
import CoverLetterIcon from "../icons/CoverLetterIcon";
import PDFCanva from "../PDFCanva";

interface Props {
  doc: typeof documents.$inferSelect;
  locale: string;
  onDelete: (id: string) => void;
  onCopy: (doc: typeof documents.$inferSelect) => void;
  onShare: (id: string) => void;
}

export default function DocumentItem(props: Props) {
  const t = useTranslations("common");
  const d = JSON.parse(props.doc.content);
  const data =
    props.doc.type === "cv"
      ? {
          personalDetails: {
            name: d.name,
            title: d.title,
            email: d.email,
            phone: d.phone,
            address: d.address,
            github: d.github,
            image: d.image,
          },
          experiences: d.experiences,
          educations: d.educations,
          skills: d.skills,
          languages: d.languages,
          hobbies: d.hobbies,
          projects: d.projects,
        }
      : {
          personalDetails: {
            name: d.name,
            email: d.email,
            phone: d.phone,
            address: d.address,
          },
          date: d.date,
          recipient: {
            company: d.company,
            manager: d.manager,
            address: d.companyAddress,
            position: d.position,
          },
          description: d.description,
          opening: d.opening,
          closing: d.closing,
        };

  return (
    <div className="relative mx-auto h-96">
      {/* <Badge
        variant={props.doc.type === "cv" ? "default" : "secondary"}
        className="rounded-full h-4 absolute top-2 right-2 z-10"
      >
        {props.doc.type === "cv" ? t("cv") : t("coverLetter")}
      </Badge> */}
      {/* <Link
        href={
          props.doc.type === "cv"
            ? `/${props.locale}/cv-builder/${props.doc.id}`
            : `/${props.locale}/cover-letter-creator/${props.doc.id}`
        }
      > */}
      {/* <div className="absolute top-0 left-0">
        <PDFCanva type={props.doc.type} data={data} />
      </div> */}
      {/* </Link> */}
      <div>
        <p className="font-bold font-lg">{props.doc.title}</p>
        <p className="text-sm text-muted-foreground">
          {formatDistanceToNow(new Date(props.doc.updatedAt), {
            addSuffix: true,
            locale: props.locale === "en" ? enUS : de,
            includeSeconds: true,
          })}
        </p>
      </div>
      {/* <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <EllipsisVertical className="h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="shadow-none">
          {props.doc.type === "cv" && (
            <DropdownMenuItem onSelect={() => props.onShare(props.doc.id)}>
              <Share2 className="mr-2 h-4 w-4" />
              <span>{t("share")}</span>
            </DropdownMenuItem>
          )}

          <DropdownMenuItem onSelect={() => props.onCopy(props.doc)}>
            <Copy className="mr-2 h-4 w-4" />
            <span>{t("duplicate")}</span>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => props.onDelete(props.doc.id)}>
            <Trash2 className="mr-2 h-4 w-4 text-red-500" />
            <span className="text-red-500">{t("delete")}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu> */}
    </div>
  );
  return (
    <div className="flex items-center hover:bg-muted/50 py-2 justify-between">
      <div className="flex items-center">
        {props.doc.type === "cv" ? <CVIcon /> : <CoverLetterIcon />}
        <div className="ml-3">
          <div className="flex items-center gap-2">
            <p className="font-bold font-lg">{props.doc.title}</p>
            <Badge
              variant={props.doc.type === "cv" ? "default" : "secondary"}
              className="rounded-full h-4"
            >
              {props.doc.type === "cv" ? t("cv") : t("coverLetter")}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            {format(new Date(props.doc.updatedAt), "dd.MM, HH:mm:ss")}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          <p className="text-sm">{props.doc.views}</p>
          <Eye className="h-4 w-4" />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant={"link"}>
              <EllipsisVertical className="h-4 w-4 mr-1" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="shadow-none">
            {props.doc.type === "cv" && (
              <DropdownMenuItem onSelect={() => props.onShare(props.doc.id)}>
                <Share2 className="mr-2 h-4 w-4" />
                <span>{t("share")}</span>
              </DropdownMenuItem>
            )}

            <DropdownMenuItem onSelect={() => props.onCopy(props.doc)}>
              <Copy className="mr-2 h-4 w-4" />
              <span>{t("duplicate")}</span>
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => props.onDelete(props.doc.id)}>
              <Trash2 className="mr-2 h-4 w-4 text-red-500" />
              <span className="text-red-500">{t("delete")}</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
