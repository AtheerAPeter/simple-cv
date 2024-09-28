import InteractingCard from "@/components/InteractingCard";
import MockSteps from "@/components/landingPage/MockSteps";
import { LanguageSwitcherComponent } from "@/components/language-switcher";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { FileText, Zap, Star, Bot, Github, Linkedin } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";

export default function Home() {
  const t = useTranslations("home");
  const locale = useLocale();

  return (
    <main className="flex-1">
      <section className="w-full container mx-auto h-auto">
        <header className="w-full  py-4 mb-8">
          <nav className="flex justify-between items-center container mx-auto lg:px-0 px-4">
            <Logo />
            <div className="gap-4 flex itmes-center">
              <LanguageSwitcherComponent />
              <Link href={`${locale}/cv-builder`}>
                <Button className="font-bold" size={"lg"}>
                  {t("button")}
                </Button>
              </Link>
            </div>
          </nav>
        </header>
        <div className="flex items-center lg:space-x-8">
          <div className="flex flex-col items-center space-y-4 justify-center h-full my-20 text-center lg:text-start flex-1 lg:pr-20">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                {t("title")}
              </h1>
              <p className="text-gray-500 md:text-xl dark:text-gray-400">
                {t("paragraph")}
              </p>
            </div>
            <div className="w-full flex justify-center lg:justify-start space-x-4">
              <Link href={`${locale}/cv-builder`}>
                <Button className="font-bold" size={"lg"}>
                  {t("button")}
                </Button>
              </Link>
            </div>
          </div>
          <Link href={`${locale}/cv-builder`}>
            <InteractingCard />
          </Link>
        </div>
      </section>
      <section className="py-10 hidden lg:block">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
          {t("mockSection.howItWorks")}
        </h2>
        <MockSteps />
      </section>
      <section
        id="features"
        className="w-full py-12 md:py-24 lg:py-32 bg-gray-200 dark:bg-gray-800"
      >
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
            {t("features.title")}
          </h2>
          <div className="grid gap-6 lg:grid-cols-4 lg:gap-12">
            <div className="flex flex-col items-center space-y-4 text-center">
              <Zap className="h-10 w-10 text-primary" />
              <h3 className="text-xl font-bold">
                {t("features.easyToUse.title")}
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                {t("features.easyToUse.description")}
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 text-center">
              <FileText className="h-10 w-10 text-primary" />
              <h3 className="text-xl font-bold">
                {t("features.professionalTemplates.title")}
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                {t("features.professionalTemplates.description")}
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 text-center">
              <Star className="h-10 w-10 text-primary" />
              <h3 className="text-xl font-bold">
                {t("features.atsFriendly.title")}
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                {t("features.atsFriendly.description")}
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 text-center">
              <Bot className="h-10 w-10 text-primary" />
              <h3 className="text-xl font-bold">
                {t("features.aiPoweredCustomization.title")}
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                {t("features.aiPoweredCustomization.description")}
              </p>
            </div>
          </div>
        </div>
      </section>
      <footer className="w-full py-4 bg-gray-100 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between">
            <div className="flex items-center space-x-4">
              <Logo />
              <p className="text-sm text-gray-500 dark:text-gray-400">
                © {new Date().getFullYear()} Smart CV
              </p>
            </div>
            <nav className="flex space-x-4 text-sm">
              <Link
                href={`/${locale}/cv-builder`}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                {t("common.cvBuilder")}
              </Link>
              <Link
                href="#features"
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                {t("features.title")}
              </Link>
            </nav>
            <div className="flex space-x-4 text-sm items-center">
              <Link
                href="https://github.com/AtheerAPeter"
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 flex items-center"
              >
                <Github className="h-4 w-4 mr-1" />
                Github
              </Link>
              <Link
                target="_blank"
                href="https://www.linkedin.com/in/atheer-a-peter-6723b9191/"
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 flex items-center"
              >
                <Linkedin className="h-4 w-4 mr-1" />
                LinkedIn
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
