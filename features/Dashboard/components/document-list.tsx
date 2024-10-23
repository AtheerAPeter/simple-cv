"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { documents } from "@/drizzle/schema";
import { Inbox, Plus } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import DocumentItem from "./document-item";
import { motion } from "framer-motion";

interface Props {
  onCreateNew: (type: "CV" | "Cover Letter") => void;
  onDelete: (id: string) => void;
  documents?: (typeof documents.$inferSelect)[];
  isCreating: boolean;
  onDuplicate: (doc: typeof documents.$inferSelect) => void;
  onShare: (id: string) => void;
}

export function DocumentList(props: Props) {
  const locale = useLocale();
  const t = useTranslations("common");
  return (
    <div className="w-full mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{t("myDocuments")}</h1>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button isLoading={props.isCreating} disabled={props.isCreating}>
              <Plus className="mr-2 h-4 w-4" />
              {t("createNew")}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="shadow-none">
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
      <div className="flex items-center justify-center">
        {props.documents?.length === 0 && (
          <Inbox className="h-1/4 w-1/4 text-gray-200" />
        )}
      </div>
      <div className="grid lg:grid-cols-5 gap-5">
        {props.documents?.map((doc, index) => (
          <motion.div
            key={doc.id}
            initial={{ opacity: 0, x: -10 * index }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <DocumentItem
              onCopy={props.onDuplicate}
              doc={doc}
              locale={locale}
              onDelete={props.onDelete}
              onShare={props.onShare}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
