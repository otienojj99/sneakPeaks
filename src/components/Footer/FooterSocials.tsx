import React from "react";
import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaTiktok,
  FaXTwitter,
} from "react-icons/fa6";

const socials = [
  { icon: FaInstagram, label: "Instagram", href: "#" },
  { icon: FaTiktok, label: "TikTok", href: "#" },
  { icon: FaFacebookF, label: "Facebook", href: "#" },
  { icon: FaXTwitter, label: "X", href: "#" },
  { icon: FaWhatsapp, label: "WhatsApp", href: "#" },
];

const FooterSocials: React.FC = () => {
  return (
    <div className="flex items-center gap-3">
      {socials.map(({ icon: Icon, label, href }) => (
        <motion.a
          key={label}
          href={href}
          aria-label={label}
          whileHover={{
            y: -3,
            scale: 1.08,
            boxShadow: "0 8px 20px rgba(207,255,4,0.25)",
          }}
          whileFocus={{
            y: -3,
            scale: 1.08,
            boxShadow: "0 8px 20px rgba(207,255,4,0.25)",
          }}
          className="w-10 h-10 rounded-full border border-[#F5F3EE]/15 flex items-center justify-center text-[#F5F3EE] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CFFF04]"
        >
          <Icon size={16} strokeWidth={1.75} />
        </motion.a>
      ))}
    </div>
  );
};

export default FooterSocials;
