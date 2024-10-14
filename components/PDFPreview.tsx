import { useState, useEffect, useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Button } from "./ui/button";
import { LoadingSpinner } from "./ui/LoadingSpinner";
import { ICvPdf } from "@/interfaces/ICvPdf";
import useTemplateStore from "@/stores/templateStore";
import { useTranslations } from "next-intl";
import ReactPDF, { usePDF } from "@react-pdf/renderer";
import { ChevronLeft, ChevronRight, DownloadIcon } from "lucide-react";
import { Templates, templates } from "@/templates";

pdfjs.GlobalWorkerOptions.workerSrc =
  "https://unpkg.com/pdfjs-dist@4.4.168/build/pdf.worker.mjs";

interface Props {
  data: ICvPdf;
  template?: Templates;
  color?: string;
}

function PdfDownloadButton({
  instance,
}: {
  instance: ReactPDF.UsePDFInstance;
}) {
  const t = useTranslations("templateTranslation");
  const handleDownload = () => {
    if (instance.url) {
      const link = document.createElement("a");
      link.href = instance.url;
      link.download = "cv.pdf";
      link.click();
    }
  };

  return (
    <Button
      size={"sm"}
      onClick={handleDownload}
      disabled={!instance.url}
      className="flex items-center gap-2"
    >
      <DownloadIcon className="h-4 w-4" />
      <p>{t("download")}</p>
    </Button>
  );
}

export default function PDFPreview(props: Props) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(0.65);
  const containerRef = useRef<HTMLDivElement>(null);
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
    document: templates[props.template ?? template](props.data, color, titles),
  });

  useEffect(() => {
    updateInstance(
      templates[props.template ?? template](props.data, color, titles)
    );
  }, [
    props.data,
    template,
    color,
    updateInstance,
    props.template,
    props.color,
  ]);

  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth;

        if (containerWidth > 1000) {
          setScale(0.65);
        } else if (containerWidth > 630) {
          setScale(0.6);
        } else if (containerWidth > 420) {
          setScale(0.55);
        } else if (containerWidth > 300) {
          setScale(0.5);
        }
      }
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

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
    <div className="h-full w-full overflow-auto relative" ref={containerRef}>
      <div className="flex justify-center items-center gap-2 my-2">
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
      <div className="flex justify-center items-center">
        {instance.url ? (
          <Document
            file={instance.url}
            onLoadSuccess={onDocumentLoadSuccess}
            className="h-full border rounded-lg overflow-hidden"
          >
            <Page
              pageNumber={pageNumber}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              scale={scale}
            />
          </Document>
        ) : (
          <LoadingSpinner />
        )}
      </div>
    </div>
  );
}
