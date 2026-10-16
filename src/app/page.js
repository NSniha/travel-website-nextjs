import Hero from "@/components/home/Hero";
import TravelServices from "@/components/home/TravelServices";
import FeaturedDestinations from "@/components/home/FeaturedDestinations";
import TravelExperiences from "@/components/home/TravelExperiences";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import TravelVideo from "@/components/home/TravelVideo";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <TravelServices />
      <FeaturedDestinations />
      <TravelExperiences />
      <WhyChooseUs />
      <TravelVideo />
    </main>
  );
}