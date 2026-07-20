import React from "react";

const LifestyleBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#F5F3EE]">
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[300px] rounded-full blur-[160px]"
        style={{
          background:
            "radial-gradient(circle, rgba(20,21,26,0.03) 0%, rgba(20,21,26,0) 70%)",
        }}
      />
    </div>
  );
};

export default LifestyleBackground;
