import { useEffect, useRef, useState } from "react";
import type { HeroSlideData } from "./hero.types";

interface UseHeroSliderReturn {
  index: number;
  slide: HeroSlideData;
  goTo: (i: number) => void;
}

const useHeroSlider = (
  slides: HeroSlideData[],
  intervalMs = 6000,
): UseHeroSliderReturn => {
  const [index, setIndex] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  useEffect(() => {
    timer.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, intervalMs);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [slides.length, intervalMs]);

  const goTo = (i: number) => {
    setIndex(i);
    if (timer.current) clearInterval(timer.current);
    timer.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, intervalMs);
  };

  return { index, slide: slides[index], goTo };
};

export default useHeroSlider;
