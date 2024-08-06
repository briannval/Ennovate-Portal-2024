"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Pagination = ({ totalPages }: { totalPages: number }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const { replace } = useRouter();

  const createPageUrl = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex">
      <button
        onClick={() => createPageUrl(currentPage - 1)}
        disabled={currentPage === 1 || totalPages === 0}
        className="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-ennovate-main border border-gray-300 rounded-lg hover:text-ennovate-gray"
      >
        Previous
      </button>

      <button
        onClick={() => createPageUrl(currentPage + 1)}
        disabled={currentPage === totalPages || totalPages === 0}
        className="flex items-center justify-center px-4 h-10 ms-3 text-base font-medium text-white bg-ennovate-main border border-gray-300 rounded-lg hover:text-ennovate-gray"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
