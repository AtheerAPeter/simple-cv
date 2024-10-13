"use client";
import { templates } from "@/components/EditorHeader";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { useShadredDocument } from "@/hooks/useShadredDocument";
import { Download, DownloadIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";

const PDFViewer = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex justify-center items-center">
        <LoadingSpinner />
      </div>
    ),
  }
);

const PDFDownloadLink = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
  {
    ssr: false,
    loading: () => <p>Loading download link...</p>,
  }
);

export default function Page({ params }: { params: { id: string } }) {
  const query = useSearchParams();
  const queryTemplate = query.get("template") ?? "simple";
  const color = query.get("color") ?? "#000000";

  const template = Object.keys(templates).includes(queryTemplate)
    ? queryTemplate
    : "simple";
  const { document, documentQuery } = useShadredDocument(params.id);
  const t = useTranslations("templateTranslation");

  const titles = {
    experience: t("experience"),
    education: t("education"),
    skills: t("skills"),
    projects: t("projects"),
    languages: t("languages"),
    hobbies: t("hobbies"),
    email: t("email"),
    phone: t("phone"),
    address: t("address"),
    github: t("github"),
  };
  const d = document?.content && JSON.parse(document?.content);

  return (
    <div className="h-full">
      {documentQuery.isLoading ? (
        <div className="w-full h-full flex justify-center items-center">
          <LoadingSpinner />
        </div>
      ) : documentQuery.isError ? (
        <div className="w-full h-full flex justify-center items-center">
          <p>Error</p>
        </div>
      ) : (
        <>
          <PDFDownloadLink
            className="fixed bottom-4 right-4 lg:hidden z-10 block"
            document={templates[template as keyof typeof templates](
              {
                personalDetails: {
                  name: d.name,
                  title: d.title,
                  email: d.email,
                  phone: d.phone,
                  address: d.address,
                  github: d.github,
                  image: d.image,
                },
                experiences: d.experiences,
                educations: d.educations,
                skills: d.skills,
                languages: d.languages,
                hobbies: d.hobbies,
                projects: d.projects,
              },
              "#" + color,
              titles
            )}
            fileName="cv.pdf"
          >
            {({ blob, url, loading, error }) => (
              <Button size={"icon"} disabled={loading}>
                <DownloadIcon />
              </Button>
            )}
          </PDFDownloadLink>

          <PDFViewer showToolbar={true} width="100%" height="100%">
            {templates[template as keyof typeof templates](
              {
                personalDetails: {
                  name: d.name,
                  title: d.title,
                  email: d.email,
                  phone: d.phone,
                  address: d.address,
                  github: d.github,
                  image: d.image,
                },
                experiences: d.experiences,
                educations: d.educations,
                skills: d.skills,
                languages: d.languages,
                hobbies: d.hobbies,
                projects: d.projects,
              },
              "#" + color,
              titles
            )}
          </PDFViewer>
        </>
      )}
    </div>
  );
}
