import { Footprints, MessageCircle, Shield, Compass, Send, Star} from "lucide-react";
import  type { LucideIcon } from "lucide-react";

export interface BoutiqueCardData {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

export const boutiqueCards: BoutiqueCardData[] = [
  {
    id: "curated",
    icon: Footprints,
    title: "Curated Collections",
    description: "Every sneaker in our collection is intentionally selected for quality, comfort and timeless style.",
  },
  {
    id: "personal-shopping",
    icon: MessageCircle,
    title: "Personal Shopping Assistance",
    description: "Need help choosing the perfect fit? Our team is available to guide you before you place your order.",
  },
  {
    id: "authentic-sourcing",
    icon: Shield,
    title: "Authentic Product Sourcing",
    description: "We focus on sourcing genuine footwear from trusted suppliers, giving you confidence in every purchase.",
  },
  {
    id: "size-guidance",
    icon: Compass,
    title: "Size Guidance",
    description: "Not sure which size is right? We'll help you choose before your order is confirmed.",
  },
  {
    id: "smooth-ordering",
    icon: Send,
    title: "Smooth Ordering",
    description: "Complete your order through a guided WhatsApp conversation where we confirm availability, sizing and delivery details.",
  },
  {
    id: "premium-experience",
    icon: Star,
    title: "Premium Experience",
    description: "From browsing to delivery, every interaction is designed to feel effortless, personal and memorable.",
  },
];

export const featuredStatement = {
  heading: "Quality Over Quantity",
  paragraph:
    "We don't chase every release. We curate a considered edit of footwear worth your attention — sourced from trusted suppliers, checked for authenticity, and matched to how you actually live.",
};
