import React from "react";
import DealBackground from "./DealBackground";
import DealsHeader from "./DealsHeader";
import DealsGrid from "./DealsGrid";

const DealsSection: React.FC = () => {
  return (
    <section className="relative w-full overflow-hidden py-24 sm:py-28">
      <DealBackground />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10">
        <DealsHeader />
        <DealsGrid />
      </div>
    </section>
  );
};

export default DealsSection;
