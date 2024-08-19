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

  const hasNoPrevious = currentPage === 1 || totalPages === 0;

  const hasNoNext = currentPage === totalPages || totalPages === 0;

  return (
    <div className="flex mb-10">
      <button
        onClick={() => createPageUrl(currentPage - 1)}
        disabled={hasNoPrevious}
        style={{ opacity: hasNoPrevious ? 0.7 : 1 }}
        className="flex items-center justify-center px-4 py-2 text-lg font-bold text-white bg-ennovate-main border border-gray-300 rounded-lg hover:bg-ennovate-dark-blue"
      >
        Previous
      </button>

      <button
        onClick={() => createPageUrl(currentPage + 1)}
        disabled={hasNoNext}
        style={{ opacity: hasNoNext ? 0.7 : 1 }}
        className="flex items-center justify-center px-4 py-2  ms-3 text-lg font-bold text-white bg-ennovate-main border border-gray-300 rounded-lg hover:bg-ennovate-dark-blue"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
