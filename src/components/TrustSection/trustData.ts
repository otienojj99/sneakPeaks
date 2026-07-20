import type { LucideIcon } from "lucide-react";
import { Truck, ShieldCheck, RefreshCcw, Headphones } from "lucide-react";

export interface TrustCardData {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

export const trustCards: TrustCardData[] = [
  {
    id: "shipping",
    icon: Truck,
    title: "Free Shipping",
    description: "Enjoy fast nationwide delivery on qualifying orders.",
  },
  {
    id: "payments",
    icon: ShieldCheck,
    title: "Secure Payments",
    description: "Protected checkout with trusted payment methods.",
  },
  {
    id: "returns",
    icon: RefreshCcw,
    title: "Easy Returns",
    description: "Simple returns and exchanges for complete peace of mind.",
  },
  {
    id: "support",
    icon: Headphones,
    title: "Dedicated Support",
    description: "Friendly experts ready to help whenever you need us.",
  },
];
