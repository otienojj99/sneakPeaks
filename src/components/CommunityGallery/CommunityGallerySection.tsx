import React from "react";
import CommunityBackground from "./CommunityBackground";
import CommunityGalleryHeader from "./CommunityGalleryHeader";
import CommunityGrid from "./CommunityGrid";

const CommunityGallerySection = () => {
  return (
    <section className="relative w-full overflow-hidden py-24 sm:py-28">
      <CommunityBackground />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10">
        <CommunityGalleryHeader />
        <CommunityGrid />
      </div>
    </section>
  );
};

export default CommunityGallerySection;
