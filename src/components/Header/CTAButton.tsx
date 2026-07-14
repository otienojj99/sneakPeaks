import { Link } from "react-router-dom";

const CTAButton = () => {
  return (
    <Link
      to="/shop"
      className="rounded-full bg-secondary-blaze px-6 py-3 font-body font-semibold text-white transition hover:scale-105"
    >
      SHOP NOW
    </Link>
  );
};

export default CTAButton;
