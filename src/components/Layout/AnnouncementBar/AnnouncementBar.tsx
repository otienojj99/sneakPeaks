import React from "react";
import AnnouncementSlider from "./AnnouncementSlider";

const AnnouncementBar: React.FC = () => {
  return (
    <div className="relative w-full h-11 overflow-hidden bg-[#14151A] border-b border-[#F5F3EE]/10">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(207,255,4,0.08) 0%, rgba(207,255,4,0) 70%)",
        }}
      />
      <div className="relative z-10 h-full flex items-center px-4 sm:px-8">
        <AnnouncementSlider />
      </div>
    </div>
  );
};

export default AnnouncementBar;
