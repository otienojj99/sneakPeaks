import React from "react";

const CategoryBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#F5F3EE]">
      <div
        className="absolute -top-40 right-0 w-[560px] h-[560px] rounded-full blur-[140px]"
        style={{
          background:
            "radial-gradient(circle, rgba(207,255,4,0.06) 0%, rgba(207,255,4,0) 70%)",
        }}
      />
      <div
        className="absolute bottom-0 -left-40 w-[480px] h-[480px] rounded-full blur-[130px]"
        style={{
          background:
            "radial-gradient(circle, rgba(20,21,26,0.03) 0%, rgba(20,21,26,0) 70%)",
        }}
      />
    </div>
  );
};

export default CategoryBackground;
