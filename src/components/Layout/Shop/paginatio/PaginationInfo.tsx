import React, { useMemo } from "react";

interface PaginationInfoProps {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  /** Singular label, e.g. "Item" – will be pluralized automatically */
  label?: string;
  /** Override the entire label rendering, e.g. (start, end, total) => string */
  renderLabel?: (start: number, end: number, total: number) => string;
  /** Show "0 - 0 of 0" when totalItems === 0, or a custom empty message */
  emptyMessage?: string;
}

const PaginationInfo: React.FC<PaginationInfoProps> = ({
  currentPage,
  pageSize,
  totalItems,
  label = "Item",
  renderLabel,
  emptyMessage = `No ${label}s found`,
}) => {
  // Clamp currentPage to valid range (1..maxPage)
  const maxPage = Math.max(1, Math.ceil(totalItems / pageSize));
  const safePage = Math.min(Math.max(currentPage, 1), maxPage);

  const { start, end } = useMemo(() => {
    if (totalItems === 0) {
      return { start: 0, end: 0 };
    }
    const startItem = (safePage - 1) * pageSize + 1;
    const endItem = Math.min(safePage * pageSize, totalItems);
    return { start: startItem, end: endItem };
  }, [safePage, pageSize, totalItems]);

  // Determine label with pluralisation
  const displayLabel = totalItems === 1 ? label : `${label}s`;

  // Custom renderer takes precedence
  if (renderLabel) {
    return (
      <div className="text-sm text-gray-600">
        {renderLabel(start, end, totalItems)}
      </div>
    );
  }

  if (totalItems === 0) {
    return <div className="text-sm text-gray-600">{emptyMessage}</div>;
  }

  // Format numbers with thousand separators (optional)
  const formatter = new Intl.NumberFormat(); // uses user's locale
  const formattedStart = formatter.format(start);
  const formattedEnd = formatter.format(end);
  const formattedTotal = formatter.format(totalItems);

  return (
    <div
      className="text-sm text-gray-600"
      aria-live="polite"
      aria-atomic="true"
    >
      Showing {formattedStart} – {formattedEnd} of {formattedTotal}{" "}
      {displayLabel}
    </div>
  );
};

export default PaginationInfo;
