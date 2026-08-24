import React, { useState } from "react";
import { motion } from "framer-motion";
import ProductSection from "./ProductSection";
import type { GridColumns } from "../../ProductToolbar/GridSwitcher";
import ShopContents from "./CategoryContent/ShopContents";
import Pagination from "../paginatio/Pagination";
import type { Product } from "../../../../types/product.types";
import DiscountShowcase from "../Products/DiscountDisplayGrid/DiscountShowcase";

type ShopContentProps = {
  products: React.ComponentProps<typeof ProductSection>["products"];
  columns: GridColumns;
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
  loading: boolean;
  onPageChange: (page: number) => void;
  // onAddToCart: (product: Product) => void;
  // onQuickView: (product: Product) => void;
  // basePath?: string;
};

const ShopContent = ({
  products,
  columns,
  currentPage,
  totalPages,
  pageSize,
  totalItems,
  loading,
  onPageChange,
  // onAddToCart,
  // onQuickView,
  // basePath = "/shop",
}: ShopContentProps) => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="
       w-full
  max-w-[1280px]
  mx-0
  pb-0 sm:pb-16 lg:pb-20
      "
    >
      <div className="flex m-0 flex-col lg:flex-row lg:items-start gap-8">
        {/* Sidebar / Categories */}
        <ShopContents
          mobileOpen={mobileSidebarOpen}
          onMobileClose={() => setMobileSidebarOpen(false)}
        />

        {/* Products */}
        <ProductSection
          products={products}
          columns={columns}
          onOpenMobileSidebar={() => setMobileSidebarOpen(true)}
        />
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        pageSize={pageSize}
        totalItems={totalItems}
        isLoading={loading}
        onPageChange={onPageChange}
        label="Product"
      />

      {/* <DiscountShowcase
        products={products}
        onAddToCart={(product) => console.log("Add to cart:", product)}
        onQuickView={(product) => console.log("Quick view:", product)}
        basePath="/shop"
      /> */}
    </motion.div>
  );
};

export default ShopContent;
