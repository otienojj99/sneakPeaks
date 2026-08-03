import React, { useEffect, useRef, useState } from "react";
import ShopTabsBackground from "./ShopTabsBackground";
import ShopTab from "./ShopTab";
import { shopTabs } from "./shopTabsData";

interface Props {
  /** Called whenever the active collection changes — use it to fade the product grid out/in. */
  onChange?: (id: string) => void;
}

const ShopTabs = ({ onChange }: Props) => {
  const [activeId, setActiveId] = useState(shopTabs[0].id);
  const [stuck, setStuck] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      ([entry]) => setStuck(!entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  const handleSelect = (id: string) => {
    setActiveId(id);
    onChange?.(id);
  };

  return (
    <>
      <div ref={sentinelRef} aria-hidden="true" className="h-px" />

      <div className="sticky top-0 z-40">
        <ShopTabsBackground stuck={stuck} />

        <div
          role="tablist"
          aria-label="Collections"
          className="relative flex items-center gap-8 sm:gap-10 overflow-x-auto max-w-7xl mx-auto px-6 sm:px-10 sm:justify-center [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {shopTabs.map((tab) => (
            <ShopTab
              key={tab.id}
              label={tab.label}
              active={tab.id === activeId}
              onSelect={() => handleSelect(tab.id)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default ShopTabs;
