import Logo from "./Logo";
import Navigation from "./Navigation";
import CTAButton from "./CTAButton";
import MobileMenu from "./MobileMenu";

const LandingHeader = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bone">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Logo />

        <Navigation />

        <div className="flex items-center gap-4">
          <CTAButton />
          <MobileMenu />
        </div>
      </div>
    </header>
  );
};

export default LandingHeader;
