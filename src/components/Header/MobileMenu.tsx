import Logo from "./Logo";
import Navigation from "./Navigation";
import CTAButton from "./CTAButton";
// import MobileMenu from "./MobileMenu";

const MobileMenu = () => {
  return (
    <div className="md:hidden">
      <button className="rounded-full bg-blaze px-4 py-2 font-body font-semibold text-white transition hover:scale-105">
        MENU
      </button>
    </div>
  );
};

export default MobileMenu;
