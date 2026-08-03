import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search } from "lucide-react";

const navLinks = ["New Arrivals", "Men", "Women", "Kids", "Sale"];

const MobileMenu: React.FC = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className="flex lg:hidden items-center gap-1">
      <button
        aria-label="Search"
        aria-expanded={searchOpen}
        onClick={() => {
          setSearchOpen((o) => !o);
          setNavOpen(false);
        }}
        className="w-10 h-10 rounded-full flex items-center justify-center text-[#14151A] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#14151A]"
      >
        <Search size={18} strokeWidth={1.75} />
      </button>

      <button
        aria-label={navOpen ? "Close menu" : "Open menu"}
        aria-expanded={navOpen}
        onClick={() => {
          setNavOpen((o) => !o);
          setSearchOpen(false);
        }}
        className="w-10 h-10 rounded-full flex items-center justify-center text-[#14151A] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#14151A]"
      >
        {navOpen ? (
          <X size={20} strokeWidth={1.75} />
        ) : (
          <Menu size={20} strokeWidth={1.75} />
        )}
      </button>

      {/* search overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 right-0 top-full bg-white border-b border-[#E4E0D8] px-4 py-4 shadow-[0_16px_30px_-10px_rgba(20,21,26,0.15)]"
          >
            <div className="flex items-center gap-2 rounded-full border border-[#E4E0D8] bg-[#F5F3EE] px-4 py-2.5">
              <Search size={16} className="text-[#8B8681] shrink-0" />
              <input
                autoFocus
                type="search"
                placeholder="Search sneakers..."
                aria-label="Search products"
                className="flex-1 min-w-0 bg-transparent text-sm text-[#14151A] placeholder:text-[#8B8681] focus:outline-none"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* nav drawer */}
      <AnimatePresence>
        {navOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-[#14151A]/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setNavOpen(false)}
            />
            <motion.nav
              aria-label="Mobile navigation"
              className="fixed top-0 right-0 z-50 h-full w-72 bg-[#F5F3EE] p-6 flex flex-col gap-1"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
            >
              <button
                aria-label="Close menu"
                onClick={() => setNavOpen(false)}
                className="self-end w-9 h-9 rounded-full flex items-center justify-center mb-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#14151A]"
              >
                <X size={18} />
              </button>
              {navLinks.map((label) => (
                <a
                  key={label}
                  href="#"
                  className="py-3 text-base font-medium border-b border-[#E4E0D8]"
                  style={{ color: label === "Sale" ? "#FF4526" : "#14151A" }}
                >
                  {label}
                </a>
              ))}
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileMenu;
