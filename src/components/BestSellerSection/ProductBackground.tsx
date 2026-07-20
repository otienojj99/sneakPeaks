import type React from "react";

const ProductBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#F5F3EE]">
      <div
        className="absolute top-24 left-[8%] w-[480px] h-[480px] rounded-full blur-[140px]"
        style={{
          background:
            "radial-gradient(circle, rgba(207,255,4,0.08) 0%, rgba(207,255,4,0) 70%)",
        }}
      />
      <div
        className="absolute bottom-0 right-[10%] w-[360px] h-[360px] rounded-full blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, rgba(20,21,26,0.03) 0%, rgba(20,21,26,0) 70%)",
        }}
      />
      <div
        className="absolute top-1/2 right-1/3 w-24 h-24 rounded-full blur-2xl opacity-40"
        style={{
          background:
            "radial-gradient(circle, rgba(255,69,38,0.08) 0%, rgba(255,69,38,0) 70%)",
        }}
      />
    </div>
  );
};

export default ProductBackground;
