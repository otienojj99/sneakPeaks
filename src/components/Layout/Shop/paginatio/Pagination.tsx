import React, { useMemo } from "react";
import type { Product } from "../../../../types/product.types";
import ProductCard from "../Products/ProductCard";
import PaginationButton from "./PaginationButton";
import PaginationInfo from "./PaginationInfo";

// Helper to generate page numbers with ellipsis

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
  isLoading?: boolean;
  onPageChange: (page: number) => void;
  label?: string;
}
const getPageNumbers = (
  current: number,
  total: number,
): (number | string)[] => {
  if (total <= 1) return [1];
  const delta = 1; // siblings to show
  const range: number[] = [];
  for (let i = 1; i <= total; i++) {
    if (
      i === 1 ||
      i === total ||
      (i >= current - delta && i <= current + delta)
    ) {
      range.push(i);
    }
  }
  const result: (number | string)[] = [];
  let last = 0;
  for (const page of range) {
    if (page - last > 1) result.push("...");
    result.push(page);
    last = page;
  }
  return result;
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  pageSize,
  totalItems,
  isLoading,
  onPageChange,
  label = "Product",
}: PaginationProps) => {
  // Extract pagination meta with safe defaults
  // const currentPage = meta?.current_page ?? 1;
  //   const totalPages = meta?.total ?? 1;
  //   const pageSize = meta?.per_page ?? 10;
  //   const totalItems = meta?.total ?? 0;

  const pageNumbers = useMemo(
    () => getPageNumbers(currentPage, totalPages),
    [currentPage, totalPages],
  );

  // If there's only one page, we might still want to show the info, but hide buttons.
  const showPaginationControls = totalPages > 1;

  const handlePageChange = (page: number) => {
    if (page !== currentPage && page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-4 border-t border-gray-200 px-4 py-3">
      {/* Left side: Pagination info */}
      <PaginationInfo
        currentPage={currentPage}
        pageSize={pageSize}
        totalItems={totalItems}
        label={label}
      />

      {/* Right side: Pagination controls */}
      {showPaginationControls && (
        <nav
          className="isolate inline-flex -space-x-px rounded-md shadow-sm"
          aria-label="Pagination"
        >
          {/* Previous Button */}
          <PaginationButton
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={isLoading || currentPage === 1}
            aria-label="Previous page"
          >
            <span className="sr-only">Previous</span>
            <svg
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                clipRule="evenodd"
              />
            </svg>
          </PaginationButton>

          {/* Page numbers and ellipsis */}
          {pageNumbers.map((page, index) => {
            if (page === "...") {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0"
                >
                  ...
                </span>
              );
            }

            const pageNum = page as number;
            return (
              <PaginationButton
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                active={pageNum === currentPage}
                disabled={isLoading}
                aria-label={`Go to page ${pageNum}`}
                aria-current={pageNum === currentPage ? "page" : undefined}
              >
                {pageNum}
              </PaginationButton>
            );
          })}

          {/* Next Button */}
          <PaginationButton
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={isLoading || currentPage === totalPages}
            aria-label="Next page"
          >
            <span className="sr-only">Next</span>
            <svg
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                clipRule="evenodd"
              />
            </svg>
          </PaginationButton>
        </nav>
      )}
    </div>
  );
};

export default Pagination;
