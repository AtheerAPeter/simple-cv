"use client";
import MockCV from "./MockCV";
import MockJobDescription from "./MockJobDescription";
import ArrowDownSvgrepoCom from "../ArrowDownSVG";
import ArrowRightSvgrepoCom from "../ArrowRightSVG";
import { AiMagicCircle } from "../ai-magic-circle";
import GradientWrapper from "../GradientWrapper";
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
        <ArrowDownSvgrepoCom />
      </div>
      <div className="flex items-center justify-evenly gap-2">
        <div className="flex flex-col items-center justify-center">
          <p className="text-center text-sm mb-2">
            {t("mockSection.createYourCv")}
          </p>
          <MockCV />
        </div>
        <ArrowRightSvgrepoCom />
        <AiMagicCircle />
        <ArrowRightSvgrepoCom />
        <div className="flex flex-col items-center justify-center">
          <p className="text-center text-sm mb-2">
            {t("mockSection.updatedCv")}
          </p>
          <GradientWrapper className="p-2 rounded-lg flex items-center justify-center overflow-hidden">
            <MockCV updated />
          </GradientWrapper>
        </div>
      </div>
    </div>
  );
};

export default MockSteps;
