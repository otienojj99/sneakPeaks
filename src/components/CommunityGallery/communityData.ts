export type CommunitySize = "featured" | "landscape" | "portrait" | "square";

export interface CommunityPost {
  id: string;
  /**
   * Path to the real customer/lifestyle photo — plain <img> src, not an
   * illustration, since this section is inherently about real people.
   * Swap with your sourced/consented customer photography.
   */
  imageSrc: string;
  imageAlt: string;
  customerName?: string;
  city?: string;
  productWorn: string;
  size: CommunitySize;
  likes: number;
}

export const communityPosts: CommunityPost[] = [
  {
    id: "post-1",
    imageSrc: "/assets/community/post-1.jpg",
    imageAlt: "Customer walking through a city crosswalk wearing Aero Runner 3 sneakers",
    customerName: "Maya O.",
    city: "Nairobi",
    productWorn: "Aero Runner 3",
    size: "featured",
    likes: 482,
  },
  {
    id: "post-2",
    imageSrc: "/assets/community/post-2.jpg",
    imageAlt: "Customer sitting on concrete steps wearing Court Glide Pro sneakers",
    customerName: "Daniel K.",
    city: "Lagos",
    productWorn: "Court Glide Pro",
    size: "portrait",
    likes: 214,
  },
  {
    id: "post-3",
    imageSrc: "/assets/community/post-3.jpg",
    imageAlt: "Two friends walking together in the street wearing matching sneakers",
    customerName: "Amara & Zuri",
    city: "Accra",
    productWorn: "Volt Strike",
    size: "landscape",
    likes: 356,
  },
  {
    id: "post-4",
    imageSrc: "/assets/community/post-4.jpg",
    imageAlt: "Customer tying their shoelaces before a morning run",
    customerName: "Priya S.",
    city: "Mumbai",
    productWorn: "Trail Apex",
    size: "square",
    likes: 168,
  },
  {
    id: "post-5",
    imageSrc: "/assets/community/post-5.jpg",
    imageAlt: "Customer leaning against a wall in an alley wearing Basin Low sneakers",
    customerName: "Leo M.",
    city: "São Paulo",
    productWorn: "Basin Low",
    size: "portrait",
    likes: 297,
  },
  {
    id: "post-6",
    imageSrc: "/assets/community/post-6.jpg",
    imageAlt: "Group of friends skating through an urban plaza wearing sneakers",
    customerName: "The Ridge Crew",
    city: "Berlin",
    productWorn: "Ridge Mid",
    size: "landscape",
    likes: 401,
  },
  {
    id: "post-7",
    imageSrc: "/assets/community/post-7.jpg",
    imageAlt: "Customer stretching outdoors before training wearing Flex Knit 2",
    customerName: "Tomiwa A.",
    city: "Abuja",
    productWorn: "Flex Knit 2",
    size: "square",
    likes: 143,
  },
];
