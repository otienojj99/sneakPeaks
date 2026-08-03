import React, { useState } from "react";
import { motion } from "framer-motion";
import ShopSidebar from "../ShopSidebar";
import ProductSection from "../ProductSection";
import SidebarFilters from "./SidebarFilters";
import type {
  Category,
  ColorOption,
  SizeOption,
  SidebarFilterChange,
} from "../../../../../types/category.types";

/**
 * Example data — replace with your real category tree (from your
 * Category API, already includes `children`) and available color/size
 * options for the current catalogue/category.
 */
const exampleCategories: Category[] = [
  {
    id: 1,
    name: "Sneakers",
    slug: "sneakers",
    description: null,
    parent_id: null,
    is_active: true,
    sort_order: 0,
    image: null,
    full_path: "sneakers",
    created_at: "",
    updated_at: "",
    children: [
      {
        id: 11,
        name: "Low Top",
        slug: "low-top",
        description: null,
        parent_id: 1,
        is_active: true,
        sort_order: 0,
        image: null,
        full_path: "sneakers/low-top",
        created_at: "",
        updated_at: "",
      },
      {
        id: 12,
        name: "High Top",
        slug: "high-top",
        description: null,
        parent_id: 1,
        is_active: true,
        sort_order: 1,
        image: null,
        full_path: "sneakers/high-top",
        created_at: "",
        updated_at: "",
      },
      {
        id: 13,
        name: "Running Sneakers",
        slug: "running-sneakers",
        description: null,
        parent_id: 1,
        is_active: true,
        sort_order: 2,
        image: null,
        full_path: "sneakers/running-sneakers",
        created_at: "",
        updated_at: "",
      },
      {
        id: 14,
        name: "Lifestyle Sneakers",
        slug: "lifestyle-sneakers",
        description: null,
        parent_id: 1,
        is_active: true,
        sort_order: 3,
        image: null,
        full_path: "sneakers/lifestyle-sneakers",
        created_at: "",
        updated_at: "",
      },
    ],
  },
  {
    id: 2,
    name: "Sports",
    slug: "sports",
    description: null,
    parent_id: null,
    is_active: true,
    sort_order: 1,
    image: null,
    full_path: "sports",
    created_at: "",
    updated_at: "",
    children: [
      {
        id: 21,
        name: "Training",
        slug: "training",
        description: null,
        parent_id: 2,
        is_active: true,
        sort_order: 0,
        image: null,
        full_path: "sports/training",
        created_at: "",
        updated_at: "",
      },
      {
        id: 22,
        name: "Basketball",
        slug: "basketball",
        description: null,
        parent_id: 2,
        is_active: true,
        sort_order: 1,
        image: null,
        full_path: "sports/basketball",
        created_at: "",
        updated_at: "",
      },
    ],
  },
  {
    id: 3,
    name: "Casual",
    slug: "casual",
    description: null,
    parent_id: null,
    is_active: true,
    sort_order: 2,
    image: null,
    full_path: "casual",
    created_at: "",
    updated_at: "",
    children: [
      {
        id: 31,
        name: "Slip-Ons",
        slug: "slip-ons",
        description: null,
        parent_id: 3,
        is_active: true,
        sort_order: 0,
        image: null,
        full_path: "casual/slip-ons",
        created_at: "",
        updated_at: "",
      },
    ],
  },
  {
    id: 4,
    name: "School",
    slug: "school",
    description: null,
    parent_id: null,
    is_active: true,
    sort_order: 3,
    image: null,
    full_path: "school",
    created_at: "",
    updated_at: "",
  },
  {
    id: 5,
    name: "Sandals",
    slug: "sandals",
    description: null,
    parent_id: null,
    is_active: true,
    sort_order: 4,
    image: null,
    full_path: "sandals",
    created_at: "",
    updated_at: "",
  },
  {
    id: 6,
    name: "Boots",
    slug: "boots",
    description: null,
    parent_id: null,
    is_active: true,
    sort_order: 5,
    image: null,
    full_path: "boots",
    created_at: "",
    updated_at: "",
    children: [
      {
        id: 61,
        name: "Chelsea Boots",
        slug: "chelsea-boots",
        description: null,
        parent_id: 6,
        is_active: true,
        sort_order: 0,
        image: null,
        full_path: "boots/chelsea-boots",
        created_at: "",
        updated_at: "",
      },
      {
        id: 62,
        name: "Combat Boots",
        slug: "combat-boots",
        description: null,
        parent_id: 6,
        is_active: true,
        sort_order: 1,
        image: null,
        full_path: "boots/combat-boots",
        created_at: "",
        updated_at: "",
      },
    ],
  },
  {
    id: 7,
    name: "Slides",
    slug: "slides",
    description: null,
    parent_id: null,
    is_active: true,
    sort_order: 6,
    image: null,
    full_path: "slides",
    created_at: "",
    updated_at: "",
  },
  {
    id: 8,
    name: "Loafers",
    slug: "loafers",
    description: null,
    parent_id: null,
    is_active: true,
    sort_order: 7,
    image: null,
    full_path: "loafers",
    created_at: "",
    updated_at: "",
  },
];

const exampleColors: ColorOption[] = [
  { id: "black", label: "Black", hex: "#14151A" },
  { id: "white", label: "White", hex: "#F5F3EE" },
  { id: "brown", label: "Brown", hex: "#7A5230" },
  { id: "grey", label: "Grey", hex: "#8B8681" },
  { id: "blue", label: "Blue", hex: "#2E4A7D" },
  { id: "red", label: "Red", hex: "#B5342A" },
];

const exampleSizes: SizeOption[] = [
  { id: "36", label: "36" },
  { id: "37", label: "37" },
  { id: "38", label: "38" },
  { id: "39", label: "39" },
  { id: "40", label: "40" },
  { id: "41", label: "41" },
  { id: "42", label: "42" },
  { id: "43", label: "43" },
  { id: "44", label: "44" },
  { id: "45", label: "45", available: false },
  { id: "46", label: "46", available: false },
];

/**
 * ShopContent
 * Pure structural layout for the Shop page — no product cards,
 * pagination, or API logic live in ShopContent/ShopSidebar/ProductSection
 * themselves. A responsive two-column foundation: sidebar (280-320px,
 * sticky) + product section (remaining width), 32px gap, max-w-[1280px],
 * centered, generous vertical spacing.
 *
 * Desktop/tablet: sidebar + product section side by side.
 * Mobile: sidebar becomes a slide-out drawer (state owned here); product
 * section takes full width.
 *
 * The sidebar's actual content — Categories/Color/Size/Price filtering —
 * lives in `SidebarFilters/` and is passed in as `ShopSidebar`'s children
 * here, without any changes to ShopSidebar's own container, positioning,
 * or drawer behavior.
 *
 * Usage:
 *   import ShopContent from "@/components/Shop/ShopContent/ShopContent";
 *   <ShopContent />
 *   // Later, without touching this file's layout structure:
 *   //  - swap exampleCategories/exampleColors/exampleSizes for real data
 *   //  - render ProductToolbar + ProductGrid + Pagination inside
 *   //    ProductSection's slot
 */
export default function ShopContents() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const handleFilterChange = (filters: SidebarFilterChange) => {
    // Wire this to your real product-fetching logic, e.g.:
    // setProductFilters((prev) => ({ ...prev, ...filters }));
    console.log("Filters changed:", filters);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full lg:w-[320px] flex-shrink-0 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-0 pb-12 sm:pb-16 lg:pb-20"
    >
      <div className="flex flex-col lg:flex-row lg:items-start gap-8">
        <ShopSidebar
          mobileOpen={mobileSidebarOpen}
          onMobileClose={() => setMobileSidebarOpen(false)}
        >
          <SidebarFilters
            categories={exampleCategories}
            colors={exampleColors}
            sizes={exampleSizes}
            priceBounds={{ min: 2500, max: 15000 }}
            currency="KSh"
            onChange={handleFilterChange}
          />
        </ShopSidebar>
        {/* <ProductSection
          onOpenMobileSidebar={() => setMobileSidebarOpen(true)}
        /> */}
      </div>
    </motion.div>
  );
}
