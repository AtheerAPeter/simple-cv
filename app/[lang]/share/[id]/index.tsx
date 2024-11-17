"use client";
import { NavBar } from "@/components/NavBar";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import PDFPreview from "@/components/PDFPreview";
import useShadredDocument from "@/hooks/useShadredDocument";
import { Templates, templates } from "@/templates";
import { useSearchParams } from "next/navigation";

export default function SharePage({ params }: { params: { id: string } }) {
  const query = useSearchParams();
  const queryTemplate = query.get("template") ?? "simple";
  const color = query.get("color") ?? "000000";

  const template = Object.keys(templates).includes(queryTemplate)
    ? queryTemplate
    : "simple";
  const { document, documentQuery } = useShadredDocument(params.id);
  const d = document?.content && JSON.parse(document?.content);

  return (
    <div className="h-screen pt-20">
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
            className="border"
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
            color={"#" + color}
          />
        </div>
      )}
    </div>
  );
}
