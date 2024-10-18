import { useState, useEffect, useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Button } from "./ui/button";
import LoadingSpinner from "./ui/LoadingSpinner";
import { ICvPdf } from "@/interfaces/ICvPdf";
import useTemplateStore from "@/stores/templateStore";
import { useTranslations } from "next-intl";
import ReactPDF, { usePDF } from "@react-pdf/renderer";
import {
  ArrowDownToLine,
  ChevronLeft,
  ChevronRight,
  DownloadIcon,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { Templates, templates } from "@/templates";

pdfjs.GlobalWorkerOptions.workerSrc =
  "https://unpkg.com/pdfjs-dist@4.4.168/build/pdf.worker.mjs";

interface Props {
  data: ICvPdf;
  template?: Templates;
  color?: string;
  scale?: number;
}

function PdfDownloadButton({
  instance,
  fileName,
}: {
  instance: ReactPDF.UsePDFInstance;
  fileName?: string;
}) {
  const t = useTranslations("templateTranslation");
  const handleDownload = () => {
    if (instance.url) {
      const link = document.createElement("a");
      link.href = instance.url;
      link.download = fileName || "cv.pdf";
      link.click();
    }
  };

  return (
    <Button
      size={"sm"}
      onClick={handleDownload}
      disabled={!instance.url}
      className="flex items-center gap-2 rounded-full bg-white text-black hover:bg-gray-200 hover:text-black"
    >
      <ArrowDownToLine className="h-4 w-4" />
      <p>{t("download")}</p>
    </Button>
  );
}

export default function PDFPreview(props: Props) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(0.7);
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
        const containerHeight = containerRef.current.clientHeight;

        const minDimension = Math.min(containerWidth, containerHeight);

        if (minDimension > 1000) {
          setScale(0.7);
        } else if (minDimension > 800) {
          setScale(0.65);
        } else if (minDimension > 600) {
          setScale(0.6);
        } else if (minDimension > 400) {
          setScale(0.6);
        } else {
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

  const zoomIn = () => {
    setScale(scale + 0.05);
  };
  const zoomOut = () => {
    setScale(scale - 0.05);
  };

  if (instance.error) {
    return <div>Error generating PDF: {instance.error}</div>;
  }

  return (
    <div
      className="h-full w-full overflow-auto relative flex flex-col items-center"
      ref={containerRef}
    >
      <div className="flex justify-center items-center gap-2 my-2 bg-black rounded-full w-fit p-1">
        <div className="flex items-center space-x-2">
          <Button
            onClick={zoomOut}
            size={"icon"}
            variant={"ghost"}
            className="rounded-full bg-white text-black hover:bg-gray-200 hover:text-black"
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button
            onClick={zoomIn}
            size={"icon"}
            variant={"ghost"}
            className="rounded-full bg-white text-black hover:bg-gray-200 hover:text-black"
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setPageNumber(pageNumber - 1)}
            disabled={pageNumber <= 1}
            className="rounded-full bg-white text-black hover:bg-gray-200 hover:text-black"
          >
            <ChevronLeft />
          </Button>
          <span className="text-white font-bold w-4 text-center">
            {pageNumber}
          </span>
          <Button
            className="rounded-full bg-white text-black hover:bg-gray-200 hover:text-black"
            size="icon"
            variant="ghost"
            onClick={() => setPageNumber(pageNumber + 1)}
            disabled={pageNumber >= numPages}
          >
            <ChevronRight />
          </Button>
        </div>
        <PdfDownloadButton
          fileName={
            props.data.personalDetails.name +
            "-" +
            crypto.randomUUID().slice(0, 5) +
            ".pdf"
          }
          instance={instance}
        />
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
              scale={props.scale ?? scale}
            />
          </Document>
        ) : (
          <LoadingSpinner />
        )}
      </div>
    </div>
  );
}
