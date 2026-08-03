export interface ShopHeroCampaign {
  id: string;
  label: string;
  headlineLines: string[];
  description: string;
  /** Real photography placeholder — drop your sourced image into this path. */
  imageSrc: string;
  imageAlt: string;
  /** Oversized low-opacity background word for this campaign */
  backgroundWord: string;
}

export const campaigns: ShopHeroCampaign[] = [
  {
    id: "urban",
    label: "Curated Collection — Urban",
    headlineLines: ["Built For", "The Streets."],
    description: "Minimal design. Everyday confidence. Curated footwear for modern city life.",
    imageSrc: "/assets/lifestyle/campaign-cinemati.png",
    imageAlt: "Person confidently walking through a modern city wearing premium sneakers",
    backgroundWord: "MOVE",
  },
  {
    id: "performance",
    label: "Curated Collection — Performance",
    headlineLines: ["Move Without", "Limits."],
    description: "Engineered for movement. Designed for comfort. Built to perform.",
    imageSrc: "/assets/lifestyle/campaign-offset.png",
    imageAlt: "Runner tying sneakers during sunrise",
    backgroundWord: "MOTION",
  },
  {
    id: "lifestyle",
    label: "Curated Collection — Lifestyle",
    headlineLines: ["Style Meets", "Comfort."],
    description: "Where everyday comfort meets timeless design.",
    imageSrc: "/assets/lifestyle/campaign-lifestyle.png",
    imageAlt: "Young professional relaxing in a stylish café wearing sneakers",
    backgroundWord: "STYLE",
  },
  {
    id: "formal",
    label: "Curated Collection — Formal",
    headlineLines: ["Confidence In", "Every Step."],
    description: "Elegant footwear designed for professionals who appreciate timeless craftsmanship.",
    imageSrc: "/assets/lifestyle/campaign-formal.png",
    imageAlt: "Professional wearing premium leather footwear in a modern office environment",
    backgroundWord: "STEP",
  },
];

export interface ShopHeroFloatingCard {
  id: string;
  label: string;
  position: { top?: string; bottom?: string; left?: string; right?: string };
  delay: number;
}

export const floatingCards: ShopHeroFloatingCard[] = [
  { id: "rating", label: "★★★★★ 4.9 Customer Rating", position: { top: "6%", left: "-4%" }, delay: 0 },
  { id: "authentic", label: "✓ Authentic Sourcing", position: { top: "38%", right: "-6%" }, delay: 0.3 },
  { id: "delivery", label: "📦 Nationwide Delivery", position: { bottom: "26%", left: "-6%" }, delay: 0.6 },
  { id: "curated", label: "👟 Curated Collections", position: { bottom: "4%", right: "-2%" }, delay: 0.9 },
  { id: "assistance", label: "💬 Personal Shopping Assistance", position: { top: "62%", left: "4%" }, delay: 1.2 },
];

export interface ShopHeroStat {
  value: string;
  label: string;
}

export const stats: ShopHeroStat[] = [
  { value: "15K+", label: "Happy Customers" },
  { value: "500+", label: "Curated Styles" },
  { value: "98%", label: "Customer Satisfaction" },
];
