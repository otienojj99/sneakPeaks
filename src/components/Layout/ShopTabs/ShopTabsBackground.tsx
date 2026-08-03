import React from "react";

interface Props {
  stuck: boolean;
}

const ShopTabsBackground = ({ stuck }: Props) => {
  return (
    <div
      className="absolute inset-0 transition-all duration-300"
      style={{
        background: stuck ? "rgba(245,243,238,0.85)" : "#F5F3EE",
        borderBottom: "1px solid #E4E0D8",
        backdropFilter: stuck ? "blur(14px)" : "none",
        boxShadow: stuck ? "0 8px 20px -12px rgba(20,21,26,0.1)" : "none",
      }}
    />
  );
};

export default ShopTabsBackground;
