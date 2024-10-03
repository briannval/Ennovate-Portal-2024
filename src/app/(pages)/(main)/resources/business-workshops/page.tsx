"use client";

import Loading from "@/components/loading/loading";
import { useEffect, useState } from "react";
import axios from "axios";
import PageCenteringWrapper from "@/wrappers/pageCenteringWrapper";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { IBusinessWorkshop } from "@/models/BusinessWorkshop";

export default function BusinessWorkshops() {
  const [businessWorkshops, setBusinessWorkshops] = useState<IBusinessWorkshop[] | null>(null);

  useEffect(() => {
    const initializeData = async () => {
      const workshopsRes = await axios.post("/api/business-workshops/read");
      setBusinessWorkshops(workshopsRes.data);
    };

    initializeData();
  }, []);

  if (!businessWorkshops) {
    return (
      <PageCenteringWrapper>
        <Loading />
      </PageCenteringWrapper>
    );
  }

  const { isAuthenticated } = useAuth();

  const TableRow = ({ businessWorkshop }: { businessWorkshop: IBusinessWorkshop }) => {
    return (
      <tr className="bg-white border-b">
        <th
          scope="row"
          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
        >
          {businessWorkshop.name}
        </th>
        <td className="px-6 py-4">{businessWorkshop.month}</td>
        <td className="px-6 py-4">
          <Link href={businessWorkshop.slides} target="_blank" className="font-medium text-ennovate-main hover:underline">
            View
          </Link>
        </td>
        <td className="px-6 py-4">
          <Link href={businessWorkshop.worksheet} target="_blank" className="font-medium text-ennovate-main hover:underline">
            View
          </Link>
        </td>
        {isAuthenticated &&
          <>
            <td className="px-6 py-4">
              <button className="font-medium text-ennovate-main hover:underline mr-4">
                Edit
              </button>
            </td>
            <td className="px-6 py-4">
              <button className="font-medium text-red-600 hover:underline mr-4">
                Delete
              </button>
            </td>
          </>}
      </tr>
    );
  };


  return (
    <div className="mx-8 mt-8">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-md text-left text-gray-500">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Month
              </th>
              <th scope="col" className="px-6 py-3">
                Slides
              </th>
              <th scope="col" className="px-6 py-3">
                Worksheet
              </th>
              {isAuthenticated && <th scope="col" className="px-6 py-3" colSpan={2}>
                Actions
              </th>}
            </tr>
          </thead>
          <tbody>
            {businessWorkshops.map((workshop, index) => (
              <TableRow key={index} businessWorkshop={workshop} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
