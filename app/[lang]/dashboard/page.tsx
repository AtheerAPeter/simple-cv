"use client";

import { DocumentList } from "@/components/DocumentsList/document-list";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { documents } from "@/drizzle/schema";
import { toast } from "@/hooks/use-toast";
import { useCachedSession } from "@/hooks/useCachedSession";
import { useDocument } from "@/hooks/useDocument";
import {
  placeholderData,
  placeholderDataCoverLetter,
  placeholderDataCoverLetterDE,
} from "@/lib/placeholderData";
import { signIn } from "next-auth/react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

function Page() {
  const locale = useLocale();
  const { session, sessionQuery } = useCachedSession();
  const router = useRouter();
  const { list, listQuery, createMutation, deleteMutation } = useDocument({
    listEnabled: sessionQuery.isSuccess && !!session?.data?.user,
  });

  const localizedHref = (path: string) => `/${locale}${path}`;
  const t = useTranslations("cvBuilder");

  const onCreateNew = async (type: "CV" | "Cover Letter") => {
    if (type === "CV") {
      const response = await createMutation.mutateAsync({
        documentTitle: crypto.randomUUID().slice(0, 8),
        content: JSON.stringify(placeholderData),
        type: "cv",
      });
      if (response) {
        router.push(localizedHref(`/cv-builder/${response.id}`));
      }
    }
    if (type === "Cover Letter") {
      const response = await createMutation.mutateAsync({
        documentTitle: crypto.randomUUID().slice(0, 8),
        content: JSON.stringify(
          locale === "en"
            ? placeholderDataCoverLetter
            : placeholderDataCoverLetterDE
        ),
        type: "cl",
      });
      if (response) {
        router.push(localizedHref(`/cover-letter-creator/${response.id}`));
      }
    }
  };

  const onDeleteDocument = async (id: string) => {
    const response = await deleteMutation.mutateAsync(id);
    if (response) {
      listQuery.refetch();
    }
  };

  const onDuplicate = async (doc: typeof documents.$inferSelect) => {
    const response = await createMutation.mutateAsync({
      documentTitle: doc.title + "-copy",
      content: doc.content,
      type: doc.type,
    });
    if (response) {
      listQuery.refetch();
    }
  };

  const onShare = (id: string) => {
    const domain = window.location.origin;
    const shareUrl = `${domain}/${locale}/share/${id}?template=${"simple"}&color=${"000000"}`;
    navigator.clipboard
      .writeText(shareUrl)
      .then(() => {
        toast({
          title: t("shareUrlCopied.title"),
          duration: 3000,
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
    <div className="container mx-auto flex-1">
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

export default Page;
