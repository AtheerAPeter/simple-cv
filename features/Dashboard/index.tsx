"use client";

import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { documents } from "@/drizzle/schema";
import useCachedSession from "@/hooks/useCachedSession";
import useDocument from "@/hooks/useDocument";
import {
  placeholderData,
  placeholderDataCoverLetter,
  placeholderDataCoverLetterDE,
} from "@/lib/placeholderData";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { DocumentList } from "./components/document-list";

function DashboardComponent() {
  const locale = useLocale();
  const { session, sessionQuery } = useCachedSession();
  const router = useRouter();
  const { list, listQuery, createMutation, deleteMutation } = useDocument({
    listEnabled: sessionQuery.isSuccess && !!session?.data?.user,
  });

  const localizedHref = (path: string) => `/${locale}${path}`;
  const t = useTranslations("cvBuilder");

  const onCreateNew = async (type: "CV" | "Cover Letter") => {
    try {
      let response;
      if (type === "CV") {
        response = await toast.promise(
          createMutation.mutateAsync({
            documentTitle: crypto.randomUUID().slice(0, 8),
            content: JSON.stringify(placeholderData),
            type: "cv",
          }),
          {
            pending: t("toasts.pleaseWait"),
            success: t("toasts.documentCreated"),
            error: t("toasts.documentCreationError"),
          }
        );
      } else if (type === "Cover Letter") {
        response = await toast.promise(
          createMutation.mutateAsync({
            documentTitle: crypto.randomUUID().slice(0, 8),
            content: JSON.stringify(
              locale === "en"
                ? placeholderDataCoverLetter
                : placeholderDataCoverLetterDE
            ),
            type: "cl",
          }),
          {
            pending: t("toasts.pleaseWait"),
            success: t("toasts.documentCreated"),
            error: t("toasts.documentCreationError"),
          }
        );
      }

      if (response) {
        const path = type === "CV" ? "cv-builder" : "cover-letter-creator";
        router.push(localizedHref(`/${path}/${response.id}`));
      }
    } catch (error: any) {
      console.error("Error creating document:", error);
    }
  };

  const onDeleteDocument = async (id: string) => {
    try {
      const response = await toast.promise(deleteMutation.mutateAsync(id), {
        pending: t("toasts.deletingDocument"),
        success: t("toasts.documentDeleted"),
        error: t("toasts.documentDeletionError"),
      });
      if (response) {
        listQuery.refetch();
      }
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  const onDuplicate = async (doc: typeof documents.$inferSelect) => {
    try {
      const response = await toast.promise(
        createMutation.mutateAsync({
          documentTitle: doc.title + "-copy",
          content: doc.content,
          type: doc.type,
        }),
        {
          pending: t("toasts.duplicatingDocument"),
          success: t("toasts.documentDuplicated"),
          error: t("toasts.documentDuplicationError"),
        }
      );
      if (response) {
        listQuery.refetch();
      }
    } catch (error) {
      console.error("Error duplicating document:", error);
    }
  };

  const onShare = (id: string) => {
    const domain = window.location.origin;
    const shareUrl = `${domain}/${locale}/share/${id}?template=${"simple"}&color=${"000000"}`;
    navigator.clipboard
      .writeText(shareUrl)
      .then(() => {
        toast.success(t("shareUrlCopied.title"), {
          autoClose: 3000,
        });
      })
      .catch((error) => {
        console.error("Failed to copy to clipboard: ", error);
      });
  };

  if (sessionQuery.isLoading) {
    return (
      <div className="flex items-center justify-center h-screen w-screen">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="container mx-auto flex-1 pt-28">
      <DocumentList
        onCreateNew={onCreateNew}
        documents={list}
        onDelete={onDeleteDocument}
        isCreating={createMutation.isPending}
        onDuplicate={onDuplicate}
        onShare={onShare}
      />
    </div>
  );
}

export default DashboardComponent;
