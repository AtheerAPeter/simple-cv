"use client";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { ArrowRight, FileText, PenTool } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";

function Page() {
  const t = useTranslations("services");
  const locale = useLocale();
  const { status } = useSession();
  console.log(status);

  const localizedHref = (path: string) => `/${locale}${path}`;
  const onSignin = () => {
    signIn();
  };

  return (
    <div className="container mx-auto px-4 lg:px-0 py-8 flex-1 max-w-4xl">
      <h1 className="text-3xl lg:text-4xl font-bold text-center mb-6">
        {t("title")}
      </h1>
      <p className="text-lg lg:text-xl text-center mb-8">{t("subtitle")}</p>
      <div className="flex flex-col gap-4 relative">
        {status === "loading" && (
          <div className="absolute inset-0 z-10 bg-white/30 backdrop-blur-sm rounded-lg flex items-center justify-center">
            <LoadingSpinner />
          </div>
        )}
        {status === "unauthenticated" && (
          <div className="absolute inset-0 z-10 bg-white/30 backdrop-blur-sm rounded-lg flex items-center justify-center">
            <Button onClick={onSignin}>Sign in to continue</Button>
          </div>
        )}

        <Link
          href={
            status === "authenticated"
              ? localizedHref("/cv-builder")
              : localizedHref("/")
          }
          className="w-full"
        >
          <Button
            variant="outline"
            className="w-full justify-between text-lg py-8 px-6 hover:bg-primary hover:text-primary-foreground transition-all duration-200"
          >
            <div className="flex items-center">
              <FileText className="h-6 w-6 mr-4" />
              {t("cvBuilder.title")}
            </div>
            <ArrowRight className="h-6 w-6" />
          </Button>
        </Link>
        <Link
          href={
            status === "authenticated"
              ? localizedHref("/cover-letter-creator")
              : localizedHref("/")
          }
          className="w-full"
        >
          <Button
            variant="outline"
            className="w-full justify-between text-lg py-8 px-6 hover:bg-primary hover:text-primary-foreground transition-all duration-200"
          >
            <div className="flex items-center">
              <PenTool className="h-6 w-6 mr-4" />
              {t("coverLetter.title")}
            </div>
            <ArrowRight className="h-6 w-6" />
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Page;
