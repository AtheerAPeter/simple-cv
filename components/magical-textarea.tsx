"use client";
import { useEffect, useState } from "react";

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
      <div
        className="relative w-full flex items-center justify-center p-1 rounded-lg"
        style={{
          background: `linear-gradient(${hue}deg, hsl(${hue}, 100%, 70%), hsl(${
            (hue + 60) % 360
          }, 100%, 70%), hsl(${(hue + 120) % 360}, 100%, 70%), hsl(${
            (hue + 180) % 360
          }, 100%, 70%), hsl(${(hue + 240) % 360}, 100%, 70%), hsl(${
            (hue + 300) % 360
          }, 100%, 70%))`,
        }}
      >
        <textarea
          className={`
            w-full p-4 rounded-lg bg-white
            focus:outline-none resize-none h-40
            `}
          {...props}
        />
      </div>
    </div>
  );
}
