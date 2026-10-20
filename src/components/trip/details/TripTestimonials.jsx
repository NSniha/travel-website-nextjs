"use client";

import { useState } from "react";
import Image from "next/image";
import {
  IoArrowDownOutline,
  IoArrowUpOutline,
  IoStar,
  IoStarOutline,
} from "react-icons/io5";

import Reveal from "@/components/shared/Reveal";
import { sampleTripTestimonials } from "@/data/tripDetails";

const INITIAL_VISIBLE_REVIEWS = 3;

function getInitials(name = "") {
  const initials = name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");

  return initials || "TR";
}

function ReviewStars({ rating = 5 }) {
  const normalizedRating = Math.min(
    5,
    Math.max(0, Math.round(Number(rating) || 0))
  );

  return (
    <div
      role="img"
      aria-label={`Illustrative rating: ${normalizedRating} out of 5 stars`}
      className="flex items-center gap-1"
    >
      {Array.from({ length: 5 }, (_, index) => {
        const isFilled = index < normalizedRating;

        return isFilled ? (
          <IoStar
            key={index}
            aria-hidden="true"
            className="text-[15px] text-[#F5B301] sm:text-[16px]"
          />
        ) : (
          <IoStarOutline
            key={index}
            aria-hidden="true"
            className="text-[15px] text-[#d5d5d5] dark:text-[#666666] sm:text-[16px]"
          />
        );
      })}
    </div>
  );
}

function TestimonialCard({ review, index }) {
  const initials = review.initials || getInitials(review.name);

  return (
    <Reveal delay={(index % 3) * 90}>
      <article className="group min-w-0 rounded-xl border border-[#eaeaea] bg-white px-5 py-5.5 transition-[border-color,box-shadow,transform] duration-500 hover:-translate-y-0.5 hover:border-[#d5d5d5] hover:shadow-[0_12px_35px_rgba(0,0,0,0.045)] dark:border-white/10 dark:bg-[#191b1d] dark:hover:border-white/20 dark:hover:shadow-[0_12px_35px_rgba(0,0,0,0.12)] sm:px-6.5 sm:py-6">
        {/* Reviewer Information */}

        <div className="flex min-w-0 items-center gap-3.5">
          <div className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#e9e8e4] text-[#484848] ring-2 ring-[#f4f4f4] dark:bg-[#353739] dark:text-white dark:ring-white/10 sm:h-12 sm:w-12">
            {review.avatar ? (
              <Image
                src={review.avatar}
                alt=""
                fill
                sizes="48px"
                className="object-cover object-center"
              />
            ) : (
              <span
                aria-hidden="true"
                className="font-heading text-[12px] font-semibold tracking-[-0.03em] sm:text-[13px]"
              >
                {initials}
              </span>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="font-heading text-[14px] leading-[1.35] font-semibold tracking-tight text-[#292929] dark:text-white sm:text-[15px]">
              {review.name}
            </h3>

            <p className="mt-1 text-[12px] leading-normal text-[#999999] dark:text-[#aaaaaa]">
              {review.country}
            </p>
          </div>

          <span className="shrink-0 rounded-full bg-[#f5f5f5] px-2.5 py-1.5 text-[10px] font-medium text-[#858585] dark:bg-[#2b2d2f] dark:text-[#aaaaaa]">
            Sample
          </span>
        </div>

        {/* Review Description */}

        <p className="mt-5 text-[13px] leading-[1.85] font-normal text-[#777777] dark:text-[#b0b0b0] sm:mt-6 sm:text-[14px]">
          {review.review}
        </p>

        {/* Rating Footer */}

        <div className="mt-5 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-[#eeeeee] pt-4 dark:border-white/10 sm:mt-6 sm:pt-5">
          <div className="flex flex-wrap items-center gap-2.5">
            <ReviewStars rating={review.rating} />

            <span className="text-[11px] leading-normal text-[#999999] dark:text-[#aaaaaa] sm:text-[12px]">
              ({Math.min(5, Math.max(0, Number(review.rating) || 0)).toFixed(1)}/5)
            </span>
          </div>

          <span className="text-[11px] text-[#aaaaaa] dark:text-[#888888]">
            Example review
          </span>
        </div>
      </article>
    </Reveal>
  );
}

export default function TripTestimonials({
  reviews = sampleTripTestimonials,
  title = "Testimonial",
}) {
  const [showAllReviews, setShowAllReviews] = useState(false);

  const allReviews = Array.isArray(reviews) ? reviews : [];

  const visibleReviews = showAllReviews
    ? allReviews
    : allReviews.slice(0, INITIAL_VISIBLE_REVIEWS);

  const hasExtraReviews =
    allReviews.length > INITIAL_VISIBLE_REVIEWS;

  if (allReviews.length === 0) return null;

  return (
    <section
      id="trip-testimonials"
      aria-labelledby="trip-testimonials-heading"
      className="min-w-0 scroll-mt-24"
    >
      {/* Section Heading */}

      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2
            id="trip-testimonials-heading"
            className="font-heading text-[18px] leading-[1.3] font-semibold tracking-[-0.035em] text-[#242424] dark:text-white sm:text-[20px]"
          >
            {title}
          </h2>

          <span className="text-[14px] font-normal text-[#999999] dark:text-[#aaaaaa]">
            Illustrative Testimonials
          </span>
        </div>
      </Reveal>

      {/* Review Cards */}

      <div className="mt-5 space-y-3.5 sm:mt-6 sm:space-y-4">
        {visibleReviews.map((review, index) => (
          <TestimonialCard
            key={review.id || `${review.name}-${index}`}
            review={review}
            index={index}
          />
        ))}
      </div>

      {/* Show More / Show Less */}

      {hasExtraReviews && (
        <div className="mt-7 flex justify-center">
          <button
            type="button"
            onClick={() =>
              setShowAllReviews((previous) => !previous)
            }
            aria-expanded={showAllReviews}
            className="group inline-flex h-11 items-center justify-center gap-2.5 rounded-lg border border-[#e5e5e5] bg-white px-5 text-[12px] font-medium text-[#333333] transition-all duration-300 hover:border-[#242424] hover:bg-[#242424] hover:text-white dark:border-white/20 dark:bg-[#202224] dark:text-white dark:hover:border-white dark:hover:bg-white dark:hover:text-[#242424] sm:text-[13px]"
          >
            {showAllReviews
              ? "Show Less"
              : `Show All ${allReviews.length} Testimonials`}

            {showAllReviews ? (
              <IoArrowUpOutline
                aria-hidden="true"
                className="text-[16px] transition-transform duration-300 group-hover:-translate-y-0.5"
              />
            ) : (
              <IoArrowDownOutline
                aria-hidden="true"
                className="text-[16px] transition-transform duration-300 group-hover:translate-y-0.5"
              />
            )}
          </button>
        </div>
      )}

    </section>
  );
}