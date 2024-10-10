"use client";

import { DocumentList } from "@/components/DocumentsList/document-list";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
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
  const t = useTranslations("services");
  const locale = useLocale();
  const { session, sessionQuery } = useCachedSession();
  const router = useRouter();
  const { list, listQuery, createMutation, deleteMutation } = useDocument({
    listEnabled: true,
  });

  const localizedHref = (path: string) => `/${locale}${path}`;
  const onSignin = () => {
    signIn();
  };

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

  if (sessionQuery.isLoading) {
    return (
      <div className="flex items-center justify-center h-screen w-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (session?.status === "unauthenticated") {
    return (
      <div className="container mx-auto h-full flex items-center justify-center flex-col">
        <Button
          className="w-1/2 rounded-full font-bold"
          size={"lg"}
          onClick={onSignin}
        >
          Sign In to start
        </Button>
      </div>
    );
  }
  if (!!session?.data?.user) {
    return (
      <div className="container mx-auto flex-1">
        {listQuery.isLoading ? (
          <div className="flex-1 w-full flex items-center justify-center">
            <LoadingSpinner />
          </div>
        ) : (
          <DocumentList
            onCreateNew={onCreateNew}
            documents={list}
            onDelete={onDeleteDocument}
          />
        )}
      </div>
    );
  }
}

export default Page;
