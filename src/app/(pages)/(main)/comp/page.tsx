"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const FINAL_COMP_DATE = new Date("2025-05-24T00:00:00-08:00");
const FINAL_COMP_DATE_STR = "May 2  4th";

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="timer flex-1">
      <div className="rounded-xl border-2 border-ennovate-dark-blue flex items-center justify-center flex-col gap-0 aspect-square p-2 sm:p-4 md:p-8 h-64 w-64">
        <h3 className="countdown-element font-manrope font-extrabold text-7xl md:text-9xl text-ennovate-dark-blue text-center">
          {value}
        </h3>
        <p className="text-sm md:text-xl capitalize font-normal text-ennovate-dark-blue text-center w-full">
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
      <div className="flex flex-col items-center justify-center w-full max-w-screen-sm gap-1.5 lg:gap-4 lg:flex-row count-down-main lg:max-w-screen-xl pt-16 lg:pt-0">
        <TimeUnit value={days} label="DAYS" />
        <TimeUnit value={hours} label="HOURS" />
        <TimeUnit value={minutes} label="MINUTES" />
        <TimeUnit value={seconds} label="SECONDS" />
      </div>
      <h3 className="text-center font-bold text-xl md:text-2xl lg:text-3xl text-ennovate-dark-blue my-4">
        to final competition on{" "}
        <span className="font-extrabold">{FINAL_COMP_DATE_STR}</span>!
      </h3>
      <div className="flex flex-col items-center justify-center mt-2">
        <Link href="/pdf/final_comp_rubric.pdf" target="blank">
          <button className="text-ennovate-dark-blue text-xl md:text-2xl font-bold bg-ennovate-yellow rounded-3xl py-2 px-6 text-center mb-12 mx-auto">
            View Rubric
          </button>
        </Link>
      </div>

    </div>
  );
}
