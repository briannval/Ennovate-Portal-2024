"use client";

import { useEffect, useState } from "react";

const FINAL_COMP_DATE = new Date("2025-01-25T00:00:00-08:00");

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="timer flex-1">
      <div className="rounded-xl border-2 border-ennovate-dark-blue flex items-center justify-center flex-col gap-0 aspect-square p-2 sm:p-4 md:p-8 h-64 w-64">
        <h3 className="countdown-element font-manrope font-extrabold text-6xl sm:text-7xl md:text-9xl text-ennovate-dark-blue text-center">
          {value}
        </h3>
        <p className="text-xs sm:text-sm md:text-xl capitalize font-normal text-ennovate-dark-blue text-center w-full">
          {label}
        </p>
      </div>
    </div>
  );
}

export default function Comp() {
  const [timeDifference, setTimeDifference] = useState<number>(0);

  useEffect(() => {
    const intervalId: NodeJS.Timeout = setInterval(() => {
      const currDate = new Date();
      const diff = FINAL_COMP_DATE.getTime() - currDate.getTime();
      setTimeDifference(diff);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const diffInSeconds = Math.floor(timeDifference / 1000);
  const days = Math.floor(diffInSeconds / (3600 * 24));
  const hours = Math.floor((diffInSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((diffInSeconds % 3600) / 60);
  const seconds = Math.floor(diffInSeconds % 60);

  return (
    <div className="flex flex-col">
      <div className="flex flex-col items-center justify-center w-full max-w-screen-sm gap-1.5 md:gap-4 md:flex-row count-down-main md:max-w-screen-xl">
        <TimeUnit value={days} label="DAYS" />
        <TimeUnit value={hours} label="HOURS" />
        <TimeUnit value={minutes} label="MINUTES" />
        <TimeUnit value={seconds} label="SECONDS" />
      </div>
    </div>
  );
}
