import React from "react";
import { motion } from "framer-motion";
import PromoCountdown from "./PromoCountdown";
import PromoCTA from "./PromoCTA";

interface Props {
  targetDate: Date;
}
const PromoContent: React.FC<Props> = ({ targetDate }) => {
  return (
    <div className="flex flex-col gap-7 max-w-lg">
      <motion.span
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-xs font-semibold tracking-[0.25em] uppercase text-[#CFFF04]"
      >
        Limited Time
      </motion.span>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="font-display leading-[0.95] text-[#F5F3EE]"
        style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
      >
        The Biggest Drop
        <br />
        This Season.
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.35 }}
        className="text-sm font-semibold tracking-wide uppercase text-[#CFFF04]"
      >
        Exclusive Launch Pricing — Save Up To 40%
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.45 }}
        className="text-base text-[#8B8681] max-w-md"
      >
        Elevate every step with exclusive styles available for a limited time
        only.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.55 }}
      >
        <PromoCountdown targetDate={targetDate} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
      >
        <PromoCTA />
      </motion.div>
    </div>
  );
};

export default PromoContent;
