import { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Button } from "./ui/button";
import { LoadingSpinner } from "./ui/LoadingSpinner";
import { ICvPdf } from "@/interfaces/ICvPdf";
import useTemplateStore from "@/stores/templateStore";
import { templates } from "./EditorHeader";
import { useTranslations } from "next-intl";
import ReactPDF, { usePDF } from "@react-pdf/renderer";
import { ChevronLeft, ChevronRight, DownloadIcon } from "lucide-react";

pdfjs.GlobalWorkerOptions.workerSrc =
  "https://unpkg.com/pdfjs-dist@4.4.168/build/pdf.worker.mjs";

interface Props {
  data: ICvPdf;
}

export function PdfDownloadButton({
  instance,
}: {
  instance: ReactPDF.UsePDFInstance;
}) {
  const handleDownload = () => {
    if (instance.url) {
      const link = document.createElement("a");
      link.href = instance.url;
      link.download = "cv.pdf";
      link.click();
    }
  };

  return (
    <button
      className="rounded-full bg-black p-4 text-white absolute bottom-4 right-4 hover:scale-105 transition-all"
      onClick={handleDownload}
      disabled={!instance.url}
    >
      <DownloadIcon className="h-4 w-4" />
    </button>
  );
}

export default function PDFPreview({ data }: Props) {
  const [numPages, setNumPages] = useState<number>(0);
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

  const [instance, updateInstance] = usePDF({
    document: templates[template](data, color, titles),
  });

  useEffect(() => {
    updateInstance(templates[template](data, color, titles));
  }, [data, template, color, updateInstance]);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  if (instance.loading) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (instance.error) {
    return <div>Error generating PDF: {instance.error}</div>;
  }

  return (
    <div className="h-screen shadow-lg overflow-auto relative">
      <div className="flex justify-evenly items-center mt-4 mb-2">
        <div className="flex items-center space-x-2">
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setPageNumber(pageNumber - 1)}
            disabled={pageNumber <= 1}
          >
            <ChevronLeft />
          </Button>
          <span>{pageNumber}</span>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setPageNumber(pageNumber + 1)}
            disabled={pageNumber >= numPages}
          >
            <ChevronRight />
          </Button>
        </div>
        <PdfDownloadButton instance={instance} />
      </div>
      <div className="flex justify-center mt-4">
        {instance.url ? (
          <Document
            file={instance.url}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={<LoadingSpinner />}
            className="h-full border rounded-lg overflow-hidden"
          >
            <Page
              pageNumber={pageNumber}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              scale={0.9}
            />
          </Document>
        ) : (
          <LoadingSpinner />
        )}
      </div>
    </div>
  );
}
