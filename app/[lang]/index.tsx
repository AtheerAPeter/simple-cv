import { auth, signIn } from "@/auth";
import Footer from "@/components/Footer";
import MockSteps from "@/components/MockSteps";
import { NavBarServer } from "@/components/NavbarServer";
import ScatteredLandingDocuments from "@/components/ScatteredLandingDocuments";
import { Button } from "@/components/ui/button";
import { FileText, Zap, Star, Bot } from "lucide-react";
import { SessionProvider } from "next-auth/react";
import { getLocale, getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";

export default async function LandingPage() {
  const t = await getTranslations("home");
  return (
    <main className="flex-1">
      <SessionProvider>
        <NavBarServer />
      </SessionProvider>
      <section className="w-full container mx-auto h-screen md:px-10 relative">
        <ScatteredLandingDocuments />
        <main className="flex items-center justify-center h-screen">
          <div className="flex flex-col items-center space-y-4 justify-center h-full text-center">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-4xl lg:text-5xl/none">
                {t("title")}
              </h1>
              <p className="text-gray-500 md:text-xl dark:text-gray-400">
                {t("paragraph")}
              </p>

              <form
                action={async () => {
                  "use server";
                  await signIn("google");
                }}
              >
                <Button
                  className="font-bold transition-all relative group"
                  size={"lg"}
                >
                  <div className="absolute -z-20 inset-0 bg-primary/50 group-hover:rotate-[5deg] rounded-lg transition-all"></div>
                  <div className="absolute -z-20 inset-0 bg-primary/50 group-hover:rotate-[-5deg] rounded-lg transition-all"></div>

                  {t("button")}
                </Button>
              </form>
            </div>
          </div>
          {/* <InteractingCard /> */}
        </main>
      </section>
      <section className="py-16 hidden lg:block">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
          {t("mockSection.howItWorks")}
        </h2>
        <MockSteps />
      </section>
      {/* <section className="py-16">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
          {t("showcaseSection.title")}
        </h2>
        <ShowcaseList />
      </section> */}
      <section
        id="features"
        className="w-full py-12 md:py-24 lg:py-32 bg-gray-200 dark:bg-gray-800"
      >
        <div className="container mx-auto px-4 lg:px-0">
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
      <Footer />
    </main>
  );
}
