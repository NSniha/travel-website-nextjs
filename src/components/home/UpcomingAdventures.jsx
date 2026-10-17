"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { IoArrowBackOutline, IoArrowForwardOutline, IoCalendarOutline, IoCheckmarkOutline, IoCloseOutline, IoLocationOutline } from "react-icons/io5";
import Container from "@/components/shared/Container";
import Reveal from "@/components/shared/Reveal";
import { upcomingAdventures } from "@/data/adventures";

const formatPrice = (price) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(price);

export default function UpcomingAdventures() {
  const sliderRef = useRef(null);
  const dialogRef = useRef(null);

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
    setActiveIndex(Math.min(Math.round(slider.scrollLeft / step), upcomingAdventures.length - 1));
  }, []);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const observer = new ResizeObserver(updateSlider);
    observer.observe(slider);
    updateSlider();

    return () => observer.disconnect();
  }, [updateSlider]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!selectedAdventure || !dialog) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    if (!dialog.open) dialog.showModal();

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

  const closeDetails = () => dialogRef.current?.close();

  return (
    <>
      <section id="upcoming-adventures" aria-labelledby="upcoming-adventures-heading" className="overflow-hidden bg-white py-17.5 transition-colors duration-300 dark:bg-[#101112] sm:py-21.25 lg:py-12.5">
        <Container>
          <div className="grid min-w-0 gap-9 xl:grid-cols-[minmax(0,0.94fr)_minmax(0,1.98fr)] xl:gap-8.5">
            <div className="flex min-w-0 flex-col xl:pt-2">
              <Reveal>
                <h2 id="upcoming-adventures-heading" className="font-heading max-w-115 text-[30px] leading-[1.2] font-semibold tracking-[-0.055em] text-[#242424] dark:text-white sm:text-[36px] lg:text-[44px]">
                  <span className="block">Discover Places</span><span className="block">That Stay With</span><span className="block">You Forever.</span>
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
                  Adventure {activeIndex + 1} of {upcomingAdventures.length}
                </span>
              </Reveal>
            </div>

            <Reveal delay={150} className="min-w-0">
              <div
                ref={sliderRef}
                id="adventures-slider"
                onScroll={updateSlider}
                aria-label="Explore WAYLUME adventures"
                className="flex min-w-0 snap-x snap-mandatory gap-4.5 overflow-x-auto overscroll-x-contain scrollbar-none motion-safe:scroll-smooth [&::-webkit-scrollbar]:hidden lg:gap-5"
              >
                {upcomingAdventures.map((adventure) => (
                  <article key={adventure.id} className="w-full shrink-0 snap-start lg:w-[calc((100%-20px)/2)]">
                    <button
                      type="button"
                      onClick={() => setSelectedAdventure(adventure)}
                      aria-label={`Explore the ${adventure.location} journey`}
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
                          From {formatPrice(adventure.price)}
                        </span>

                        <span className="mt-3.25 flex flex-wrap items-end justify-between gap-x-3 gap-y-2">
                          <span className="text-[12px] leading-normal text-white/90 sm:text-[14px]">
                            {adventure.duration} · {adventure.date}
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
        onClose={() => setSelectedAdventure(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeDetails();
        }}
        className="fixed inset-0 m-auto max-h-[calc(100dvh-32px)] w-[calc(100%-32px)] max-w-155 overflow-y-auto rounded-[18px] bg-white p-0 text-[#242424] shadow-[0_25px_90px_rgba(0,0,0,0.3)] backdrop:bg-black/70 backdrop:backdrop-blur-xs dark:bg-[#1e2022] dark:text-white"
      >
        {selectedAdventure && (
          <div>
            <div className="relative h-55 sm:h-70">
              <Image src={selectedAdventure.image} alt={selectedAdventure.location} fill sizes="(max-width: 640px) 100vw, 620px" className="object-cover" />

              <button
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

              <h2 id="adventure-dialog-title" className="font-heading mt-3 text-[28px] leading-[1.2] font-semibold tracking-tighter sm:text-[34px]">
                {selectedAdventure.location}
              </h2>

              <p className="mt-4 text-[14px] leading-[1.8] text-[#777777] dark:text-[#b0b00] sm:text-[15px]">
                {selectedAdventure.description}
              </p>

              <div className="mt-6 grid grid-cols-2 gap-4 rounded-xl bg-[#f7f7f7] p-4 dark:bg-[#292b2d]">
                <div>
                  <span className="flex items-center gap-2 text-[12px] text-[#858585] dark:text-[#aaaaaa]">
                    <IoCalendarOutline aria-hidden="true" className="text-[16px]" />
                    Journey Dates
                  </span>

                  <p className="mt-2 text-[13px] font-semibold sm:text-[14px]">{selectedAdventure.date}</p>
                </div>

                <div>
                  <span className="text-[12px] text-[#858585] dark:text-[#aaaaaa]">Estimated From</span>
                  <p className="font-heading mt-2 text-[19px] font-semibold">{formatPrice(selectedAdventure.price)}</p>
                </div>
              </div>

              <h3 className="mt-7 text-[15px] font-semibold">Journey Highlights</h3>

              <ul className="mt-4 space-y-3">
                {selectedAdventure.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-3 text-[14px] leading-[1.6] text-[#777777] dark:text-[#b0b0b0]">
                    <IoCheckmarkOutline aria-hidden="true" className="mt-0.5 shrink-0 text-[17px] text-[#242424] dark:text-white" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-6 text-[12px] leading-[1.7] text-[#929292] dark:text-[#aaaaaa]">
                These journeys are presented as travel inspiration. Dates and prices are illustrative, and reservations are not yet available.
              </p>

              <button
                type="button"
                onClick={closeDetails}
                className="mt-6 inline-flex h-11 items-center justify-center rounded-lg bg-[#242424] px-6 text-[13px] font-medium text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#454545] active:translate-y-0 dark:bg-white dark:text-[#242424] dark:hover:bg-[#e9e9e9]"
              >
                Back to Journeys
              </button>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}