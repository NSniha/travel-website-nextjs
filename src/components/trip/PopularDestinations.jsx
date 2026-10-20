"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { IoArrowForwardOutline, IoCloseOutline, IoLocationOutline } from "react-icons/io5";
import Container from "@/components/shared/Container";
import Reveal from "@/components/shared/Reveal";
import { popularDestinations } from "@/data/tripPage";

const markerPositions = [85, 35, 120];
const markerSize = 44;
const cardOffset = 72;

function CountryFlag({ countryCode, country, className = "" }) {
  return (
    <span role="img" aria-label={`${country} flag`} className={`relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full border-4 border-[#f8f8f8] bg-white shadow-[0_4px_14px_rgba(0,0,0,0.07)] dark:border-[#191b1d] ${className}`}>
      <span className={`fi fi-${countryCode} block! h-full! w-full! bg-cover! bg-center!`} aria-hidden="true" />
    </span>
  );
}

function DestinationCard({ destination, index, onSelect }) {
  const markerTop = markerPositions[index % markerPositions.length];
  const nextMarkerTop = markerPositions[(index + 1) % markerPositions.length];
  const markerCenter = markerTop + markerSize / 2;
  const nextMarkerCenter = nextMarkerTop + markerSize / 2;
  const curveHeight = Math.min(markerCenter, nextMarkerCenter) - 45;

  return (
    <div className="relative h-full shrink-0" style={{ width: "var(--destination-card-width)" }}>
      <svg aria-hidden="true" viewBox="0 0 100 220" preserveAspectRatio="none" className="pointer-events-none absolute top-0 z-0 h-55 overflow-visible" style={{ left: "50%", width: "calc(var(--destination-card-width) + var(--destination-gap))" }}>
        <path d={`M 0 ${markerCenter} C 35 ${curveHeight}, 65 ${curveHeight}, 100 ${nextMarkerCenter}`} fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 5" strokeLinecap="round" className="text-[#c6c6c6] dark:text-white/25" />
      </svg>

      <span aria-hidden="true" className="pointer-events-none absolute left-1/2 z-1 w-px -translate-x-1/2 bg-linear-to-b from-[#c6c6c6] to-transparent dark:from-white/25" style={{ top: markerTop + markerSize - 3, height: cardOffset - markerSize + 5 }} />

      <div className="absolute left-1/2 z-10 -translate-x-1/2" style={{ top: markerTop }}>
        <CountryFlag countryCode={destination.countryCode} country={destination.country} className="h-11 w-11" />
      </div>

      <button
        type="button"
        onClick={() => onSelect(destination)}
        aria-label={`Discover ${destination.name}, ${destination.country}`}
        className="group absolute inset-x-0 block overflow-hidden rounded-[15px] border border-black/[0.035] bg-white p-2.75 text-left shadow-[0_8px_28px_rgba(23,30,27,0.055)] outline-none transition-[box-shadow,transform,background-color] duration-500 ease-out hover:-translate-y-1.5 hover:shadow-[0_16px_38px_rgba(23,30,27,0.105)] focus-visible:ring-2 focus-visible:ring-[#242424] dark:border-white/6 dark:bg-[#26282a] dark:shadow-[0_10px_28px_rgba(0,0,0,0.18)] dark:hover:bg-[#2b2d2f] dark:hover:shadow-[0_18px_38px_rgba(0,0,0,0.26)] dark:focus-visible:ring-white"
        style={{ top: markerTop + cardOffset }}
      >
        <div className="relative aspect-[1.65] w-full overflow-hidden rounded-[9px] bg-[#e8ebe7] dark:bg-[#343638]">
          <Image
            src={destination.image}
            alt={destination.imageAlt}
            fill
            quality={85}
            sizes="(max-width: 639px) 230px, (max-width: 1023px) 245px, 255px"
            className="object-cover object-center transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:group-hover:scale-[1.065]"
          />

          <span className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/[0.07]" />
        </div>

        <div className="px-1 pt-3.5 pb-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-heading text-[14px] leading-[1.4] font-semibold tracking-[-0.03em] text-[#242424] dark:text-white sm:text-[15px]">
              {destination.name}, {destination.country}
            </h3>

            <IoArrowForwardOutline aria-hidden="true" className="mt-0.75 shrink-0 -rotate-45 text-[16px] text-[#858585] transition-transform duration-300 group-hover:rotate-0 dark:text-[#aaaaaa]" />
          </div>

          <p className="mt-2.25 line-clamp-3 min-h-14.5 text-[12px] leading-[1.65] font-normal text-[#858585] dark:text-[#aaaaaa]">
            {destination.description}
          </p>
        </div>
      </button>
    </div>
  );
}

export default function PopularDestinations() {
  const sectionRef = useRef(null);
  const dialogRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isTabVisible, setIsTabVisible] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), { threshold: 0.12 });
    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleVisibility = () => setIsTabVisible(document.visibilityState === "visible");

    handleVisibility();
    document.addEventListener("visibilitychange", handleVisibility);

    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!selectedDestination || !dialog) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    if (!dialog.open) dialog.showModal();

    return () => {
      if (dialog.open) dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [selectedDestination]);

  const closeDestination = () => dialogRef.current?.close();
  const isPlaying = isVisible && isTabVisible && !isPaused && !selectedDestination;

  return (
    <>
      <section ref={sectionRef} id="popular-destinations" aria-labelledby="popular-destinations-heading" className="relative isolate overflow-hidden bg-[#f8f8f8] py-21.25 transition-colors duration-300 dark:bg-[#191b1d] sm:py-24 lg:py-16">
        <Container>
          <div className="grid min-w-0 items-center gap-10 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-10 xl:gap-14">
            <Reveal className="relative z-10 min-w-0">
              <h2 id="popular-destinations-heading" className="font-heading max-w-140 text-[30px] leading-[1.2] font-semibold tracking-[-0.055em] text-[#242424] dark:text-white sm:text-[36px] lg:text-[44px]">
                Discover the World's<br className="hidden sm:block" /> Most Inspiring Places
              </h2>

              <p className="mt-6.25 max-w-115 text-[14px] leading-[1.75] font-normal text-[#858585] dark:text-[#aaaaaa] sm:mt-7.5 sm:text-[16px] lg:mt-9.5">
                From breathtaking landscapes to remarkable cultural discoveries, every destination opens the door to something extraordinary.
              </p>
            </Reveal>

            <Reveal delay={150} className="relative min-w-0">
              <div className="relative isolate h-125 w-full sm:h-128.75 lg:h-131.25">
                <div className="pointer-events-none absolute -inset-x-5 top-3.75 z-0 h-97.5 opacity-60 sm:-inset-x-8.75 lg:-inset-x-13.75 dark:opacity-25">
                  <Image src="/images/trip/world-map.png" alt="" fill sizes="(max-width: 1023px) 100vw, 65vw" className="object-contain object-top" />
                </div>

                <div
                  role="region"
                  aria-roledescription="carousel"
                  aria-label="Popular travel destinations"
                  aria-live="off"
                  onMouseEnter={() => setIsPaused(true)}
                  onMouseLeave={() => setIsPaused(false)}
                  onFocusCapture={() => setIsPaused(true)}
                  onBlurCapture={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget)) setIsPaused(false);
                  }}
                  className={`waylume-destinations-marquee-viewport relative z-10 h-full w-full overflow-hidden [--destination-card-width:230px] [--destination-gap:22px] sm:[--destination-card-width:245px] sm:[--destination-gap:25px] lg:[--destination-card-width:235px] lg:[--destination-gap:25px] xl:[--destination-card-width:250px] xl:[--destination-gap:28px] ${isPlaying ? "is-playing" : ""}`}
                >
                  <div className="waylume-destinations-marquee-track flex h-full w-max items-start">
                    {[0, 1].map((copy) => (
                      <div key={copy} className="flex h-full shrink-0 items-start waylume-destinations-copy" style={{ gap: "var(--destination-gap)", paddingRight: "var(--destination-gap)" }}>
                        {popularDestinations.map((destination, index) => (
                          <DestinationCard key={`${copy}-${destination.id}`} destination={destination} index={index} onSelect={setSelectedDestination} />
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <dialog
        ref={dialogRef}
        aria-labelledby="destination-dialog-heading"
        onClose={() => setSelectedDestination(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeDestination();
        }}
        className="fixed inset-0 m-auto max-h-[calc(100dvh-32px)] w-[calc(100%-32px)] max-w-155 overflow-y-auto rounded-2xl bg-white p-0 text-[#242424] shadow-[0_25px_90px_rgba(0,0,0,0.3)] backdrop:bg-black/70 backdrop:backdrop-blur-[5px] dark:bg-[#202224] dark:text-white"
      >
        {selectedDestination && (
          <article>
            <div className="relative h-60 overflow-hidden bg-[#e8ebe7] sm:h-77.5">
              <Image src={selectedDestination.image} alt={selectedDestination.imageAlt} fill sizes="(max-width: 620px) 100vw, 620px" className="object-cover object-center" />

              <div className="absolute inset-0 bg-linear-to-t from-black/35 to-transparent" />

              <button type="button" onClick={closeDestination} aria-label="Close destination details" className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#242424] transition-all duration-300 hover:rotate-90 hover:bg-[#eeeeee]">
                <IoCloseOutline aria-hidden="true" className="text-[23px]" />
              </button>
            </div>

            <div className="px-6 py-7 sm:px-9 sm:py-9">
              <div className="flex items-center gap-3">
                <CountryFlag countryCode={selectedDestination.countryCode} country={selectedDestination.country} className="h-10 w-10" />

                <span className="inline-flex items-center gap-1.5 text-[12px] text-[#858585] dark:text-[#aaaaaa]">
                  <IoLocationOutline aria-hidden="true" className="text-[16px]" />
                  {selectedDestination.country}
                </span>
              </div>

              <h2 id="destination-dialog-heading" className="font-heading mt-4 text-[27px] leading-[1.2] font-semibold tracking-tighter sm:text-[34px]">
                Explore {selectedDestination.name}
              </h2>

              <p className="mt-5 text-[14px] leading-[1.85] text-[#858585] dark:text-[#aaaaaa] sm:text-[15px]">
                {selectedDestination.description}
              </p>

              <Link href={`/trip/category/${selectedDestination.categorySlug}`} onClick={closeDestination} className="group mt-7 inline-flex h-11.5 items-center justify-center gap-3 rounded-lg bg-[#242424] px-6 text-[13px] font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#454545] dark:bg-white dark:text-[#242424] dark:hover:bg-[#eeeeee]">
                Explore Related Journeys
                <IoArrowForwardOutline aria-hidden="true" className="text-[17px] transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </article>
        )}
      </dialog>
    </>
  );
}