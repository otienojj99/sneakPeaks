import React from "react";

interface Props {
  direction?: "left" | "bottom";
}

const LifestyleOverlay = ({ direction = "left" }: Props) => {
  const gradient =
    direction === "left"
      ? "linear-gradient(to right, rgba(20,21,26,0.85) 0%, rgba(20,21,26,0.35) 45%, rgba(20,21,26,0) 75%)"
      : "linear-gradient(to top, rgba(20,21,26,0.85) 0%, rgba(20,21,26,0.3) 45%, rgba(20,21,26,0) 75%)";

  return (
    <div
      className="absolute inset-0 rounded-[32px]"
      style={{ background: gradient }}
    />
  );
};

export default LifestyleOverlay;
