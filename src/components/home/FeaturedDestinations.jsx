"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { IoArrowForwardOutline, IoCloseOutline, IoLocationOutline } from "react-icons/io5";
import Container from "@/components/shared/Container";
import Reveal from "@/components/shared/Reveal";
import { featuredDestination } from "@/data/home";

export default function FeaturedDestinations() {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const closeButtonRef = useRef(null);
  const dialogRef = useRef(null);

  const destination = featuredDestination;
  const tripHref = "/trip/bali-island-escape";

  useEffect(() => {
    if (!detailsOpen) return;

    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement;

    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setDetailsOpen(false);

      if (event.key === "Tab") {
        const focusableElements = dialogRef.current?.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])');
        if (!focusableElements?.length) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      if (previousFocus?.isConnected) previousFocus.focus();
    };
  }, [detailsOpen]);

  return (
    <>
      <section id="destinations" aria-labelledby="destinations-heading" className="bg-[#f8f8f8] py-18.75 transition-colors duration-300 dark:bg-[#191b1d] sm:py-21.25 xl:py-22.5">
        <Container>
          <div className="grid items-start gap-10 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.8fr)] xl:gap-12">
            <div className="xl:pt-1">
              <Reveal>
                <h2 id="destinations-heading" className="font-heading max-w-105 text-[30px] leading-[1.2] font-semibold tracking-[-0.055em] text-[#242424] dark:text-white sm:text-[36px] lg:text-[40px]">
                  Discover Our<br className="hidden sm:block" />{" "}Handpicked<br className="hidden sm:block" />{" "}Destinations
                </h2>
              </Reveal>

              <Reveal delay={130}>
                <p className="mt-7 max-w-96.25 text-[14px] leading-[1.75] text-[#858585] dark:text-[#aaaaaa] sm:mt-10 sm:text-[16px]">
                  Explore extraordinary places, thoughtfully selected for the moments you will remember forever.
                </p>
              </Reveal>
            </div>

            <div className="grid min-w-0 grid-cols-1 gap-5 sm:grid-cols-2">
              <Reveal delay={100} className="h-85 sm:h-107.5 xl:h-113.75">
                <button
                  type="button"
                  onClick={() => setDetailsOpen(true)}
                  aria-label={`Preview ${destination.name}`}
                  aria-haspopup="dialog"
                  className="group/image relative block h-full w-full overflow-hidden rounded-[15px] bg-[#e8e8e8] text-left outline-none focus-visible:ring-2 focus-visible:ring-[#242424] focus-visible:ring-offset-4 dark:bg-[#2a2c2e] dark:focus-visible:ring-white dark:focus-visible:ring-offset-[#191b1d]"
                >
                  <Image
                    src={destination.images.coast}
                    alt="Tropical coastline with dramatic cliffs and turquoise water in Bali"
                    fill
                    sizes="(max-width: 639px) 100vw, (max-width: 1279px) 50vw, 30vw"
                    className="object-cover object-center transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:group-hover:scale-[1.065]"
                  />

                  <span className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover/image:bg-black/10" />

                  <span className="absolute right-4 bottom-4 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full bg-white text-[#242424] opacity-0 shadow-[0_6px_20px_rgba(0,0,0,0.12)] transition-all duration-300 group-hover/image:translate-y-0 group-hover/image:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                    <IoArrowForwardOutline aria-hidden="true" className="-rotate-45 text-[19px]" />
                  </span>
                </button>
              </Reveal>

              <div className="flex min-w-0 flex-col gap-5 sm:h-107.5 xl:h-113.75">
                <Reveal delay={170} className="shrink-0">
                  <article className="flex min-h-38.75 flex-col justify-center rounded-[15px] bg-white px-5 py-5 transition-colors duration-300 dark:bg-[#242628] sm:px-5.5 xl:min-h-41.25">
                    <h3 className="font-heading text-[18px] leading-[1.3] font-semibold tracking-[-0.035em] text-[#242424] dark:text-white">
                      {destination.name}
                    </h3>

                    <p className="mt-4 text-[14px] leading-[1.75] text-[#858585] dark:text-[#aaaaaa] sm:text-[15px]">
                      {destination.description}
                    </p>
                  </article>
                </Reveal>

                <div className="grid min-h-57.5 grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] items-stretch gap-4 sm:min-h-0 sm:flex-1">
                  <Reveal delay={230} className="min-h-0">
                    <button
                      type="button"
                      onClick={() => setDetailsOpen(true)}
                      aria-label={`Preview ${destination.name}`}
                      aria-haspopup="dialog"
                      className="group/image relative block h-full min-h-57.5 w-full overflow-hidden rounded-[15px] bg-[#e8e8e8] outline-none focus-visible:ring-2 focus-visible:ring-[#242424] dark:bg-[#2a2c2e] dark:focus-visible:ring-white sm:min-h-0"
                    >
                      <Image
                        src={destination.images.gate}
                        alt="Traditional Balinese temple gate surrounded by mountain scenery"
                        fill
                        sizes="(max-width: 639px) 60vw, (max-width: 1279px) 30vw, 18vw"
                        className="object-cover object-center transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:group-hover/image:scale-[1.075]"
                      />

                      <span className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover/image:bg-black/10" />
                    </button>
                  </Reveal>

                  <Reveal delay={300} className="flex min-w-0 items-end justify-end pb-1">
                    <Link
                      href={tripHref}
                      className="group/link inline-flex items-center gap-2 whitespace-nowrap text-[12px] font-medium text-[#292929] transition-colors duration-300 hover:text-[#777777] focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 dark:text-white dark:hover:text-[#bbbbbb] sm:text-[13px] lg:text-[14px]"
                    >
                      <span className="relative">
                        View Details
                        <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-300 group-hover/link:scale-x-100" />
                      </span>

                      <IoArrowForwardOutline aria-hidden="true" className="text-[16px] transition-transform duration-300 group-hover/link:translate-x-1" />
                    </Link>
                  </Reveal>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {detailsOpen && (
        <div className="fixed inset-0 z-120 flex items-center justify-center overflow-y-auto px-4 py-8">
          <button
            type="button"
            onClick={() => setDetailsOpen(false)}
            aria-label="Close destination preview"
            tabIndex={-1}
            className="absolute inset-0 bg-black/65 backdrop-blur-xs"
          />

          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="destination-dialog-title"
            aria-describedby="destination-dialog-description"
            className="relative z-10 my-auto w-full max-w-155 overflow-hidden rounded-[18px] bg-white shadow-[0_25px_90px_rgba(0,0,0,0.25)] dark:bg-[#1f2123]"
          >
            <div className="relative h-55 overflow-hidden sm:h-70">
              <Image
                src={destination.images.coast}
                alt={`Scenic landscape of ${destination.name}`}
                fill
                sizes="(max-width: 640px) 100vw, 620px"
                className="object-cover object-center"
              />

              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setDetailsOpen(false)}
                aria-label="Close destination preview"
                className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#242424] shadow-md transition-all duration-300 hover:rotate-90 hover:bg-[#eeeeee]"
              >
                <IoCloseOutline aria-hidden="true" className="text-[23px]" />
              </button>
            </div>

            <div className="px-6 py-7 sm:px-9 sm:py-8">
              <div className="flex items-center gap-2 text-[13px] text-[#858585] dark:text-[#aaaaaa]">
                <IoLocationOutline aria-hidden="true" className="text-[17px]" />
                <span>{destination.location}</span>
              </div>

              <h2 id="destination-dialog-title" className="font-heading mt-3 text-[28px] font-semibold tracking-[-0.055em] text-[#242424] dark:text-white sm:text-[34px]">
                {destination.name}
              </h2>

              <p id="destination-dialog-description" className="mt-4 text-[14px] leading-[1.8] text-[#777777] dark:text-[#b0b0b0] sm:text-[15px]">
                {destination.details}
              </p>

              <h3 className="mt-6 text-[15px] font-semibold text-[#242424] dark:text-white">
                Travel Highlights
              </h3>

              <ul className="mt-3 space-y-2">
                {destination.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-3 text-[14px] leading-[1.6] text-[#777777] dark:text-[#b0b0b0]">
                    <span aria-hidden="true" className="mt-2.25 h-1.25 w-1.25 shrink-0 rounded-full bg-[#242424] dark:bg-white" />
                    {highlight}
                  </li>
                ))}
              </ul>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Link
                  href={tripHref}
                  onClick={() => setDetailsOpen(false)}
                  className="group/cta relative inline-flex h-11 items-center justify-center gap-3 overflow-hidden rounded-lg bg-[#242424] px-5 text-[13px] font-medium text-white shadow-[0_5px_15px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-0.75 hover:shadow-[0_10px_25px_rgba(0,0,0,0.14)] dark:bg-white dark:text-[#242424]"
                >
                  <span className="absolute inset-0 -translate-x-full bg-[#454545] transition-transform duration-500 ease-out group-hover/cta:translate-x-0 dark:bg-[#e8e8e8]" />

                  <span className="relative z-10">Explore This Trip</span>

                  <IoArrowForwardOutline aria-hidden="true" className="relative z-10 text-[17px] transition-transform duration-300 group-hover/cta:translate-x-1" />
                </Link>

                <Link
                  href="/trip#all-trips"
                  onClick={() => setDetailsOpen(false)}
                  className="group/link inline-flex h-11 items-center justify-center gap-2 rounded-lg px-3 text-[13px] font-medium text-[#555555] transition-colors duration-300 hover:text-[#242424] dark:text-[#cccccc] dark:hover:text-white"
                >
                  View All Trips
                  <IoArrowForwardOutline aria-hidden="true" className="text-[16px] transition-transform duration-300 group-hover/link:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}