"use client";
import MockCV from "./MockCV";
import MockJobDescription from "./MockJobDescription";
import ArrowDownSvgrepoCom from "../ArrowDownSVG";
import ArrowRightSvgrepoCom from "../ArrowRightSVG";
import { AiMagicCircle } from "../ai-magic-circle";
import GradientWrapper from "../GradientWrapper";

const MockSteps = () => {
  return (
    <div className="flex-col items-center hidden lg:flex">
      <div className="flex flex-col items-center relative w-full">
        <MockJobDescription />
        <ArrowDownSvgrepoCom />
      </div>
      <div className="flex items-center justify-evenly gap-2">
        <MockCV />
        <ArrowRightSvgrepoCom />
        <AiMagicCircle />
        <ArrowRightSvgrepoCom />
        <GradientWrapper className="p-2 rounded-lg flex items-center justify-center overflow-hidden">
          <MockCV updated />
        </GradientWrapper>
      </div>
    </div>
  );
};

export default MockSteps;
