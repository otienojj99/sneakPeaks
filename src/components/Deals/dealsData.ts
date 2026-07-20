export interface DealData {
  id: string;
  brand: string;
  name: string;
  price: number;
  wasPrice: number;
  colors: string[];
  accent: string;
  rotation: number;
  socialProof?: string;
  featured?: boolean;
  /** ISO end time, only used to drive DealCountdown on the featured card */
  endsAt?: string;
}

function discountPercent(price: number, wasPrice: number): number {
  return Math.round(((wasPrice - price) / wasPrice) * 100);
}

export const deals: DealData[] = [
  {
    id: "aero-runner-3",
    brand: "GROUND.ZERO",
    name: "Aero Runner 3",
    price: 120,
    wasPrice: 150,
    colors: ["#14151A", "#F5F3EE", "#CFFF04"],
    accent: "#CFFF04",
    rotation: -4,
    socialProof: "Selling Fast",
    featured: true,
    endsAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "court-glide-pro",
    brand: "GROUND.ZERO",
    name: "Court Glide Pro",
    price: 99,
    wasPrice: 129,
    colors: ["#F5F3EE", "#8B8681"],
    accent: "#8B8681",
    rotation: 4,
    socialProof: "Only 8 Left",
  },
  {
    id: "trail-apex",
    brand: "GROUND.ZERO",
    name: "Trail Apex",
    price: 135,
    wasPrice: 189,
    colors: ["#14151A", "#8B8681"],
    accent: "#FF4526",
    rotation: -3,
    socialProof: "Trending Today",
  },
  {
    id: "volt-strike",
    brand: "GROUND.ZERO",
    name: "Volt Strike",
    price: 109,
    wasPrice: 139,
    colors: ["#CFFF04", "#14151A"],
    accent: "#CFFF04",
    rotation: 5,
    socialProof: "Popular Choice",
  },
  {
    id: "basin-low",
    brand: "GROUND.ZERO",
    name: "Basin Low",
    price: 89,
    wasPrice: 149,
    colors: ["#F5F3EE", "#FF4526"],
    accent: "#FF4526",
    rotation: -5,
    socialProof: "Limited Stock",
  },
];

export { discountPercent };
