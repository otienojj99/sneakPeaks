import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Package,
  Heart,
  Settings,
  LogOut,
  LogIn,
  UserPlus,
} from "lucide-react";

interface Props {
  /** Swap for real auth state in your app */
  isLoggedIn?: boolean;
}

const loggedInItems = [
  { icon: User, label: "My Account" },
  { icon: Package, label: "Orders" },
  { icon: Heart, label: "Wishlist" },
  { icon: Settings, label: "Settings" },
  { icon: LogOut, label: "Logout" },
];

const loggedOutItems = [
  { icon: LogIn, label: "Sign In" },
  { icon: UserPlus, label: "Create Account" },
];

const AccountMenu = ({ isLoggedIn = false }: Props) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);
  const items = isLoggedIn ? loggedInItems : loggedOutItems;

  return (
    <div className="relative" ref={ref}>
      <motion.button
        aria-label="Account menu"
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((o) => !o)}
        whileHover={{ y: -2, backgroundColor: "#F5F3EE" }}
        whileTap={{ scale: 0.95 }}
        className="w-10 h-10 rounded-full flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#14151A] focus-visible:ring-offset-2"
      >
        <motion.span whileHover={{ rotate: 12 }} transition={{ duration: 0.2 }}>
          <User size={18} strokeWidth={1.75} className="text-[#14151A]" />
        </motion.span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            initial={{ opacity: 0, scale: 0.95, y: -6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -6 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute right-0 mt-2 w-52 rounded-2xl border border-[#E4E0D8] bg-white p-2 shadow-[0_20px_45px_-15px_rgba(20,21,26,0.25)] origin-top-right"
          >
            {items.map(({ icon: Icon, label }) => (
              <button
                key={label}
                role="menuitem"
                className="w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-[#14151A] hover:bg-[#F5F3EE] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CFFF04]"
              >
                <Icon size={15} strokeWidth={1.75} className="text-[#8B8681]" />
                {label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AccountMenu;
