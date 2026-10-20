"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { IoCloseOutline, IoOptionsOutline, IoSearchOutline } from "react-icons/io5";
import Container from "@/components/shared/Container";
import Reveal from "@/components/shared/Reveal";
import TripCard from "@/components/trip/TripCard";
import { getFilteredTrips } from "@/lib/trips";

export default function TripExplorer({ categoryId = null, heading = "Explore All Our Trips" }) {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);

  const filteredTrips = useMemo(() => getFilteredTrips({ categoryId, search, sort }), [categoryId, search, sort]);

  const clearFilters = () => {
    setSearch("");
    setSort("featured");
  };

  const hasActiveFilters = Boolean(search.trim()) || sort !== "featured";

  return (
    <section id="all-trips" aria-labelledby="all-trips-heading" className="bg-white pt-12 pb-24 transition-colors duration-300 dark:bg-[#101112] sm:pt-16 sm:pb-28 lg:pt-20 lg:pb-32">
      <Container>
        <Reveal className="text-center">
          <h2 id="all-trips-heading" className="font-heading text-[30px] leading-[1.2] font-semibold tracking-[-0.055em] text-[#242424] dark:text-white sm:text-[36px] lg:text-[40px]">
            {heading}
          </h2>

          <p className="mx-auto mt-4 max-w-[720px] text-[14px] leading-[1.75] font-normal text-[#858585] dark:text-[#aaaaaa] sm:text-[16px]">
            Every journey begins with inspiration. Discover remarkable places and find the experience that speaks to you.
          </p>
        </Reveal>

        <div className="relative mt-11 sm:mt-12 lg:mt-14">
          <div className="mb-5 flex items-center justify-between gap-4">
            <p aria-live="polite" className="text-[12px] leading-[1.5] text-[#858585] dark:text-[#aaaaaa] sm:text-[13px]">
              {filteredTrips.length} {filteredTrips.length === 1 ? "journey" : "journeys"} to explore
            </p>

            <button
              type="button"
              onClick={() => setShowFilters((previous) => !previous)}
              aria-expanded={showFilters}
              aria-controls="trip-filter-panel"
              className={`group inline-flex h-10 items-center justify-center gap-2 rounded-lg border px-3.5 text-[12px] font-medium transition-all duration-300 sm:text-[13px] ${showFilters ? "border-[#242424] bg-[#242424] text-white dark:border-white dark:bg-white dark:text-[#242424]" : "border-[#e5e5e5] bg-white text-[#242424] hover:border-[#242424] dark:border-white/15 dark:bg-[#1e2022] dark:text-white dark:hover:border-white/50"}`}
            >
              <IoOptionsOutline aria-hidden="true" className="text-[17px]" />
              <span>{showFilters ? "Close Filters" : "Search & Sort"}</span>
            </button>
          </div>

          {showFilters && (
            <div id="trip-filter-panel" className="mb-7 grid gap-4 rounded-xl border border-[#ededed] bg-[#fafafa] p-4 dark:border-white/10 dark:bg-[#1e2022] sm:grid-cols-[minmax(0,1fr)_220px_auto] sm:items-end sm:p-5">
              <div className="min-w-0">
                <label htmlFor="trip-search" className="mb-2 block text-[12px] font-medium text-[#555555] dark:text-[#cccccc]">
                  Search destinations
                </label>

                <div className="relative">
                  <IoSearchOutline aria-hidden="true" className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-[18px] text-[#858585]" />

                  <input
                    id="trip-search"
                    type="search"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search by destination or country"
                    className="h-11 w-full rounded-lg border border-[#e5e5e5] bg-white pr-4 pl-11 text-[14px] text-[#242424] outline-none transition-colors duration-300 placeholder:text-[#999999] focus:border-[#777777] dark:border-white/15 dark:bg-[#292b2d] dark:text-white dark:placeholder:text-[#999999] dark:focus:border-white/50"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="trip-sort" className="mb-2 block text-[12px] font-medium text-[#555555] dark:text-[#cccccc]">
                  Sort trips
                </label>

                <select
                  id="trip-sort"
                  value={sort}
                  onChange={(event) => setSort(event.target.value)}
                  className="h-11 w-full cursor-pointer rounded-lg border border-[#e5e5e5] bg-white px-3 text-[13px] text-[#242424] outline-none transition-colors duration-300 focus:border-[#777777] dark:border-white/15 dark:bg-[#292b2d] dark:text-white dark:focus:border-white/50"
                >
                  <option value="featured">Featured Trips</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="duration-short">Duration: Shortest First</option>
                  <option value="duration-long">Duration: Longest First</option>
                </select>
              </div>

              <button type="button" onClick={clearFilters} disabled={!hasActiveFilters} className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-[#e5e5e5] bg-white px-4 text-[12px] font-medium text-[#555555] transition-colors duration-300 hover:border-[#242424] hover:text-[#242424] disabled:cursor-not-allowed disabled:opacity-40 dark:border-white/15 dark:bg-[#292b2d] dark:text-white dark:hover:border-white/50">
                <IoCloseOutline aria-hidden="true" className="text-[17px]" />
                Clear
              </button>
            </div>
          )}

          {filteredTrips.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
              {filteredTrips.map((trip, index) => (
                <Reveal key={trip.id} delay={(index % 3) * 90} className="min-w-0">
                  <TripCard trip={trip} index={index} />
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-[#ededed] bg-[#fafafa] px-6 py-14 text-center dark:border-white/10 dark:bg-[#1e2022]">
              <IoSearchOutline aria-hidden="true" className="text-[35px] text-[#999999]" />

              <h3 className="font-heading mt-5 text-[21px] font-semibold tracking-[-0.04em] text-[#242424] dark:text-white">
                No matching journeys found
              </h3>

              <p className="mt-3 max-w-[380px] text-[13px] leading-[1.75] text-[#858585] dark:text-[#aaaaaa] sm:text-[14px]">
                Try searching for another destination or explore all available journeys.
              </p>

              {categoryId ? (
                <Link href="/trip#all-trips" className="mt-6 inline-flex h-11 items-center justify-center rounded-lg bg-[#242424] px-5 text-[13px] font-medium text-white transition-colors duration-300 hover:bg-[#454545] dark:bg-white dark:text-[#242424]">
                  Explore All Trips
                </Link>
              ) : (
                <button type="button" onClick={clearFilters} className="mt-6 inline-flex h-11 items-center justify-center rounded-lg bg-[#242424] px-5 text-[13px] font-medium text-white transition-colors duration-300 hover:bg-[#454545] dark:bg-white dark:text-[#242424]">
                  Clear Filters
                </button>
              )}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}