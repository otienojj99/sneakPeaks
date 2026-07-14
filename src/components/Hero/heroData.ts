import type { HeroSlideData, FloatingBadgeData } from "./hero.types";

export const heroSlides: HeroSlideData[] = [
  {
    id: "aero-runner",
    label: "New Collection · FW26",
    headlineTop: "EVERY STEP",
    headlineEmphasis: "MAKES A STATEMENT",
    description:
      "Premium sneakers engineered for movement, crafted for everyday confidence, designed to make every step unforgettable.",
    shoeRotation: -8,
    stats: [
      { label: "Customers", value: "50K+" },
      { label: "Rating", value: "4.9/5" },
      { label: "Styles", value: "120+" },
    ],
    floatingCards: [
      {
        id: "card-1",
        title: "Aero Runner 3",
        price: 149,
        rating: 4.9,
        colors: ["#14151A", "#F5F3EE", "#CFFF04"],
        position: "top-right",
      },
      {
        id: "card-2",
        title: "Free Shipping",
        price: 0,
        rating: 5,
        colors: ["#CFFF04"],
        position: "bottom-left",
      },
    ],
  },
  {
    id: "court-glide",
    label: "Best Seller · Court Series",
    headlineTop: "STEP INTO",
    headlineEmphasis: "THE FUTURE",
    description:
      "Reactive foam, engineered outsoles, zero compromise. Built for the ground you run on, worn by the streets you own.",
    shoeRotation: 6,
    stats: [
      { label: "Sold today", value: "1.2K" },
      { label: "Cushion index", value: "98%" },
      { label: "Colorways", value: "14" },
    ],
    floatingCards: [
      {
        id: "card-3",
        title: "Court Glide Pro",
        price: 129,
        rating: 4.8,
        colors: ["#F5F3EE", "#8B8681"],
        position: "top-right",
      },
      {
        id: "card-4",
        title: "Limited Drop",
        price: 0,
        rating: 5,
        colors: ["#FF4526"],
        position: "bottom-left",
      },
    ],
  },
];

export const floatingBadges: FloatingBadgeData[] = [
  { id: "badge-new", label: "NEW", position: { top: "6%", left: "2%" }, delay: 1.8 },
  { id: "badge-limited", label: "LIMITED", position: { top: "18%", right: "0%" }, delay: 2.0 },
  { id: "badge-best", label: "BEST SELLER", position: { bottom: "22%", right: "4%" }, delay: 2.2 },
  { id: "badge-year", label: "2026", position: { bottom: "6%", left: "8%" }, delay: 2.4 },
];
