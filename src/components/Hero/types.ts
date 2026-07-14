export interface FloatingCardData {
  id: string;
  title: string;
  price: number;
  rating: number;
  colors: string[];
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}

export interface FloatingBadgeData {
  id: string;
  label: string;
  position: { top?: string; bottom?: string; left?: string; right?: string };
  delay: number;
}

export interface HeroSlideData {
  id: string;
  label: string;
  headlineTop: string;
  headlineEmphasis: string;
  description: string;
  shoeRotation: number;
  stats: { label: string; value: string }[];
  floatingCards: FloatingCardData[];
}

export interface HeroStat {
  label: string;
  value: string;
}



