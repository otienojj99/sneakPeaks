import React from "react";
import { motion } from "framer-motion";
import FooterSocials from "./FooterSocials";

const FooterBrand = () => {
    return(
        <motion.div
      className="flex flex-col gap-5"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <a href="#" className="font-display text-2xl tracking-tight text-[#F5F3EE] w-fit">
        GROUND<span className="text-[#CFFF04]">.</span>ZERO
      </a>
      <p className="text-sm leading-relaxed text-[#8B8681] max-w-xs">
        We believe great footwear is more than style — it's confidence, comfort and self-expression. Every pair is carefully selected to deliver an exceptional experience.
      </p>
      <FooterSocials />
    </motion.div>
    )
};

export default FooterBrand;
