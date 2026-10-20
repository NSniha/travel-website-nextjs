"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  IoArrowForwardOutline,
  IoCalendarOutline,
  IoCheckmarkOutline,
  IoInformationCircleOutline,
  IoLocationOutline,
  IoStar,
  IoTimeOutline,
} from "react-icons/io5";

import { formatTripPrice } from "@/lib/trips";

const SAMPLE_DATE_OFFSETS = [0, 28, 56, 84];

function addDays(date, days) {
  const updated = new Date(date);
  updated.setUTCDate(updated.getUTCDate() + days);
  return updated;
}

function formatShortDate(date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(date);
}

function createDateOptions(trip) {
  if (!trip?.departureDate) return [];

  const startDate = new Date(`${trip.departureDate}T00:00:00Z`);

  if (Number.isNaN(startDate.getTime())) return [];

  const duration = Math.max(1, Number(trip.durationDays) || 1);

  return SAMPLE_DATE_OFFSETS.map((offset, index) => {
    const departure = addDays(startDate, offset);
    const returnDate = addDays(departure, duration - 1);

    return {
      id: `${trip.slug}-date-${index}`,
      departure: departure.toISOString().slice(0, 10),
      label: `${formatShortDate(departure)} – ${formatShortDate(returnDate)}`,
      year: departure.getUTCFullYear(),
      isOriginal: index === 0,
    };
  });
}

export default function TripBookingCard({ trip, details }) {
  const [selectedDateIndex, setSelectedDateIndex] = useState(0);

  const dateOptions = useMemo(() => createDateOptions(trip), [trip]);

  const selectedDate = dateOptions[selectedDateIndex] || dateOptions[0] || null;

  const facilities = Array.isArray(details?.facilities)
    ? details.facilities
    : [];

  const price = formatTripPrice(trip.priceFrom, trip.currency);

  const contactHref = `/contact?trip=${encodeURIComponent(
    trip.slug
  )}&departure=${encodeURIComponent(
    selectedDate?.departure || trip.departureDate || ""
  )}`;

  return (
    <aside
      aria-labelledby="trip-booking-heading"
      className="min-w-0 rounded-[15px] border border-[#e9e9e9] bg-white px-5 py-6 shadow-[0_6px_30px_rgba(0,0,0,0.025)] transition-colors duration-300 dark:border-white/10 dark:bg-[#1e2022] sm:px-6 sm:py-7 lg:sticky lg:top-28"
    >
      {/* Pricing */}
      <div>
        <span
          id="trip-booking-heading"
          className="block text-[12px] leading-[1.5] font-normal text-[#858585] dark:text-[#aaaaaa] sm:text-[13px]"
        >
          Starting at
        </span>

        <h2 className="font-heading mt-2 text-[33px] leading-[1.15] font-semibold tracking-[-0.055em] text-[#242424] dark:text-white sm:text-[38px]">
          {price}
        </h2>

        <p className="mt-2 text-[11px] leading-[1.6] text-[#999999] dark:text-[#aaaaaa]">
          Indicative starting price · Subject to confirmation
        </p>

        {/* Illustrative Rating */}
        <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2">
          <div
            aria-hidden="true"
            className="flex items-center gap-0.5 text-[#F5B301]"
          >
            {Array.from({ length: 5 }).map((_, index) => (
              <IoStar key={index} className="text-[15px]" />
            ))}
          </div>

          <span className="text-[11px] leading-[1.5] text-[#858585] dark:text-[#aaaaaa]">
            Illustrative rating · Preview only
          </span>
        </div>
      </div>

      {/* Journey Information */}
      <div className="mt-6 space-y-4 border-t border-[#ececec] pt-6 dark:border-white/10">
        <div className="flex items-start gap-3">
          <IoLocationOutline
            aria-hidden="true"
            className="mt-0.5 shrink-0 text-[18px] text-[#555555] dark:text-[#cccccc]"
          />

          <div className="min-w-0">
            <span className="block text-[11px] text-[#858585] dark:text-[#aaaaaa]">
              Destination
            </span>

            <p className="mt-1 text-[13px] leading-[1.5] font-medium text-[#292929] dark:text-white">
              {trip.location}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <IoTimeOutline
            aria-hidden="true"
            className="mt-0.5 shrink-0 text-[18px] text-[#555555] dark:text-[#cccccc]"
          />

          <div>
            <span className="block text-[11px] text-[#858585] dark:text-[#aaaaaa]">
              Duration
            </span>

            <p className="mt-1 text-[13px] font-medium text-[#292929] dark:text-white">
              {trip.durationDays} Days
            </p>
          </div>
        </div>
      </div>

      {/* Travel Dates */}
      <div className="mt-6 border-t border-[#ececec] pt-6 dark:border-white/10">
        <div className="flex items-center justify-between gap-3">
          <h3 className="font-heading text-[15px] font-semibold tracking-[-0.025em] text-[#242424] dark:text-white">
            Dates
          </h3>

          <span className="rounded-full bg-[#f3f3f3] px-2.5 py-1 text-[10px] font-medium text-[#858585] dark:bg-[#303234] dark:text-[#cccccc]">
            Sample Dates
          </span>
        </div>

        <p className="mt-2 text-[11px] leading-[1.6] text-[#929292] dark:text-[#aaaaaa]">
          Select a sample travel period to explore your preferred journey.
        </p>

        {dateOptions.length > 0 ? (
          <div
            role="group"
            aria-label="Select a sample travel date"
            className="mt-4 grid grid-cols-2 gap-2.5"
          >
            {dateOptions.map((option, index) => {
              const isSelected = selectedDate?.id === option.id;

              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setSelectedDateIndex(index)}
                  aria-pressed={isSelected}
                  className={`group relative flex min-h-14 flex-col items-center justify-center gap-1 rounded-[7px] border px-2 py-2.5 text-center outline-none transition-all duration-300 focus-visible:ring-2 focus-visible:ring-[#242424] focus-visible:ring-offset-2 dark:focus-visible:ring-white dark:focus-visible:ring-offset-[#1e2022] ${
                    isSelected
                      ? "border-[#242424] bg-[#242424] text-white shadow-[0_5px_16px_rgba(0,0,0,0.09)] dark:border-white dark:bg-white dark:text-[#242424]"
                      : "border-[#eeeeee] bg-[#f7f7f7] text-[#666666] hover:border-[#bdbdbd] hover:bg-[#eeeeee] dark:border-white/10 dark:bg-[#292b2d] dark:text-[#cccccc] dark:hover:border-white/30 dark:hover:bg-[#353739]"
                  }`}
                >
                  <span className="text-[11px] leading-[1.35] font-medium sm:text-[12px]">
                    {option.label}
                  </span>

                  <span
                    className={`text-[10px] ${
                      isSelected
                        ? "text-white/70 dark:text-[#666666]"
                        : "text-[#999999] dark:text-[#999999]"
                    }`}
                  >
                    {option.year}
                  </span>

                  {isSelected && (
                    <span className="absolute top-1 right-1.5">
                      <IoCheckmarkOutline
                        aria-hidden="true"
                        className="text-[12px]"
                      />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ) : (
          <div className="mt-4 rounded-lg bg-[#f7f7f7] px-4 py-3 text-[12px] text-[#777777] dark:bg-[#292b2d] dark:text-[#cccccc]">
            Sample departure dates have not been added.
          </div>
        )}

        {selectedDate && (
          <div
            role="status"
            aria-live="polite"
            className="mt-4 flex items-start gap-2 rounded-lg bg-[#f8f8f8] px-3 py-3 dark:bg-[#292b2d]"
          >
            <IoCalendarOutline
              aria-hidden="true"
              className="mt-0.5 shrink-0 text-[16px] text-[#555555] dark:text-[#dddddd]"
            />

            <div>
              <p className="text-[11px] font-medium text-[#292929] dark:text-white">
                Selected Travel Period
              </p>

              <p className="mt-1 text-[11px] leading-[1.6] text-[#858585] dark:text-[#aaaaaa]">
                {selectedDate.label}, {selectedDate.year}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Facilities */}
      {facilities.length > 0 && (
        <div className="mt-7 border-t border-[#ececec] pt-6 dark:border-white/10">
          <h3 className="font-heading text-[15px] font-semibold tracking-[-0.025em] text-[#242424] dark:text-white">
            Facilities
          </h3>

          <ul className="mt-5 space-y-3.5">
            {facilities.map((facility) => (
              <li
                key={facility}
                className="flex items-start gap-3 text-[12px] leading-[1.6] text-[#777777] dark:text-[#b0b0b0] sm:text-[13px]"
              >
                <IoCheckmarkOutline
                  aria-hidden="true"
                  className="mt-0.5 shrink-0 text-[16px] text-[#444444] dark:text-[#dddddd]"
                />

                <span>{facility}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Journey Planning CTA */}
      <div className="mt-7 border-t border-[#ececec] pt-6 dark:border-white/10">
        <Link
          href={contactHref}
          className="group relative flex h-12 w-full items-center justify-center gap-3 overflow-hidden rounded-[8px] bg-[#242424] px-5 text-[13px] font-medium text-white shadow-[0_5px_18px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(0,0,0,0.13)] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#242424] dark:bg-white dark:text-[#242424] dark:focus-visible:outline-white"
        >
          <span className="absolute inset-0 -translate-x-full bg-[#454545] transition-transform duration-500 ease-out group-hover:translate-x-0 dark:bg-[#e8e8e8]" />

          <span className="relative z-10">Plan This Journey</span>

          <IoArrowForwardOutline
            aria-hidden="true"
            className="relative z-10 text-[17px] transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>

        <div className="mt-4 flex items-start gap-2">
          <IoInformationCircleOutline
            aria-hidden="true"
            className="mt-0.5 shrink-0 text-[16px] text-[#999999]"
          />

          <p className="text-[11px] leading-[1.7] text-[#929292] dark:text-[#999999]">
            Prices, facilities and travel dates are illustrative. Selecting a
            date does not reserve a place or confirm availability.
          </p>
        </div>
      </div>
    </aside>
  );
}