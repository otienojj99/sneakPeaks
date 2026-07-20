import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Check } from "lucide-react";
import MembershipCTA from "./MembershipCTA";

const MembershipForm = () => {
  const [email, setEmail] = useState("");
  const [focused, setFocused] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3 rounded-full border border-[#CFFF04]/40 bg-[#CFFF04]/10 px-6 py-4"
      >
        <Check size={18} className="text-[#CFFF04]" />
        <span className="text-sm text-[#F5F3EE]">
          You're in — welcome to the community.
        </span>
      </motion.div>
    );
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full max-w-lg"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.65 }}
    >
      <motion.div
        className="flex-1 flex items-center gap-3 rounded-full border bg-white/5 px-5 py-3.5 backdrop-blur-sm"
        animate={{
          borderColor: focused ? "#CFFF04" : "rgba(245,243,238,0.15)",
          boxShadow: focused
            ? "0 0 0 4px rgba(207,255,4,0.12)"
            : "0 0 0 0 rgba(207,255,4,0)",
        }}
        transition={{ duration: 0.25 }}
      >
        <Mail size={16} className="text-[#8B8681] shrink-0" />
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Enter your email"
          aria-label="Email address"
          className="flex-1 bg-transparent text-sm text-[#F5F3EE] placeholder:text-[#8B8681] focus:outline-none"
        />
      </motion.div>

      <MembershipCTA label="Join Now" type="submit" />
    </motion.form>
  );
};

export default MembershipForm;
