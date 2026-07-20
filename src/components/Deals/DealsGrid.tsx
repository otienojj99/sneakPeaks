import React from "react";
import { deals } from "./dealsData";
import DealCard from "./DealCard";

const DealsGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 auto-rows-[minmax(0,1fr)]">
      {deals.map((deal, i) => (
        <DealCard key={deal.id} deal={deal} index={i} />
      ))}
    </div>
  );
};

export default DealsGrid;
