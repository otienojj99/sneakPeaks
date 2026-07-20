export interface ProductData {
  id: string;
  brand: string;
  name: string;
  price: number;
  wasPrice?: number;
  rating: number;
  reviewCount: number;
  badges: string[];
  colors: string[];
  accent: string;
  rotation: number;
  featured?: boolean;
}

export const newArrivals: ProductData[] = [
  {
    id: "aero-runner-3",
    brand: "GROUND.ZERO",
    name: "Aero Runner 3",
    price: 149,
    wasPrice: 179,
    rating: 4.9,
    reviewCount: 214,
    badges: ["NEW", "BEST SELLER"],
    colors: ["#14151A", "#F5F3EE", "#CFFF04"],
    accent: "#CFFF04",
    rotation: -6,
    featured: true,
  },
  {
    id: "court-glide-pro",
    brand: "GROUND.ZERO",
    name: "Court Glide Pro",
    price: 129,
    rating: 4.8,
    reviewCount: 156,
    badges: ["TRENDING"],
    colors: ["#F5F3EE", "#8B8681"],
    accent: "#8B8681",
    rotation: 5,
  },
  {
    id: "trail-apex",
    brand: "GROUND.ZERO",
    name: "Trail Apex",
    price: 169,
    wasPrice: 189,
    rating: 4.7,
    reviewCount: 98,
    badges: ["LIMITED"],
    colors: ["#14151A", "#8B8681"],
    accent: "#FF4526",
    rotation: -4,
  },
  {
    id: "volt-strike",
    brand: "GROUND.ZERO",
    name: "Volt Strike",
    price: 139,
    rating: 4.9,
    reviewCount: 302,
    badges: ["NEW"],
    colors: ["#CFFF04", "#14151A"],
    accent: "#CFFF04",
    rotation: 7,
  },
  {
    id: "basin-low",
    brand: "GROUND.ZERO",
    name: "Basin Low",
    price: 119,
    wasPrice: 149,
    rating: 4.6,
    reviewCount: 87,
    badges: ["TRENDING"],
    colors: ["#F5F3EE", "#FF4526"],
    accent: "#FF4526",
    rotation: -5,
  },
];
