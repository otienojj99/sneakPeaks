import { Rocket, Flame, Package, MessageCircle, Star, Gift } from "lucide-react";
import type { LucideIcon } from "lucide-react";


export interface AnnouncementItemData {
  id: string;
  icon: LucideIcon;
  message: string;
  actionLabel?: string;
  actionHref?: string;
}

export const announcements: AnnouncementItemData[] = [
  {
    id: "new-collection",
    icon: Rocket,
    message: "New Collection Available — explore our latest sneaker arrivals.",
    actionLabel: "Shop Now",
    actionHref: "#",
  },
  {
    id: "flash-sale",
    icon: Flame,
    message: "Flash Sale — save up to 30% on selected styles.",
    actionLabel: "Explore Deals",
    actionHref: "#",
  },
  {
    id: "delivery",
    icon: Package,
    message: "Nationwide Delivery — fast and reliable delivery across the country.",
  },
  {
    id: "help-choosing",
    icon: MessageCircle,
    message: "Need Help Choosing? Chat with our footwear specialist on WhatsApp.",
    actionLabel: "Start Chat",
    actionHref: "#",
  },
  {
    id: "restocked",
    icon: Star,
    message: "Best Sellers Restocked — your favorite styles are back.",
    actionLabel: "Shop Now",
    actionHref: "#",
  },
  {
    id: "join-community",
    icon: Gift,
    message: "Join Our Community — get early access to exclusive releases and restocks.",
    actionLabel: "Join",
    actionHref: "#",
  },
];
