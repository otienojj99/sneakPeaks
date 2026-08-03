import React, { useState } from "react";
import { motion } from "framer-motion";
import ProductSection from "./ProductSection";
import type { GridColumns } from "../../ProductToolbar/GridSwitcher";
import ShopContents from "./CategoryContent/ShopContents";

type ShopContentProps = {
  products: React.ComponentProps<typeof ProductSection>["products"];
  columns: GridColumns;
};

const ShopContent = ({ products, columns }: ShopContentProps) => {
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
    </motion.div>
  );
};

export default ShopContent;
