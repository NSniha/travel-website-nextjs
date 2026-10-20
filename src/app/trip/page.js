import TripHero from "@/components/trip/TripHero";
import TripCategories from "@/components/trip/TripCategories";
import TripActivities from "@/components/trip/TripActivities";
import PopularDestinations from "@/components/trip/PopularDestinations";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Explore Trips | WAYLUME",
  description: "Discover extraordinary destinations, inspiring adventures, and thoughtfully curated travel experiences with WAYLUME.",
};

export default function TripPage() {
  return (
    <main>
      <TripHero />
      <TripCategories />
      <TripActivities />
      <PopularDestinations />
      <Footer />
    </main>
  );
}