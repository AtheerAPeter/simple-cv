import { Document, Page, pdfjs } from "react-pdf";
import ReactPDF, { usePDF } from "@react-pdf/renderer";
import { Templates, templates } from "@/templates";
import { useTranslations } from "next-intl";
import { ICvPdf } from "@/interfaces/ICvPdf";
import { useEffect } from "react";
import CoverLetter1 from "@/templates/CoverLetter1";
import { ICoverLetterPdf } from "@/interfaces/ICoverLetterPdf";

pdfjs.GlobalWorkerOptions.workerSrc =
  "https://unpkg.com/pdfjs-dist@4.4.168/build/pdf.worker.mjs";

interface Props {
  data: ICvPdf | ICoverLetterPdf;
  type: "cv" | "cl";
}

export default function PDFCanva(props: Props) {
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

  const [instance, updateInstance] = usePDF({
    document:
      props.type === "cv" ? (
        templates["simple"](props.data as ICvPdf, "#000000", titles)
      ) : (
        <CoverLetter1 data={props.data as ICoverLetterPdf} />
      ),
  });

  useEffect(() => {
    updateInstance(
      props.type === "cv" ? (
        templates["simple"](props.data as ICvPdf, "#000000", titles)
      ) : (
        <CoverLetter1 data={props.data as ICoverLetterPdf} />
      )
    );
  }, [props.data, updateInstance]);

  return (
    <div>
      <Document
        file={instance.url}
        className="h-full border rounded-lg overflow-hidden"
      >
        <Page
          height={320}
          className={"w-full h-full"}
          pageNumber={1}
          renderTextLayer={false}
          renderAnnotationLayer={false}
        />
      </Document>
    </div>
  );
}
