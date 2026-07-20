import React from "react";

const DealBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#F5F3EE]">
      <div
        className="absolute top-16 left-[6%] w-[460px] h-[460px] rounded-full blur-[140px]"
        style={{
          background:
            "radial-gradient(circle, rgba(255,69,38,0.06) 0%, rgba(255,69,38,0) 70%)",
        }}
      />
      <div
        className="absolute bottom-0 right-[8%] w-[360px] h-[360px] rounded-full blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, rgba(207,255,4,0.06) 0%, rgba(207,255,4,0) 70%)",
        }}
      />
      <div
        className="absolute top-1/3 right-1/4 w-16 h-16 rounded-full blur-xl opacity-40"
        style={{
          background:
            "radial-gradient(circle, rgba(20,21,26,0.05) 0%, rgba(20,21,26,0) 70%)",
        }}
      />
    </div>
  );
};

export default DealBackground;
