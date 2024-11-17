import { useState, useEffect, useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { ICvPdf } from "@/interfaces/ICvPdf";
import useTemplateStore from "@/stores/templateStore";
import { useTranslations } from "next-intl";
import ReactPDF, { usePDF } from "@react-pdf/renderer";
import {
  ArrowDownToLine,
  ChevronLeft,
  ChevronRight,
  Palette,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { Templates, templates } from "@/templates";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { GradientPicker } from "./GradientPicker";

pdfjs.GlobalWorkerOptions.workerSrc =
  "https://unpkg.com/pdfjs-dist@4.4.168/build/pdf.worker.mjs";

interface Props {
  data: ICvPdf;
  template?: Templates;
  color?: string;
  scale?: number;
  className?: string;
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
      className="flex items-center gap-2 rounded-full bg-white text-black hover:bg-gray-200 hover:text-black h-6"
    >
      <ArrowDownToLine className="h-4 w-4" />
      <p>{t("download")}</p>
    </Button>
  );
}

export default function PDFPreview(props: Props) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(0.9);
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
  }, [props.data, template, color, props.template, props.color]);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
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
      <div className="flex justify-center items-center gap-4 my-2 bg-black rounded-full w-fit p-1">
        <PDFTemplatesModal />
        <div className="flex items-center bg-white rounded-full gap-1">
          <Button
            onClick={zoomOut}
            size={"icon"}
            variant={"ghost"}
            className="rounded-full bg-white text-black hover:bg-gray-200 hover:text-black h-6 w-6"
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button
            onClick={zoomIn}
            size={"icon"}
            variant={"ghost"}
            className="rounded-full bg-white text-black hover:bg-gray-200 hover:text-black h-6 w-6"
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center bg-white rounded-full gap-1">
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setPageNumber(pageNumber - 1)}
            disabled={pageNumber <= 1}
            className="rounded-full bg-white text-black hover:bg-gray-200 hover:text-black h-6 w-6"
          >
            <ChevronLeft />
          </Button>
          <span className="font-bold w-4 text-center">{pageNumber}</span>
          <Button
            className="rounded-full bg-white text-black hover:bg-gray-200 hover:text-black h-6 w-6"
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
        {instance.url && !!!instance.loading && (
          <Document
            loading={<div></div>}
            error={<div></div>}
            file={instance.url}
            onLoadSuccess={onDocumentLoadSuccess}
            className={cn(
              "h-full rounded-lg overflow-hidden",
              props?.className
            )}
          >
            <Page
              loading={<div></div>}
              error={<div></div>}
              pageNumber={pageNumber}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              scale={props.scale ?? scale}
            />
          </Document>
        )}
      </div>
    </div>
  );
}

function PDFTemplatesModal() {
  const t = useTranslations("common");
  const { color, setColor, template, setTemplate } = useTemplateStore();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size={"icon"}
          variant={"ghost"}
          className="rounded-full bg-white text-black hover:bg-gray-200 hover:text-black h-6 w-6"
        >
          <Palette className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("templates")}</DialogTitle>
        </DialogHeader>
        <main className="max-h-[70vh] overflow-y-auto p-2">
          <div className="flex justify-end mb-4">
            <GradientPicker background={color} setBackground={setColor} />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 px-4 lg:px-0">
            {Object.keys(templates).map((t, index) => (
              <Card
                key={index}
                className={`cursor-pointer transition-all rounded-sm shadow-none border p-0 overflow-hidden ${
                  t === template && "ring-4 ring-primary"
                }`}
                onClick={() => setTemplate(t as Templates)}
              >
                <CardContent className="p-0">
                  <Image
                    alt={t}
                    src={`/templates/${index + 1}.png`}
                    width={200}
                    height={283}
                    className="w-full h-auto"
                  />
                </CardContent>
                <CardFooter className="p-0 flex items-center justify-center">
                  <p className="text-sm capitalize">{t}</p>
                </CardFooter>
              </Card>
            ))}
          </div>
        </main>
      </DialogContent>
    </Dialog>
  );
}
