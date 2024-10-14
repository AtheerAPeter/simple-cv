"use client";
import { NavBar } from "@/components/NavBar";
import PDFPreview from "@/components/PDFPreview";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { useShadredDocument } from "@/hooks/useShadredDocument";
import { Templates, templates } from "@/templates";
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
    <div className="h-screen">
      <NavBar />
      {documentQuery.isLoading ? (
        <div className="w-full h-full flex justify-center items-center">
          <LoadingSpinner />
        </div>
      ) : documentQuery.isError ? (
        <div className="w-full h-full flex justify-center items-center">
          <p>Error</p>
        </div>
      ) : (
        <div>
          <PDFPreview
            data={{
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
            }}
            template={template as Templates}
            color={color}
          />
        </div>
      )}
    </div>
  );
}
