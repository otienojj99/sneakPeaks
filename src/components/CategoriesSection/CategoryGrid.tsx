import React from "react";
import { categories } from "./categoryData";
import CategoryCard from "./CategoryCard";

const CategoryGrid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      {categories.map((c, i) => (
        <CategoryCard key={c.id} data={c} index={i} />
      ))}
    </div>
  );
};

export default CategoryGrid;
