"use client";

import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";
import Link from "next/link";

const UnderConstruction = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="text-center">
        <Image
          src="/ennovate/ennovate-sleep.gif"
          alt="Under Construction"
          width={350}
          height={350}
        />
        <h1 className="mt-4 text-3xl font-extrabold text-ennovate-dark-blue">
          Coming soon!
        </h1>
        <p className="mt-2 text-lg font-semibold text-ennovate-dark-blue">
          This page is still under construction
        </p>
        <Link href={isAuthenticated ? "/admin" : "/"}>
          <button className="py-2 px-4 text-lg bg-ennovate-yellow mt-4 text-ennovate-dark-blue font-bold rounded-lg">
            Back to {isAuthenticated ? "dashboard" : "home"}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default UnderConstruction;
