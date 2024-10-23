import { pdfjs } from "react-pdf";
import { useTranslations } from "next-intl";
import { ICvPdf } from "@/interfaces/ICvPdf";
import { ICoverLetterPdf } from "@/interfaces/ICoverLetterPdf";
import ThumbnailTemplate from "@/templates/ThumbnailTemplate";
import CoverLetterThumbnail from "@/templates/CoverLetterThumbnail";

pdfjs.GlobalWorkerOptions.workerSrc =
  "https://unpkg.com/pdfjs-dist@4.4.168/build/pdf.worker.mjs";

interface Props {
  data: ICvPdf | ICoverLetterPdf;
  type: "cv" | "cl";
}

export default function ThumbnailRenderer(props: Props) {
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

  return (
    <div>
      {props.type === "cl" ? (
        <CoverLetterThumbnail data={props.data as ICoverLetterPdf} />
      ) : (
        <ThumbnailTemplate
          data={props.data as ICvPdf}
          accentColor={"#000000"}
          titles={titles}
        />
      )}
    </div>
  );
}
