import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, PenTool } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";

function Page() {
  const t = useTranslations("services");
  const locale = useLocale();

  const localizedHref = (path: string) => `/${locale}${path}`;

  return (
    <div className="container mx-auto px-4 lg:px-0 py-8 flex-1 max-w-4xl">
      <h1 className="text-3xl lg:text-4xl font-bold text-center mb-6">
        {t("title")}
      </h1>
      <p className="text-lg lg:text-xl text-center mb-8">{t("subtitle")}</p>
      <div className="flex flex-col gap-4">
        <Link href={localizedHref("/cv-builder")} className="w-full">
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
        <Link href={localizedHref("/cover-letter-creator")} className="w-full">
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
