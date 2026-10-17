import Hero from "@/components/home/Hero";
import TravelServices from "@/components/home/TravelServices";
import FeaturedDestinations from "@/components/home/FeaturedDestinations";
import TravelExperiences from "@/components/home/TravelExperiences";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import TravelVideo from "@/components/home/TravelVideo";
import TravelDeals from "@/components/home/TravelDeals";
import UpcomingAdventures from "@/components/home/UpcomingAdventures";
import Testimonials from "@/components/home/Testimonials";

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
    </main>
  );
}