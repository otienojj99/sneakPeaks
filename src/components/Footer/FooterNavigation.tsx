import React, { useState } from "react";
import { motion } from "framer-motion";

const shopLinks = [
  "New Arrivals",
  "Best Sellers",
  "Categories",
  "Deals",
  "Collections",
  "Gift Cards",
];
const careLinks = [
  "Track Order",
  "Size Guide",
  "FAQ",
  "Shipping Information",
  "Privacy Policy",
  "Terms & Conditions",
  "Contact Us",
];

const FooterLink = ({ label }: { label: string }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <li>
      <a
        href="#"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
        className="relative inline-block text-sm text-[#8B8681] hover:text-[#F5F3EE] transition-colors focus:outline-none"
      >
        {label}
        <motion.span
          className="absolute left-0 -bottom-0.5 h-px bg-[#F5F3EE]"
          animate={{ width: hovered ? "100%" : "0%" }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      </a>
    </li>
  );
};

/**
 * FooterNavigation
 * Renders both column two ("Shop") and column three ("Customer Care") —
 * two link lists sharing the same animated-underline behavior.
 */
const FooterNavigation = () => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <h3 className="text-xs font-semibold tracking-[0.15em] uppercase text-[#F5F3EE] mb-5">
          Shop
        </h3>
        <ul className="flex flex-col gap-3">
          {shopLinks.map((label) => (
            <FooterLink key={label} label={label} />
          ))}
        </ul>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h3 className="text-xs font-semibold tracking-[0.15em] uppercase text-[#F5F3EE] mb-5">
          Customer Care
        </h3>
        <ul className="flex flex-col gap-3">
          {careLinks.map((label) => (
            <FooterLink key={label} label={label} />
          ))}
        </ul>
      </motion.div>
    </>
  );
};

export default FooterNavigation;
