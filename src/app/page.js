import TripHero from "@/components/trip/TripHero";
import TripCategories from "@/components/trip/TripCategories";
import TripActivities from "@/components/trip/TripActivities";
import PopularDestinations from "@/components/trip/PopularDestinations";
import TripOffer from "@/components/trip/TripOffer";
import TripExplorer from "@/components/trip/TripExplorer";
import BookingSteps from "@/components/trip/BookingSteps";
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
      <TripOffer />
      <TripExplorer />
      <BookingSteps />
      <Footer />
    </main>
  );
}