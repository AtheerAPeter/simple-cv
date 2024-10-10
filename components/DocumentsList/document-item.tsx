import { FileText, FileEdit, Eye, Trash2 } from "lucide-react";
import React from "react";
import {
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTrigger,
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogCancel,
  AlertDialogAction,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { Card, CardHeader, CardTitle, CardFooter } from "../ui/card";
import { documents } from "@/drizzle/schema";
import { format } from "date-fns";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { useTranslations } from "next-intl";

interface Props {
  doc: typeof documents.$inferSelect;
  locale: string;
  onDelete: (id: string) => void;
}

export default function DocumentItem(props: Props) {
  const t = useTranslations("common");
  return (
    <Card className="flex flex-col justify-between shadow-none">
      <CardHeader className="space-y-1 p-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-bold flex items-center gap-2">
            {props.doc.type === "cv" ? (
              <FileText className="h-5 w-5 text-blue-500" />
            ) : (
              <FileEdit className="h-5 w-5 text-green-500" />
            )}
            {props.doc.title}
          </CardTitle>
          <Badge
            variant={props.doc.type === "cv" ? "default" : "secondary"}
            className="rounded-full"
          >
            {props.doc.type === "cv" ? t("cv") : t("coverLetter")}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          {t("updatedOn")}:{" "}
          {format(new Date(props.doc.updatedAt), "dd.MM, HH:mm:ss")}
        </p>
      </CardHeader>
      <CardFooter className="p-4 pt-0">
        <div className="flex justify-end gap-2 w-full">
          <Link
            href={
              props.doc.type === "cv"
                ? `/${props.locale}/cv-builder/${props.doc.id}`
                : `/${props.locale}/cover-letter-creator/${props.doc.id}`
            }
          >
            <Button variant="outline" size="sm">
              <Eye className="h-4 w-4 mr-1" />
              {t("view")}
            </Button>
          </Link>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm">
                <Trash2 className="h-4 w-4 mr-1" />
                {t("delete")}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>{t("areYouSure")}</AlertDialogTitle>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
                <AlertDialogAction onClick={() => props.onDelete(props.doc.id)}>
                  {t("delete")}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardFooter>
    </Card>
  );
}
