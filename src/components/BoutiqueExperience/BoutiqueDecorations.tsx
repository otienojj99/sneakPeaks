import React from "react";

const BoutiqueDecorations: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-40 left-1/2 -translate-x-1/2 w-px h-16 bg-[#E4E0D8]" />
      <div
        className="absolute top-1/2 left-[4%] w-40 h-40 rounded-full blur-3xl opacity-50"
        style={{
          background:
            "radial-gradient(circle, rgba(207,255,4,0.06) 0%, rgba(207,255,4,0) 70%)",
        }}
      />
    </div>
  );
};

export default BoutiqueDecorations;
