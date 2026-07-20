export type BadgeType = "Best Seller" | "Customer Favorite" | "Trending" | "Most Loved" | "Top Rated";

export interface BestSellerData {
  id: string;
  brand: string;
  name: string;
  price: number;
  wasPrice?: number;
  rating: number;
  reviewCount: number;
  badge: BadgeType;
  socialProof: string;
  colors: string[];
  accent: string;
  rotation: number;
  featured?: boolean;
  ribbon?: string;
}

export const bestSellers: BestSellerData[] = [
  {
    id: "aero-runner-3",
    brand: "GROUND.ZERO",
    name: "Aero Runner 3",
    price: 149,
    wasPrice: 179,
    rating: 4.9,
    reviewCount: 1284,
    badge: "Best Seller",
    socialProof: "2.1K Sold",
    colors: ["#14151A", "#F5F3EE", "#CFFF04"],
    accent: "#CFFF04",
    rotation: -4,
    featured: true,
    ribbon: "Most Popular",
  },
  {
    id: "court-glide-pro",
    brand: "GROUND.ZERO",
    name: "Court Glide Pro",
    price: 129,
    rating: 4.8,
    reviewCount: 956,
    badge: "Customer Favorite",
    socialProof: "95% Recommend",
    colors: ["#F5F3EE", "#8B8681"],
    accent: "#8B8681",
    rotation: 3,
  },
  {
    id: "trail-apex",
    brand: "GROUND.ZERO",
    name: "Trail Apex",
    price: 169,
    wasPrice: 189,
    rating: 4.7,
    reviewCount: 612,
    badge: "Top Rated",
    socialProof: "Chosen by Athletes",
    colors: ["#14151A", "#8B8681"],
    accent: "#FF4526",
    rotation: -3,
  },
  {
    id: "volt-strike",
    brand: "GROUND.ZERO",
    name: "Volt Strike",
    price: 139,
    rating: 4.9,
    reviewCount: 1503,
    badge: "Trending",
    socialProof: "Trending This Week",
    colors: ["#CFFF04", "#14151A"],
    accent: "#CFFF04",
    rotation: 4,
  },
  {
    id: "basin-low",
    brand: "GROUND.ZERO",
    name: "Basin Low",
    price: 119,
    wasPrice: 149,
    rating: 4.6,
    reviewCount: 487,
    badge: "Most Loved",
    socialProof: "1,200 Reviews",
    colors: ["#F5F3EE", "#FF4526"],
    accent: "#FF4526",
    rotation: -5,
  },
  {
    id: "ridge-mid",
    brand: "GROUND.ZERO",
    name: "Ridge Mid",
    price: 134,
    rating: 4.8,
    reviewCount: 803,
    badge: "Best Seller",
    socialProof: "1.8K Sold",
    colors: ["#8B8681", "#14151A"],
    accent: "#8B8681",
    rotation: 5,
  },
  {
    id: "flex-knit-2",
    brand: "GROUND.ZERO",
    name: "Flex Knit 2",
    price: 99,
    wasPrice: 120,
    rating: 4.7,
    reviewCount: 341,
    badge: "Customer Favorite",
    socialProof: "92% Recommend",
    colors: ["#F5F3EE", "#CFFF04"],
    accent: "#CFFF04",
    rotation: -2,
  },
];
