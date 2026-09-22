import AnnouncementBar from "../../../components/Layout/AnnouncementBar/AnnouncementBar";
import ShopHeader from "../../../components/Layout/Header/ShopHeader";
import Footer from "../../../components/Footer/Footer";
import ShopHero from "../../../components/Layout/ShopHero/ShopHero";
import CartDrawer from "../../../components/Layout/Shop/CartDtower/CartDrawer";
import ShopTabs from "../../../components/Layout/ShopTabs/ShopTabs";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import ProductToolbar from "../../../components/Layout/ProductToolbar/ProductToolbar";
import type { GridColumns } from "../../../components/Layout/ProductToolbar/GridSwitcher";
import CategoryCollectionBanner from "../../../components/Layout/CategoryCollectionBanner/CategoryCollectionBanner";
import ShopContent from "../../../components/Layout/Shop/ShopContent/ShopContent";
import ProductGrid from "../../../components/Layout/Shop/Products/ProductGrid";
import { useProducts } from "../../../hooks/products/useProducts";
import YouMightAlsoLike from "../../../components/Layout/Shop/MightLikeProducts/YouMightAlsoLike";
import DiscountShowcase from "../../../components/Layout/Shop/Products/DiscountDisplayGrid/DiscountShowcase";
import LatestArrivals from "../../../components/Layout/Shop/Products/LatestProductsSetion/LatestArrivals";
import LifestyleStories1 from "../../../components/Layout/Shop/LifestyleStories/LifestyleStories1";
import { lifestyleStories } from "../../../components/Layout/Shop/LifestyleStories/lifestyleStories";
import { useTabFilters } from "../../../hooks/collections/useTabFilters";

const Shop = () => {
  const [gridColumns, setGridColumns] = useState<GridColumns>(3);
  const [sort, setSort] = useState("Featured");
  const { activeTab, filters, applyTab, updateFilter } = useTabFilters("all");
  // Temporary/products placeholder to fix missing identifier error.
  // Replace with real product data or import as needed.
  const {
    products,
    meta,
    loading: isLoading,
    error,
    links,
    // filters,
    setFilters: setProductFilters,
    resetFilters,
    goToPage,
    refetch,
    selectedIds,
    toggleSelected,
    toggleSelectAll,
    clearSelection,
    isAllSelected,
    executeBulkAction,
    bulkLoading,
  } = useProducts(filters);

  useEffect(() => {
    setProductFilters(filters);
  }, [filters, setProductFilters]);

  const isSupportedTab =
    activeTab === "all" ||
    activeTab === "new-arrivals" ||
    activeTab === "best-sellers";

  const visibleProducts = !isSupportedTab
    ? []
    : activeTab === "new-arrivals"
      ? products.filter((product) => product.is_new)
      : activeTab === "best-sellers"
        ? products.filter((product) => product.sales_count > 0)
        : products;

  const handleTabChange = (id: string) => {
    applyTab(id as any);

    console.log("Tab changed:", id);
  };

  useEffect(() => {
    console.log(`🔄 Tab changed to: ${activeTab}`);
    console.log(`📋 Filters applied:`, filters);
    console.log(`📦 Products count: ${visibleProducts.length}`);
    if (visibleProducts.length > 0) {
      console.log(
        `📌 First 3 product names:`,
        visibleProducts.slice(0, 3).map((p) => p.name),
      );
    } else {
      console.log(`⚠️ No products found for this tab.`);
    }
  }, [activeTab, filters, visibleProducts]);
  return (
    <>
      <AnnouncementBar />
      <ShopHeader />
      <ShopHero />
      <ShopTabs onChange={handleTabChange} />

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* <ProductGrid collection={collection} /> */}
        </motion.div>
      </AnimatePresence>

      <ProductToolbar
        productCount={visibleProducts.length}
        gridColumns={gridColumns}
        onGridChange={setGridColumns}
        sortValue={sort}
        onSortChange={setSort}
        onOpenFilters={() => setFilterDrawerOpen(true)}
      />

      {/* Cart drawer mounted at top-level so `useCartDrawerStore` works across app */}
      <CartDrawer />

      {/* <CategoryCollectionBanner /> */}
      <ShopContent
        products={visibleProducts}
        columns={gridColumns}
        currentPage={meta?.current_page ?? 1}
        totalPages={meta?.last_page ?? 1}
        pageSize={meta?.per_page ?? 10}
        totalItems={meta?.total ?? 0}
        loading={isLoading}
        onPageChange={goToPage}
        // onAddToCart={onAddToCart}

        // basePath="/shop"
      />

      <DiscountShowcase
        products={visibleProducts}
        onAddToCart={(product) => console.log("Add to cart:", product)}
        onQuickView={(product) => console.log("Quick view:", product)}
        basePath="/shop"
      />
      <YouMightAlsoLike products={visibleProducts} />
      <LatestArrivals
        products={visibleProducts}
        onAddToCart={(product) => console.log("Add to cart:", product)}
      />
      <LifestyleStories1 stories={lifestyleStories} />
      <Footer />
    </>
  );
};

export default Shop;
