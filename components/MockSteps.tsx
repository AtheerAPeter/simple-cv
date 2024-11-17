"use client";
import MockCV from "@/components/MockCV";
import MockJobDescription from "@/components/MockJobDescription";
import { AiMagicCircle } from "@/components/ai-magic-circle";
import { useTranslations } from "next-intl";

const MockSteps = () => {
  const t = useTranslations("home");
  return (
    <div className="flex-col items-center flex">
      <div className="flex flex-col items-center relative w-full">
        <div className="flex flex-col items-center justify-center w-full">
          <p className="text-center text-sm mb-2">
            {t("mockSection.copyPasteJobDescription")}
          </p>
          <MockJobDescription />
        </div>
        <div className="w-2 h-[100px] bg-gradient-to-b from-blue-400 via-purple-400 to-pink-400 opacity-80 absolute -bottom-[100px] -z-10 animate-pulse"></div>
      </div>
      <div className="flex items-center justify-evenly gap-20">
        <div className="h-2 w-[400px] bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 opacity-80 absolute -z-10 animate-pulse"></div>
        <div className="flex flex-col items-center justify-center">
          <p className="text-center text-sm mb-2">
            {t("mockSection.createYourCv")}
          </p>
          <MockCV />
        </div>
        <AiMagicCircle />
        <div className="flex flex-col items-center justify-center">
          <p className="text-center text-sm mb-2">
            {t("mockSection.updatedCv")}
          </p>

          <MockCV updated />
        </div>
      </div>
    </div>
  );
};

export default MockSteps;
