import React from "react";
import { boutiqueCards, featuredStatement } from "./boutiqueData";
import BoutiqueCard from "./BoutiqueCard";

const BoutiqueGrid = () => {
  const [first, ...rest] = boutiqueCards;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
      <BoutiqueCard
        variant="value"
        icon={first.icon}
        title={first.title}
        description={first.description}
        index={0}
      />
      <BoutiqueCard
        variant="statement"
        title={featuredStatement.heading}
        description={featuredStatement.paragraph}
        index={0}
      />
      {rest.map((card, i) => (
        <BoutiqueCard
          key={card.id}
          variant="value"
          icon={card.icon}
          title={card.title}
          description={card.description}
          index={i + 1}
        />
      ))}
    </div>
  );
};

export default BoutiqueGrid;
