import React, { useState } from "react";
import { motion } from "framer-motion";
import ProductCount from "./ProductCount";
import FilterButton from "./FilterButton";
import SortDropdown from "./SortDropdown";
import GridSwitcher from "./GridSwitcher";
import type { GridColumns } from "./GridSwitcher";

interface Props {
  productCount?: number;
  activeFilterCount?: number;
  onOpenFilters?: () => void;
  sortValue?: string;
  onSortChange?: (value: string) => void;
  gridColumns?: GridColumns;
  onGridChange?: (columns: GridColumns) => void;
}

const ProductToolbar = ({
  productCount = 245,
  activeFilterCount = 0,
  onOpenFilters,
  sortValue = "Featured",
  onSortChange,
  gridColumns = 3,
  onGridChange,
}: Props) => {
  const [internalSort, setInternalSort] = useState(sortValue);
  const [internalGrid, setInternalGrid] = useState<GridColumns>(gridColumns);

  const handleSortChange = (value: string) => {
    setInternalSort(value);
    onSortChange?.(value);
  };

  const handleGridChange = (cols: GridColumns) => {
    setInternalGrid(cols);
    onGridChange?.(cols);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="w-full border-b border-[#E4E0D8] bg-[#F5F3EE]"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-4 flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="hidden sm:block">
          <ProductCount count={productCount} />
        </div>

        <div className="flex sm:flex-1 sm:justify-center items-center gap-3 order-2 sm:order-1">
          <FilterButton
            onClick={onOpenFilters}
            activeCount={activeFilterCount}
          />
          <SortDropdown value={internalSort} onChange={handleSortChange} />
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-4 order-1 sm:order-2">
          <div className="sm:hidden">
            <ProductCount count={productCount} />
          </div>
          <GridSwitcher value={internalGrid} onChange={handleGridChange} />
        </div>
      </div>
    </motion.div>
  );
};

export default ProductToolbar;
