import { useTranslations } from "next-intl";
import React from "react";

const MockJobDescription = () => {
  const t = useTranslations("home.mock");
  return (
    <div className="w-[200px]">
      <div className="bg-white p-4 border-2 border-gray-200 rounded-lg">
        <h2 className="font-bold">{t("mockJobDescription.title")}</h2>
        <div className="flex items-center w-full justify-between gap-2">
          <div className="h-2 mb-1 flex-1 bg-gray-200 rounded-lg"></div>
          <div className="h-2 mb-1 flex-1 bg-gray-200 rounded-lg"></div>
          <div className="h-2 mb-1 flex-1 bg-gray-200 rounded-lg"></div>
        </div>
        <div className="flex items-center w-full justify-between gap-2">
          <div className="h-2 mb-1 flex-1 bg-gray-200 rounded-lg"></div>
          <div className="h-2 mb-1 flex-1 bg-gray-200 rounded-lg"></div>
          <div className="h-2 mb-1 flex-1 bg-gray-200 rounded-lg"></div>
          <div className="h-2 mb-1 flex-1 bg-gray-200 rounded-lg"></div>
          <div className="h-2 mb-1 flex-1 bg-gray-200 rounded-lg"></div>
        </div>
        <div className="flex items-center w-full justify-between gap-2">
          <div className="h-2 mb-1 flex-1 bg-gray-200 rounded-lg"></div>
          <div className="h-2 mb-1 flex-1 bg-gray-200 rounded-lg"></div>
          <div className="h-2 mb-1 flex-1 bg-gray-200 rounded-lg"></div>
          <div className="h-2 mb-1 flex-1 bg-gray-200 rounded-lg"></div>
          <div className="h-2 mb-1 flex-1 bg-gray-200 rounded-lg"></div>
          <div className="h-2 mb-1 flex-1 bg-gray-200 rounded-lg"></div>
        </div>
        <div className="h-2 mb-1 flex-1 bg-gray-200 rounded-lg"></div>
        <p className="text-[8px]">
          <strong>{t("mockJobDescription.keyResponsibilities")}</strong>
        </p>
        <ul className="list-disc pl-5 text-[8px]">
          <li>{t("mockJobDescription.k1")}</li>
          <li>{t("mockJobDescription.k2")}</li>
          <li>{t("mockJobDescription.k3")}</li>
          <li>{t("mockJobDescription.k4")}</li>
        </ul>
        <p className="text-[8px]">
          <strong>{t("mockJobDescription.idealCandidate")}</strong>
        </p>
        <ul className="list-disc pl-5 text-[8px]">
          <li>{t("mockJobDescription.i1")}</li>
          <li>{t("mockJobDescription.i2")}</li>
          <li>{t("mockJobDescription.i3")}</li>
          <li>{t("mockJobDescription.i4")}</li>
          <li>{t("mockJobDescription.i5")}</li>
        </ul>
        <div className="flex items-center w-full justify-between gap-2">
          <div className="h-2 mb-1 flex-1 bg-gray-200 rounded-lg"></div>
          <div className="h-2 mb-1 flex-1 bg-gray-200 rounded-lg"></div>
          <div className="h-2 mb-1 flex-1 bg-gray-200 rounded-lg"></div>
        </div>
        <div className="flex items-center w-full justify-between gap-2">
          <div className="h-2 mb-1 flex-1 bg-gray-200 rounded-lg"></div>
          <div className="h-2 mb-1 flex-1 bg-gray-200 rounded-lg"></div>
          <div className="h-2 mb-1 flex-1 bg-gray-200 rounded-lg"></div>
          <div className="h-2 mb-1 flex-1 bg-gray-200 rounded-lg"></div>
          <div className="h-2 mb-1 flex-1 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default MockJobDescription;
