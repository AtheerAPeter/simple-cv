import { useState, useEffect, useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Button } from "./ui/button";
import { LoadingSpinner } from "./ui/LoadingSpinner";
import ReactPDF, { usePDF } from "@react-pdf/renderer";
import {
  ArrowDownToLine,
  ChevronLeft,
  ChevronRight,
  DownloadIcon,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { ICoverLetterPdf } from "@/interfaces/ICoverLetterPdf";
import CoverLetter1 from "@/templates/CoverLetter1";
import { useTranslations } from "next-intl";

pdfjs.GlobalWorkerOptions.workerSrc =
  "https://unpkg.com/pdfjs-dist@4.4.168/build/pdf.worker.mjs";

interface Props {
  data: ICoverLetterPdf;
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

export default function CoverLetterPDFPreview(props: Props) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(0.8);
  const containerRef = useRef<HTMLDivElement>(null);
  const [instance, updateInstance] = usePDF({
    document: <CoverLetter1 data={props.data} />,
  });

  useEffect(() => {
    updateInstance(<CoverLetter1 data={props.data} />);
  }, [props.data, updateInstance]);

  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth;

        if (containerWidth > 1000) {
          setScale(0.8);
        } else if (containerWidth > 630) {
          setScale(0.7);
        } else if (containerWidth > 420) {
          setScale(0.6);
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
    <div className="h-screen overflow-auto relative flex flex-col items-center">
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
            "-cover letter" +
            ".pdf"
          }
          instance={instance}
        />
      </div>
      <div className="flex justify-center mt-4">
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
