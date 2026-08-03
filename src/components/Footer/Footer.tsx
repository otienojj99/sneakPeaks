import React from "react";
import { motion } from "framer-motion";
import FooterBackground from "./FooterBackground";
import FooterBrand from "./FooterBrand";
import FooterNavigation from "./FooterNavigation";
import FooterContact from "./FooterContact";
import FooterNewsletter from "./FooterNewsletter";
import FooterBottom from "./FooterBottom";


const Footer = () =>{
    return (
        <footer className="relative w-full overflow-hidden pt-20 sm:pt-24">
      <FooterBackground />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10">
        {/* closing statement */}
        <motion.div
          className="max-w-xl mb-16 sm:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="font-display text-[#F5F3EE]" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
            Made For Every Step.
          </h2>
          <p className="mt-4 text-base text-[#8B8681] max-w-md">
            Premium footwear, carefully sourced and thoughtfully curated to help you move confidently every day.
          </p>
        </motion.div>

        {/* four-column layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 pb-16 sm:pb-20">
          <FooterBrand />
          <FooterNavigation />
          <FooterContact />
        </div>

        <div className="border-t border-[#E4E0D8]/10">
          <FooterNewsletter />
        </div>

        <div className="border-t border-[#E4E0D8]/10">
          <FooterBottom />
        </div>
      </div>
    </footer>
  );
    
}


export default Footer;