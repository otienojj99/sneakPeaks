import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, X } from "lucide-react";

const SearchBar: React.FC = () => {
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);

  return (
    <motion.div
      className="hidden md:flex items-center gap-2 rounded-full bg-white border px-4 py-2.5"
      style={{ borderColor: focused ? "#CFFF04" : "#E4E0D8" }}
      animate={{
        width: focused ? 380 : 320,
        boxShadow: focused
          ? "0 0 0 4px rgba(207,255,4,0.15)"
          : "0 1px 2px rgba(20,21,26,0.04)",
      }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      <Search size={16} className="text-[#8B8681] shrink-0" />
      <input
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder="Search sneakers..."
        aria-label="Search products"
        className="flex-1 min-w-0 bg-transparent text-sm text-[#14151A] placeholder:text-[#8B8681] focus:outline-none"
      />
      {value && (
        <button
          onClick={() => setValue("")}
          aria-label="Clear search"
          className="shrink-0 text-[#8B8681] hover:text-[#14151A] transition-colors focus:outline-none"
        >
          <X size={14} />
        </button>
      )}
    </motion.div>
  );
};

export default SearchBar;
