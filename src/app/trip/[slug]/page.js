import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { IoArrowBackOutline, IoCheckmarkOutline } from "react-icons/io5";
import Container from "@/components/shared/Container";
import Footer from "@/components/layout/Footer";
import { trips } from "@/data/trips";
import { getTripBySlug, formatTripPrice } from "@/lib/trips";

export function generateStaticParams() {
  return trips.map((trip) => ({ slug: trip.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const trip = getTripBySlug(slug);

  if (!trip) return { title: "Trip Not Found | WAYLUME" };

  return {
    title: `${trip.title} | WAYLUME`,
    description: trip.summary,
  };
}

export default async function TripDetailsPage({ params }) {
  const { slug } = await params;
  const trip = getTripBySlug(slug);

  if (!trip) notFound();

  return (
    <main>
      <section className="bg-white pt-10 pb-24 dark:bg-[#101112] sm:pt-14 lg:pt-16">
        <Container>
          <Link href="/trip#all-trips" className="group inline-flex items-center gap-2 text-[13px] font-medium text-[#858585] transition-colors duration-300 hover:text-[#242424] dark:text-[#aaaaaa] dark:hover:text-white">
            <IoArrowBackOutline aria-hidden="true" className="text-[18px] transition-transform duration-300 group-hover:-translate-x-1" />
            Back to All Trips
          </Link>

          <div className="mt-8 grid items-end gap-5 lg:grid-cols-2 lg:gap-12">
            <h1 className="font-heading text-[clamp(37px,7vw,60px)] leading-[1.085] font-medium tracking-[-0.06em] text-[#242424] dark:text-white sm:text-[clamp(48px,6vw,68px)] lg:text-[clamp(56px,4.9vw,78px)]">
              {trip.title}
            </h1>

            <p className="max-w-[550px] text-[14px] leading-[1.75] text-[#858585] dark:text-[#aaaaaa] sm:text-[16px]">
              {trip.summary}
            </p>
          </div>

          <div className="relative mt-10 aspect-[1.25] overflow-hidden rounded-2xl bg-[#e5e8e4] sm:mt-12 sm:aspect-[1.85] lg:mt-14 lg:aspect-[2.2]">
            <Image src={trip.image} alt={trip.imageAlt} fill priority quality={90} sizes="(max-width: 1536px) 95vw, 1490px" className="object-cover object-center" />
            <div className="absolute inset-0 bg-linear-to-t from-black/35 to-transparent" />
          </div>

          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-16">
            <div>
              <h2 className="font-heading text-[28px] font-semibold tracking-[-0.05em] text-[#242424] dark:text-white sm:text-[32px]">
                Journey Highlights
              </h2>

              <ul className="mt-6 space-y-4">
                {trip.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-3 text-[14px] leading-[1.7] text-[#777777] dark:text-[#aaaaaa] sm:text-[15px]">
                    <IoCheckmarkOutline aria-hidden="true" className="mt-0.5 shrink-0 text-[19px] text-[#242424] dark:text-white" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="h-fit rounded-xl bg-[#f8f8f8] p-6 dark:bg-[#1e2022]">
              <p className="text-[12px] text-[#858585] dark:text-[#aaaaaa]">Indicative starting price</p>
              <p className="font-heading mt-2 text-[30px] font-semibold tracking-[-0.05em] text-[#242424] dark:text-white">
                {formatTripPrice(trip.priceFrom, trip.currency)}
              </p>

              <div className="mt-5 space-y-3 border-t border-[#e8e8e8] pt-5 text-[13px] text-[#777777] dark:border-white/10 dark:text-[#aaaaaa]">
                <p>Duration: {trip.durationDays} Days</p>
                <p>Sample dates: {trip.dateLabel}</p>
                <p>Destination: {trip.location}</p>
              </div>

              <p className="mt-5 text-[12px] leading-[1.7] text-[#858585] dark:text-[#aaaaaa]">
                This is a sample itinerary preview. Confirmed pricing, availability and booking are not yet offered.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <Footer />
    </main>
  );
}