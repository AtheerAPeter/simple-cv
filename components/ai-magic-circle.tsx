"use client";

import { useEffect, useState } from "react";

export function AiMagicCircle() {
  const [hue, setHue] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setHue((prevHue) => (prevHue + 1) % 300);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div
        className="relative w-20 h-20 rounded-full flex items-center justify-center overflow-hidden"
        style={{
          background: `linear-gradient(${hue}deg, hsl(${hue}, 70%, 75%), hsl(${
            (hue + 60) % 300
          }, 70%, 75%), hsl(${(hue + 120) % 300}, 70%, 75%), hsl(${
            (hue + 180) % 300
          }, 70%, 75%), hsl(${(hue + 240) % 300}, 70%, 75%), hsl(${
            (hue + 300) % 300
          }, 70%, 75%))`,
          animation: "pulse 2s infinite alternate",
        }}
      >
        <div className="absolute inset-2 rounded-full bg-white flex items-center justify-center backdrop-blur-sm">
          <span className="text-xs text-gray-500 font-bold">AI Magic</span>
        </div>
      </div>
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
