import React from "react";
import { motion } from "framer-motion";
import LifestyleBackground from "./LifestyleBackground";
import LifestyleDecorations from "./LifestyleDecorations";
import LifestyleImage from "./LifestyleImage";
import LifestyleContent from "./LifestyleContent";
import type { LifestyleLayout } from "./lifestyleData";
import { campaigns } from "./lifestyleData";

interface Props {
  /** Which campaign composition to render. Defaults to the full-width cinematic layout. */
  layout?: LifestyleLayout;
}

const LifestyleBanner = ({ layout = "cinematic" }: Props) => {
  const campaign = campaigns[layout];
  return (
    <section className="relative w-full overflow-hidden py-20 sm:py-24">
      <LifestyleBackground />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10">
        {layout === "cinematic" && (
          <div className="relative rounded-[32px] h-[60vh] sm:h-[70vh] overflow-hidden">
            <LifestyleDecorations />
            <LifestyleImage
              src={campaign.imageSrc}
              alt={campaign.imageAlt}
              overlayDirection="left"
              className="h-full"
            />
            <div className="absolute inset-0 flex items-end sm:items-center p-8 sm:p-16">
              <LifestyleContent
                label={campaign.label}
                heading={campaign.heading}
                description={campaign.description}
                ctaLabel={campaign.ctaLabel}
                secondaryLabel={campaign.secondaryLabel}
              />
            </div>
          </div>
        )}

        {layout === "split" && (
          <div className="relative grid md:grid-cols-2 gap-0 rounded-[32px] overflow-hidden">
            <LifestyleDecorations />
            <div className="relative h-[45vh] md:h-[60vh]">
              <LifestyleImage
                src={campaign.imageSrc}
                alt={campaign.imageAlt}
                overlayDirection="bottom"
                className="h-full rounded-none md:rounded-l-[32px]"
              />
            </div>
            <div className="flex items-center justify-center bg-[#14151A] p-10 sm:p-16 md:rounded-r-[32px]">
              <LifestyleContent
                label={campaign.label}
                heading={campaign.heading}
                description={campaign.description}
                ctaLabel={campaign.ctaLabel}
                secondaryLabel={campaign.secondaryLabel}
              />
            </div>
          </div>
        )}

        {layout === "offset" && (
          <div className="relative min-h-[60vh] sm:min-h-[65vh] flex items-center">
            <LifestyleDecorations />
            <div className="relative w-full sm:w-[68%] ml-auto h-[50vh] sm:h-[60vh]">
              <LifestyleImage
                src={campaign.imageSrc}
                alt={campaign.imageAlt}
                overlayDirection="left"
                className="h-full"
              />
            </div>
            <motion.div
              className="absolute left-0 top-1/2 -translate-y-1/2 w-full sm:w-[52%] rounded-[28px] bg-[#14151A] p-8 sm:p-10 shadow-[0_30px_70px_-20px_rgba(20,21,26,0.4)]"
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <LifestyleContent
                label={campaign.label}
                heading={campaign.heading}
                description={campaign.description}
                ctaLabel={campaign.ctaLabel}
                secondaryLabel={campaign.secondaryLabel}
              />
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
};

export default LifestyleBanner;
