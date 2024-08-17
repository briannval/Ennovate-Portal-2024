"use client";

import { ADMIN_RESOURCES_ACTIONS } from "@/constants/admin-resources";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Resources() {
  const [activeTab, setActiveTab] = useState(1);

  return (
    <div className="md:flex mx-8 mt-12">
      <ul className="flex-column space-y-4 text-md font-bold text-ennovate-dark-blue md:me-4 mb-4 md:mb-0">
        {ADMIN_RESOURCES_ACTIONS.slice(1, 5).map((action, index) => (
          <li key={index + 1}>
            <button
              onClick={() => setActiveTab(index + 1)}
              className={`px-6 py-3 rounded-lg text-left w-full whitespace-nowrap ${
                activeTab === index + 1
                  ? "text-white bg-ennovate-main"
                  : "hover:text-gray-900 bg-gray-50 hover:bg-gray-100"
              }`}
            >
              {action.heading.replace("Previous ", "")}
            </button>
          </li>
        ))}
      </ul>
      <div className="p-10 bg-gray-50 text-medium text-ennovate-dark-blue rounded-lg w-full">
        <h3 className="text-5xl font-extrabold text-ennovate-dark-blue mb-2">
          {ADMIN_RESOURCES_ACTIONS[activeTab].heading}
        </h3>
        <p className="mb-2 font-semibold">
          {ADMIN_RESOURCES_ACTIONS[activeTab].subheading}
        </p>
        <div className="relative w-full h-96 rounded-lg overflow-hidden">
          <Image
            src={ADMIN_RESOURCES_ACTIONS[activeTab].image}
            alt={ADMIN_RESOURCES_ACTIONS[activeTab].heading}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
        <Link href={ADMIN_RESOURCES_ACTIONS[activeTab].viewHref}>
          <button className="text-lg bg-ennovate-yellow py-2 px-4 font-bold mt-4 rounded-lg">
            View More
          </button>
        </Link>
      </div>
    </div>
  );
}
