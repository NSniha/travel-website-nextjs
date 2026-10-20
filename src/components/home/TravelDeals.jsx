"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { IoArrowForwardOutline, IoCheckmarkOutline, IoCloseOutline, IoPricetagOutline } from "react-icons/io5";
import Container from "@/components/shared/Container";
import Reveal from "@/components/shared/Reveal";
import { travelDeals } from "@/data/travelMedia";
import { trips } from "@/data/trips";
import { tripCategories } from "@/data/tripPage";

const categoryKeywords = {
  family: ["family", "family holiday"],
  romantic: ["romantic", "honeymoon", "couple"],
  adventure: ["adventure", "mountain", "hiking", "trekking"],
  cultural: ["cultural", "culture", "heritage", "history"],
  island: ["island", "tropical", "beach", "coastal"],
};

function getDealDestination(deal) {
  const directTrip = trips.find((trip) => trip.slug === deal.tripSlug);

  if (directTrip) {
    return {
      href: `/trip/${directTrip.slug}`,
      label: "Explore This Trip",
      title: directTrip.title,
    };
  }

  const directCategory = tripCategories.find(
    (category) => category.slug === deal.categorySlug || category.id === deal.categoryId,
  );

  if (directCategory) {
    return {
      href: `/trip/category/${directCategory.slug}#all-trips`,
      label: "Explore Related Trips",
      title: directCategory.title,
    };
  }

  const content = [
    deal.title,
    ...(deal.titleLines || []),
    deal.description,
    deal.note,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  const matchingTrip = trips.find((trip) => {
    const destination = trip.location.split(",")[0].toLowerCase();

    return (
      content.includes(trip.title.toLowerCase()) ||
      content.includes(destination)
    );
  });

  if (matchingTrip) {
    return {
      href: `/trip/${matchingTrip.slug}`,
      label: "Explore This Trip",
      title: matchingTrip.title,
    };
  }

  const matchingCategory = tripCategories.find((category) =>
    categoryKeywords[category.id]?.some((keyword) => content.includes(keyword)),
  );

  if (matchingCategory) {
    return {
      href: `/trip/category/${matchingCategory.slug}#all-trips`,
      label: "Explore Related Trips",
      title: matchingCategory.title,
    };
  }

  return {
    href: "/trip#all-trips",
    label: "Explore Our Trips",
    title: "All Trips",
  };
}

export default function TravelDeals() {
  const [selectedDeal, setSelectedDeal] = useState(null);
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);

  const selectedDestination = selectedDeal ? getDealDestination(selectedDeal) : null;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!selectedDeal || !dialog) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    if (!dialog.open) dialog.showModal();

    dialog.scrollTop = 0;
    closeButtonRef.current?.focus();

    return () => {
      if (dialog.open) dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [selectedDeal]);

  const openDeal = (deal) => setSelectedDeal(deal);
  const closeDeal = () => dialogRef.current?.close();

  return (
    <>
      <section id="travel-deals" aria-labelledby="travel-deals-heading" className="bg-white pb-23.75 transition-colors duration-300 dark:bg-[#101112] sm:pb-27.5 lg:pb-31.25">
        <Container>
          <div className="grid items-end gap-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-14">
            <Reveal>
              <h2 id="travel-deals-heading" className="font-heading max-w-162.5 text-[30px] leading-[1.2] font-semibold tracking-[-0.055em] text-[#242424] dark:text-white sm:text-[36px] lg:text-[40px]">
                Explore Unmissable Travel<br className="hidden lg:block" />{" "}Deals Tailored Just for You
              </h2>
            </Reveal>

            <Reveal delay={120} className="lg:justify-self-end lg:pb-1">
              <p className="max-w-105 text-[14px] leading-[1.7] text-[#858585] dark:text-[#aaaaaa] sm:text-[16px]">
                Discover inspiring travel offers curated for your next remarkable escape.
              </p>
            </Reveal>
          </div>

          <div className="mt-8.75 grid grid-cols-1 gap-4.5 sm:mt-10.5 lg:grid-cols-2">
            {travelDeals.map((deal, index) => (
              <Reveal key={deal.id} delay={index * 130}>
                <button
                  type="button"
                  onClick={() => openDeal(deal)}
                  aria-label={`Explore travel offer: ${deal.title}`}
                  aria-haspopup="dialog"
                  className="group relative block h-88.75 w-full overflow-hidden rounded-[14px] bg-[#44514a] text-left outline-none transition-shadow duration-500 hover:shadow-[0_18px_45px_rgba(0,0,0,0.15)] focus-visible:ring-2 focus-visible:ring-[#242424] focus-visible:ring-offset-4 dark:focus-visible:ring-white dark:focus-visible:ring-offset-[#101112] sm:h-92.5 lg:h-87.5 xl:h-95"
                >
                  <Image
                    src={deal.image}
                    alt={`${deal.title} travel destination`}
                    fill
                    sizes="(max-width: 1023px) 100vw, (max-width: 1536px) 50vw, 745px"
                    className="object-cover object-center transition-transform duration-1200 ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:group-hover:scale-[1.065]"
                  />

                  <span className="absolute inset-0 bg-linear-to-t from-black/80 via-black/15 to-black/5" />
                  <span className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />

                  <span className="absolute top-5.25 left-5.25 z-10 max-w-[calc(100%-85px)] rounded-full bg-white px-3.75 py-2.25 text-[10px] leading-[1.4] font-medium text-[#242424] shadow-sm sm:top-6.25 sm:left-6.25 sm:text-[11px]">
                    {deal.badge}
                  </span>

                  <span className="absolute top-5.25 right-5.25 z-10 flex h-8.75 w-8.75 translate-y-2 items-center justify-center rounded-full border border-white/50 bg-white/15 text-white opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 sm:top-6.25 sm:right-6.25">
                    <IoArrowForwardOutline aria-hidden="true" className="text-[18px]" />
                  </span>

                  <span className="absolute right-0 bottom-0 left-0 z-10 block p-5.5 text-white sm:p-6.5 xl:p-7">
                    <span className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-end sm:gap-3">
                      <span className="block min-w-0 flex-1">
                        <span className="font-heading block text-[32px] leading-[1.12] font-medium tracking-[-0.06em] transition-transform duration-500 motion-safe:group-hover:-translate-y-1 sm:text-[34px] lg:text-[clamp(29px,3.1vw,44px)]">
                          {deal.titleLines.map((line) => (
                            <span key={line} className="block">{line}</span>
                          ))}
                        </span>

                        <span className="mt-3.25 block max-w-82.5 text-[11px] leading-normal font-normal text-white/90 sm:text-[12px]">
                          {deal.note}
                        </span>
                      </span>

                      <span className="flex shrink-0 flex-col items-start sm:items-end">
                        <span className="text-[11px] leading-[1.3] text-white/90 sm:text-[12px]">
                          Discount up to
                        </span>

                        <span className="mt-0.75 flex items-end gap-0.75">
                          <span className="font-heading text-[64px] leading-[0.95] font-medium tracking-[-0.075em] sm:text-[67px] lg:text-[clamp(55px,5.4vw,78px)]">
                            {deal.discount}
                          </span>

                          <span className="mb-1.25 flex h-6.25 w-6.25 items-center justify-center rounded-full bg-[#262626] text-[12px] font-medium text-white sm:h-7 sm:w-7">
                            %
                          </span>
                        </span>
                      </span>
                    </span>
                  </span>
                </button>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <dialog
        ref={dialogRef}
        aria-labelledby="travel-deal-dialog-title"
        aria-describedby="travel-deal-dialog-description"
        onClose={() => setSelectedDeal(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeDeal();
        }}
        className="fixed inset-0 m-auto max-h-[calc(100dvh-32px)] w-[calc(100%-32px)] max-w-150 overscroll-contain overflow-y-auto rounded-[18px] bg-white p-0 text-[#242424] shadow-[0_25px_90px_rgba(0,0,0,0.3)] backdrop:bg-black/65 backdrop:backdrop-blur-xs dark:bg-[#1e2022] dark:text-white"
      >
        {selectedDeal && (
          <article>
            <div className="relative h-55 overflow-hidden bg-[#44514a] sm:h-67.5">
              <Image
                src={selectedDeal.image}
                alt={selectedDeal.title}
                fill
                sizes="(max-width: 640px) 100vw, 600px"
                className="object-cover object-center"
              />

              <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />

              <button
                ref={closeButtonRef}
                type="button"
                onClick={closeDeal}
                aria-label="Close travel deal details"
                className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#242424] shadow-md transition-all duration-300 hover:rotate-90 hover:bg-[#f0f0f0]"
              >
                <IoCloseOutline aria-hidden="true" className="text-[23px]" />
              </button>
            </div>

            <div className="px-6 py-7 sm:px-9 sm:py-8">
              <div className="flex items-center gap-2 text-[12px] font-medium tracking-[0.08em] text-[#858585] uppercase dark:text-[#aaaaaa]">
                <IoPricetagOutline aria-hidden="true" className="text-[17px]" />
                <span>WAYLUME Travel Deals</span>
              </div>

              <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
                <h2 id="travel-deal-dialog-title" className="font-heading max-w-87.5 text-[27px] leading-[1.2] font-semibold tracking-[-0.055em] text-[#242424] dark:text-white sm:text-[32px]">
                  {selectedDeal.title}
                </h2>

                <span className="rounded-full bg-[#f1f3ef] px-4 py-2 text-[12px] font-semibold text-[#242424] dark:bg-[#303431] dark:text-white">
                  Up to {selectedDeal.discount}% Off
                </span>
              </div>

              <p id="travel-deal-dialog-description" className="mt-5 text-[14px] leading-[1.8] text-[#777777] dark:text-[#b0b0b0] sm:text-[15px]">
                {selectedDeal.description}
              </p>

              <div className="mt-6 border-t border-[#eeeeee] pt-5 dark:border-white/10">
                <h3 className="text-[15px] font-semibold text-[#242424] dark:text-white">
                  Offer Highlights
                </h3>

                <ul className="mt-4 space-y-3">
                  {selectedDeal.highlights.map((highlight) => (
                    <li key={highlight} className="flex items-start gap-3 text-[14px] leading-[1.6] text-[#777777] dark:text-[#b0b0b0]">
                      <IoCheckmarkOutline aria-hidden="true" className="mt-0.5 shrink-0 text-[18px] text-[#242424] dark:text-white" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {selectedDestination && (
                <div className="mt-6 rounded-lg bg-[#f8f8f8] px-4 py-3 dark:bg-[#292b2d]">
                  <p className="text-[11px] leading-normal text-[#858585] dark:text-[#aaaaaa]">
                    Explore related travel experiences
                  </p>

                  <p className="font-heading mt-1 text-[14px] font-semibold tracking-tight text-[#242424] dark:text-white">
                    {selectedDestination.title}
                  </p>
                </div>
              )}

              <p className="mt-6 text-[12px] leading-[1.65] text-[#929292] dark:text-[#999999]">
                Promotional discounts are illustrative. Final pricing and availability will be confirmed when booking services are integrated.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Link
                  href={selectedDestination?.href || "/trip#all-trips"}
                  onClick={closeDeal}
                  className="group/cta relative inline-flex h-11 items-center justify-center gap-3 overflow-hidden rounded-lg bg-[#242424] px-5 text-[13px] font-medium text-white shadow-[0_5px_15px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-0.75 hover:shadow-[0_10px_25px_rgba(0,0,0,0.14)] active:translate-y-0 dark:bg-white dark:text-[#242424]"
                >
                  <span className="absolute inset-0 -translate-x-full bg-[#454545] transition-transform duration-500 ease-out group-hover/cta:translate-x-0 dark:bg-[#e8e8e8]" />

                  <span className="relative z-10">
                    {selectedDestination?.label || "Explore Our Trips"}
                  </span>

                  <IoArrowForwardOutline aria-hidden="true" className="relative z-10 text-[17px] transition-transform duration-300 group-hover/cta:translate-x-1" />
                </Link>

                <Link
                  href="/trip#all-trips"
                  onClick={closeDeal}
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