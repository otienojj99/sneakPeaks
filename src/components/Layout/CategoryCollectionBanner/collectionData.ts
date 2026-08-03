export interface CollectionFloatingCard {
  id: string;
  label: string;
  position: { top?: string; bottom?: string; left?: string; right?: string };
  delay: number;
}

export interface CollectionData {
  id: string;
  name: string;
  heading: string;
  description: string;
  /** Real photography placeholder — drop sourced lifestyle photography here. */
  imageSrc: string;
  imageAlt: string;
  backgroundWord: string;
  floatingCards: CollectionFloatingCard[];
}

const defaultCards = (seed: number): CollectionFloatingCard[] => [
  { id: "sourcing", label: "✓ Authentic Sourcing", position: { top: "8%", left: "-4%" }, delay: 0 + seed },
  { id: "rating", label: "★★★★★ 4.9 Rating", position: { top: "42%", right: "-6%" }, delay: 0.3 + seed },
  { id: "delivery", label: "📦 Nationwide Delivery", position: { bottom: "22%", left: "-6%" }, delay: 0.6 + seed },
  { id: "handpicked", label: "👟 Handpicked Styles", position: { bottom: "4%", right: "-2%" }, delay: 0.9 + seed },
];

export const collections: Record<string, CollectionData> = {
  all: {
    id: "all",
    name: "The Full Collection",
    heading: "Designed For Every Step.",
    description: "Discover footwear carefully selected for your lifestyle, combining timeless style, exceptional comfort and authentic craftsmanship.",
    imageSrc: "/assets/collections/all.jpg",
    imageAlt: "Fresh product editorial across the full curated collection",
    backgroundWord: "CURATED",
    floatingCards: defaultCards(0),
  },
  men: {
    id: "men",
    name: "Men's Collection",
    heading: "Built For Everyday Movement.",
    description: "Modern city lifestyle in mind — footwear that keeps pace with your day, from morning commute to evening plans.",
    imageSrc: "/assets/collections/men.jpg",
    imageAlt: "Man walking through modern city architecture wearing premium sneakers",
    backgroundWord: "MOVE",
    floatingCards: defaultCards(0.1),
  },
  women: {
    id: "women",
    name: "Women's Collection",
    heading: "Confidence Starts From The Ground Up.",
    description: "Elegant street fashion for the woman on the move — timeless silhouettes, thoughtful comfort, everyday confidence.",
    imageSrc: "/assets/collections/women.jpg",
    imageAlt: "Woman in elegant street fashion wearing premium sneakers",
    backgroundWord: "STYLE",
    floatingCards: defaultCards(0.2),
  },
  sports: {
    id: "sports",
    name: "Sports Collection",
    heading: "Push Every Limit.",
    description: "A runner preparing at sunrise — footwear engineered for performance, built to move without limits.",
    imageSrc: "/assets/collections/sports.jpg",
    imageAlt: "Runner preparing to train outdoors at sunrise",
    backgroundWord: "MOTION",
    floatingCards: defaultCards(0.3),
  },
  formal: {
    id: "formal",
    name: "Formal Collection",
    heading: "Crafted For Every Occasion.",
    description: "A professional in premium leather footwear — timeless craftsmanship for those who appreciate the details.",
    imageSrc: "/assets/collections/formal.jpg",
    imageAlt: "Professional wearing premium leather footwear in a modern office environment",
    backgroundWord: "CRAFT",
    floatingCards: defaultCards(0.4),
  },
  kids: {
    id: "kids",
    name: "Kids' Collection",
    heading: "Comfort For Every Adventure.",
    description: "Children playing outdoors — durable, comfortable footwear built for movement, play and every adventure in between.",
    imageSrc: "/assets/collections/kids.jpg",
    imageAlt: "Children playing outdoors wearing sneakers",
    backgroundWord: "PLAY",
    floatingCards: defaultCards(0.5),
  },
  "new-arrivals": {
    id: "new-arrivals",
    name: "New Arrivals",
    heading: "Just Landed.",
    description: "Fresh product editorial — the newest styles to enter the collection, curated the moment they arrive.",
    imageSrc: "/assets/collections/new-arrivals.jpg",
    imageAlt: "Fresh product editorial photography of newly arrived sneakers",
    backgroundWord: "NEW",
    floatingCards: defaultCards(0.6),
  },
  "best-sellers": {
    id: "best-sellers",
    name: "Best Sellers",
    heading: "Chosen By Thousands.",
    description: "The most-loved footwear in the boutique — proven, trusted and worn by a growing community of sneaker lovers.",
    imageSrc: "/assets/collections/best-sellers.jpg",
    imageAlt: "Most-loved footwear styles displayed in a lifestyle setting",
    backgroundWord: "LOVED",
    floatingCards: defaultCards(0.7),
  },
  deals: {
    id: "deals",
    name: "Deals",
    heading: "Premium Style. Exceptional Value.",
    description: "Premium shoes, subtly styled for the season's best offers — the same craftsmanship, exceptional value.",
    imageSrc: "/assets/collections/deals.jpg",
    imageAlt: "Premium sneakers styled with subtle seasonal promotional detail",
    backgroundWord: "VALUE",
    floatingCards: defaultCards(0.8),
  },
};

export const defaultCollectionId = "all";
