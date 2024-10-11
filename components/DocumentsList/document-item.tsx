import {
  FileText,
  FileEdit,
  Trash2,
  EllipsisVertical,
  Copy,
} from "lucide-react";
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
import { Separator } from "../ui/separator";

interface Props {
  doc: typeof documents.$inferSelect;
  locale: string;
  onDelete: (id: string) => void;
  onCopy: (id: string) => void;
}

export default function DocumentItem(props: Props) {
  const t = useTranslations("common");
  return (
    <div className="flex items-center hover:bg-muted/50 py-2 justify-between">
      <div className="flex items-center">
        {props.doc.type === "cv" ? (
          <FileText fill="black" stroke="white" className="h-12 w-12" />
        ) : (
          <FileEdit fill="black" stroke="white" className="h-12 w-12" />
        )}

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
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => props.onCopy(props.doc.id)}>
            <Copy className="mr-2 h-4 w-4" />
            <span>{t("duplicate")}</span>
          </DropdownMenuItem>
          <Separator />
          <DropdownMenuItem onClick={() => props.onDelete(props.doc.id)}>
            <Trash2 className="mr-2 h-4 w-4 text-red-500" />
            <span className="text-red-500">{t("delete")}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
