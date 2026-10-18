import AboutHero from "@/components/about/AboutHero";
import OurPurpose from "@/components/about/OurPurpose";
import BrandStrip from "@/components/about/BrandStrip";
import OurStory from "@/components/about/OurStory";


import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "About Us",
  description: "Discover the vision, philosophy, and people behind WAYLUME, where meaningful journeys and extraordinary experiences begin.",
};

export default function AboutPage() {
  return (
    <main>
      <AboutHero />
      <OurPurpose />
      <BrandStrip />
      <OurStory />

      <Footer />
    </main>
  );
}