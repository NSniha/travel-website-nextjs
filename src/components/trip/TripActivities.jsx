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

import { tripActivities } from "@/data/tripPage";
import {
  getTripsByActivity,
  formatTripPrice,
} from "@/lib/trips";

const activityMappings = {
  "coastal-sailing": "sailing",
  "cultural-discovery": "cultural",
  "mountain-trekking": "trekking",
  "wildlife-encounters": "wildlife",
};

const categoryMappings = {
  "coastal-sailing": "island-hideaways",
  "cultural-discovery": "cultural-encounters",
  "mountain-trekking": "adventure-escapes",
  "wildlife-encounters": "adventure-escapes",
};

function ActivityCard({ activity, type, onSelect }) {
  if (type === "content") {
    return (
      <button
        type="button"
        onClick={() => onSelect(activity)}
        aria-label={`Discover ${activity.title}`}
        aria-haspopup="dialog"
        className="group flex h-full w-full flex-col justify-between rounded-2xl bg-[#f8f8f8] p-6 text-left outline-none transition-[background-color,box-shadow,transform] duration-500 hover:-translate-y-1 hover:bg-[#f2f2f2] hover:shadow-[0_12px_35px_rgba(0,0,0,0.04)] focus-visible:ring-2 focus-visible:ring-[#242424] dark:bg-[#1c1e20] dark:hover:bg-[#26282a] dark:focus-visible:ring-white sm:p-7 lg:p-6 xl:p-7"
      >
        <div className="flex w-full items-start justify-between gap-3">
          <h3 className="font-heading text-[19px] leading-[1.3] font-semibold tracking-[-0.04em] text-[#242424] dark:text-white sm:text-[20px] lg:text-[19px] xl:text-[21px]">
            {activity.title}
          </h3>

          <IoArrowForwardOutline
            aria-hidden="true"
            className="mt-1 shrink-0 -rotate-45 text-[19px] text-[#777777] opacity-0 transition-all duration-300 group-hover:rotate-0 group-hover:opacity-100 group-focus-visible:opacity-100 dark:text-white"
          />
        </div>

        <p className="max-w-70 text-[14px] leading-[1.75] font-normal text-[#858585] dark:text-[#aaaaaa] sm:text-[15px] lg:text-[14px] xl:text-[16px]">
          {activity.description}
        </p>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => onSelect(activity)}
      aria-label={`Explore ${activity.title}`}
      aria-haspopup="dialog"
      className="group relative block h-full w-full overflow-hidden rounded-2xl bg-[#e5e8e4] outline-none transition-[box-shadow,transform] duration-500 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(0,0,0,0.12)] focus-visible:ring-2 focus-visible:ring-[#242424] focus-visible:ring-offset-4 dark:bg-[#292c2e] dark:focus-visible:ring-white dark:focus-visible:ring-offset-[#101112]"
    >
      <Image
        src={activity.image}
        alt={activity.imageAlt || activity.title}
        fill
        quality={90}
        sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw"
        className="object-cover object-center transition-transform duration-1100 ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:group-hover:scale-[1.07]"
      />

      <span className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />

      <span className="absolute top-4 right-4 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full bg-white/95 text-[#242424] opacity-0 shadow-[0_6px_25px_rgba(0,0,0,0.12)] transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
        <IoArrowForwardOutline
          aria-hidden="true"
          className="-rotate-45 text-[19px] transition-transform duration-300 group-hover:rotate-0"
        />
      </span>
    </button>
  );
}

function RelatedJourneyCard({ trip, onNavigate }) {
  return (
    <Link
      href={`/trip/${trip.slug}`}
      onClick={onNavigate}
      aria-label={`View details for ${trip.title}`}
      className="group/trip flex min-w-0 items-center gap-3.5 rounded-xl border border-[#ececec] bg-[#fafafa] p-3 transition-[background-color,border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-[#d5d5d5] hover:bg-[#f4f4f4] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#242424] dark:border-white/10 dark:bg-[#292b2d] dark:hover:border-white/20 dark:hover:bg-[#303234] dark:focus-visible:outline-white sm:gap-4"
    >
      <div className="relative h-23 w-23 shrink-0 overflow-hidden rounded-lg bg-[#e5e8e4] dark:bg-[#353739] sm:h-26 sm:w-30">
        <Image
          src={trip.image}
          alt={trip.imageAlt || trip.title}
          fill
          sizes="(max-width: 639px) 92px, 120px"
          className="object-cover object-center transition-transform duration-700 motion-safe:group-hover/trip:scale-110"
        />
      </div>

      <div className="min-w-0 flex-1">
        <h4 className="font-heading text-[14px] leading-[1.4] font-semibold tracking-[-0.03em] text-[#242424] dark:text-white sm:text-[15px]">
          {trip.title}
        </h4>

        <div className="mt-2 flex items-center gap-1.5 text-[12px] text-[#858585] dark:text-[#aaaaaa]">
          <IoLocationOutline
            aria-hidden="true"
            className="shrink-0 text-[15px]"
          />

          <span className="truncate">{trip.location}</span>
        </div>

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

      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[#555555] transition-colors duration-300 group-hover/trip:text-[#242424] dark:text-[#bbbbbb] dark:group-hover/trip:text-white">
        <IoArrowForwardOutline
          aria-hidden="true"
          className="text-[18px] transition-transform duration-300 group-hover/trip:translate-x-1"
        />
      </span>
    </Link>
  );
}

export default function TripActivities() {
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);

  const [selectedActivity, setSelectedActivity] = useState(null);

  const activityCards = tripActivities.flatMap((activity, index) => {
    const types =
      index < 2
        ? ["content", "image"]
        : ["image", "content"];

    return types.map((type) => ({
      key: `${activity.id}-${type}`,
      activity,
      type,
    }));
  });

  const selectedActivityId = selectedActivity
    ? selectedActivity.activityId ||
      activityMappings[selectedActivity.id]
    : null;

  const relatedTrips = selectedActivityId
    ? getTripsByActivity(selectedActivityId)
    : [];

  const selectedCategorySlug = selectedActivity
    ? selectedActivity.categorySlug ||
      categoryMappings[selectedActivity.id]
    : null;

  const categoryHref = selectedCategorySlug
    ? `/trip/category/${selectedCategorySlug}`
    : "/trip#all-trips";

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!selectedActivity || !dialog) return;

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
  }, [selectedActivity]);

  const openActivity = (activity) => {
    setSelectedActivity(activity);
  };

  const closeActivity = () => {
    const dialog = dialogRef.current;

    if (dialog?.open) {
      dialog.close();
    } else {
      setSelectedActivity(null);
    }
  };

  const activityDetails =
    selectedActivity?.details ||
    selectedActivity?.description ||
    "";

  const activityHighlights = Array.isArray(
    selectedActivity?.highlights
  )
    ? selectedActivity.highlights
    : [];

  return (
    <>
      <section
        id="trip-activities"
        aria-labelledby="trip-activities-heading"
        className="bg-white pt-10 pb-22 transition-colors duration-300 dark:bg-[#101112] sm:pt-14 sm:pb-26 lg:pt-14 lg:pb-28"
      >
        <Container>
          <div className="grid min-w-0 items-end gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-12 xl:gap-16">
            <Reveal className="min-w-0">
              <h2
                id="trip-activities-heading"
                className="font-heading max-w-162.5 text-[30px] leading-[1.2] font-semibold tracking-[-0.055em] text-[#242424] dark:text-white sm:text-[36px] lg:text-[44px]"
              >
                Unforgettable Experiences
                <br className="hidden sm:block" /> For Every Explorer
              </h2>
            </Reveal>

            <Reveal
              delay={120}
              className="min-w-0 lg:justify-self-end lg:pb-1"
            >
              <p className="max-w-132.5 text-[14px] leading-[1.75] font-normal text-[#858585] dark:text-[#aaaaaa] sm:text-[16px]">
                Discover extraordinary activities and meaningful experiences
                that make every journey truly unforgettable.
              </p>
            </Reveal>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-5 lg:mt-14 lg:grid-cols-4 lg:gap-5 xl:gap-6">
            {activityCards.map((card, index) => (
              <Reveal
                key={card.key}
                delay={(index % 4) * 80}
                className="min-w-0"
              >
                <div className="h-61.25 min-w-0 sm:h-68.75 lg:h-[clamp(265px,21vw,325px)]">
                  <ActivityCard
                    activity={card.activity}
                    type={card.type}
                    onSelect={openActivity}
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <dialog
        ref={dialogRef}
        aria-labelledby="activity-dialog-title"
        aria-describedby="activity-dialog-description"
        onClose={() => setSelectedActivity(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            closeActivity();
          }
        }}
        className="fixed inset-0 m-auto max-h-[calc(100dvh-32px)] w-[calc(100%-32px)] max-w-160 overscroll-contain overflow-y-auto rounded-2xl bg-white p-0 text-[#242424] shadow-[0_25px_90px_rgba(0,0,0,0.3)] backdrop:bg-black/70 backdrop:backdrop-blur-[5px] dark:bg-[#1e2022] dark:text-white"
      >
        {selectedActivity && (
          <article>
            <div className="relative h-58.75 overflow-hidden bg-[#e5e8e4] sm:h-77.5">
              <Image
                src={selectedActivity.image}
                alt={selectedActivity.imageAlt || selectedActivity.title}
                fill
                sizes="(max-width: 640px) 100vw, 640px"
                className="object-cover object-center"
              />

              <div className="absolute inset-0 bg-linear-to-t from-black/45 via-transparent to-black/10" />

              <button
                ref={closeButtonRef}
                type="button"
                onClick={closeActivity}
                aria-label="Close activity details"
                className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#242424] shadow-md transition-all duration-300 hover:rotate-90 hover:bg-[#eeeeee]"
              >
                <IoCloseOutline
                  aria-hidden="true"
                  className="text-[23px]"
                />
              </button>
            </div>

            <div className="px-6 py-7 sm:px-9 sm:py-9">
              <span className="inline-flex rounded-full bg-[#f2f2f2] px-3 py-1.5 text-[11px] font-medium text-[#555555] dark:bg-[#303234] dark:text-[#dddddd]">
                WAYLUME Experiences
              </span>

              <h2
                id="activity-dialog-title"
                className="font-heading mt-4 text-[28px] leading-[1.2] font-semibold tracking-[-0.055em] sm:text-[34px]"
              >
                {selectedActivity.title}
              </h2>

              <p
                id="activity-dialog-description"
                className="mt-5 text-[14px] leading-[1.85] text-[#777777] dark:text-[#bcbcbc] sm:text-[15px]"
              >
                {activityDetails}
              </p>

              {activityHighlights.length > 0 && (
                <div className="mt-7 border-t border-[#ececec] pt-6 dark:border-white/10">
                  <h3 className="font-heading text-[16px] font-semibold tracking-tight">
                    Experience Highlights
                  </h3>

                  <ul className="mt-4 space-y-3">
                    {activityHighlights.map((highlight) => (
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

              {/* Related Trip Details */}

              <div className="mt-8 border-t border-[#ececec] pt-7 dark:border-white/10">
                <div className="flex flex-wrap items-end justify-between gap-3">
                  <div>
                    <h3 className="font-heading text-[18px] leading-[1.35] font-semibold tracking-[-0.04em] text-[#242424] dark:text-white sm:text-[20px]">
                      Explore Related Journeys
                    </h3>

                    <p className="mt-2 max-w-105 text-[12px] leading-[1.7] text-[#858585] dark:text-[#aaaaaa] sm:text-[13px]">
                      Discover extraordinary destinations featuring this
                      travel experience.
                    </p>
                  </div>

                  <span className="text-[11px] font-medium text-[#999999] dark:text-[#aaaaaa]">
                    {relatedTrips.length}{" "}
                    {relatedTrips.length === 1
                      ? "Journey"
                      : "Journeys"}
                  </span>
                </div>

                {relatedTrips.length > 0 ? (
                  <div className="mt-5 space-y-3">
                    {relatedTrips.map((trip) => (
                      <RelatedJourneyCard
                        key={trip.slug}
                        trip={trip}
                        onNavigate={closeActivity}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="mt-5 rounded-xl bg-[#f8f8f8] px-4 py-5 dark:bg-[#292b2d]">
                    <p className="text-[13px] leading-[1.7] text-[#858585] dark:text-[#aaaaaa]">
                      Related journeys are being prepared. Explore our
                      complete trip collection for more inspiration.
                    </p>
                  </div>
                )}
              </div>

              {/* Navigation Buttons */}

              <div className="mt-8 flex flex-wrap items-center gap-3">
                {relatedTrips.length > 0 && (
                  <Link
                    href={`/trip/${relatedTrips[0].slug}`}
                    onClick={closeActivity}
                    className="group inline-flex h-11.5 items-center justify-center gap-3 rounded-lg bg-[#242424] px-5 text-[13px] font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#454545] hover:shadow-[0_8px_25px_rgba(0,0,0,0.12)] dark:bg-white dark:text-[#242424] dark:hover:bg-[#e9e9e9]"
                  >
                    View Featured Trip

                    <IoArrowForwardOutline
                      aria-hidden="true"
                      className="text-[17px] transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </Link>
                )}

                <Link
                  href={categoryHref}
                  onClick={closeActivity}
                  className={`group inline-flex h-11.5 items-center justify-center gap-3 rounded-lg px-5 text-[13px] font-medium transition-all duration-300 hover:-translate-y-0.5 ${
                    relatedTrips.length > 0
                      ? "border border-[#dedede] bg-white text-[#292929] hover:border-[#242424] dark:border-white/20 dark:bg-[#292b2d] dark:text-white dark:hover:border-white"
                      : "bg-[#242424] text-white hover:bg-[#454545] dark:bg-white dark:text-[#242424] dark:hover:bg-[#e9e9e9]"
                  }`}
                >
                  Explore Related Experiences

                  <IoArrowForwardOutline
                    aria-hidden="true"
                    className="text-[17px] transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </div>

              <p className="mt-6 text-[11px] leading-[1.7] text-[#999999] dark:text-[#aaaaaa]">
                Featured journeys, indicative prices and travel dates are
                illustrative. Booking availability is not yet confirmed.
              </p>
            </div>
          </article>
        )}
      </dialog>
    </>
  );
}