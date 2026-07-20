import React from "react";

const ProductBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#F5F3EE]">
      <div
        className="absolute top-0 left-1/3 w-[600px] h-[600px] rounded-full blur-[150px]"
        style={{
          background:
            "radial-gradient(circle, rgba(207,255,4,0.07) 0%, rgba(207,255,4,0) 70%)",
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-[420px] h-[420px] rounded-full blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, rgba(255,69,38,0.05) 0%, rgba(255,69,38,0) 70%)",
        }}
      />
      <div
        className="absolute top-1/2 -left-24 w-[320px] h-[320px] rounded-full blur-[110px]"
        style={{
          background:
            "radial-gradient(circle, rgba(20,21,26,0.03) 0%, rgba(20,21,26,0) 70%)",
        }}
      />
    </div>
  );
};

export default ProductBackground;
