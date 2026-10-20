import Container from "@/components/shared/Container";
import Reveal from "@/components/shared/Reveal";
import TripCard from "@/components/trip/TripCard";

import { getRelatedTrips } from "@/lib/trips";

export default function TripRelated({
  trip,
  limit = 3,
  title = "Explore All Our Trips",
  description = "Every journey is carefully crafted to bring your travel dreams to life.",
}) {
  if (!trip) return null;

  const relatedTrips = getRelatedTrips(trip, limit);

  if (relatedTrips.length === 0) return null;

  return (
    <section
      id="related-trips"
      aria-labelledby="related-trips-heading"
      className="scroll-mt-24 overflow-hidden bg-white py-20 transition-colors duration-300 dark:bg-[#101112] sm:py-24 lg:py-28"
    >
      <Container>
        <Reveal>
          <div className="mx-auto max-w-[760px] text-center">
            <h2
              id="related-trips-heading"
              className="font-heading text-[30px] leading-[1.2] font-semibold tracking-[-0.055em] text-[#242424] dark:text-white sm:text-[36px] lg:text-[40px]"
            >
              {title}
            </h2>

            <p className="mx-auto mt-4 max-w-[560px] text-[14px] leading-[1.75] font-normal text-[#858585] dark:text-[#aaaaaa] sm:text-[16px]">
              {description}
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
          {relatedTrips.map((relatedTrip, index) => (
            <Reveal
              key={relatedTrip.slug}
              delay={(index % 3) * 100}
              className="min-w-0"
            >
              <TripCard
                trip={relatedTrip}
                index={index}
              />
            </Reveal>
          ))}
        </div>

        <p className="mt-7 text-center text-[11px] leading-[1.7] text-[#999999] dark:text-[#888888] sm:text-[12px]">
          Explore sample itineraries with indicative prices and illustrative
          departure dates. Availability is not currently confirmed.
        </p>
      </Container>
    </section>
  );
}