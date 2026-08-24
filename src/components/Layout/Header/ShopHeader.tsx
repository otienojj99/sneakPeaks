import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Logo from "../../Header/Logo";
import Navigation from "./Navigation";
import SearchBar from "./SearchBar";
import WishlistButton from "./WishlistButton";
import CartButton from "../Shop/CartDtower/CartButton";
import AccountMenu from "./AccountMenu";
import MobileMenu from "./MobileMenu";

interface Props {
  wishlistCount?: number;
  cartCount?: number;
  isLoggedIn?: boolean;
}

const ShopHeader = ({
  wishlistCount = 0,
  cartCount = 0,
  isLoggedIn = false,
}: Props) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -84, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-50 w-full h-20 sm:h-[84px] border-b transition-colors"
      style={{
        background: scrolled ? "rgba(245,243,238,0.85)" : "#F5F3EE",
        borderColor: "#E4E0D8",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        boxShadow: scrolled ? "0 8px 24px -12px rgba(20,21,26,0.12)" : "none",
      }}
    >
      <div className="relative max-w-7xl mx-auto h-full flex items-center justify-between px-4 sm:px-6 lg:px-10">
        <div className="flex-1 flex items-center lg:flex-none">
          <Logo />
        </div>

        <div className="hidden lg:flex flex-1 justify-center">
          <Navigation />
        </div>

        <div className="hidden lg:flex flex-1 items-center justify-end gap-3">
          <SearchBar />
          <WishlistButton count={wishlistCount} />
          {/* <CartButton count={cartCount} /> */}
          <CartButton />
          <AccountMenu isLoggedIn={isLoggedIn} />
        </div>

        <div className="flex lg:hidden items-center gap-1">
          <WishlistButton count={wishlistCount} />
          <CartButton />
          <AccountMenu isLoggedIn={isLoggedIn} />
          <MobileMenu />
        </div>
      </div>
    </motion.header>
  );
};

export default ShopHeader;
