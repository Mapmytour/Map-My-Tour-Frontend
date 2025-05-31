import StatsCircles from "@/components/common/AnimatedCircle";
import BookingSection from "@/components/common/BookingSection";
import BrandsLogo from "@/components/common/BrandsLogo";
import HeroSection from "@/components/common/Herosection";
import PopularDestination from "@/components/common/PopularDestination";
import PopularTourSlider from "@/components/common/PopularTourSlider";
import RecentGallery from "@/components/common/RecentGallery";
import TeamSlider from "@/components/common/TeamSlider";
import TestimonialSlider from "@/components/common/TestimonialSlider";
import TourCategorySlider from "@/components/common/TourCategorySlider";
import TravelCard from "@/components/common/TravelCard";
import TravelCardSlider from "@/components/common/TravelCardSlider";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <div>
        <HeroSection />
        <BookingSection />
        <TourCategorySlider />
        <PopularDestination />
        <TravelCard />
        <PopularTourSlider />
        <RecentGallery />
        <StatsCircles />
        <TeamSlider />
        <TestimonialSlider />
        <BrandsLogo />
        <TravelCardSlider />
      </div>
    </div>
  );
}