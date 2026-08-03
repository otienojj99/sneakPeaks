import React, { useState } from "react";
import { motion } from "framer-motion";

const links = ["New Arrivals", "Men", "Women", "Kids", "Sale"];

function NavLink({ label }: { label: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href="#"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      className="relative text-sm font-medium focus:outline-none"
      style={{ color: label === "Sale" ? "#FF4526" : "#14151A" }}
    >
      {label}
      <motion.span
        className="absolute left-0 -bottom-1 h-px bg-current"
        animate={{ width: hovered ? "100%" : "0%" }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      />
    </a>
  );
}

const Navigation = () => {
  return (
    <nav className="hidden lg:flex items-center gap-8">
      {links.map((label) => (
        <NavLink key={label} label={label} />
      ))}
    </nav>
  );
};

export default Navigation;
