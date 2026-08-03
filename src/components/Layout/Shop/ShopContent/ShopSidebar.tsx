import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface Props {
  /** Controls the mobile slide-out drawer. Ignored/hidden on desktop, where the sidebar is always visible. */
  mobileOpen?: boolean;
  onMobileClose?: () => void;
  children?: React.ReactNode;
}
const ShopSidebar = ({
  mobileOpen = false,
  onMobileClose,
  children,
}: Props) => {
  const content = (
    <div className="h-full overflow-y-auto  border border-[#E4E0D8] bg-[#F5F3EE] p-6 shadow-[0_10px_30px_-20px_rgba(20,21,26,0.15)]">
      {/* ============================================================ */}
      {/* SIDEBAR SLOT — intentionally empty.                          */}
      {/* Future components (Categories, Filters, Featured             */}
      {/* Collections, Promotions, etc.) get rendered here as          */}
      {/* children/props without touching this layout file.           */}
      {/* ============================================================ */}
      {children}
    </div>
  );

  return (
    <>
      {/* Desktop / tablet: sticky column */}
      <aside
        aria-label="Shop sidebar"
        className="hidden lg:block lg:w-[280px] xl:w-[320px] shrink-0 sticky top-0"
        // style={{ top: 100, maxHeight: "calc(100vh - 120px)" }}
      >
        {content}
      </aside>

      {/* Mobile: slide-out drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-[#14151A]/50 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onMobileClose}
              aria-hidden="true"
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Shop sidebar"
              className="fixed top-0 left-0 z-50 h-full w-[85%] max-w-sm lg:hidden p-4"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
            >
              <div className="relative h-full">
                <button
                  aria-label="Close sidebar"
                  onClick={onMobileClose}
                  className="absolute -right-2 -top-2 z-10 w-9 h-9 rounded-full bg-white border border-[#E4E0D8] flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#14151A]"
                >
                  <X size={16} />
                </button>
                {content}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default ShopSidebar;
