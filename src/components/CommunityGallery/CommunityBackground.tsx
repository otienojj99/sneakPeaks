import React from "react";

const CommunityBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#F5F3EE]">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] rounded-full blur-[160px]"
        style={{
          background:
            "radial-gradient(circle, rgba(20,21,26,0.025) 0%, rgba(20,21,26,0) 70%)",
        }}
      />
    </div>
  );
};

export default CommunityBackground;
