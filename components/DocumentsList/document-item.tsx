import { Trash2, EllipsisVertical, Copy, Share2 } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { documents } from "@/drizzle/schema";
import { format } from "date-fns";
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

interface Props {
  doc: typeof documents.$inferSelect;
  locale: string;
  onDelete: (id: string) => void;
  onCopy: (doc: typeof documents.$inferSelect) => void;
  onShare: (id: string) => void;
}

export default function DocumentItem(props: Props) {
  const t = useTranslations("common");

  return (
    <div className="flex items-center hover:bg-muted/50 py-2 justify-between">
      <div className="flex items-center">
        {props.doc.type === "cv" ? <CVIcon /> : <CoverLetterIcon />}

        <div className="ml-3">
          <div className="flex items-center gap-2">
            <Link
              href={
                props.doc.type === "cv"
                  ? `/${props.locale}/cv-builder/${props.doc.id}`
                  : `/${props.locale}/cover-letter-creator/${props.doc.id}`
              }
            >
              <p className="font-bold font-lg underline">{props.doc.title}</p>
            </Link>
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
  );
}
