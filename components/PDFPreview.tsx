import { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Button } from "./ui/button";
import { LoadingSpinner } from "./ui/LoadingSpinner";
import { ICvPdf } from "@/interfaces/ICvPdf";
import useTemplateStore from "@/stores/templateStore";
import { templates } from "./EditorHeader";
import { useTranslations } from "next-intl";
import ReactPDF, { usePDF } from "@react-pdf/renderer";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
    <Button onClick={handleDownload} disabled={!instance.url}>
      Download PDF
    </Button>
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

  console.log(instance.url);

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
    <div className="space-y-4 lg:space-y-0 p-2 lg:p-0 h-full">
      {instance.url ? (
        <div className="h-full overflow-auto">
          <Document
            file={instance.url}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={<LoadingSpinner />}
            className={"border w-full"}
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
      <div className="flex justify-between items-center mb-4">
        <div>
          <Button
            size={"icon"}
            variant={"ghost"}
            onClick={() => setPageNumber(pageNumber - 1)}
            disabled={pageNumber <= 1}
          >
            <ChevronLeft />
          </Button>
          <span>{pageNumber}</span>
          <Button
            size={"icon"}
            variant={"ghost"}
            onClick={() => setPageNumber(pageNumber + 1)}
            disabled={pageNumber >= numPages}
          >
            <ChevronRight />
          </Button>
        </div>
        <PdfDownloadButton instance={instance} />
      </div>
    </div>
  );
}
