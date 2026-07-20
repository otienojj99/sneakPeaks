import React from "react";
import { communityPosts } from "./communityData";
import CommunityCard from "./CommunityCard";

const CommunityGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-4 gap-5 sm:gap-6 auto-rows-auto sm:auto-rows-[200px] lg:auto-rows-[220px]">
      {communityPosts.map((post, i) => (
        <CommunityCard key={post.id} post={post} index={i} />
      ))}
    </div>
  );
};

export default CommunityGrid;
