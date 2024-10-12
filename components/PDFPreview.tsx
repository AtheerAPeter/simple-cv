"use client";
import dynamic from "next/dynamic";
import { useState, useEffect, useCallback } from "react";
import { debounce } from "lodash";
import { Button } from "./ui/button";
import { LoadingSpinner } from "./ui/LoadingSpinner";
import { ICvPdf } from "@/interfaces/ICvPdf";
import useTemplateStore from "@/stores/templateStore";
import { templates } from "./EditorHeader";
import { useTranslations } from "next-intl";

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

  return (
    <PDFDownloadLink
      document={templates[template](data, color, titles)}
      fileName="cv.pdf"
    >
      {({ blob, url, loading, error }) => (
        <Button disabled={loading}>
          {loading ? "Generating PDF..." : "Download PDF"}
        </Button>
      )}
    </PDFDownloadLink>
  );
}

export default function PDFPreview({ data }: Props) {
  const [isDataLoaded, setIsDataLoaded] = useState(false);

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
  const template = useTemplateStore((state) => state.template);
  const [debouncedData, setDebouncedData] = useState(data);
  const { color } = useTemplateStore();
  const debouncedSetData = useCallback(
    debounce((newData: ICvPdf) => {
      setDebouncedData(newData);
    }, 500),
    []
  );

  useEffect(() => {
    debouncedSetData(data);
  }, [data, debouncedSetData]);

  useEffect(() => {
    if (debouncedData.personalDetails.name) {
      setIsDataLoaded(true);
    }
  }, [debouncedData]);

  return (
    <div className="space-y-4 lg:space-y-0 p-2 lg:p-0 h-full">
      <div className="flex justify-end lg:hidden">
        <PdfDownloadButton data={debouncedData} />
      </div>
      {isDataLoaded ? (
        <div className="h-full">
          <PDFViewer showToolbar={true} width="100%" height="100%">
            {templates[template](debouncedData, color, titles)}
          </PDFViewer>
        </div>
      ) : (
        <div className="h-full w-full flex items-center justify-center">
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
}
