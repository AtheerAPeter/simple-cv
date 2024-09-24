"use client";
import dynamic from "next/dynamic";
import { useState, useEffect, useCallback } from "react";
import { debounce } from "lodash";
import { Button } from "./ui/button";
import { LoadingSpinner } from "./ui/LoadingSpinner";
import { ICvPdf } from "@/interfaces/ICvPdf";
import Template2 from "@/templates/Template2";
import useTemplateStore from "@/stores/templateStore";
import { templates } from "./EditorHeader";

const PDFViewer = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex justify-center items-center">
        <LoadingSpinner />
      </div>
    ),
  }
);

const PDFDownloadLink = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
  {
    ssr: false,
    loading: () => <p>Loading download link...</p>,
  }
);

interface Props {
  data: ICvPdf;
}

export function PdfDownloadButton({ data }: Props) {
  return (
    <PDFDownloadLink document={<Template2 data={data} />} fileName="cv.pdf">
      {({ blob, url, loading, error }) => (
        <Button disabled={loading}>
          {loading ? "Generating PDF..." : "Download PDF"}
        </Button>
      )}
    </PDFDownloadLink>
  );
}

export default function PDFPreview({ data }: Props) {
  const template = useTemplateStore((state) => state.template);
  const [debouncedData, setDebouncedData] = useState(data);
  const { color } = useTemplateStore();
  const debouncedSetData = useCallback(
    debounce((newData: ICvPdf) => {
      setDebouncedData(newData);
    }, 1000),
    []
  );

  useEffect(() => {
    debouncedSetData(data);
  }, [data, debouncedSetData]);

  return (
    <div className="space-y-4 lg:space-y-0 p-2 lg:p-0 h-full">
      <div className="flex justify-end lg:hidden">
        <PdfDownloadButton data={debouncedData} />
      </div>
      <div className="h-full">
        <PDFViewer width="100%" height="100%">
          {templates[template](debouncedData, color)}
        </PDFViewer>
      </div>
    </div>
  );
}
