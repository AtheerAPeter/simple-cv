"use client";

import PersonalDetails from "@/components/CoverLetter/PersonalDetailsSection";
import { ICoverLetterPdf } from "@/interfaces/ICoverLetterPdf";
import CoverLetter1 from "@/templates/CoverLetter1";
import { PDFViewer } from "@react-pdf/renderer";
import { useLocale, useTranslations } from "next-intl";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

export default function Page() {
  const t = useTranslations("cvBuilder");
  const locale = useLocale();
  const mockData: ICoverLetterPdf = {
    personalDetails: {
      name: "John Doe",
      email: "john.doe@email.com",
      phone: "(123) 456-7890",
      address: "123 Main St, Anytown, USA 12345",
    },
    date: "May 1, 2023",
    recipient: {
      name: "Jane Smith",
      title: "HR Manager",
      company: "Tech Solutions Inc.",
      address: "456 Business Ave, Metropolis, USA 67890",
    },
    salutation: "Dear Ms. Smith",
    paragraphs: [
      "I am writing to express my strong interest in the Software Developer position at Tech Solutions Inc., as advertised on your company website. With my background in computer science and three years of experience in developing web applications, I believe I would be a valuable addition to your team.",
      "In my current role at InnovateTech, I have successfully led the development of several key projects, improving application performance by 40% and reducing bug reports by 60%. I am particularly excited about the opportunity to contribute to Tech Solutions' innovative projects in AI and machine learning.",
      "I am impressed by Tech Solutions' commitment to pushing the boundaries of technology and your focus on creating solutions that make a real difference in people's lives. I am confident that my skills in JavaScript, React, and Node.js, combined with my passion for clean, efficient code, would allow me to contribute effectively to your team's success.",
      "Thank you for considering my application. I look forward to the opportunity to discuss how my skills and experiences align with the needs of Tech Solutions Inc. I am excited about the possibility of joining your team and contributing to your continued success.",
    ],
    closing: "Sincerely",
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <div className="w-full lg:w-1/2 h-screen bg-white shadow-md hidden lg:flex flex-col">
        <div className="space-y-4 lg:space-y-0 p-2 lg:p-0 h-full">
          <div className="flex justify-end lg:hidden">
            {/* <PdfDownloadButton data={debouncedData} /> */}
          </div>
          <div className="h-full">
            <PDFViewer width="100%" height="100%">
              <CoverLetter1 data={mockData} />
            </PDFViewer>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-1/2 h-screen overflow-y-auto p-2 lg:p-8 bg-gray-100 text-gray-900">
        <div className="mb-4 p-4 bg-white">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-medium">Cover Letter</h3>
          </div>

          <PersonalDetails />
        </div>
        <div className="mb-4 p-4 bg-white">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-medium">Cover Letter</h3>
          </div>

          <div className="mt-4">
            <ReactQuill
              theme="snow"
              //   value={pro.description}
              //   onChange={(content) =>
              //     handleProjectChange(index, "description", content)
              //   }
              modules={{
                toolbar: [
                  [{ list: "bullet" }],
                  ["bold", "italic", "underline"],
                  ["clean"],
                ],
              }}
              formats={["list", "bold", "italic", "underline"]}
              className="bg-white text-gray-900"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
