import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  IoArrowBackOutline,
  IoArrowForwardOutline,
  IoCalendarOutline,
  IoCheckmarkOutline,
  IoLocationOutline,
  IoTimeOutline,
} from "react-icons/io5";

import Container from "@/components/shared/Container";
import Reveal from "@/components/shared/Reveal";
import TripCard from "@/components/trip/TripCard";
import Footer from "@/components/layout/Footer";

import { trips } from "@/data/trips";
import { travelExperiences } from "@/data/home";
import { getTripBySlug, formatTripPrice } from "@/lib/trips";

export function generateStaticParams() {
  return trips.map((trip) => ({
    slug: trip.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const trip = getTripBySlug(slug);

  if (!trip) {
    return {
      title: "Trip Not Found | WAYLUME",
    };
  }

  return {
    title: `${trip.title} | WAYLUME`,
    description: trip.summary,
    openGraph: {
      title: `${trip.title} | WAYLUME`,
      description: trip.summary,
      images: [trip.image],
    },
  };
}

export default async function TripDetailsPage({ params }) {
  const { slug } = await params;
  const trip = getTripBySlug(slug);

  if (!trip) notFound();

  const relatedExperiences = travelExperiences.filter((experience) =>
    trip.categories.includes(experience.categoryId)
  );

  const relatedTrips = trips
    .filter((item) => item.slug !== trip.slug)
    .sort((a, b) => {
      const scoreA = a.categories.filter((category) =>
        trip.categories.includes(category)
      ).length;

      const scoreB = b.categories.filter((category) =>
        trip.categories.includes(category)
      ).length;

      return scoreB - scoreA;
    })
    .slice(0, 3);

  return (
    <main>
      {/* Trip Hero */}
      <section className="bg-white pt-10 pb-17.5 transition-colors duration-300 dark:bg-[#101112] sm:pt-14 sm:pb-22.5 lg:pt-17.5 lg:pb-25">
        <Container>
          <Reveal>
            <Link
              href="/trip#all-trips"
              className="group inline-flex items-center gap-2 text-[13px] font-medium text-[#858585] transition-colors duration-300 hover:text-[#242424] dark:text-[#aaaaaa] dark:hover:text-white"
            >
              <IoArrowBackOutline
                aria-hidden="true"
                className="text-[17px] transition-transform duration-300 group-hover:-translate-x-1"
              />

              Back to All Trips
            </Link>
          </Reveal>

          <div className="mt-8 grid min-w-0 items-end gap-6 lg:mt-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-14">
            <Reveal className="min-w-0">
              <span className="inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.12em] text-[#858585] uppercase dark:text-[#aaaaaa] sm:text-[12px]">
                Discover Your Next Journey
              </span>

              <h1 className="font-heading mt-5 max-w-195 text-[clamp(37px,7vw,60px)] leading-[1.085] font-medium tracking-[-0.06em] text-[#242424] dark:text-white sm:text-[clamp(48px,6vw,68px)] lg:text-[clamp(56px,4.9vw,78px)]">
                {trip.title}
              </h1>
            </Reveal>

            <Reveal delay={120} className="min-w-0 lg:pb-2">
              <p className="max-w-137.5 text-[14px] leading-[1.8] text-[#858585] dark:text-[#aaaaaa] sm:text-[16px]">
                {trip.summary}
              </p>

              <div className="mt-5 flex items-center gap-2 text-[13px] text-[#555555] dark:text-[#cccccc]">
                <IoLocationOutline
                  aria-hidden="true"
                  className="shrink-0 text-[18px]"
                />

                <span>{trip.location}</span>
              </div>
            </Reveal>
          </div>

          <Reveal delay={160} className="mt-10 sm:mt-12 lg:mt-14">
            <div className="group relative aspect-[1.05] w-full overflow-hidden rounded-2xl bg-[#e4e8e5] dark:bg-[#292c2e] sm:aspect-[1.8] lg:aspect-[2.25]">
              <Image
                src={trip.image}
                alt={trip.imageAlt}
                fill
                priority
                quality={90}
                sizes="(max-width: 1536px) 95vw, 1490px"
                className="object-cover object-center transition-transform duration-1400 ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:group-hover:scale-[1.035]"
              />

              <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/55 via-transparent to-black/5" />

              <div className="absolute right-0 bottom-0 left-0 flex flex-wrap items-end justify-between gap-4 p-6 text-white sm:p-8 lg:p-10">
                <div>
                  <span className="text-[11px] font-medium tracking-widest text-white/80 uppercase sm:text-[12px]">
                    Explore the Extraordinary
                  </span>

                  <h2 className="font-heading mt-2 text-[25px] leading-[1.2] font-semibold tracking-[-0.045em] sm:text-[32px]">
                    {trip.location}
                  </h2>
                </div>

                <span className="rounded-full border border-white/30 bg-white/15 px-4 py-2 text-[12px] font-medium text-white backdrop-blur-md sm:text-[13px]">
                  {trip.durationDays} Days Journey
                </span>
              </div>
            </div>
          </Reveal>

          {/* Trip Overview */}
          <div className="mt-12 grid min-w-0 items-start gap-12 sm:mt-14 lg:mt-17.5 lg:grid-cols-[minmax(0,1fr)_330px] lg:gap-16 xl:gap-24">
            <div className="min-w-0">
              <Reveal>
                <h2 className="font-heading text-[30px] leading-[1.2] font-semibold tracking-[-0.055em] text-[#242424] dark:text-white sm:text-[36px] lg:text-[40px]">
                  About This Journey
                </h2>

                <p className="mt-6 max-w-190 text-[14px] leading-[1.9] text-[#858585] dark:text-[#aaaaaa] sm:text-[16px]">
                  {trip.description || trip.summary}
                </p>
              </Reveal>

              <Reveal delay={120}>
                <div className="mt-10 border-t border-[#eaeaea] pt-9 dark:border-white/10 sm:mt-12 sm:pt-10">
                  <h3 className="font-heading text-[24px] leading-[1.3] font-semibold tracking-[-0.045em] text-[#242424] dark:text-white sm:text-[28px]">
                    Journey Highlights
                  </h3>

                  <ul className="mt-7 grid gap-5 sm:grid-cols-2 sm:gap-x-8">
                    {trip.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="flex items-start gap-3 text-[14px] leading-[1.7] text-[#777777] dark:text-[#b0b0b0] sm:text-[15px]"
                      >
                        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#f1f2ef] text-[#242424] dark:bg-[#292b2d] dark:text-white">
                          <IoCheckmarkOutline
                            aria-hidden="true"
                            className="text-[15px]"
                          />
                        </span>

                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>

              {/* Category Navigation */}
              {relatedExperiences.length > 0 && (
                <Reveal delay={180}>
                  <div className="mt-10 border-t border-[#eaeaea] pt-9 dark:border-white/10 sm:mt-12 sm:pt-10">
                    <h3 className="font-heading text-[24px] leading-[1.3] font-semibold tracking-[-0.045em] text-[#242424] dark:text-white sm:text-[28px]">
                      Travel Categories
                    </h3>

                    <p className="mt-3 text-[14px] leading-[1.75] text-[#858585] dark:text-[#aaaaaa]">
                      Discover more experiences connected to this journey.
                    </p>

                    <div className="mt-6 flex flex-wrap gap-3">
                      {relatedExperiences.map((experience) => (
                        <Link
                          key={experience.id}
                          href={`/trip/category/${experience.categorySlug}`}
                          className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#e6e6e6] bg-[#fafafa] px-4 text-[12px] font-medium text-[#333333] transition-all duration-300 hover:border-[#242424] hover:bg-[#242424] hover:text-white dark:border-white/15 dark:bg-[#1e2022] dark:text-white dark:hover:border-white dark:hover:bg-white dark:hover:text-[#242424] sm:text-[13px]"
                        >
                          {experience.title}

                          <IoArrowForwardOutline
                            aria-hidden="true"
                            className="text-[15px] transition-transform duration-300 group-hover:translate-x-1"
                          />
                        </Link>
                      ))}
                    </div>
                  </div>
                </Reveal>
              )}
            </div>

            {/* Trip Information Card */}
            <Reveal delay={160} className="min-w-0 lg:sticky lg:top-8">
              <aside className="rounded-2xl border border-[#ededed] bg-[#fafafa] p-6 transition-colors duration-300 dark:border-white/10 dark:bg-[#1e2022] sm:p-7">
                <span className="text-[12px] font-medium text-[#858585] dark:text-[#aaaaaa]">
                  Indicative Starting Price
                </span>

                <p className="font-heading mt-2 text-[34px] leading-[1.2] font-semibold tracking-[-0.055em] text-[#242424] dark:text-white sm:text-[38px]">
                  {formatTripPrice(trip.priceFrom, trip.currency)}
                </p>

                <div className="mt-7 space-y-5 border-t border-[#e6e6e6] pt-7 dark:border-white/10">
                  <div className="flex items-start gap-3">
                    <IoLocationOutline
                      aria-hidden="true"
                      className="mt-0.5 shrink-0 text-[20px] text-[#555555] dark:text-[#cccccc]"
                    />

                    <div>
                      <p className="text-[12px] text-[#858585] dark:text-[#aaaaaa]">
                        Destination
                      </p>

                      <p className="mt-1 text-[14px] font-medium text-[#242424] dark:text-white">
                        {trip.location}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <IoTimeOutline
                      aria-hidden="true"
                      className="mt-0.5 shrink-0 text-[20px] text-[#555555] dark:text-[#cccccc]"
                    />

                    <div>
                      <p className="text-[12px] text-[#858585] dark:text-[#aaaaaa]">
                        Duration
                      </p>

                      <p className="mt-1 text-[14px] font-medium text-[#242424] dark:text-white">
                        {trip.durationDays} Days
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <IoCalendarOutline
                      aria-hidden="true"
                      className="mt-0.5 shrink-0 text-[20px] text-[#555555] dark:text-[#cccccc]"
                    />

                    <div>
                      <p className="text-[12px] text-[#858585] dark:text-[#aaaaaa]">
                        Sample Travel Dates
                      </p>

                      <p className="mt-1 text-[14px] font-medium text-[#242424] dark:text-white">
                        {trip.dateLabel}
                      </p>
                    </div>
                  </div>
                </div>

                <Link
                  href="#related-trips"
                  className="group mt-8 inline-flex h-12 w-full items-center justify-center gap-3 rounded-lg bg-[#242424] px-5 text-[13px] font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#454545] dark:bg-white dark:text-[#242424] dark:hover:bg-[#eeeeee]"
                >
                  Explore Similar Trips

                  <IoArrowForwardOutline
                    aria-hidden="true"
                    className="text-[17px] transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>

                <p className="mt-5 text-[11px] leading-[1.7] text-[#929292] dark:text-[#999999]">
                  Sample itinerary and indicative pricing only. Dates,
                  availability and booking are not currently confirmed.
                </p>
              </aside>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Related Travel Experiences */}
      {relatedExperiences.length > 0 && (
        <section
          id="related-experiences"
          aria-labelledby="related-experiences-heading"
          className="bg-[#f8f8f8] py-20 transition-colors duration-300 dark:bg-[#191b1d] sm:py-24 lg:py-28"
        >
          <Container>
            <div className="grid items-end gap-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-12">
              <Reveal>
                <h2
                  id="related-experiences-heading"
                  className="font-heading max-w-155 text-[30px] leading-[1.2] font-semibold tracking-[-0.055em] text-[#242424] dark:text-white sm:text-[36px] lg:text-[40px]"
                >
                  More Ways to Experience the World
                </h2>
              </Reveal>

              <Reveal delay={120} className="lg:justify-self-end">
                <p className="max-w-117.5 text-[14px] leading-[1.75] text-[#858585] dark:text-[#aaaaaa] sm:text-[16px]">
                  Discover inspiring travel styles and extraordinary experiences
                  that complement your next adventure.
                </p>
              </Reveal>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-12 lg:gap-6">
              {relatedExperiences.map((experience, index) => (
                <Reveal key={experience.id} delay={index * 100}>
                  <Link
                    href={`/trip/category/${experience.categorySlug}`}
                    className="group relative block h-87.5 w-full overflow-hidden rounded-2xl bg-[#e4e8e5] outline-none transition-[transform,box-shadow] duration-500 hover:-translate-y-1.5 hover:shadow-[0_15px_40px_rgba(0,0,0,0.12)] focus-visible:ring-2 focus-visible:ring-[#242424] focus-visible:ring-offset-4 dark:bg-[#292c2e] dark:focus-visible:ring-white dark:focus-visible:ring-offset-[#191b1d] sm:h-97.5 lg:h-105"
                  >
                    <Image
                      src={experience.image}
                      alt={experience.imageAlt || experience.title}
                      fill
                      quality={85}
                      sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 50vw"
                      className="object-cover object-center transition-transform duration-1200 ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:group-hover:scale-[1.065]"
                    />

                    <span className="absolute inset-0 bg-linear-to-t from-black/80 via-black/15 to-black/5" />

                    <span className="absolute top-5 right-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-white/15 text-white backdrop-blur-sm transition-all duration-300 group-hover:bg-white group-hover:text-[#242424]">
                      <IoArrowForwardOutline
                        aria-hidden="true"
                        className="-rotate-45 text-[19px] transition-transform duration-300 group-hover:rotate-0"
                      />
                    </span>

                    <div className="absolute right-0 bottom-0 left-0 p-6 text-white sm:p-7 lg:p-8">
                      <span className="text-[11px] font-medium tracking-widest text-white/80 uppercase sm:text-[12px]">
                        WAYLUME Experiences
                      </span>

                      <h3 className="font-heading mt-3 text-[26px] leading-[1.2] font-semibold tracking-tighter sm:text-[30px]">
                        {experience.title}
                      </h3>

                      <p className="mt-3 max-w-110 text-[13px] leading-[1.7] text-white/90 sm:text-[14px]">
                        {experience.description}
                      </p>

                      <span className="mt-5 inline-flex items-center gap-2 text-[12px] font-medium text-white sm:text-[13px]">
                        Explore Experience

                        <IoArrowForwardOutline
                          aria-hidden="true"
                          className="text-[17px] transition-transform duration-300 group-hover:translate-x-1"
                        />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Related Trips */}
      {relatedTrips.length > 0 && (
        <section
          id="related-trips"
          aria-labelledby="related-trips-heading"
          className="scroll-mt-24 bg-white py-20 transition-colors duration-300 dark:bg-[#101112] sm:py-24 lg:py-28"
        >
          <Container>
            <div className="grid items-end gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-12">
              <Reveal>
                <h2
                  id="related-trips-heading"
                  className="font-heading text-[30px] leading-[1.2] font-semibold tracking-[-0.055em] text-[#242424] dark:text-white sm:text-[36px] lg:text-[40px]"
                >
                  You Might Also Love
                </h2>
              </Reveal>

              <Reveal delay={120} className="lg:justify-self-end">
                <p className="max-w-117.5 text-[14px] leading-[1.75] text-[#858585] dark:text-[#aaaaaa] sm:text-[16px]">
                  Continue your journey of discovery with more unforgettable
                  destinations and inspiring adventures.
                </p>
              </Reveal>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3 lg:gap-6">
              {relatedTrips.map((relatedTrip, index) => (
                <Reveal
                  key={relatedTrip.id}
                  delay={index * 100}
                  className="min-w-0"
                >
                  <TripCard trip={relatedTrip} index={index} />
                </Reveal>
              ))}
            </div>

            <Reveal delay={180} className="mt-12 text-center">
              <Link
                href="/trip#all-trips"
                className="group inline-flex h-12 items-center justify-center gap-3 rounded-lg border border-[#242424] bg-transparent px-6 text-[13px] font-medium text-[#242424] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#242424] hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-[#242424]"
              >
                Explore All Trips

                <IoArrowForwardOutline
                  aria-hidden="true"
                  className="text-[17px] transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </Reveal>
          </Container>
        </section>
      )}

      <Footer />
    </main>
  );
}