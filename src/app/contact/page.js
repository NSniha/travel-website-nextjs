import Image from "next/image";
import Link from "next/link";
import { IoArrowForwardOutline } from "react-icons/io5";

import ContactPageClient from "@/components/contact/ContactPageClient";
import Footer from "@/components/layout/Footer";
import { getTripBySlug } from "@/lib/trips";

export const metadata = {
  title: "Contact Us | WAYLUME",
  description:
    "Get in touch with WAYLUME. Explore travel inspiration, ask questions, and start planning your next extraordinary journey.",
};

function getQueryValue(value) {
  return typeof value === "string" ? value : "";
}

function getReturnDate(start, durationDays) {
  if (!start || !durationDays) return "";

  const date = new Date(`${start}T00:00:00Z`);

  if (Number.isNaN(date.getTime())) return "";

  date.setUTCDate(date.getUTCDate() + durationDays - 1);

  return date.toISOString().slice(0, 10);
}

function ContactCTA() {
  return (
    <section
      aria-labelledby="contact-cta-heading"
      className="relative isolate flex min-h-95 items-center justify-center overflow-hidden bg-[#334039] px-5 py-20 text-center sm:min-h-110 lg:min-h-125"
    >
      <Image
        src="/images/trip/travel-offer.jpg"
        alt=""
        fill
        sizes="100vw"
        quality={90}
        className="object-cover object-center"
      />

      <div className="absolute inset-0 bg-black/35" />

      <div className="absolute inset-0 bg-linear-to-b from-black/10 via-black/10 to-black/40" />

      <div className="relative z-10 mx-auto flex max-w-200 flex-col items-center">
        <h2
          id="contact-cta-heading"
          className="font-heading text-[39px] leading-[1.08] font-medium tracking-[-0.06em] text-white sm:text-[52px] lg:text-[66px]"
        >
          Ready For Your Next
          <br />
          Adventure?
        </h2>

        <p className="mt-6 max-w-115 text-[14px] leading-[1.7] text-white/90 sm:mt-7 sm:text-[16px]">
          Let's start planning your journey today!
        </p>

        <Link
          href="/trip#all-trips"
          className="group relative mt-7 inline-flex h-11.5 items-center justify-center gap-2 overflow-hidden rounded-[7px] bg-white px-6 text-[12px] font-semibold text-[#242424] shadow-[0_5px_20px_rgba(0,0,0,0.1)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,0,0,0.18)] sm:mt-8"
        >
          <span className="absolute inset-0 -translate-x-full bg-[#e8e8e8] transition-transform duration-500 group-hover:translate-x-0" />

          <span className="relative z-10">Explore Now</span>

          <IoArrowForwardOutline
            aria-hidden="true"
            className="relative z-10 text-[16px] transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>
      </div>
    </section>
  );
}

export default async function ContactPage({ searchParams }) {
  const query = await searchParams;

  const requestedTripSlug = getQueryValue(query?.trip);
  const requestedDeparture = getQueryValue(query?.departure);

  const selectedTrip = getTripBySlug(requestedTripSlug);

  const initialTripSlug = selectedTrip?.slug || "";

  const initialDeparture =
    selectedTrip && /^\d{4}-\d{2}-\d{2}$/.test(requestedDeparture)
      ? requestedDeparture
      : "";

  const initialReturnDate = initialDeparture
    ? getReturnDate(initialDeparture, selectedTrip.durationDays)
    : "";

  return (
    <main className="min-h-screen bg-white transition-colors duration-300 dark:bg-[#101112]">
      <ContactPageClient
        initialTripSlug={initialTripSlug}
        initialDeparture={initialDeparture}
        initialReturnDate={initialReturnDate}
      />

      <Footer />
    </main>
  );
}