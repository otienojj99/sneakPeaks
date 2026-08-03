import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import type { ShopHeroCampaign } from "./shopHeroData";

interface UseShopHeroSliderProps {
  campaigns: ShopHeroCampaign[];
  intervalMs?: number;
}

interface UseShopHeroSliderReturn {
  index: number;
  campaign: ShopHeroCampaign;
  goTo: (i: number) => void;
}

const useShopHeroSlider = ({
  campaigns,
  intervalMs,
}: UseShopHeroSliderProps) => {
  const [index, setIndex] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;
    timer.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % campaigns.length);
    }, intervalMs);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [campaigns.length, intervalMs, reduceMotion]);

  const goTo = (i: number) => {
    setIndex(i);
    if (reduceMotion) return;
    if (timer.current) clearInterval(timer.current);
    timer.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % campaigns.length);
    }, intervalMs);
  };
  return { index, campaign: campaigns[index], goTo } as UseShopHeroSliderReturn;
};

export default useShopHeroSlider;
