import React from "react";
import { motion } from "framer-motion";
import { Zap, Bell, Tag, Sparkles, Lock, Calendar } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Benefit {
  icon: LucideIcon;
  label: string;
}

const benefits: Benefit[] = [
  { icon: Zap, label: "Early access to new arrivals" },
  { icon: Bell, label: "Restock notifications" },
  { icon: Tag, label: "Exclusive member offers" },
  { icon: Sparkles, label: "Sneaker style inspiration" },
  { icon: Lock, label: "Private releases" },
  { icon: Calendar, label: "Seasonal collections" },
];

const MembershipBenefits = () => {
  return (
    <motion.ul
      className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.5 }}
    >
      {benefits.map(({ icon: Icon, label }) => (
        <li key={label} className="flex items-center gap-3">
          <span
            className="w-8 h-8 shrink-0 rounded-full flex items-center justify-center"
            style={{ background: "rgba(207,255,4,0.12)" }}
          >
            <Icon size={15} strokeWidth={1.75} className="text-[#CFFF04]" />
          </span>
          <span className="text-sm text-[#E4E0D8]">{label}</span>
        </li>
      ))}
    </motion.ul>
  );
};

export default MembershipBenefits;
