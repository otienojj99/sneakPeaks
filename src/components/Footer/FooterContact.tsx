import React from "react";
import { motion } from "framer-motion";
import { Phone, MessageCircle, Mail, Clock, MapPin } from "lucide-react";

const FooterContact = () => {
    return (
         <motion.div
      className="flex flex-col gap-5"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <h3 className="text-xs font-semibold tracking-[0.15em] uppercase text-[#F5F3EE] mb-1">Get In Touch</h3>

      <a href="#" className="flex items-center gap-3 group focus:outline-none">
        <span className="w-9 h-9 rounded-full bg-[#CFFF04] flex items-center justify-center shrink-0">
          <MessageCircle size={15} className="text-[#14151A]" />
        </span>
        <span className="flex flex-col">
          <span className="text-sm text-[#F5F3EE] group-hover:text-[#CFFF04] transition-colors">Chat on WhatsApp</span>
          <span className="inline-flex w-fit items-center gap-1 mt-0.5 rounded-full bg-[#CFFF04]/10 px-2 py-0.5 text-[10px] font-medium text-[#CFFF04]">
            Typically replies quickly
          </span>
        </span>
      </a>

      <div className="flex flex-col gap-3 text-sm text-[#8B8681]">
        <a href="tel:+254700000000" className="flex items-center gap-3 hover:text-[#F5F3EE] transition-colors focus:outline-none">
          <Phone size={15} className="shrink-0" /> +254 700 000 000
        </a>
        <a href="mailto:hello@groundzero.com" className="flex items-center gap-3 hover:text-[#F5F3EE] transition-colors focus:outline-none">
          <Mail size={15} className="shrink-0" /> hello@groundzero.com
        </a>
        <span className="flex items-center gap-3">
          <Clock size={15} className="shrink-0" /> Mon–Sat, 9am–7pm
        </span>
        <span className="flex items-center gap-3">
          <MapPin size={15} className="shrink-0" /> Nairobi, Kenya
        </span>
      </div>
    </motion.div>
    )
};

export default FooterContact;
