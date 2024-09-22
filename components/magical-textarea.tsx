"use client";
import { useEffect, useState } from "react";
import GradientWrapper from "./GradientWrapper";

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export function MagicalTextarea(props: Props) {
  const [hue, setHue] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setHue((prevHue) => (prevHue + 1) % 360);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center w-full bg-white">
      <GradientWrapper className="relative w-full flex items-center justify-center p-2 rounded-lg">
        <textarea
          className={`
            w-full p-4 rounded-lg bg-white
            focus:outline-none resize-none h-40
            `}
          {...props}
        />
      </GradientWrapper>
    </div>
  );
}
