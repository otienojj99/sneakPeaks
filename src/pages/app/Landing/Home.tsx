import UtilityBar from "../../../components/UtilityBar/UtilityBar";
import LandingHeader from "../../../components/Header/LandingHeader";
import Hero from "../../../components/Hero/Hero";
import TrustSection from "../../../components/TrustSection/TrustSection";
import CategoriesSection from "../../../components/CategoriesSection/CategoriesSection";
import NewArrivalsSection from "../../../components/NewArrivals/NewArrivalsSection";
import PromoBanner from "../../../components/PromoBanner/PromoBanner";
import BestSellersSection from "../../../components/BestSellerSection/BestSellersSection";
import LifestyleBanner from "../../../components/LifestyleBanner/LifestyleBanner";
import DealsSection from "../../../components/Deals/DealsSection";
import BoutiqueExperienceSection from "../../../components/BoutiqueExperience/BoutiqueExperienceSection";
import CommunityGallerySection from "../../../components/CommunityGallery/CommunityGallerySection";
import MembershipSection from "../../../components/Membership/MembershipSection";

const Home = () => {
  return (
    <>
      <UtilityBar />
      <LandingHeader />
      <Hero />
      <TrustSection />
      <CategoriesSection />
      <NewArrivalsSection />
      <PromoBanner />
      <BestSellersSection />
      <LifestyleBanner />
      <DealsSection />
      <BoutiqueExperienceSection />
      <CommunityGallerySection />
      <MembershipSection />

      {/* Rest of the page */}
    </>
  );
};

export default Home;
