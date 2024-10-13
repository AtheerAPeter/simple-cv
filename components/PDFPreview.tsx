import { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Button } from "./ui/button";
import { LoadingSpinner } from "./ui/LoadingSpinner";
import { ICvPdf } from "@/interfaces/ICvPdf";
import useTemplateStore from "@/stores/templateStore";
import { templates } from "./EditorHeader";
import { useTranslations } from "next-intl";
import { usePDF } from "@react-pdf/renderer";

// Set up the worker for pdf.js
pdfjs.GlobalWorkerOptions.workerSrc = "../public/pdf.worker.mjs";

interface Props {
  data: ICvPdf;
}

// export function PdfDownloadButton({ data }: Props) {
//   const template = useTemplateStore((state) => state.template);
//   const { color } = useTemplateStore();
//   const t = useTranslations("templateTranslation");
//   const titles = {
//     experience: t("experience"),
//     education: t("education"),
//     skills: t("skills"),
//     projects: t("projects"),
//     languages: t("languages"),
//     hobbies: t("hobbies"),
//     email: t("email"),
//     phone: t("phone"),
//     address: t("address"),
//     github: t("github"),
//   };

//   const handleDownload = async () => {
//     const blob = await templates[template](data, color, titles).toBlob();
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement("a");
//     link.href = url;
//     link.download = "cv.pdf";
//     link.click();
//     URL.revokeObjectURL(url);
//   };

//   return <Button onClick={handleDownload}>Download PDF</Button>;
// }

export default function PDFPreview({ data }: Props) {
  const [numPages, setNumPages] = useState<number>(1);
  const [pageNumber, setPageNumber] = useState(1);

  const template = useTemplateStore((state) => state.template);
  const { color } = useTemplateStore();
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

  const [instance] = usePDF({
    document: templates[template](data, color, titles),
  });

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  return (
    <div className="space-y-4 lg:space-y-0 p-2 lg:p-0 h-full">
      <div className="flex justify-between items-center mb-4">
        <div>
          <Button
            onClick={() => setPageNumber(pageNumber - 1)}
            disabled={pageNumber <= 1}
          >
            Previous
          </Button>
          <Button
            onClick={() => setPageNumber(pageNumber + 1)}
            disabled={pageNumber >= numPages}
          >
            Next
          </Button>
          <span>
            Page {pageNumber} of {numPages}
          </span>
        </div>
        {/* <PdfDownloadButton data={data} /> */}
      </div>
      {instance.url ? (
        <div className="h-full overflow-auto">
          <Document
            file={instance.url}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={<LoadingSpinner />}
          >
            <Page
              pageNumber={pageNumber}
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          </Document>
        </div>
      ) : (
        <div className="h-full w-full flex items-center justify-center">
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
}
