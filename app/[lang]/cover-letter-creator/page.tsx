"use client";
import EmployerDetailsSection from "@/components/CoverLetter/EmployerDetailsSection";
import PersonalDetails from "@/components/CoverLetter/PersonalDetailsSection";
import SmartCoverLetterForm from "@/components/CoverLetter/SmartCoverLetterForm";
import { Input } from "@/components/ui/input";
import { useAI } from "@/hooks/useAI";
import { useCoverLetterForm } from "@/hooks/useCoverLetterForm";
import { ICvPdf } from "@/interfaces/ICvPdf";
import {
  placeholderData,
  placeholderDataCoverLetter,
} from "@/lib/placeholderData";
import CoverLetter1 from "@/templates/CoverLetter1";
import { Label } from "@radix-ui/react-label";
import { PDFViewer } from "@react-pdf/renderer";
import { useLocale, useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

export default function Page() {
  const t = useTranslations("cvBuilder");
  const locale = useLocale();
  const [cvData, setCvData] = useState<ICvPdf>();

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
    const savedData = localStorage.getItem("cvData");
    if (!savedData) {
      setName(placeholderData.name);
      setEmail(placeholderData.email);
      setPhone(placeholderData.phone);
      setAddress(placeholderData.address);
      setCompany(placeholderDataCoverLetter.company);
      setManager(placeholderDataCoverLetter.manager);
      setPosition(placeholderDataCoverLetter.position);
      setCompanyAddress(placeholderDataCoverLetter.companyAddress);
      setDescription(placeholderDataCoverLetter.paragraph);
      setOpening(placeholderDataCoverLetter.opening);
      setClosing(placeholderDataCoverLetter.closing);
    } else {
      const parsedData = JSON.parse(savedData);
      setCvData(parsedData);
      setName(parsedData.name);
      setEmail(parsedData.email);
      setPhone(parsedData.phone);
      setAddress(parsedData.address);
      setDescription(placeholderDataCoverLetter.paragraph);
      setOpening(placeholderDataCoverLetter.opening);
      setClosing(
        `${locale === "en" ? "Best regards," : "Grüße,"} ${parsedData.name}`
      );
    }
  }, []);

  const handlePersonalDetailsChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value, files } = e.target;
      switch (name) {
        case "name":
          setName(value);
          break;
        case "date":
          setDate(value);
          break;
        case "email":
          setEmail(value);
          break;
        case "phone":
          setPhone(value);
          break;
        case "address":
          setAddress(value);
          break;

        default:
          break;
      }
    },
    []
  );

  const handleEmployerDetailsChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value, files } = e.target;
      switch (name) {
        case "companyName":
          setCompany(value);
          break;
        case "managerName":
          setManager(value);
          break;
        case "companyAddress":
          setCompanyAddress(value);
          break;
        case "position":
          setPosition(value);
          break;

        default:
          break;
      }
    },
    []
  );

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <div className="w-full lg:w-1/2 h-screen bg-white shadow-md hidden lg:flex flex-col">
        <div className="space-y-4 lg:space-y-0 p-2 lg:p-0 h-full">
          <div className="flex justify-end lg:hidden">
            {/* <PdfDownloadButton data={debouncedData} /> */}
          </div>
          <div className="h-full">
            <PDFViewer width="100%" height="100%">
              <CoverLetter1 data={debouncedData} />
            </PDFViewer>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-1/2 h-screen overflow-y-auto p-2 lg:p-8 bg-gray-100 text-gray-900 space-y-6">
        <section>
          <div className="flex items-start gap-2 mb-4">
            <h2 className="text-xl font-semibold">Personal Details</h2>
          </div>
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
          <div className="flex items-start gap-2 mb-4">
            <h2 className="text-xl font-semibold">Employer Details</h2>
          </div>
          <EmployerDetailsSection
            position={position}
            handleEmployerDetailsChange={handleEmployerDetailsChange}
            companyAddress={companyAddress}
            companyName={company}
            managerName={manager}
          />
        </section>
        <section>
          <div className="flex items-start gap-2 mb-4">
            <h2 className="text-xl font-semibold">Cover Letter</h2>
          </div>
          <div className="mb-4 p-4 bg-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="opening">Opening</Label>
                <Input
                  id="opening"
                  name="opening"
                  value={opening}
                  onChange={(e) => setOpening(e.target.value)}
                  className="border-gray-100"
                />
              </div>
              <div>
                <Label htmlFor="opening">Closing</Label>
                <Input
                  id="opening"
                  name="opening"
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
          <div className="flex items-start gap-2 mb-4">
            <h2 className="text-xl font-semibold">AI Generated Cover Letter</h2>
            <p className="text-gray-400 text-xs">{t("beta")}</p>
          </div>
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
