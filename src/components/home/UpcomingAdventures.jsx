"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { IoArrowBackOutline, IoArrowForwardOutline, IoCalendarOutline, IoCheckmarkOutline, IoCloseOutline, IoLocationOutline, IoTimeOutline } from "react-icons/io5";

import Container from "@/components/shared/Container";
import Reveal from "@/components/shared/Reveal";
import { upcomingAdventures } from "@/data/adventures";
import { getTripBySlug, formatTripPrice } from "@/lib/trips";

const adventureTripSlugs = {
  "kyoto-japan": "kyoto-heritage-journey",
  "amalfi-coast": "amalfi-coast-getaway",
  "swiss-alps": "swiss-alps-mountain-escape",
  "bali-indonesia": "bali-island-escape",
};

const adventures = upcomingAdventures.map((adventure) => {
  const tripSlug = adventure.tripSlug || adventureTripSlugs[adventure.id];
  const trip = getTripBySlug(tripSlug);

  return {
    ...adventure,
    trip,
    tripHref: trip ? `/trip/${trip.slug}` : "/trip#all-trips",
    displayPrice: trip?.priceFrom ?? adventure.price,
    displayCurrency: trip?.currency || "USD",
    displayDuration: trip ? `${trip.durationDays} Days` : adventure.duration,
    displayDate: trip?.dateLabel || adventure.date,
  };
});

export default function UpcomingAdventures() {
  const sliderRef = useRef(null);
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);

  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedAdventure, setSelectedAdventure] = useState(null);

  const updateSlider = useCallback(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const maxScroll = Math.max(0, slider.scrollWidth - slider.clientWidth);
    const firstCard = slider.firstElementChild;
    const gap = parseFloat(window.getComputedStyle(slider).columnGap) || 0;
    const step = firstCard ? firstCard.getBoundingClientRect().width + gap : 1;

    setCanPrev(slider.scrollLeft > 2);
    setCanNext(slider.scrollLeft < maxScroll - 2);

    if (step > 0) {
      setActiveIndex(
        Math.max(0, Math.min(Math.round(slider.scrollLeft / step), adventures.length - 1))
      );
    }
  }, []);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    updateSlider();

    let observer;

    if (typeof ResizeObserver !== "undefined") {
      observer = new ResizeObserver(updateSlider);
      observer.observe(slider);
    }

    window.addEventListener("resize", updateSlider);

    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", updateSlider);
    };
  }, [updateSlider]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!selectedAdventure || !dialog) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    if (!dialog.open) dialog.showModal();

    dialog.scrollTop = 0;
    closeButtonRef.current?.focus();

    return () => {
      if (dialog.open) dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [selectedAdventure]);

  const moveSlider = (direction) => {
    const slider = sliderRef.current;
    const firstCard = slider?.firstElementChild;

    if (!slider || !firstCard) return;

    const gap = parseFloat(window.getComputedStyle(slider).columnGap) || 0;
    const distance = firstCard.getBoundingClientRect().width + gap;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    slider.scrollBy({
      left: direction * distance,
      behavior: reducedMotion ? "instant" : "smooth",
    });
  };

  const handleSliderKeyDown = (event) => {
    if (event.target !== event.currentTarget) return;

    if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
      event.preventDefault();
      moveSlider(event.key === "ArrowRight" ? 1 : -1);
    }
  };

  const openDetails = (adventure) => setSelectedAdventure(adventure);
  const closeDetails = () => dialogRef.current?.close();

  return (
    <>
      <section id="upcoming-adventures" aria-labelledby="upcoming-adventures-heading" className="overflow-hidden bg-white py-17.5 transition-colors duration-300 dark:bg-[#101112] sm:py-21.25 lg:py-12.5">
        <Container>
          <div className="grid min-w-0 gap-9 xl:grid-cols-[minmax(0,0.94fr)_minmax(0,1.98fr)] xl:gap-8.5">
            <div className="flex min-w-0 flex-col xl:pt-2">
              <Reveal>
                <h2 id="upcoming-adventures-heading" className="font-heading max-w-115 text-[30px] leading-[1.2] font-semibold tracking-[-0.055em] text-[#242424] dark:text-white sm:text-[36px] lg:text-[44px]">
                  <span className="block">Discover Places</span>
                  <span className="block">That Stay With</span>
                  <span className="block">You Forever.</span>
                </h2>
              </Reveal>

              <Reveal delay={120}>
                <p className="mt-6 max-w-97.5 text-[14px] leading-[1.75] text-[#858585] dark:text-[#aaaaaa] sm:mt-7 sm:text-[16px]">
                  Leave the usual behind. Follow extraordinary landscapes, vibrant cultures, and moments that make every journey unforgettable.
                </p>
              </Reveal>

              <Reveal delay={200} className="mt-9 flex items-center gap-3.25 xl:mt-auto">
                <button
                  type="button"
                  onClick={() => moveSlider(-1)}
                  disabled={!canPrev}
                  aria-label="Previous adventures"
                  aria-controls="adventures-slider"
                  className="group flex h-11.75 w-11.75 items-center justify-center rounded-full border border-[#292929] bg-transparent text-[#292929] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#292929] hover:text-white hover:shadow-[0_8px_22px_rgba(0,0,0,0.12)] active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:bg-transparent disabled:hover:text-[#292929] disabled:hover:shadow-none dark:border-white/70 dark:text-white dark:hover:bg-white dark:hover:text-[#242424] dark:disabled:hover:bg-transparent dark:disabled:hover:text-white sm:h-12.75 sm:w-12.75"
                >
                  <IoArrowBackOutline aria-hidden="true" className="text-[21px] transition-transform duration-300 group-enabled:group-hover:-translate-x-1" />
                </button>

                <button
                  type="button"
                  onClick={() => moveSlider(1)}
                  disabled={!canNext}
                  aria-label="Next adventures"
                  aria-controls="adventures-slider"
                  className="group flex h-11.75 w-11.75 items-center justify-center rounded-full border border-[#242424] bg-[#242424] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#484848] hover:shadow-[0_8px_22px_rgba(0,0,0,0.18)] active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0 disabled:hover:bg-[#242424] disabled:hover:shadow-none dark:border-white dark:bg-white dark:text-[#242424] dark:hover:bg-[#dedede] dark:disabled:hover:bg-white sm:h-12.75 sm:w-12.75"
                >
                  <IoArrowForwardOutline aria-hidden="true" className="text-[21px] transition-transform duration-300 group-enabled:group-hover:translate-x-1" />
                </button>

                <span className="sr-only" aria-live="polite">
                  Adventure {activeIndex + 1} of {adventures.length}
                </span>
              </Reveal>
            </div>

            <Reveal delay={150} className="min-w-0">
              <div
                ref={sliderRef}
                id="adventures-slider"
                role="region"
                aria-roledescription="carousel"
                aria-label="Explore WAYLUME adventures"
                tabIndex={0}
                onScroll={updateSlider}
                onKeyDown={handleSliderKeyDown}
                className="flex min-w-0 snap-x snap-mandatory gap-4.5 overflow-x-auto overscroll-x-contain scrollbar-none motion-safe:scroll-smooth [&::-webkit-scrollbar]:hidden lg:gap-5"
              >
                {adventures.map((adventure) => (
                  <article key={adventure.id} className="w-full shrink-0 snap-start lg:w-[calc((100%-20px)/2)]">
                    <button
                      type="button"
                      onClick={() => openDetails(adventure)}
                      aria-label={`Explore the ${adventure.location} journey`}
                      aria-haspopup="dialog"
                      className="group relative block h-106.25 w-full overflow-hidden rounded-2xl bg-[#d9dedb] text-left outline-none transition-shadow duration-500 hover:shadow-[0_18px_42px_rgba(0,0,0,0.14)] focus-visible:ring-2 focus-visible:ring-[#242424] focus-visible:ring-offset-4 dark:bg-[#292c2e] dark:focus-visible:ring-white dark:focus-visible:ring-offset-[#101112] sm:h-121.25 lg:h-130 xl:h-[clamp(510px,41vw,625px)]"
                    >
                      <Image
                        src={adventure.image}
                        alt={`Travel scenery in ${adventure.location}`}
                        fill
                        sizes="(max-width: 1023px) 100vw, (max-width: 1279px) 50vw, 35vw"
                        className="object-cover object-center transition-transform duration-1100 ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:group-hover:scale-[1.065]"
                      />

                      <span className="absolute inset-0 bg-linear-to-t from-black/85 via-black/5 to-black/10" />
                      <span className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />

                      <span className="absolute top-5.5 left-5.5 z-10 inline-flex max-w-[calc(100%-44px)] items-center rounded-full bg-white px-4.25 py-2.75 text-[12px] leading-[1.2] font-medium text-[#242424] shadow-[0_3px_14px_rgba(0,0,0,0.06)] sm:top-6.5 sm:left-6.5 sm:px-5 sm:text-[14px]">
                        {adventure.location}
                      </span>

                      <span className="absolute inset-x-0 bottom-0 z-10 block p-5.5 text-white sm:p-6.5 lg:p-6.25 xl:p-6.75">
                        <span className="font-heading block text-[23px] leading-[1.2] font-medium tracking-[-0.04em] transition-transform duration-500 motion-safe:group-hover:-translate-y-1 sm:text-[25px] lg:text-[24px] 2xl:text-[27px]">
                          From {formatTripPrice(adventure.displayPrice, adventure.displayCurrency)}
                        </span>

                        <span className="mt-3.25 flex flex-wrap items-end justify-between gap-x-3 gap-y-2">
                          <span className="text-[12px] leading-normal text-white/90 sm:text-[14px]">
                            {adventure.displayDuration} · {adventure.displayDate}
                          </span>

                          <span className="inline-flex shrink-0 items-center gap-2.25 text-[12px] font-medium sm:text-[14px]">
                            <span className="relative">
                              Explore Journey
                              <span className="absolute -bottom-0.75 left-0 h-px w-full origin-left scale-x-0 bg-white transition-transform duration-300 group-hover:scale-x-100" />
                            </span>

                            <IoArrowForwardOutline aria-hidden="true" className="text-[17px] transition-transform duration-300 group-hover:translate-x-1.25" />
                          </span>
                        </span>
                      </span>
                    </button>
                  </article>
                ))}
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <dialog
        ref={dialogRef}
        aria-labelledby="adventure-dialog-title"
        aria-describedby="adventure-dialog-description"
        onClose={() => setSelectedAdventure(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeDetails();
        }}
        className="fixed inset-0 m-auto max-h-[calc(100dvh-32px)] w-[calc(100%-32px)] max-w-155 overscroll-contain overflow-y-auto rounded-[18px] bg-white p-0 text-[#242424] shadow-[0_25px_90px_rgba(0,0,0,0.3)] backdrop:bg-black/70 backdrop:backdrop-blur-xs dark:bg-[#1e2022] dark:text-white"
      >
        {selectedAdventure && (
          <article>
            <div className="relative h-55 overflow-hidden bg-[#d9dedb] dark:bg-[#292c2e] sm:h-70">
              <Image
                src={selectedAdventure.image}
                alt={selectedAdventure.location}
                fill
                sizes="(max-width: 640px) 100vw, 620px"
                className="object-cover object-center"
              />

              <div className="absolute inset-0 bg-linear-to-t from-black/35 to-transparent" />

              <button
                ref={closeButtonRef}
                type="button"
                onClick={closeDetails}
                aria-label="Close journey details"
                className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#242424] shadow-md transition-all duration-300 hover:rotate-90 hover:bg-[#eeeeee]"
              >
                <IoCloseOutline aria-hidden="true" className="text-[23px]" />
              </button>
            </div>

            <div className="px-6 py-7 sm:px-9 sm:py-8">
              <div className="flex items-center gap-2 text-[13px] text-[#858585] dark:text-[#aaaaaa]">
                <IoLocationOutline aria-hidden="true" className="text-[18px]" />
                <span>{selectedAdventure.country}</span>
              </div>

              <h2 id="adventure-dialog-title" className="font-heading mt-3 text-[28px] leading-[1.2] font-semibold tracking-[-0.055em] text-[#242424] dark:text-white sm:text-[34px]">
                {selectedAdventure.location}
              </h2>

              <p id="adventure-dialog-description" className="mt-4 text-[14px] leading-[1.8] text-[#777777] dark:text-[#b0b0b0] sm:text-[15px]">
                {selectedAdventure.description}
              </p>

              <div className="mt-6 grid grid-cols-1 gap-4 rounded-xl bg-[#f7f7f7] p-4 dark:bg-[#292b2d] sm:grid-cols-2">
                <div>
                  <span className="flex items-center gap-2 text-[12px] text-[#858585] dark:text-[#aaaaaa]">
                    <IoCalendarOutline aria-hidden="true" className="text-[16px]" />
                    Sample Journey Dates
                  </span>

                  <p className="mt-2 text-[13px] font-semibold text-[#242424] dark:text-white sm:text-[14px]">
                    {selectedAdventure.displayDate}
                  </p>
                </div>

                <div>
                  <span className="flex items-center gap-2 text-[12px] text-[#858585] dark:text-[#aaaaaa]">
                    <IoTimeOutline aria-hidden="true" className="text-[16px]" />
                    {selectedAdventure.displayDuration}
                  </span>

                  <p className="font-heading mt-2 text-[19px] font-semibold text-[#242424] dark:text-white">
                    From {formatTripPrice(selectedAdventure.displayPrice, selectedAdventure.displayCurrency)}
                  </p>
                </div>
              </div>

              <h3 className="mt-7 text-[15px] font-semibold text-[#242424] dark:text-white">
                Journey Highlights
              </h3>

              <ul className="mt-4 space-y-3">
                {selectedAdventure.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-3 text-[14px] leading-[1.6] text-[#777777] dark:text-[#b0b0b0]">
                    <IoCheckmarkOutline aria-hidden="true" className="mt-0.5 shrink-0 text-[17px] text-[#242424] dark:text-white" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>

              {selectedAdventure.trip && (
                <Link
                  href={selectedAdventure.tripHref}
                  onClick={closeDetails}
                  className="group/trip mt-7 flex items-center gap-4 rounded-xl border border-[#eeeeee] bg-[#fafafa] p-3 transition-all duration-300 hover:border-[#d3d3d3] hover:bg-[#f5f5f5] dark:border-white/10 dark:bg-[#292b2d] dark:hover:border-white/20"
                >
                  <div className="relative h-21 w-21 shrink-0 overflow-hidden rounded-lg bg-[#e5e5e5] sm:h-23 sm:w-27">
                    <Image
                      src={selectedAdventure.trip.image}
                      alt={selectedAdventure.trip.imageAlt}
                      fill
                      sizes="(max-width: 639px) 84px, 108px"
                      className="object-cover object-center transition-transform duration-700 motion-safe:group-hover/trip:scale-[1.08]"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <span className="text-[11px] text-[#858585] dark:text-[#aaaaaa]">
                      Featured Trip
                    </span>

                    <h4 className="font-heading mt-1 text-[14px] leading-[1.4] font-semibold tracking-[-0.03em] text-[#242424] dark:text-white sm:text-[15px]">
                      {selectedAdventure.trip.title}
                    </h4>

                    <p className="mt-1 text-[12px] text-[#858585] dark:text-[#aaaaaa]">
                      {selectedAdventure.trip.durationDays} Days
                    </p>
                  </div>

                  <IoArrowForwardOutline aria-hidden="true" className="shrink-0 text-[18px] text-[#242424] transition-transform duration-300 group-hover/trip:translate-x-1 dark:text-white" />
                </Link>
              )}

              <p className="mt-6 text-[12px] leading-[1.7] text-[#929292] dark:text-[#aaaaaa]">
                These journeys are presented as travel inspiration. Dates and prices are illustrative, and reservations are not yet available.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Link
                  href={selectedAdventure.tripHref}
                  onClick={closeDetails}
                  className="group/cta relative inline-flex h-11 items-center justify-center gap-3 overflow-hidden rounded-lg bg-[#242424] px-5 text-[13px] font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(0,0,0,0.12)] dark:bg-white dark:text-[#242424]"
                >
                  <span className="absolute inset-0 -translate-x-full bg-[#454545] transition-transform duration-500 ease-out group-hover/cta:translate-x-0 dark:bg-[#e8e8e8]" />

                  <span className="relative z-10">
                    {selectedAdventure.trip ? "View Trip Details" : "Explore All Trips"}
                  </span>

                  <IoArrowForwardOutline aria-hidden="true" className="relative z-10 text-[17px] transition-transform duration-300 group-hover/cta:translate-x-1" />
                </Link>

                <Link
                  href="/trip#all-trips"
                  onClick={closeDetails}
                  className="group/link inline-flex h-11 items-center justify-center gap-2 rounded-lg px-3 text-[13px] font-medium text-[#555555] transition-colors duration-300 hover:text-[#242424] dark:text-[#cccccc] dark:hover:text-white"
                >
                  View All Trips
                  <IoArrowForwardOutline aria-hidden="true" className="text-[16px] transition-transform duration-300 group-hover/link:translate-x-1" />
                </Link>
              </div>
            </div>
          </article>
        )}
      </dialog>
    </>
  );
}