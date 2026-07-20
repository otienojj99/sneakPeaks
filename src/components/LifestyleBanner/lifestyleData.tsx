export type LifestyleLayout = "cinematic" | "split" | "offset";

export interface LifestyleCampaign {
  id: string;
  layout: LifestyleLayout;
  label: string;
  heading: string;
  description: string;
  ctaLabel: string;
  secondaryLabel: string;
  /**
   * Path to the real photography asset — swap with your own file/CDN URL.
   * Using plain <img> tags (not SVG placeholders) per project requirements,
   * so these can be dropped straight in once assets are sourced.
   */
  imageSrc: string;
  imageAlt: string;
}

export const campaigns: Record<LifestyleLayout, LifestyleCampaign> = {
  cinematic: {
    id: "campaign-cinematic",
    layout: "cinematic",
    label: "Editor's Pick",
    heading: "Every Step Tells A Story.",
    description:
      "Explore handpicked collections crafted for comfort, movement and timeless everyday style.",
    ctaLabel: "Explore Collection",
    secondaryLabel: "View Lookbook",
    imageSrc: "/assets/lifestyle/campaign-cinemati.png",
    imageAlt:
      "Person walking confidently through a sunlit city street in sneakers",
  },
  split: {
    id: "campaign-split",
    layout: "split",
    label: "Curated Collection",
    heading: "Move With Confidence.",
    description:
      "From morning runs to evening streets — footwear designed to move through every part of your day.",
    ctaLabel: "Explore Collection",
    secondaryLabel: "View Lookbook",
    imageSrc: "/assets/lifestyle/campaign-split.png",
    imageAlt:
      "Friends walking together in the city wearing sneakers, street fashion",
  },
  offset: {
    id: "campaign-offset",
    layout: "offset",
    label: "Editor's Pick",
    heading: "Designed For Every Journey.",
    description:
      "Minimal architecture, morning light, city streets — the everyday backdrop for footwear built to keep pace.",
    ctaLabel: "Explore Collection",
    secondaryLabel: "View Lookbook",
    imageSrc: "/assets/lifestyle/campaign-offset.png",
    imageAlt:
      "Runner moving through minimal urban architecture in morning light",
  },
};
