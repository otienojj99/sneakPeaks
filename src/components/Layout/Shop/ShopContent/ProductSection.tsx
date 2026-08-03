import React from "react";
import ProductGrid from "../Products/ProductGrid";
import type { GridColumns } from "../../ProductToolbar/GridSwitcher";

interface Props {
  products: any[];
  /** Optional mobile trigger for the sidebar drawer — purely structural, styling only. */
  onOpenMobileSidebar?: () => void;
  columns: GridColumns;
}

const ProductSection = ({ products, onOpenMobileSidebar, columns }: Props) => {
  return (
    <section className="flex-1 min-w-0 flex flex-col gap-8 m-4 px-4 sm:px-6 lg:px-2">
      {/* Mobile-only trigger for the sidebar drawer — remove/replace once
          your real toolbar (with its own Filter button) is wired in. */}
      <button
        onClick={onOpenMobileSidebar}
        className="lg:hidden self-start rounded-full border border-[#E4E0D8] px-4 py-2.5 text-sm font-medium text-[#14151A] bg-[#F5F3EE]"
      >
        Categories & Filters
      </button>

      {/* ============================================================ */}
      {/* PRODUCT SECTION SLOT — intentionally empty.                  */}
      {/* Future components (ProductToolbar, CategoryCollectionBanner, */}
      {/* ProductGrid, Pagination, etc.) get rendered here as          */}
      <ProductGrid products={products} columns={columns} />
      {/* children/props. This container just reserves generous,      */}
      {/* dynamic-grid-ready space at the remaining width.             */}
      {/* ============================================================ */}
      <div className="min-h-[480px]" />
    </section>
  );
};

export default ProductSection;
