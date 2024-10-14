import { useState, useEffect, useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Button } from "./ui/button";
import { LoadingSpinner } from "./ui/LoadingSpinner";
import ReactPDF, { usePDF } from "@react-pdf/renderer";
import { ChevronLeft, ChevronRight, DownloadIcon } from "lucide-react";
import { ICoverLetterPdf } from "@/interfaces/ICoverLetterPdf";
import CoverLetter1 from "@/templates/CoverLetter1";
import { useTranslations } from "next-intl";

pdfjs.GlobalWorkerOptions.workerSrc =
  "https://unpkg.com/pdfjs-dist@4.4.168/build/pdf.worker.mjs";

interface Props {
  data: ICoverLetterPdf;
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
      link.download = "CoverLetter.pdf";
      link.click();
    }
  };

  return (
    <Button
      onClick={handleDownload}
      disabled={!instance.url}
      className="flex items-center gap-2"
    >
      <DownloadIcon className="h-4 w-4" />
      <p>{t("download")}</p>
    </Button>
  );
}

export default function CoverLetterPDFPreview({ data }: Props) {
  console.log(data);

  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(0.65);
  const containerRef = useRef<HTMLDivElement>(null);
  const [instance, updateInstance] = usePDF({
    document: <CoverLetter1 data={data} />,
  });

  useEffect(() => {
    updateInstance(<CoverLetter1 data={data} />);
  }, [data, updateInstance]);

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
    <div className="h-screen shadow-lg overflow-auto relative">
      <div className="flex justify-evenly items-center mt-4 my-4">
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
