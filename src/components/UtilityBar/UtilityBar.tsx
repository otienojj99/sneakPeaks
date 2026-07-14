import React, { useState } from "react";

const UtilityBar = () => {
  return (
    <div className="w-full bg-secondary-ink text-secondary-bone font-mono text-xs">
      <div className="mx-auto flex max-w-7xl items-center justify-between overflow-hidden px-6 py-2">
        <p className="truncate tracking-wide">
          FREE SHIPPING ON ORDERS OVER $75 &nbsp;·&nbsp; NEW DROPS EVERY
          THURSDAY
        </p>

        <div className="hidden shrink-0 items-center gap-4 tracking-wide sm:flex">
          <span>EN / USD</span>
          <span className="opacity-40">|</span>

          <a href="#" className="hover:opacity-70">
            TRACK ORDER
          </a>
        </div>
      </div>
    </div>
  );
};

export default UtilityBar;
