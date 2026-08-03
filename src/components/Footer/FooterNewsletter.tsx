import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, ArrowRight } from "lucide-react";

const FooterNewsletter = () => {
    const [email, setEmail] = useState("");
  const [focused, setFocused] = useState(false);

  return (
    <motion.div
      className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 py-10"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <h3 className="font-display text-xl sm:text-2xl text-[#F5F3EE]">Stay One Step Ahead</h3>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex items-center gap-3 w-full sm:w-auto max-w-md"
      >
        <motion.div
          className="flex-1 flex items-center gap-2.5 rounded-full border bg-white/5 px-4 py-2.5"
          animate={{
            borderColor: focused ? "#CFFF04" : "rgba(245,243,238,0.15)",
            boxShadow: focused ? "0 0 0 4px rgba(207,255,4,0.12)" : "0 0 0 0 rgba(207,255,4,0)",
          }}
          transition={{ duration: 0.25 }}
        >
          <Mail size={14} className="text-[#8B8681] shrink-0" />
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="Enter your email"
            aria-label="Email address"
            className="flex-1 min-w-0 bg-transparent text-sm text-[#F5F3EE] placeholder:text-[#8B8681] focus:outline-none"
          />
        </motion.div>

        <motion.button
          type="submit"
          whileHover={{ y: -2, scale: 1.02, boxShadow: "0 12px 28px rgba(207,255,4,0.35)" }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-1.5 rounded-full bg-[#CFFF04] px-5 py-2.5 text-sm font-semibold text-[#14151A] whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F5F3EE] focus-visible:ring-offset-2 focus-visible:ring-offset-[#14151A]"
        >
          Join Community
          <ArrowRight size={14} />
        </motion.button>
      </form>
    </motion.div>
  );
};

export default FooterNewsletter;
