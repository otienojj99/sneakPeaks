export type Stat = {
  label: string;
  value: string;
};
export interface FloatingCardData {
  id: string;
  title: string;
  price: number;
  rating: number;
  colors: string[];
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}

export type FloatingCard = {
  id: string;
  title: string;
  price: number;
  rating: number;
  colors: string[];
  position?: string;
};

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

// export interface HeroSlideData {
//   id: string;
//   label: string;
//   headlineTop: string;
//   headlineEmphasis: string;
//   description: string;
//   shoeRotation: number;
//   stats: { label: string; value: string }[];
//   floatingCards: FloatingCardData[];
// }


export type BadgePosition = {
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
};

export type FloatingBadgeData = {
  id: string;
  label: string;
  position: BadgePosition;
  delay?: number;
};

export {};
