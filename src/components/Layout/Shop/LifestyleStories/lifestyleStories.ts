export interface LifestyleStory {
  id: string;
  /** Small eyebrow/category label, e.g. "Urban Life" */
  title: string;
  /** The large headline, e.g. "Built For The Streets." */
  subtitle: string;
  description: string;
  /** Real photography placeholder path — drop your sourced campaign image in. */
  image: string;
  imageAlt: string;
  ctaLabel: string;
  ctaHref: string;
}

/**
 * lifestyleStories.ts
 * Not hardcoded into any component — `LifestyleStories` accepts
 * `stories: LifestyleStory[]` as a prop; this file is simply the data
 * source, so future campaigns are added here (or swapped for a CMS/API
 * response shaped like `LifestyleStory[]`) without touching component code.
 */
export const lifestyleStories: LifestyleStory[] = [
  {
    id: "urban-life",
    title: "Urban Life",
    subtitle: "Built For The Streets.",
    description: "Modern sneakers crafted for city life, where comfort meets confidence every day.",
    image: "/assets/lifestyle-stories/urban-life.jpg",
    imageAlt: "Young professional walking through a modern city",
    ctaLabel: "Explore Urban Collection",
    ctaHref: "/shop?collection=urban",
  },
  {
    id: "performance",
    title: "Performance",
    subtitle: "Move Without Limits.",
    description: "Designed for athletes who demand speed, comfort and endurance.",
    image: "/assets/lifestyle-stories/performance.jpg",
    imageAlt: "Runner tying shoes at sunrise",
    ctaLabel: "Shop Performance",
    ctaHref: "/shop?collection=performance",
  },
  {
    id: "lifestyle",
    title: "Lifestyle",
    subtitle: "Style Meets Comfort.",
    description: "Minimal designs that blend perfectly with your everyday wardrobe.",
    image: "/assets/lifestyle-stories/lifestyle.jpg",
    imageAlt: "Relaxed creative workspace and coffee shop setting",
    ctaLabel: "Discover Lifestyle",
    ctaHref: "/shop?collection=lifestyle",
  },
  {
    id: "formal",
    title: "Formal",
    subtitle: "Confidence In Every Step.",
    description: "Premium leather footwear made for modern professionals.",
    image: "/assets/lifestyle-stories/formal.jpg",
    imageAlt: "Business professional entering a meeting",
    ctaLabel: "Shop Formal",
    ctaHref: "/shop?collection=formal",
  },
  {
    id: "outdoor",
    title: "Outdoor",
    subtitle: "Adventure Starts Here.",
    description: "Explore trails, mountains and every journey with confidence.",
    image: "/assets/lifestyle-stories/outdoor.jpg",
    imageAlt: "Hiker on a scenic trail",
    ctaLabel: "Explore Outdoor",
    ctaHref: "/shop?collection=outdoor",
  },
];
