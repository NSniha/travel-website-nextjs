import Link from "next/link";
import { notFound } from "next/navigation";
import {
  IoChevronForwardOutline,
  IoLocationOutline,
  IoTimeOutline,
} from "react-icons/io5";

import Container from "@/components/shared/Container";
import Reveal from "@/components/shared/Reveal";
import Footer from "@/components/layout/Footer";

import TripImageGallery from "@/components/trip/details/TripImageGallery";
import TripActivities from "@/components/trip/details/TripActivities";
import TripBookingCard from "@/components/trip/details/TripBookingCard";
import TripTestimonials from "@/components/trip/details/TripTestimonials";
import TripRelated from "@/components/trip/details/TripRelated";

import { tripDetails } from "@/data/tripDetails";
import { getAllTrips, getTripBySlug } from "@/lib/trips";

export function generateStaticParams() {
  return getAllTrips().map((trip) => ({
    slug: trip.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const trip = getTripBySlug(slug);

  if (!trip) {
    return {
      title: "Trip Not Found | WAYLUME",
      description: "The requested travel experience could not be found.",
    };
  }

  const details = tripDetails[trip.slug];

  const title = details?.breadcrumbTitle || trip.title;

  const description =
    trip.summary ||
    details?.overview ||
    `Explore ${trip.location} with WAYLUME.`;

  return {
    title: `${title} | WAYLUME`,
    description,

    openGraph: {
      title: `${title} | WAYLUME`,
      description,
      type: "website",
      images: [
        {
          url: trip.image,
          alt: trip.imageAlt || title,
        },
      ],
    },
  };
}

export default async function TripDetailsPage({ params }) {
  const { slug } = await params;

  const trip = getTripBySlug(slug);

  if (!trip) notFound();

  const details = tripDetails[trip.slug] || {};

  const heroTitle = details.heroTitle || trip.title;

  const breadcrumbTitle =
    details.breadcrumbTitle || trip.title;

  return (
    <main className="min-h-screen bg-white transition-colors duration-300 dark:bg-[#101112]">

      {/* Trip Header & Hero Gallery */}

      <section
        aria-labelledby="trip-details-heading"
        className="overflow-hidden bg-white pt-8 pb-13 transition-colors duration-300 dark:bg-[#101112] sm:pt-10 sm:pb-15 lg:pt-12 lg:pb-18"
      >
        <Container>

          {/* Breadcrumb */}

          <Reveal>
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-2 text-[12px] leading-[1.6] sm:text-[13px]">
                <li>
                  <Link
                    href="/trip"
                    className="font-medium text-[#858585] transition-colors duration-300 hover:text-[#242424] dark:text-[#aaaaaa] dark:hover:text-white"
                  >
                    Trip
                  </Link>
                </li>

                <li aria-hidden="true">
                  <IoChevronForwardOutline className="text-[13px] text-[#aaaaaa] dark:text-[#777777]" />
                </li>

                <li
                  aria-current="page"
                  className="font-medium text-[#333333] dark:text-white"
                >
                  {breadcrumbTitle}
                </li>
              </ol>
            </nav>
          </Reveal>

          {/* Hero Heading */}

          <div className="mt-5 flex flex-col gap-5 sm:mt-6 lg:flex-row lg:items-end lg:justify-between lg:gap-8">
            <Reveal className="min-w-0">
              <h1
                id="trip-details-heading"
                className="font-heading max-w-225 text-[clamp(35px,6.5vw,52px)] leading-[1.12] font-medium tracking-[-0.06em] text-[#242424] dark:text-white sm:text-[clamp(44px,5vw,60px)] lg:text-[clamp(46px,4.2vw,64px)]"
              >
                {heroTitle}
              </h1>
            </Reveal>

            {/* Destination & Duration */}

            <Reveal
              delay={120}
              className="flex shrink-0 flex-wrap items-center gap-x-5 gap-y-3 lg:pb-2"
            >
              <div className="flex items-center gap-2">
                <IoLocationOutline
                  aria-hidden="true"
                  className="shrink-0 text-[17px] text-[#888888] dark:text-[#aaaaaa]"
                />

                <span className="text-[12px] font-medium text-[#777777] dark:text-[#cccccc] sm:text-[13px]">
                  {trip.location}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <IoTimeOutline
                  aria-hidden="true"
                  className="shrink-0 text-[17px] text-[#888888] dark:text-[#aaaaaa]"
                />

                <span className="text-[12px] font-medium text-[#777777] dark:text-[#cccccc] sm:text-[13px]">
                  {trip.durationDays} Days
                </span>
              </div>
            </Reveal>
          </div>

          {/* Asymmetric Hero Gallery */}

          <Reveal delay={180} className="mt-7 sm:mt-8 lg:mt-9">
            <TripImageGallery
              trip={trip}
              details={details}
              variant="hero"
              showTitle={false}
            />
          </Reveal>
        </Container>
      </section>

      {/* Description, Activities, Gallery, Testimonials & Sidebar */}

      <section
        aria-label={`${trip.title} journey information`}
        className="bg-white pt-2 pb-18 transition-colors duration-300 dark:bg-[#101112] sm:pb-22 lg:pt-4 lg:pb-26"
      >
        <Container>
          <div className="grid min-w-0 grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,1.7fr)_minmax(300px,0.9fr)] lg:gap-10 xl:gap-15">

            {/* Left Content Column */}

            <div className="min-w-0">

              {/* Description & Activities */}

              <TripActivities
                key={`activities-${trip.slug}`}
                trip={trip}
                details={details}
              />

              {/* Photo Gallery */}

              <div className="mt-11 sm:mt-13 lg:mt-15">
                <Reveal>
                  <TripImageGallery
                    trip={trip}
                    details={details}
                    variant="gallery"
                  />
                </Reveal>
              </div>

              {/* Testimonials */}

              <div className="mt-11 sm:mt-13 lg:mt-15">
                <TripTestimonials />
              </div>
            </div>

            {/* Right Sidebar */}

            <div className="min-w-0 lg:self-stretch">
              <Reveal delay={150} className="min-w-0">
                <TripBookingCard
                  key={`booking-${trip.slug}`}
                  trip={trip}
                  details={details}
                />
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* Related Trips */}

      <TripRelated
        trip={trip}
        limit={3}
        title="Explore All Our Trips"
        description="Every journey is carefully crafted to bring your travel dreams to life."
      />

      {/* Shared Footer */}

      <Footer />
    </main>
  );
}