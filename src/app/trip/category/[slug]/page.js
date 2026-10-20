import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  IoArrowForwardOutline,
  IoCheckmarkOutline,
  IoLocationOutline,
} from "react-icons/io5";

import Container from "@/components/shared/Container";
import Reveal from "@/components/shared/Reveal";

import TripHero from "@/components/trip/TripHero";
import TripCategories from "@/components/trip/TripCategories";
import TripExplorer from "@/components/trip/TripExplorer";
import BookingSteps from "@/components/trip/BookingSteps";
import Footer from "@/components/layout/Footer";

import { tripCategories } from "@/data/tripPage";
import { travelExperiences } from "@/data/home";
import { trips } from "@/data/trips";

export function generateStaticParams() {
  return tripCategories.map((category) => ({
    slug: category.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const category = tripCategories.find(
    (item) => item.slug === slug
  );

  if (!category) {
    return {
      title: "Category Not Found | WAYLUME",
    };
  }

  const experience = travelExperiences.find(
    (item) => item.categorySlug === category.slug
  );

  return {
    title: `${category.title} | WAYLUME`,
    description:
      experience?.details ||
      category.description ||
      "Discover extraordinary travel experiences with WAYLUME.",
  };
}

export default async function TripCategoryPage({ params }) {
  const { slug } = await params;

  const category = tripCategories.find(
    (item) => item.slug === slug
  );

  if (!category) notFound();

  const experience = travelExperiences.find(
    (item) =>
      item.categorySlug === category.slug ||
      item.categoryId === category.id
  );

  const relatedTrips = trips.filter((trip) =>
    trip.categories.includes(category.id)
  );

  const featuredTrip =
    relatedTrips.find(
      (trip) => trip.slug === experience?.featuredTripSlug
    ) || relatedTrips[0] || null;

  return (
    <main>
      <TripHero
        title={category.title}
        description={category.description}
        image={category.image}
        imageAlt={
          category.alt ||
          category.imageAlt ||
          `${category.title} travel experience`
        }
      />

      <TripCategories activeCategoryId={category.id} />

      {experience && (
        <section
          id="category-experience"
          aria-labelledby="category-experience-heading"
          className="overflow-hidden bg-white pt-18 pb-8 transition-colors duration-300 dark:bg-[#101112] sm:pt-22 lg:pt-26 lg:pb-12"
        >
          <Container>
            <div className="grid min-w-0 items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-14 xl:gap-20">
              <Reveal className="min-w-0">
                <div className="group relative h-85 w-full overflow-hidden rounded-2xl bg-[#e6e9e6] dark:bg-[#292c2e] sm:h-112.5 lg:h-130 xl:h-140">
                  <Image
                    src={experience.image}
                    alt={
                      experience.imageAlt ||
                      `${experience.title} travel experience`
                    }
                    fill
                    quality={90}
                    sizes="(max-width: 1023px) 100vw, 50vw"
                    className="object-cover object-center transition-transform duration-1200 ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:group-hover:scale-[1.045]"
                  />

                  <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/55 via-transparent to-black/5" />

                  <div className="absolute right-0 bottom-0 left-0 p-6 text-white sm:p-8">
                    <span className="inline-flex items-center rounded-full border border-white/30 bg-white/15 px-4 py-2 text-[11px] font-medium tracking-[0.02em] backdrop-blur-md sm:text-[12px]">
                      Discover Your Travel Style
                    </span>

                    <h3 className="font-heading mt-4 text-[28px] leading-[1.2] font-semibold tracking-tighter sm:text-[34px]">
                      {experience.title}
                    </h3>

                    <p className="mt-2 max-w-107.5 text-[13px] leading-[1.7] text-white/90 sm:text-[14px]">
                      {experience.description}
                    </p>
                  </div>
                </div>
              </Reveal>

              <div className="min-w-0">
                <Reveal>
                  <span className="inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.12em] text-[#858585] uppercase dark:text-[#aaaaaa] sm:text-[12px]">
                    WAYLUME Travel Experiences
                  </span>

                  <h2
                    id="category-experience-heading"
                    className="font-heading mt-5 max-w-155 text-[30px] leading-[1.2] font-semibold tracking-[-0.055em] text-[#242424] dark:text-white sm:text-[36px] lg:text-[40px]"
                  >
                    Experience the Beauty of{" "}
                    {experience.title}
                  </h2>

                  <p className="mt-5 max-w-135 text-[14px] leading-[1.8] font-normal text-[#858585] dark:text-[#aaaaaa] sm:mt-6 sm:text-[16px]">
                    {experience.details}
                  </p>
                </Reveal>

                <Reveal delay={120}>
                  <div className="mt-8 border-t border-[#ececec] pt-7 dark:border-white/10 sm:mt-9">
                    <h3 className="font-heading text-[17px] font-semibold tracking-[-0.035em] text-[#242424] dark:text-white sm:text-[18px]">
                      Experience Highlights
                    </h3>

                    <ul className="mt-5 space-y-4">
                      {experience.highlights.map((highlight) => (
                        <li
                          key={highlight}
                          className="flex items-start gap-3 text-[14px] leading-[1.7] text-[#777777] dark:text-[#b0b0b0] sm:text-[15px]"
                        >
                          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#f0f1ef] text-[#242424] dark:bg-[#303234] dark:text-white">
                            <IoCheckmarkOutline
                              aria-hidden="true"
                              className="text-[14px]"
                            />
                          </span>

                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>

                {featuredTrip && (
                  <Reveal delay={180}>
                    <div className="mt-8 border-t border-[#ececec] pt-7 dark:border-white/10 sm:mt-9">
                      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                        <h3 className="font-heading text-[17px] font-semibold tracking-[-0.035em] text-[#242424] dark:text-white sm:text-[18px]">
                          Featured Journey
                        </h3>

                        <span className="text-[12px] font-normal text-[#858585] dark:text-[#aaaaaa]">
                          {relatedTrips.length}{" "}
                          {relatedTrips.length === 1
                            ? "Related Trip"
                            : "Related Trips"}
                        </span>
                      </div>

                      <Link
                        href={`/trip/${featuredTrip.slug}`}
                        className="group/trip flex items-center gap-4 rounded-xl border border-[#eeeeee] bg-[#fafafa] p-3 transition-all duration-300 hover:border-[#d3d3d3] hover:bg-[#f5f5f5] dark:border-white/10 dark:bg-[#202224] dark:hover:border-white/20 dark:hover:bg-[#292b2d]"
                      >
                        <div className="relative h-23.5 w-23.5 shrink-0 overflow-hidden rounded-lg bg-[#e5e5e5] sm:h-27.5 sm:w-32.5">
                          <Image
                            src={featuredTrip.image}
                            alt={featuredTrip.imageAlt}
                            fill
                            sizes="(max-width: 639px) 94px, 130px"
                            className="object-cover object-center transition-transform duration-700 motion-safe:group-hover/trip:scale-[1.08]"
                          />
                        </div>

                        <div className="min-w-0 flex-1">
                          <h4 className="font-heading text-[14px] leading-[1.4] font-semibold tracking-[-0.03em] text-[#242424] dark:text-white sm:text-[16px]">
                            {featuredTrip.title}
                          </h4>

                          <p className="mt-2 flex items-center gap-1.5 text-[12px] leading-normal text-[#858585] dark:text-[#aaaaaa]">
                            <IoLocationOutline
                              aria-hidden="true"
                              className="shrink-0 text-[15px]"
                            />

                            <span className="truncate">
                              {featuredTrip.location}
                            </span>
                          </p>

                          <p className="mt-1.5 text-[12px] text-[#858585] dark:text-[#aaaaaa]">
                            {featuredTrip.durationDays} Days
                          </p>
                        </div>

                        <IoArrowForwardOutline
                          aria-hidden="true"
                          className="mr-1 shrink-0 text-[18px] text-[#242424] transition-transform duration-300 group-hover/trip:translate-x-1 dark:text-white"
                        />
                      </Link>
                    </div>
                  </Reveal>
                )}

                <Reveal delay={240}>
                  <div className="mt-8 flex flex-wrap items-center gap-4">
                    <Link
                      href="#all-trips"
                      className="group/cta relative inline-flex h-12 items-center justify-center gap-3 overflow-hidden rounded-lg bg-[#242424] px-6 text-[13px] font-medium text-white shadow-[0_5px_18px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_25px_rgba(0,0,0,0.14)] dark:bg-white dark:text-[#242424]"
                    >
                      <span className="absolute inset-0 -translate-x-full bg-[#454545] transition-transform duration-500 ease-out group-hover/cta:translate-x-0 dark:bg-[#e8e8e8]" />

                      <span className="relative z-10">
                        Explore Related Trips
                      </span>

                      <IoArrowForwardOutline
                        aria-hidden="true"
                        className="relative z-10 text-[17px] transition-transform duration-300 group-hover/cta:translate-x-1"
                      />
                    </Link>

                    {featuredTrip && (
                      <Link
                        href={`/trip/${featuredTrip.slug}`}
                        className="group/link inline-flex h-12 items-center justify-center gap-2 text-[13px] font-medium text-[#555555] transition-colors duration-300 hover:text-[#242424] dark:text-[#cccccc] dark:hover:text-white"
                      >
                        View Featured Trip

                        <IoArrowForwardOutline
                          aria-hidden="true"
                          className="text-[17px] transition-transform duration-300 group-hover/link:translate-x-1"
                        />
                      </Link>
                    )}
                  </div>
                </Reveal>
              </div>
            </div>
          </Container>
        </section>
      )}

      <TripExplorer
        categoryId={category.id}
        heading={`${category.title} Journeys`}
      />

      <BookingSteps />

      <Footer />
    </main>
  );
}