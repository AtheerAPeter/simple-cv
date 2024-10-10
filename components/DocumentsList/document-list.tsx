"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { documents } from "@/drizzle/schema";
import { Plus } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import DocumentItem from "./document-item";

interface Props {
  onCreateNew: (type: "CV" | "Cover Letter") => void;
  onDelete: (id: string) => void;
  documents?: (typeof documents.$inferSelect)[];
}

export function DocumentList(props: Props) {
  const locale = useLocale();
  const t = useTranslations("common");
  return (
    <div className="w-full mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Documents</h1>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              {t("createNew")}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              className="cursor-pointer"
              onSelect={() => props.onCreateNew("CV")}
            >
              {t("cv")}
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onSelect={() => props.onCreateNew("Cover Letter")}
            >
              {t("coverLetter")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="space-y-4">
        {props.documents?.map((doc) => (
          <DocumentItem
            key={doc.id}
            doc={doc}
            locale={locale}
            onDelete={props.onDelete}
          />
        ))}
      </div>
    </div>
  );
}
