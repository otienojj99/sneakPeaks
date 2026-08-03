import React from "react";
import ShopHeroBackground from "./ShopHeroBackground";
import ShopHeroDecorations from "./ShopHeroDecorations";
import ShopHeroContent from "./ShopHeroContent";
import ShopHeroImage from "./ShopHeroImage";
import ShopHeroFloatingCards from "./ShopHeroFloatingCards";
import ShopHeroStats from "./ShopHeroStats";
import ShopHeroIndicators from "./ShopHeroIndicators";
import useShopHeroSlider from "./useShopHeroSlider";
import { campaigns, floatingCards, stats } from "./shopHeroData";

const ShopHero = () => {
  const { index, campaign, goTo } = useShopHeroSlider({
    campaigns,
    intervalMs: 6000,
  });

  return (
    <section className="relative w-full min-h-[70vh] sm:min-h-[80vh] overflow-hidden">
      <ShopHeroBackground />
      <ShopHeroDecorations word={campaign.backgroundWord} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 py-20 sm:py-24 grid lg:grid-cols-2 gap-14 lg:gap-10 items-center">
        <div className="order-2 lg:order-1 flex flex-col gap-12">
          <ShopHeroContent campaign={campaign} />
          <ShopHeroStats stats={stats} />
        </div>

        <div className="order-1 lg:order-2 relative h-[320px] sm:h-[420px] lg:h-[480px]">
          <ShopHeroImage
            campaignId={campaign.id}
            src={campaign.imageSrc}
            alt={campaign.imageAlt}
          />
          <ShopHeroFloatingCards cards={floatingCards} />
        </div>
      </div>

      <div className="relative z-10 flex justify-center pb-8">
        <ShopHeroIndicators
          total={campaigns.length}
          active={index}
          onSelect={goTo}
        />
      </div>
    </section>
  );
};

export default ShopHero;
