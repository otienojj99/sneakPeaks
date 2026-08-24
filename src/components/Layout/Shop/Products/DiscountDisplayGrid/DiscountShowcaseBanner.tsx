import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";

export interface DiscountShowcaseBannerProps {
  eyebrow?: string;
  /** Accepts multiple lines, e.g. ["Selected Styles.", "Better Prices."] — or a single string. */
  headline: string | string[];
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
  /** Small tag in the corner, e.g. "LIMITED" — optional. */
  campaignLabel?: string;
  /** Optional real photography — falls back to the site's established ink/volt/blaze campaign-card treatment when omitted. */
  backgroundImage?: string;
  backgroundImageAlt?: string;
}

const DiscountShowcaseBanner = ({
  eyebrow = "THE DEAL EDIT",
  headline,
  description = "A curated selection of pairs currently available at special prices.",
  ctaLabel = "Explore Deals",
  ctaHref = "#",
  campaignLabel,
  backgroundImage,
  backgroundImageAlt = "",
}: DiscountShowcaseBannerProps) => {
  const [hovered, setHovered] = useState(false);
  const lines = Array.isArray(headline) ? headline : [headline];

  return (
    <motion.a
      href={ctaHref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex flex-col justify-end w-full min-h-[280px] sm:min-h-[340px] lg:h-full rounded-[28px] overflow-hidden p-7 sm:p-8 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CFFF04]"
      style={{ background: backgroundImage ? undefined : "#14151A" }}
    >
      {backgroundImage ? (
        <>
          <motion.img
            src={backgroundImage}
            alt={backgroundImageAlt}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover"
            animate={{ scale: hovered ? 1.04 : 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#14151A]/90 via-[#14151A]/40 to-transparent" />
        </>
      ) : (
        <>
          <div
            className="absolute -top-10 -left-10 w-56 h-56 rounded-full blur-[90px]"
            style={{
              background:
                "radial-gradient(circle, rgba(207,255,4,0.14) 0%, rgba(207,255,4,0) 70%)",
            }}
          />
          <div
            className="absolute -bottom-10 -right-10 w-56 h-56 rounded-full blur-[90px]"
            style={{
              background:
                "radial-gradient(circle, rgba(255,69,38,0.10) 0%, rgba(255,69,38,0) 70%)",
            }}
          />
        </>
      )}

      {campaignLabel && (
        <span className="absolute top-6 right-6 z-10 rounded-full bg-[#CFFF04] text-[#14151A] text-[10px] font-bold tracking-wide px-2.5 py-1">
          {campaignLabel}
        </span>
      )}

      <div className="relative z-10 flex flex-col gap-3">
        {eyebrow && (
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#CFFF04]">
            {eyebrow}
          </span>
        )}
        <h2
          className="font-display text-[#F5F3EE] leading-[0.98]"
          style={{ fontSize: "clamp(1.75rem, 3vw, 2.25rem)" }}
        >
          {lines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h2>
        {description && (
          <p className="text-sm text-[#8B8681] max-w-xs">{description}</p>
        )}

        <motion.span
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#F5F3EE] mt-1"
          animate={{ x: hovered ? 4 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {ctaLabel} <ArrowRight size={15} />
        </motion.span>
      </div>
    </motion.a>
  );
};

export default DiscountShowcaseBanner;
