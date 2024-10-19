"use client";

import { useEffect, useState, useCallback } from "react";
import { useLocale, useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { PDFViewer } from "@react-pdf/renderer";
import EmployerDetailsSection from "@/components/CoverLetter/EmployerDetailsSection";
import PersonalDetails from "@/components/CoverLetter/PersonalDetailsSection";
import SmartCoverLetterForm from "@/components/CoverLetter/SmartCoverLetterForm";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useCoverLetterForm from "@/hooks/useCoverLetterForm";
import CoverLetter1 from "@/templates/CoverLetter1";
import "react-quill/dist/quill.snow.css";
import CoverLetterPageHeader from "@/components/CoverLetter/CoverLetterPageHeader";
import { useRouter } from "next/navigation";
import PreviewCvModal from "@/components/modals/PreviewCvModal";
import { Button } from "@/components/ui/button";
import useDocument from "@/hooks/useDocument";
import { ICoverLetterResponse } from "@/interfaces/ICoverLetterPdf";
import FloatingSidebarComponent from "@/components/floating-sidebar";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { documents } from "@/drizzle/schema";
import CVIcon from "@/components/icons/CVIcon";
import CoverLetterPDFPreview from "@/components/CoverLetterPDFPreview";
import { toast } from "react-toastify";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
const PDFDownloadLink = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
  {
    ssr: false,
    loading: () => <p>Loading download link...</p>,
  }
);

export default function Page({ params }: { params: { id: string } }) {
  const t = useTranslations("coverLetterPage");
  const locale = useLocale();
  const router = useRouter();
  const [selectedCv, setSelectedCv] = useState<typeof documents.$inferSelect>();
  const [open, setOpen] = useState(false);
  const { document, documentQuery, updateMutation, list, listQuery } =
    useDocument({
      listEnabled: true,
      id: params.id,
    });

  const {
    name,
    setName,
    email,
    setEmail,
    phone,
    setPhone,
    address,
    setAddress,
    date,
    setDate,
    company,
    setCompany,
    manager,
    setManager,
    position,
    setPosition,
    companyAddress,
    setCompanyAddress,
    description,
    setDescription,
    debouncedData,
    opening,
    setOpening,
    closing,
    setClosing,
  } = useCoverLetterForm();

  useEffect(() => {
    console.log("before", document);

    if (document && document.content) {
      try {
        const parsedCLData = JSON.parse(
          document.content
        ) as ICoverLetterResponse;
        console.log("parsed", parsedCLData);

        setName(parsedCLData.name || "");
        setEmail(parsedCLData.email || "");
        setPhone(parsedCLData.phone || "");
        setAddress(parsedCLData.address || "");
        setCompany(parsedCLData.company || "");
        setManager(parsedCLData.manager || "");
        setPosition(parsedCLData.position || "");
        setCompanyAddress(parsedCLData.companyAddress || "");
        setDescription(parsedCLData.description || "");
        setOpening(parsedCLData.opening || "");
        setClosing(parsedCLData.closing || "");
      } catch (error) {
        console.error("Error parsing document content:", error);
      }
    }
  }, [document]);

  const handlePersonalDetailsChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      const setters: { [key: string]: (value: string) => void } = {
        name: setName,
        date: setDate,
        email: setEmail,
        phone: setPhone,
        address: setAddress,
      };
      setters[name]?.(value);
    },
    []
  );

  const handleEmployerDetailsChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      const setters: { [key: string]: (value: string) => void } = {
        companyName: setCompany,
        managerName: setManager,
        companyAddress: setCompanyAddress,
        position: setPosition,
      };
      setters[name]?.(value);
    },
    []
  );

  const onBack = () => {
    router.replace(`/${locale}/dashboard`);
  };

  const saveToLocalStorage = async () => {
    const dataToSave = {
      name,
      email,
      phone,
      address,
      company,
      manager,
      position,
      companyAddress,
      description,
      opening,
      closing,
    };

    await toast.promise(
      async () => {
        await updateMutation.mutateAsync({
          content: JSON.stringify(dataToSave),
          id: params.id,
        });
      },
      {
        pending: t("clDataSaved.saving"),
        success: t("clDataSaved.title"),
        error: t("clDataSaved.error"),
      }
    );
  };

  const clearAll = () => {
    setName("");
    setEmail("");
    setPhone("");
    setAddress("");
    setCompany("");
    setManager("");
    setPosition("");
    setCompanyAddress("");
    setDescription("");
    setOpening("");
    setClosing("");
    setDate("");
  };

  const onSelectCv = (id: string) => {
    setSelectedCv(list?.filter((d) => d.id === id)[0]);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <FloatingSidebarComponent
        documentTitle={document?.title!}
        documentId={document?.id!}
      />
      <div className="w-full lg:w-1/2 h-screen bg-slate-400 hidden lg:flex flex-col">
        <CoverLetterPDFPreview data={debouncedData} />
      </div>
      <div className="w-full lg:w-1/2 h-screen overflow-y-auto p-2 lg:p-8">
        <CoverLetterPageHeader
          onBack={onBack}
          onSave={saveToLocalStorage}
          onClearAll={clearAll}
          isSaving={updateMutation.isPending}
        />
        <section>
          <h2 className="text-xl font-semibold mb-3 mt-10">
            {t("personalDetails")}
          </h2>
          <PersonalDetails
            date={date}
            name={name}
            email={email}
            phone={phone}
            address={address}
            handlePersonalDetailsChange={handlePersonalDetailsChange}
          />
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-3 mt-10">
            {t("recipient.title")}
          </h2>
          <EmployerDetailsSection
            position={position}
            handleEmployerDetailsChange={handleEmployerDetailsChange}
            companyAddress={companyAddress}
            companyName={company}
            managerName={manager}
          />
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-3 mt-10">{t("title")}</h2>
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="opening">{t("opening")}</Label>
                <Input
                  id="opening"
                  name="opening"
                  value={opening}
                  onChange={(e) => setOpening(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="closing">{t("closing")}</Label>
                <Input
                  id="closing"
                  name="closing"
                  value={closing}
                  onChange={(e) => setClosing(e.target.value)}
                />
              </div>
            </div>
            <div className="mt-4">
              <ReactQuill
                theme="snow"
                value={description}
                onChange={(content) => setDescription(content)}
                modules={{
                  toolbar: [[{ list: "bullet" }], ["clean"]],
                }}
                formats={["list", "italic", "underline"]}
                className="bg-white text-gray-900"
              />
            </div>
          </div>
        </section>
        <section>
          <div className="flex items-start gap-2 mb-3 mt-10">
            <h2 className="text-xl font-semibold">
              {t("aiGeneratedCoverLetter")}
            </h2>
            <p className="text-gray-400 text-xs">Beta</p>
          </div>
          {!!document && !!list && (
            <div>
              <Select onValueChange={onSelectCv} value={selectedCv?.id}>
                <SelectTrigger className="w-full mb-2">
                  <SelectValue placeholder={t("selectCV")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {list
                      .filter((d) => d.type === "cv")
                      .map((doc) => (
                        <SelectItem key={doc.id} value={doc.id}>
                          <div className="flex items-center gap-1">
                            <CVIcon className="mr-2 h-4 w-4" />
                            {doc.title}
                          </div>
                        </SelectItem>
                      ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <SmartCoverLetterForm
                disabled={!selectedCv}
                mockCoverLetter={description}
                experience={
                  JSON.parse(selectedCv?.content || "[]")?.experiences
                }
                skills={JSON.parse(selectedCv?.content || "[]")?.skills}
                onGenerate={setDescription}
              />
            </div>
          )}
        </section>
      </div>

      <PreviewCvModal
        children={
          <div>
            <div className="flex justify-end lg:hidden">
              <PDFDownloadLink
                document={<CoverLetter1 data={debouncedData} />}
                fileName={`${Date.now()}.pdf`}
              >
                {({ blob, url, loading, error }) => (
                  <Button disabled={loading}>
                    {loading ? "Generating PDF..." : "Download PDF"}
                  </Button>
                )}
              </PDFDownloadLink>
            </div>
            <PDFViewer width="100%" height="100%">
              <CoverLetter1 data={debouncedData} />
            </PDFViewer>
          </div>
        }
        open={open}
        setOpen={setOpen}
      />
      <Button
        onClick={() => setOpen(true)}
        className="fixed bottom-4 right-4 lg:hidden z-10"
      >
        {t("previw")}
      </Button>
    </div>
  );
}
