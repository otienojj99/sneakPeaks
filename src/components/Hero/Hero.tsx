import React from "react";
import HeroBackground from "./HeroBackground";
import HeroDecorations from "./HeroDecorations";
import HeroContent from "./HeroContent";
import HeroImages from "./HeroImages";
import HeroIndicators from "./HeroIndicators";
import useHeroSlider from "./useHeroSlider";
import { heroSlides, floatingBadges } from "./heroData";

const Hero = () => {
  const { index, slide, goTo } = useHeroSlider(heroSlides);

  return (
    <section className="relative w-full min-h-screen overflow-hidden font-sans">
      <HeroBackground />
      <HeroDecorations />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 py-24 grid md:grid-cols-2 gap-12 items-center min-h-screen">
        <HeroContent slide={slide} />
        <HeroImages slide={slide} badges={floatingBadges} />
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
        <HeroIndicators
          total={heroSlides.length}
          active={index}
          onSelect={goTo}
        />
      </div>
    </section>
  );
};

export default Hero;
