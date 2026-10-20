import Hero from "@/components/home/Hero";
import TravelServices from "@/components/home/TravelServices";
import FeaturedDestinations from "@/components/home/FeaturedDestinations";
import TravelExperiences from "@/components/home/TravelExperiences";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import TravelVideo from "@/components/home/TravelVideo";
import TravelDeals from "@/components/home/TravelDeals";
import UpcomingAdventures from "@/components/home/UpcomingAdventures";
import Testimonials from "@/components/home/Testimonials";
import TravelTips from "@/components/home/TravelTips";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "WAYLUME | Discover Extraordinary Travel Experiences",
  description:
    "Explore breathtaking destinations, unforgettable adventures, and inspiring travel experiences with WAYLUME. Go Further. Feel More.",
  keywords: [
    "WAYLUME",
    "travel",
    "travel destinations",
    "adventure travel",
    "travel experiences",
    "holiday destinations",
    "travel inspiration",
  ],
};

export default function HomePage() {
  return (
    <main>
      <Hero />
      <TravelServices />
      <FeaturedDestinations />
      <TravelExperiences />
      <WhyChooseUs />
      <TravelVideo />
      <TravelDeals />
      <UpcomingAdventures />
      <Testimonials />
      <TravelTips />
      <Footer />
    </main>
  );
}