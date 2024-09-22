import MockCV from "./MockCV";
import MockJobDescription from "./MockJobDescription";
import ArrowDownSvgrepoCom from "../ArrowDownSVG";
import ArrowRightSvgrepoCom from "../ArrowRightSVG";
import { AiMagicCircle } from "../ai-magic-circle";

const MockSteps = () => {
  return (
    <div className="flex-col items-center hidden lg:flex">
      <div className="flex flex-col items-center relative">
        <MockJobDescription />
        <ArrowDownSvgrepoCom />
      </div>
      <div className="flex items-center justify-evenly gap-4">
        <MockCV />
        <ArrowRightSvgrepoCom />
        <AiMagicCircle />
        <ArrowRightSvgrepoCom />
        <MockCV updated />
      </div>
    </div>
  );
};

export default MockSteps;
