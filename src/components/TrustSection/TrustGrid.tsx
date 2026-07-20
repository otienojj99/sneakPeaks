import React from "react";
import { trustCards } from "./trustData";
import TrustCard from "./TrustCard";

const TrustGrid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
      {trustCards.map((card, i) => (
        <TrustCard key={card.id} data={card} index={i} />
      ))}
    </div>
  );
};

export default TrustGrid;
