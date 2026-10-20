import Image from "next/image";
import Link from "next/link";
import { IoArrowForwardOutline } from "react-icons/io5";

import Container from "@/components/shared/Container";
import Reveal from "@/components/shared/Reveal";

export default function TripCTA({
  trip = null,
  backgroundImage = "/images/trip/travel-offer.jpg",
}) {
  const contactHref = trip?.slug
    ? `/contact?trip=${encodeURIComponent(trip.slug)}`
    : "/contact";

  return (
    <section
      id="plan-your-journey"
      aria-labelledby="trip-cta-heading"
      className="bg-white pb-18 pt-5 transition-colors duration-300 dark:bg-[#101112] sm:pb-22 lg:pb-25"
    >
      <Container>
        <Reveal>
          <div className="group relative isolate flex min-h-75 w-full items-center justify-center overflow-hidden rounded-[14px] bg-[#303c42] px-5 py-15 text-center sm:min-h-85 sm:px-10 lg:min-h-95 lg:px-15">
            {/* Background Image */}

            <Image
              src={backgroundImage}
              alt=""
              fill
              sizes="(max-width: 1536px) 100vw, 1400px"
              quality={90}
              className="object-cover object-center transition-transform duration-[1800ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:group-hover:scale-[1.045]"
            />

            {/* Image Overlay */}

            <div className="absolute inset-0 bg-black/35" />

            <div className="absolute inset-0 bg-linear-to-r from-black/20 via-black/15 to-black/20" />

            {/* CTA Content */}

            <div className="relative z-10 mx-auto flex max-w-190 flex-col items-center justify-center">
              <span className="mb-5 inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.16em] text-white/85 sm:text-[12px]">
                Your Next Adventure Awaits
              </span>

              <h2
                id="trip-cta-heading"
                className="font-heading max-w-170 text-[35px] leading-[1.12] font-semibold tracking-[-0.055em] text-white sm:text-[46px] lg:text-[56px]"
              >
                Ready To Start
                <br />
                Your Journey?
              </h2>

              <p className="mt-5 max-w-105 text-[13px] leading-[1.75] font-normal text-white/90 sm:mt-6 sm:text-[15px]">
                Let's design the perfect trip, tailored just for you.
              </p>

              <Link
                href={contactHref}
                className="group/cta relative mt-8 inline-flex h-11 items-center justify-center gap-2.5 overflow-hidden rounded-[7px] bg-white px-5 text-[12px] font-semibold text-[#242424] shadow-[0_5px_20px_rgba(0,0,0,0.1)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,0,0,0.18)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white active:translate-y-0 sm:mt-9 sm:h-12 sm:px-6 sm:text-[13px]"
              >
                <span className="absolute inset-0 -translate-x-full bg-[#e9e9e9] transition-transform duration-500 ease-out group-hover/cta:translate-x-0" />

                <span className="relative z-10">
                  Plan Your Adventure
                </span>

                <IoArrowForwardOutline
                  aria-hidden="true"
                  className="relative z-10 text-[16px] transition-transform duration-300 group-hover/cta:translate-x-1"
                />
              </Link>
            </div>

            {/* Subtle Border */}

            <div className="pointer-events-none absolute inset-0 rounded-[14px] ring-1 ring-inset ring-white/10" />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}