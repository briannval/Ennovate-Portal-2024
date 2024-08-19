"use client";

import { useEffect, useState } from "react";

const useBreakpoint = () => {
  const [breakpoint, setBreakpoint] = useState<string>(
    calcBreakpoint(window.innerWidth)
  );

  useEffect(() => {
    const handleResize = () => {
      setBreakpoint(calcBreakpoint(window.innerWidth));
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return breakpoint;
};

const calcBreakpoint = (w: number) => {
  if (w >= 1536) return "2xl";
  if (w >= 1280) return "xl";
  if (w >= 1024) return "lg";
  if (w >= 768) return "md";
  return "sm";
};

export default useBreakpoint;
