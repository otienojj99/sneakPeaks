import React from "react";

const FooterBackground: React.FC = () => {
    return (
    <div className="absolute inset-0 overflow-hidden bg-[#14151A]">
      <div
        className="absolute -top-20 left-1/3 w-[560px] h-[560px] rounded-full blur-[150px]"
        style={{ background: "radial-gradient(circle, rgba(207,255,4,0.08) 0%, rgba(207,255,4,0) 70%)" }}
      />
      <div
        className="absolute bottom-10 right-[12%] w-24 h-24 rounded-full blur-2xl opacity-60"
        style={{ background: "radial-gradient(circle, rgba(255,69,38,0.10) 0%, rgba(255,69,38,0) 70%)" }}
      />
    </div>
    )
};

export default FooterBackground;
