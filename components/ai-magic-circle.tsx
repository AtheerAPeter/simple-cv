"use client";
import GradientWrapper from "./GradientWrapper";

export function AiMagicCircle() {
  return (
    <div>
      <GradientWrapper className="relative w-20 h-20 rounded-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-2 rounded-full bg-white flex items-center justify-center backdrop-blur-sm">
          <span className="text-xs text-gray-500 font-bold">AI Magic</span>
        </div>
      </GradientWrapper>

      <style jsx>{`
        @keyframes pulse {
          0% {
            transform: scale(1);
          }
          100% {
            transform: scale(1.1);
          }
        }
      `}</style>
    </div>
  );
}
