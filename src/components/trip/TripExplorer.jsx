"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  IoArrowDownOutline,
  IoArrowForwardOutline,
  IoArrowUpOutline,
  IoCheckmarkOutline,
  IoCloseOutline,
  IoOptionsOutline,
  IoSearchOutline,
} from "react-icons/io5";

import Container from "@/components/shared/Container";
import Reveal from "@/components/shared/Reveal";
import TripCard from "@/components/trip/TripCard";
import { tripCategories } from "@/data/tripPage";
import { getFilteredTrips } from "@/lib/trips";

const INITIAL_VISIBLE_COUNT = 6;
const LOAD_MORE_COUNT = 3;

const sortOptions = [
  { value: "featured", label: "Featured Trips" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "duration-short", label: "Duration: Shortest First" },
  { value: "duration-long", label: "Duration: Longest First" },
  { value: "date-soon", label: "Sample Date: Earliest First" },
  { value: "latest", label: "Sample Date: Latest First" },
  { value: "title-asc", label: "Name: A to Z" },
  { value: "title-desc", label: "Name: Z to A" },
];

export default function TripExplorer({
  categoryId = null,
  heading = "Explore All Our Trips",
}) {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("featured");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);

  const searchInputRef = useRef(null);

  const isCategoryPage = Boolean(categoryId);

  const activeCategoryId = isCategoryPage
    ? categoryId
    : selectedCategory === "all"
      ? null
      : selectedCategory;

  const activeCategory = tripCategories.find(
    (category) => category.id === activeCategoryId
  );

  const filteredTrips = useMemo(() => {
    return getFilteredTrips({
      categoryId: activeCategoryId,
      search,
      sort,
    });
  }, [activeCategoryId, search, sort]);

  const visibleTrips = filteredTrips.slice(0, visibleCount);

  const hasMoreTrips = visibleCount < filteredTrips.length;

  const hasActiveFilters =
    Boolean(search.trim()) ||
    sort !== "featured" ||
    (!isCategoryPage && selectedCategory !== "all");

  useEffect(() => {
    setVisibleCount(INITIAL_VISIBLE_COUNT);
  }, [search, sort, selectedCategory, categoryId]);

  const clearFilters = () => {
    setSearch("");
    setSort("featured");
    setSelectedCategory("all");
    setVisibleCount(INITIAL_VISIBLE_COUNT);
  };

  const toggleFilters = () => {
    setShowFilters((previous) => !previous);
  };

  const loadMoreTrips = () => {
    setVisibleCount((previous) =>
      Math.min(previous + LOAD_MORE_COUNT, filteredTrips.length)
    );
  };

  const showLessTrips = () => {
    setVisibleCount(INITIAL_VISIBLE_COUNT);

    document.getElementById("all-trips")?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
      block: "start",
    });
  };

  const focusSearch = () => {
    setShowFilters(true);

    requestAnimationFrame(() => {
      searchInputRef.current?.focus();
    });
  };

  return (
    <section
      id="all-trips"
      aria-labelledby="all-trips-heading"
      className="scroll-mt-20 overflow-hidden bg-white pt-12 pb-18 transition-colors duration-300 dark:bg-[#101112] sm:pt-16 sm:pb-28 lg:pt-20 lg:pb-28"
    >
      <Container>
        {/* Section Heading */}

        <Reveal className="text-center">
          <h2
            id="all-trips-heading"
            className="font-heading text-[30px] leading-[1.2] font-semibold tracking-[-0.055em] text-[#242424] dark:text-white sm:text-[36px] lg:text-[44px]"
          >
            {heading}
          </h2>

          <p className="mx-auto mt-4 max-w-180 text-[14px] leading-[1.75] font-normal text-[#858585] dark:text-[#aaaaaa] sm:text-[16px]">
            Every journey begins with inspiration. Discover remarkable places
            and find the experience that speaks to you.
          </p>
        </Reveal>

        <div className="mt-11 sm:mt-12 lg:mt-14">
          {/* Results Header */}

          <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <p
                role="status"
                aria-live="polite"
                className="text-[12px] leading-[1.6] text-[#858585] dark:text-[#aaaaaa] sm:text-[13px]"
              >
                Showing{" "}
                <span className="font-semibold text-[#242424] dark:text-white">
                  {visibleTrips.length}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-[#242424] dark:text-white">
                  {filteredTrips.length}
                </span>{" "}
                {filteredTrips.length === 1 ? "journey" : "journeys"}
              </p>

              {activeCategory && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f2f3f1] px-3 py-1.5 text-[11px] font-medium text-[#555555] dark:bg-[#242628] dark:text-[#cccccc]">
                  <IoCheckmarkOutline
                    aria-hidden="true"
                    className="text-[14px]"
                  />

                  {activeCategory.title}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={focusSearch}
                aria-label="Search trips"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#e7e7e7] bg-white text-[#555555] transition-all duration-300 hover:border-[#242424] hover:text-[#242424] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#242424] dark:border-white/15 dark:bg-[#1e2022] dark:text-white dark:hover:border-white/50"
              >
                <IoSearchOutline
                  aria-hidden="true"
                  className="text-[18px]"
                />
              </button>

              <button
                type="button"
                onClick={toggleFilters}
                aria-expanded={showFilters}
                aria-controls="trip-filter-panel"
                className={`group inline-flex h-10 items-center justify-center gap-2 rounded-lg border px-4 text-[12px] font-medium transition-all duration-300 sm:text-[13px] ${
                  showFilters
                    ? "border-[#242424] bg-[#242424] text-white dark:border-white dark:bg-white dark:text-[#242424]"
                    : "border-[#e7e7e7] bg-white text-[#242424] hover:border-[#242424] dark:border-white/15 dark:bg-[#1e2022] dark:text-white dark:hover:border-white/50"
                }`}
              >
                <IoOptionsOutline
                  aria-hidden="true"
                  className="text-[17px]"
                />

                <span>{showFilters ? "Close Filters" : "Filter & Sort"}</span>
              </button>
            </div>
          </div>

          {/* Search and Filter Panel */}

          <div
            id="trip-filter-panel"
            hidden={!showFilters}
            className="mb-7 rounded-xl border border-[#ededed] bg-[#fafafa] p-4 dark:border-white/10 dark:bg-[#1e2022] sm:p-5 lg:p-6"
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.9fr)_minmax(0,0.9fr)] lg:gap-5">
              {/* Search */}

              <div className="min-w-0">
                <label
                  htmlFor="trip-search"
                  className="mb-2 block text-[12px] font-medium text-[#555555] dark:text-[#cccccc]"
                >
                  Search Destinations
                </label>

                <div className="relative">
                  <IoSearchOutline
                    aria-hidden="true"
                    className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-[18px] text-[#858585]"
                  />

                  <input
                    ref={searchInputRef}
                    id="trip-search"
                    type="search"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search destinations, countries..."
                    autoComplete="off"
                    className="h-11 w-full rounded-lg border border-[#e5e5e5] bg-white pr-4 pl-11 text-[14px] text-[#242424] outline-none transition-colors duration-300 placeholder:text-[#999999] focus:border-[#777777] dark:border-white/15 dark:bg-[#292b2d] dark:text-white dark:placeholder:text-[#999999] dark:focus:border-white/50"
                  />
                </div>
              </div>

              {/* Category Filter */}

              {!isCategoryPage ? (
                <div className="min-w-0">
                  <label
                    htmlFor="trip-category"
                    className="mb-2 block text-[12px] font-medium text-[#555555] dark:text-[#cccccc]"
                  >
                    Travel Category
                  </label>

                  <select
                    id="trip-category"
                    value={selectedCategory}
                    onChange={(event) =>
                      setSelectedCategory(event.target.value)
                    }
                    className="h-11 w-full cursor-pointer rounded-lg border border-[#e5e5e5] bg-white px-3 text-[13px] text-[#242424] outline-none transition-colors duration-300 focus:border-[#777777] dark:border-white/15 dark:bg-[#292b2d] dark:text-white dark:focus:border-white/50"
                  >
                    <option value="all">All Categories</option>

                    {tripCategories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.title}
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <div className="min-w-0">
                  <label
                    htmlFor="trip-active-category"
                    className="mb-2 block text-[12px] font-medium text-[#555555] dark:text-[#cccccc]"
                  >
                    Selected Category
                  </label>

                  <div
                    id="trip-active-category"
                    className="flex h-11 items-center gap-2 rounded-lg border border-[#e5e5e5] bg-white px-3 text-[13px] text-[#555555] dark:border-white/15 dark:bg-[#292b2d] dark:text-[#cccccc]"
                  >
                    <IoCheckmarkOutline
                      aria-hidden="true"
                      className="shrink-0 text-[17px]"
                    />

                    <span className="truncate">
                      {activeCategory?.title || "Selected Category"}
                    </span>
                  </div>
                </div>
              )}

              {/* Sorting */}

              <div className="min-w-0">
                <label
                  htmlFor="trip-sort"
                  className="mb-2 block text-[12px] font-medium text-[#555555] dark:text-[#cccccc]"
                >
                  Sort Journeys
                </label>

                <select
                  id="trip-sort"
                  value={sort}
                  onChange={(event) => setSort(event.target.value)}
                  className="h-11 w-full cursor-pointer rounded-lg border border-[#e5e5e5] bg-white px-3 text-[13px] text-[#242424] outline-none transition-colors duration-300 focus:border-[#777777] dark:border-white/15 dark:bg-[#292b2d] dark:text-white dark:focus:border-white/50"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Filter Footer */}

            <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-[#eaeaea] pt-4 dark:border-white/10">
              <p className="text-[12px] leading-[1.6] text-[#858585] dark:text-[#aaaaaa]">
                {filteredTrips.length} matching{" "}
                {filteredTrips.length === 1 ? "journey" : "journeys"} found
              </p>

              <button
                type="button"
                onClick={clearFilters}
                disabled={!hasActiveFilters}
                className="group inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-[#e5e5e5] bg-white px-4 text-[12px] font-medium text-[#555555] transition-all duration-300 hover:border-[#242424] hover:text-[#242424] disabled:cursor-not-allowed disabled:opacity-40 dark:border-white/15 dark:bg-[#292b2d] dark:text-white dark:hover:border-white/50"
              >
                <IoCloseOutline
                  aria-hidden="true"
                  className="text-[17px]"
                />

                Clear Filters
              </button>
            </div>
          </div>

          {/* Trip Cards */}

          {filteredTrips.length > 0 ? (
            <>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
                {visibleTrips.map((trip, index) => (
                  <Reveal
                    key={trip.id}
                    delay={(index % 3) * 90}
                    className="min-w-0"
                  >
                    <TripCard trip={trip} index={index} />
                  </Reveal>
                ))}
              </div>

              {/* Load More / Show Less */}

              {(hasMoreTrips ||
                visibleCount > INITIAL_VISIBLE_COUNT) && (
                <div className="mt-12 flex flex-col items-center gap-4 sm:mt-14">
                  {hasMoreTrips ? (
                    <button
                      type="button"
                      onClick={loadMoreTrips}
                      aria-label={`Load more trips. ${filteredTrips.length - visibleTrips.length} remaining`}
                      className="group inline-flex h-12 items-center justify-center gap-3 rounded-lg bg-[#242424] px-6 text-[13px] font-medium text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#454545] hover:shadow-[0_10px_30px_rgba(0,0,0,0.12)] active:translate-y-0 dark:bg-white dark:text-[#242424] dark:hover:bg-[#e9e9e9]"
                    >
                      Load More Trips

                      <IoArrowDownOutline
                        aria-hidden="true"
                        className="text-[17px] transition-transform duration-300 group-hover:translate-y-1"
                      />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={showLessTrips}
                      className="group inline-flex h-12 items-center justify-center gap-3 rounded-lg border border-[#e5e5e5] bg-white px-6 text-[13px] font-medium text-[#242424] transition-all duration-300 hover:-translate-y-1 hover:border-[#242424] dark:border-white/20 dark:bg-[#1e2022] dark:text-white dark:hover:border-white"
                    >
                      Show Less

                      <IoArrowUpOutline
                        aria-hidden="true"
                        className="text-[17px] transition-transform duration-300 group-hover:-translate-y-1"
                      />
                    </button>
                  )}
                </div>
              )}
            </>
          ) : (
            /* Empty State */

            <div className="flex min-h-85 flex-col items-center justify-center rounded-2xl border border-[#ededed] bg-[#fafafa] px-6 py-14 text-center dark:border-white/10 dark:bg-[#1e2022]">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#eeeeee] text-[#888888] dark:bg-[#303234] dark:text-[#aaaaaa]">
                <IoSearchOutline
                  aria-hidden="true"
                  className="text-[28px]"
                />
              </div>

              <h3 className="font-heading mt-6 text-[23px] leading-[1.3] font-semibold tracking-[-0.045em] text-[#242424] dark:text-white">
                No Matching Journeys Found
              </h3>

              <p className="mt-3 max-w-107.5 text-[13px] leading-[1.75] text-[#858585] dark:text-[#aaaaaa] sm:text-[14px]">
                We couldn't find a journey matching your search.
                Try another destination or adjust your filters.
              </p>

              <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="inline-flex h-11 items-center justify-center rounded-lg bg-[#242424] px-5 text-[13px] font-medium text-white transition-colors duration-300 hover:bg-[#454545] dark:bg-white dark:text-[#242424] dark:hover:bg-[#eeeeee]"
                  >
                    Clear Filters
                  </button>
                )}

                {isCategoryPage && (
                  <Link
                    href="/trip#all-trips"
                    className="group inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-[#dedede] px-5 text-[13px] font-medium text-[#242424] transition-colors duration-300 hover:border-[#242424] dark:border-white/20 dark:text-white dark:hover:border-white"
                  >
                    Explore All Trips

                    <IoArrowForwardOutline
                      aria-hidden="true"
                      className="text-[16px] transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Pricing Information */}

        <p className="mt-8 text-center text-[11px] leading-[1.7] text-[#999999] dark:text-[#888888] sm:text-[12px]">
          Sample itineraries, indicative prices and illustrative travel dates.
          Final pricing, availability and booking are not currently confirmed.
        </p>
      </Container>
    </section>
  );
}