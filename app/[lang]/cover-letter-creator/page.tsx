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
import { useCoverLetterForm } from "@/hooks/useCoverLetterForm";
import { ICvPdf } from "@/interfaces/ICvPdf";
import {
  placeholderDataCoverLetter,
  placeholderDataCoverLetterDE,
} from "@/lib/placeholderData";
import CoverLetter1 from "@/templates/CoverLetter1";

import "react-quill/dist/quill.snow.css";
import CoverLetterPageHeader from "@/components/CoverLetter/CoverLetterPageHeader";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function Page() {
  const t = useTranslations("coverLetterPage");
  const locale = useLocale();
  const [cvData, setCvData] = useState<ICvPdf>();
  const router = useRouter();
  const { toast } = useToast();
  const [isDataLoaded, setIsDataLoaded] = useState(false);

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
    if (debouncedData.personalDetails.name) {
      setIsDataLoaded(true);
    }
  }, [debouncedData]);

  useEffect(() => {
    const placeholder =
      locale === "en"
        ? placeholderDataCoverLetter
        : placeholderDataCoverLetterDE;

    const savedCVData = localStorage.getItem("cvData");
    const savedCoverLetterData = localStorage.getItem("CLData");

    if (savedCoverLetterData) {
      const parsedCLData = JSON.parse(savedCoverLetterData);
      setName(parsedCLData.name || placeholder.name);
      setEmail(parsedCLData.email || placeholder.email);
      setPhone(parsedCLData.phone || placeholder.phone);
      setAddress(parsedCLData.address || placeholder.address);
      setCompany(parsedCLData.company || placeholder.company);
      setManager(parsedCLData.manager || placeholder.manager);
      setPosition(parsedCLData.position || placeholder.position);
      setCompanyAddress(
        parsedCLData.companyAddress || placeholder.companyAddress
      );
      setDescription(parsedCLData.description || placeholder.paragraph);
      setOpening(parsedCLData.opening || placeholder.opening);
      setClosing(parsedCLData.closing || placeholder.closing);
    } else if (savedCVData) {
      const parsedCVData = JSON.parse(savedCVData);
      setCvData(parsedCVData);
      setName(parsedCVData.name);
      setEmail(parsedCVData.email);
      setPhone(parsedCVData.phone);
      setAddress(parsedCVData.address);
      setCompany(placeholder.company);
      setManager(placeholder.manager);
      setPosition(placeholder.position);
      setCompanyAddress(placeholder.companyAddress);
      setDescription(placeholder.paragraph);
      setOpening(placeholder.opening);
      setClosing(`${placeholder.closing} ${parsedCVData.name}`);
    } else {
      setName(placeholder.name);
      setEmail(placeholder.email);
      setPhone(placeholder.phone);
      setAddress(placeholder.address);
      setCompany(placeholder.company);
      setManager(placeholder.manager);
      setPosition(placeholder.position);
      setCompanyAddress(placeholder.companyAddress);
      setDescription(placeholder.paragraph);
      setOpening(placeholder.opening);
      setClosing(placeholder.closing);
    }
  }, []);

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
    router.replace(`/${locale}/services`);
  };

  const saveToLocalStorage = () => {
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
    localStorage.setItem("CLData", JSON.stringify(dataToSave));
    toast({
      title: t("clDataSaved.title"),
      description: t("clDataSaved.description"),
      duration: 3000,
    });
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

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <div className="w-full lg:w-1/2 h-screen bg-white shadow-md hidden lg:flex flex-col">
        <div className="h-full">
          {isDataLoaded ? (
            <PDFViewer width="100%" height="100%">
              <CoverLetter1 data={debouncedData} />
            </PDFViewer>
          ) : (
            <div className="w-full h-full flex justify-center items-center">
              <LoadingSpinner />
            </div>
          )}
        </div>
      </div>
      <div className="w-full lg:w-1/2 h-screen overflow-y-auto p-2 lg:p-8 bg-gray-100 text-gray-900 space-y-6">
        <CoverLetterPageHeader
          onBack={onBack}
          onSave={saveToLocalStorage}
          onClearAll={clearAll}
        />
        <section>
          <h2 className="text-xl font-semibold mb-4">{t("personalDetails")}</h2>
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
          <h2 className="text-xl font-semibold mb-4">{t("recipient.title")}</h2>
          <EmployerDetailsSection
            position={position}
            handleEmployerDetailsChange={handleEmployerDetailsChange}
            companyAddress={companyAddress}
            companyName={company}
            managerName={manager}
          />
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-4">{t("title")}</h2>
          <div className="mb-4 p-4 bg-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="opening">{t("opening")}</Label>
                <Input
                  id="opening"
                  name="opening"
                  value={opening}
                  onChange={(e) => setOpening(e.target.value)}
                  className="border-gray-100"
                />
              </div>
              <div>
                <Label htmlFor="closing">{t("closing")}</Label>
                <Input
                  id="closing"
                  name="closing"
                  value={closing}
                  onChange={(e) => setClosing(e.target.value)}
                  className="border-gray-100"
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
          <h2 className="text-xl font-semibold mb-4">
            {t("aiGeneratedCoverLetter")}
            <span className="text-gray-400 text-xs ml-2">Beta</span>
          </h2>
          <SmartCoverLetterForm
            mockCoverLetter={description}
            experience={cvData?.experiences || []}
            skills={cvData?.skills || []}
            onGenerate={setDescription}
          />
        </section>
      </div>
    </div>
  );
}
