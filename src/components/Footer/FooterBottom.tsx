import React from "react";

const paymentMethods = ["Visa", "Mastercard", "M-Pesa", "PayPal"];

const FooterBottom = () => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-6 py-8">
      <p className="text-xs text-[#8B8681] text-center sm:text-left">
        © 2026 Ground.Zero. Crafted with care.
      </p>

      <div className="flex items-center gap-2 flex-wrap justify-center">
        {paymentMethods.map((method) => (
          <span
            key={method}
            className="rounded-md border border-[#F5F3EE]/15 px-2.5 py-1 text-[10px] font-medium tracking-wide text-[#8B8681]"
          >
            {method}
          </span>
        ))}
      </div>

      <p className="text-xs text-[#8B8681] text-center sm:text-right">
        Every step starts here.
      </p>
    </div>
  );
};

export default FooterBottom;
