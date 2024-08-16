"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface PathNameObjProps {
  label: string;
  href?: string;
}

const Breadcrumb = () => {
  const pathname = usePathname();
  const initPathnameSplit = pathname.split("/");
  const pathnameSplit = initPathnameSplit.slice(1).slice(0, 2);
  const pathnameSplitHumanized = pathnameSplit.map((p) =>
    p
      .split("-")
      .map((c) => c.charAt(0).toUpperCase() + c.slice(1))
      .join(" "),
  );

  const pathnameObj: PathNameObjProps[] = pathnameSplitHumanized.map(
    (p, i) => ({
      label: p,
      href: "/" + pathnameSplit.slice(0, i + 1).join("/"),
    }),
  );

  if (initPathnameSplit.length > 3) {
    pathnameObj.push({
      label: "Example",
    });
  } // for the drive embed page

  console.log(pathnameObj);

  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-3">
        {pathnameObj.map((item, index) => (
          <li key={index} className="inline-flex items-center">
            {index !== pathnameObj.length - 1 ? (
              <div className="flex items-center space-x-3 text-ennovate-dark-blue">
                <span className="text-base text-ennovate-dark-blue font-semibold text-xl">
                  <Link href={item.href!}>{item.label}</Link>
                </span>
                <ArrowIcon />
              </div>
            ) : (
              <div className="flex items-center space-x-3 text-ennovate-dark-blue">
                <span className="text-base text-ennovate-dark-blue font-bold text-xl">
                  {item.label}
                </span>
                {pathnameObj.length === 1 && <ArrowIcon />}
              </div>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

const ArrowIcon = () => (
  <svg
    className="w-4 h-4 text-gray-400"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 6 10"
  >
    <path
      stroke="#273f80"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="m1 9 4-4-4-4"
    />
  </svg>
);

export default Breadcrumb;
