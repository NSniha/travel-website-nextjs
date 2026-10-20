"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  IoArrowForwardOutline,
  IoCheckmarkOutline,
  IoCloseOutline,
  IoLocationOutline,
  IoTimeOutline,
} from "react-icons/io5";

import Container from "@/components/shared/Container";
import Reveal from "@/components/shared/Reveal";

import { tripCategories } from "@/data/tripPage";
import { travelExperiences } from "@/data/home";

import {
  getTripsByCategory,
  getTripsForExperience,
  formatTripPrice,
} from "@/lib/trips";

function CategoryCard({
  category,
  index,
  activeCategoryId,
  onSelect,
}) {
  const isActive = activeCategoryId === category.id;

  return (
    <Reveal delay={(index % 3) * 100} className="min-w-0">
      <button
        type="button"
        onClick={() => onSelect(category)}
        aria-label={`Explore ${category.title} experiences and related trips`}
        aria-haspopup="dialog"
        className={`group relative isolate block h-75 w-full overflow-hidden rounded-2xl bg-[#dce2df] text-left outline-none transition-[box-shadow,transform] duration-500 hover:shadow-[0_16px_40px_rgba(0,0,0,0.15)] focus-visible:ring-2 focus-visible:ring-[#242424] focus-visible:ring-offset-4 dark:bg-[#292c2e] dark:focus-visible:ring-white dark:focus-visible:ring-offset-[#101112] sm:h-80 lg:h-[clamp(300px,26vw,385px)] ${
          isActive
            ? "ring-2 ring-[#242424] ring-offset-4 dark:ring-white dark:ring-offset-[#101112]"
            : ""
        }`}
      >
        <Image
          src={category.image}
          alt={category.alt || category.title}
          fill
          quality={90}
          sizes={
            index < 3
              ? "(max-width: 639px) 100vw, (max-width: 1023px) 95vw, 50vw"
              : "(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw"
          }
          className="object-cover object-center transition-transform duration-1200 ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:group-hover:scale-[1.065]"
        />

        <span className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/85 via-black/10 to-transparent" />

        <span className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/15" />

        <span className="absolute top-5 right-5 flex h-9 w-9 translate-y-2 items-center justify-center rounded-full border border-white/50 bg-white/95 text-[#242424] opacity-0 shadow-[0_5px_20px_rgba(0,0,0,0.12)] transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
          <IoArrowForwardOutline
            aria-hidden="true"
            className="text-[18px] -rotate-45 transition-transform duration-300 group-hover:rotate-0"
          />
        </span>

        <div className="absolute inset-x-0 bottom-0 z-10 p-5 text-white sm:p-6 lg:p-6 xl:p-7">
          <h3 className="font-heading text-[21px] leading-tight font-semibold tracking-[-0.04em] sm:text-[23px] lg:text-[22px] xl:text-[24px]">
            {category.title}
          </h3>

          <p className="mt-2 max-w-127.5 text-[13px] leading-[1.65] font-normal text-white/90 sm:text-[14px] xl:text-[15px]">
            {category.description}
          </p>

          <span className="mt-3 inline-flex max-h-0 items-center gap-2 overflow-hidden text-[12px] font-medium opacity-0 transition-all duration-500 group-hover:max-h-8 group-hover:opacity-100 group-focus-visible:max-h-8 group-focus-visible:opacity-100">
            Explore Experiences

            <IoArrowForwardOutline
              aria-hidden="true"
              className="text-[15px] transition-transform duration-300 group-hover:translate-x-1"
            />
          </span>
        </div>
      </button>
    </Reveal>
  );
}

function RelatedTripCard({ trip, onNavigate }) {
  return (
    <Link
      href={`/trip/${trip.slug}`}
      onClick={onNavigate}
      aria-label={`View ${trip.title} trip details`}
      className="group/trip flex min-w-0 items-center gap-3.5 rounded-xl border border-[#ececec] bg-[#fafafa] p-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#d5d5d5] hover:bg-[#f4f4f4] dark:border-white/10 dark:bg-[#292b2d] dark:hover:border-white/20 dark:hover:bg-[#303234] sm:gap-4"
    >
      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-[#e5e8e4] dark:bg-[#353739] sm:h-27 sm:w-32">
        <Image
          src={trip.image}
          alt={trip.imageAlt || trip.title}
          fill
          sizes="(max-width: 639px) 96px, 128px"
          className="object-cover object-center transition-transform duration-700 motion-safe:group-hover/trip:scale-110"
        />
      </div>

      <div className="min-w-0 flex-1">
        <h4 className="font-heading text-[14px] leading-[1.4] font-semibold tracking-[-0.03em] text-[#242424] dark:text-white sm:text-[16px]">
          {trip.title}
        </h4>

        <p className="mt-2 flex items-center gap-1.5 text-[12px] text-[#858585] dark:text-[#aaaaaa]">
          <IoLocationOutline
            aria-hidden="true"
            className="shrink-0 text-[15px]"
          />

          <span className="truncate">
            {trip.location}
          </span>
        </p>

        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5">
          <span className="inline-flex items-center gap-1 text-[11px] text-[#858585] dark:text-[#aaaaaa]">
            <IoTimeOutline
              aria-hidden="true"
              className="text-[14px]"
            />

            {trip.durationDays} Days
          </span>

          <span className="text-[11px] font-semibold text-[#444444] dark:text-[#dddddd]">
            From {formatTripPrice(trip.priceFrom, trip.currency)}
          </span>
        </div>
      </div>

      <IoArrowForwardOutline
        aria-hidden="true"
        className="shrink-0 text-[18px] text-[#242424] transition-transform duration-300 group-hover/trip:translate-x-1 dark:text-white"
      />
    </Link>
  );
}

export default function TripCategories({
  activeCategoryId = null,
}) {
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);

  const [selectedCategory, setSelectedCategory] = useState(null);

  const activeCategory = tripCategories.find(
    (category) => category.id === activeCategoryId
  );

  const selectedExperience = selectedCategory
    ? travelExperiences.find(
        (experience) =>
          experience.categoryId === selectedCategory.id ||
          experience.categorySlug === selectedCategory.slug
      )
    : null;

  const relatedTrips = selectedCategory
    ? selectedExperience
      ? getTripsForExperience(selectedExperience)
      : getTripsByCategory(selectedCategory.id)
    : [];

  const featuredTrip = relatedTrips.find(
    (trip) => trip.slug === selectedExperience?.featuredTripSlug
  ) || relatedTrips[0] || null;

  const categoryDescription =
    selectedExperience?.details ||
    selectedCategory?.description ||
    "";

  const categoryHighlights = Array.isArray(
    selectedExperience?.highlights
  )
    ? selectedExperience.highlights
    : [];

  const categoryHref = selectedCategory
    ? `/trip/category/${selectedCategory.slug}`
    : "/trip";

  const isSelectedCategoryActive =
    selectedCategory?.id === activeCategoryId;

  const categoryTripsHref = selectedCategory
    ? `/trip/category/${selectedCategory.slug}#all-trips`
    : "/trip#all-trips";

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!selectedCategory || !dialog) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    if (!dialog.open) {
      dialog.showModal();
    }

    dialog.scrollTop = 0;

    closeButtonRef.current?.focus();

    return () => {
      if (dialog.open) {
        dialog.close();
      }

      document.body.style.overflow = previousOverflow;
    };
  }, [selectedCategory]);

  const openCategory = (category) => {
    setSelectedCategory(category);
  };

  const closeCategory = () => {
    const dialog = dialogRef.current;

    if (dialog?.open) {
      dialog.close();
    } else {
      setSelectedCategory(null);
    }
  };

  return (
    <>
      <section
        id="trip-categories"
        aria-labelledby="trip-categories-heading"
        className="bg-white pt-0 pb-12 transition-colors duration-300 dark:bg-[#101112] sm:pt-8 sm:pb-12 lg:pt-12 lg:pb-14"
      >
        <Container>
          <div className="grid min-w-0 items-end gap-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-12 xl:gap-16">
            <Reveal className="min-w-0">
              <h2
                id="trip-categories-heading"
                className="font-heading max-w-187.5 text-[30px] leading-[1.2] font-semibold tracking-[-0.055em] text-[#242424] dark:text-white sm:text-[36px] lg:text-[44px]"
              >
                Explore Journeys Made for
                <br className="hidden lg:block" /> Every Kind of Traveler
              </h2>
            </Reveal>

            <Reveal
              delay={120}
              className="min-w-0 lg:justify-self-end lg:pb-1"
            >
              <p className="max-w-130 text-[14px] leading-[1.75] font-normal text-[#858585] dark:text-[#aaaaaa] sm:text-[16px]">
                From peaceful escapes to extraordinary adventures,
                discover experiences that inspire the way you explore.
              </p>
            </Reveal>
          </div>

          {activeCategory && (
            <Reveal className="mt-6 flex flex-wrap items-center gap-3">
              <span className="text-[12px] text-[#858585] dark:text-[#aaaaaa] sm:text-[13px]">
                Selected experience:
              </span>

              <Link
                href="/trip"
                className="group inline-flex items-center gap-2 rounded-full border border-[#dedede] px-3 py-1.5 text-[12px] font-medium text-[#242424] transition-colors duration-300 hover:bg-[#f5f5f5] dark:border-white/20 dark:text-white dark:hover:bg-white/10"
              >
                {activeCategory.title}

                <IoCloseOutline
                  aria-hidden="true"
                  className="text-[16px] transition-transform duration-300 group-hover:rotate-90"
                />
              </Link>
            </Reveal>
          )}

          {/* First Row — Two Large Cards */}

          <div className="mt-10 grid min-w-0 grid-cols-1 gap-4 sm:mt-12 md:grid-cols-2 lg:mt-14 lg:gap-5 xl:gap-6">
            {tripCategories.slice(0, 2).map((category, index) => (
              <CategoryCard
                key={category.id}
                category={category}
                index={index}
                activeCategoryId={activeCategoryId}
                onSelect={openCategory}
              />
            ))}
          </div>

          {/* Second Row — Three Cards */}

          <div className="mt-4 grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)] lg:gap-5 xl:mt-6 xl:gap-6">
            {tripCategories.slice(2).map((category, index) => (
              <div
                key={category.id}
                className={`min-w-0 ${
                  index === 0
                    ? "sm:col-span-2 lg:col-span-1"
                    : ""
                }`}
              >
                <CategoryCard
                  category={category}
                  index={index + 2}
                  activeCategoryId={activeCategoryId}
                  onSelect={openCategory}
                />
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Category Details Popup */}

      <dialog
        ref={dialogRef}
        aria-labelledby="category-dialog-title"
        aria-describedby="category-dialog-description"
        onClose={() => setSelectedCategory(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            closeCategory();
          }
        }}
        className="fixed inset-0 m-auto max-h-[calc(100dvh-32px)] w-[calc(100%-32px)] max-w-170 overscroll-contain overflow-y-auto rounded-[18px] bg-white p-0 text-[#242424] shadow-[0_25px_90px_rgba(0,0,0,0.3)] backdrop:bg-black/70 backdrop:backdrop-blur-[5px] dark:bg-[#1e2022] dark:text-white"
      >
        {selectedCategory && (
          <article>
            {/* Popup Hero Image */}

            <div className="relative h-58.75 overflow-hidden bg-[#dce2df] dark:bg-[#292c2e] sm:h-75">
              <Image
                src={selectedCategory.image}
                alt={selectedCategory.alt || selectedCategory.title}
                fill
                sizes="(max-width: 640px) 100vw, 680px"
                className="object-cover object-center"
              />

              <div className="absolute inset-0 bg-linear-to-t from-black/45 via-transparent to-black/10" />

              <button
                ref={closeButtonRef}
                type="button"
                onClick={closeCategory}
                aria-label="Close category details"
                className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#242424] shadow-md transition-all duration-300 hover:rotate-90 hover:bg-[#eeeeee]"
              >
                <IoCloseOutline
                  aria-hidden="true"
                  className="text-[23px]"
                />
              </button>

              <span className="absolute bottom-5 left-5 rounded-full border border-white/30 bg-white/15 px-4 py-2 text-[11px] font-medium text-white backdrop-blur-md sm:bottom-6 sm:left-7 sm:text-[12px]">
                WAYLUME Travel Experiences
              </span>
            </div>

            {/* Popup Content */}

            <div className="px-6 py-7 sm:px-9 sm:py-9">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex rounded-full bg-[#f2f2f2] px-3 py-1.5 text-[11px] font-medium text-[#555555] dark:bg-[#303234] dark:text-[#dddddd]">
                  Travel Category
                </span>

                <span className="inline-flex rounded-full bg-[#f2f2f2] px-3 py-1.5 text-[11px] font-medium text-[#555555] dark:bg-[#303234] dark:text-[#dddddd]">
                  {relatedTrips.length}{" "}
                  {relatedTrips.length === 1
                    ? "Journey"
                    : "Journeys"}
                </span>
              </div>

              <h2
                id="category-dialog-title"
                className="font-heading mt-4 text-[28px] leading-[1.2] font-semibold tracking-[-0.055em] text-[#242424] dark:text-white sm:text-[34px]"
              >
                {selectedCategory.title}
              </h2>

              <p
                id="category-dialog-description"
                className="mt-4 text-[14px] leading-[1.85] text-[#777777] dark:text-[#bcbcbc] sm:text-[15px]"
              >
                {categoryDescription}
              </p>

              {/* Experience Highlights */}

              {categoryHighlights.length > 0 && (
                <div className="mt-7 border-t border-[#ececec] pt-6 dark:border-white/10">
                  <h3 className="font-heading text-[16px] font-semibold tracking-[-0.03em] text-[#242424] dark:text-white">
                    Experience Highlights
                  </h3>

                  <ul className="mt-4 space-y-3">
                    {categoryHighlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="flex items-start gap-3 text-[13px] leading-[1.7] text-[#777777] dark:text-[#bcbcbc] sm:text-[14px]"
                      >
                        <IoCheckmarkOutline
                          aria-hidden="true"
                          className="mt-0.5 shrink-0 text-[18px] text-[#242424] dark:text-white"
                        />

                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Related Trips */}

              <div className="mt-8 border-t border-[#ececec] pt-7 dark:border-white/10">
                <div className="flex flex-wrap items-end justify-between gap-3">
                  <div>
                    <h3 className="font-heading text-[19px] leading-[1.35] font-semibold tracking-[-0.04em] text-[#242424] dark:text-white sm:text-[21px]">
                      Explore Related Journeys
                    </h3>

                    <p className="mt-2 max-w-110 text-[12px] leading-[1.7] text-[#858585] dark:text-[#aaaaaa] sm:text-[13px]">
                      Discover thoughtfully curated destinations
                      connected to this travel experience.
                    </p>
                  </div>

                  <span className="text-[11px] font-medium text-[#999999] dark:text-[#aaaaaa]">
                    {relatedTrips.length} Available in Catalog
                  </span>
                </div>

                {relatedTrips.length > 0 ? (
                  <div className="mt-5 space-y-3">
                    {relatedTrips.map((trip) => (
                      <RelatedTripCard
                        key={trip.slug}
                        trip={trip}
                        onNavigate={closeCategory}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="mt-5 rounded-xl bg-[#f8f8f8] px-4 py-5 dark:bg-[#292b2d]">
                    <p className="text-[13px] leading-[1.7] text-[#858585] dark:text-[#aaaaaa]">
                      There are currently no matching journeys
                      in this category.
                    </p>
                  </div>
                )}
              </div>

              {/* Featured Journey */}

              {featuredTrip && (
                <div className="mt-7 rounded-xl border border-[#ededed] bg-[#fafafa] p-4 dark:border-white/10 dark:bg-[#292b2d] sm:p-5">
                  <span className="text-[11px] font-medium tracking-[0.08em] text-[#858585] uppercase dark:text-[#aaaaaa]">
                    Featured Journey
                  </span>

                  <h3 className="font-heading mt-2 text-[17px] font-semibold tracking-[-0.035em] text-[#242424] dark:text-white">
                    {featuredTrip.title}
                  </h3>

                  <p className="mt-2 text-[12px] leading-[1.7] text-[#858585] dark:text-[#aaaaaa] sm:text-[13px]">
                    {featuredTrip.summary}
                  </p>

                  <Link
                    href={`/trip/${featuredTrip.slug}`}
                    onClick={closeCategory}
                    className="group mt-4 inline-flex items-center gap-2 text-[12px] font-semibold text-[#242424] transition-colors hover:text-[#777777] dark:text-white dark:hover:text-[#cccccc] sm:text-[13px]"
                  >
                    View Featured Trip

                    <IoArrowForwardOutline
                      aria-hidden="true"
                      className="text-[17px] transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </Link>
                </div>
              )}

              {/* Navigation */}

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href={categoryHref}
                  onClick={closeCategory}
                  className="group relative inline-flex h-11.5 items-center justify-center gap-3 overflow-hidden rounded-lg bg-[#242424] px-5 text-[13px] font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(0,0,0,0.12)] dark:bg-white dark:text-[#242424]"
                >
                  <span className="absolute inset-0 -translate-x-full bg-[#454545] transition-transform duration-500 ease-out group-hover:translate-x-0 dark:bg-[#e9e9e9]" />

                  <span className="relative z-10">
                    {isSelectedCategoryActive
                      ? "View Category Details"
                      : "Explore Category"}
                  </span>

                  <IoArrowForwardOutline
                    aria-hidden="true"
                    className="relative z-10 text-[17px] transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>

                <Link
                  href={categoryTripsHref}
                  onClick={closeCategory}
                  className="group inline-flex h-11.5 items-center justify-center gap-2 rounded-lg border border-[#dedede] bg-white px-5 text-[13px] font-medium text-[#292929] transition-colors duration-300 hover:border-[#242424] hover:bg-[#f7f7f7] dark:border-white/20 dark:bg-[#292b2d] dark:text-white dark:hover:border-white"
                >
                  View All Related Trips

                  <IoArrowForwardOutline
                    aria-hidden="true"
                    className="text-[17px] transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </div>

              <p className="mt-6 text-[11px] leading-[1.7] text-[#999999] dark:text-[#aaaaaa]">
                Trip information, prices and departure dates are
                illustrative. Booking availability is not yet confirmed.
              </p>
            </div>
          </article>
        )}
      </dialog>
    </>
  );
}