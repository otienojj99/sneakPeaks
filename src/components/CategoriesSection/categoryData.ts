export interface CategoryData {
  id: string;
  name: string;
  subtitle: string;
  size: "large" | "medium";
  /** Accent tint used by the placeholder illustration + gradient wash */
  accent: string;
}

export const categories: CategoryData[] = [
  { id: "men", name: "Men", subtitle: "Urban • Performance", size: "large", accent: "#CFFF04" },
  { id: "women", name: "Women", subtitle: "Elegant • Everyday", size: "medium", accent: "#FF4526" },
  { id: "kids", name: "Kids", subtitle: "Play • Comfort", size: "large", accent: "#8B8681" },
  { id: "sports", name: "Sports", subtitle: "Run • Train • Perform", size: "medium", accent: "#CFFF04" },
  { id: "casual", name: "Casual", subtitle: "Street • Lifestyle", size: "large", accent: "#FF4526" },
  { id: "formal", name: "Formal", subtitle: "Office • Business", size: "medium", accent: "#8B8681" },
];
