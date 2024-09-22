import React, { useEffect, useState } from "react";

interface Props {
  className?: string;
}

const GradientWrapper = ({
  children,
  className,
}: React.PropsWithChildren<Props>) => {
  const [hue, setHue] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setHue((prevHue) => (prevHue + 1) % 300);
    }, 50);

    return () => clearInterval(interval);
  }, []);
  return (
    <div
      className={`relative ${className}`}
      style={{
        background: `linear-gradient(${hue}deg, hsl(${hue}, 70%, 75%), hsl(${
          (hue + 60) % 300
        }, 70%, 75%), hsl(${(hue + 120) % 300}, 70%, 75%), hsl(${
          (hue + 180) % 300
        }, 70%, 75%), hsl(${(hue + 240) % 300}, 70%, 75%), hsl(${
          (hue + 300) % 300
        }, 70%, 75%))`,
      }}
    >
      {children}
    </div>
  );
};

export default GradientWrapper;
