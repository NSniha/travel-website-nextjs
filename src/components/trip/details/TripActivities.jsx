"use client";

import { useId, useState } from "react";
import {
  IoChevronDownOutline,
  IoCheckmarkOutline,
} from "react-icons/io5";

import Reveal from "@/components/shared/Reveal";

export default function TripActivities({ trip, details }) {
  const instanceId = useId();
  const [collapsedActivities, setCollapsedActivities] = useState(new Set());

  const activities = details?.activities || [];

  const description =
    details?.overview ||
    trip?.description ||
    trip?.summary ||
    "";

  const allExpanded = activities.every(
    (activity, index) =>
      !collapsedActivities.has(activity.id || index)
  );

  const toggleActivity = (id) => {
    setCollapsedActivities((previous) => {
      const updated = new Set(previous);

      if (updated.has(id)) {
        updated.delete(id);
      } else {
        updated.add(id);
      }

      return updated;
    });
  };

  const toggleAllActivities = () => {
    if (allExpanded) {
      setCollapsedActivities(
        new Set(
          activities.map((activity, index) => activity.id || index)
        )
      );
    } else {
      setCollapsedActivities(new Set());
    }
  };

  return (
    <div className="min-w-0">
      {/* Trip Description */}

      <section
        aria-labelledby="trip-description-heading"
        className="min-w-0"
      >
        <Reveal>
          <h2
            id="trip-description-heading"
            className="font-heading text-[18px] leading-[1.3] font-semibold tracking-[-0.035em] text-[#242424] dark:text-white sm:text-[20px]"
          >
            Description
          </h2>

          <p className="mt-4 max-w-197.5 text-[13px] leading-[1.9] font-normal text-[#777777] dark:text-[#b0b0b0] sm:text-[14px] lg:text-[15px]">
            {description}
          </p>
        </Reveal>
      </section>

      {/* Trip Activities */}

      {activities.length > 0 && (
        <section
          aria-labelledby="trip-activities-heading"
          className="mt-9 min-w-0 sm:mt-11"
        >
          <Reveal delay={100}>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h2
                id="trip-activities-heading"
                className="font-heading text-[18px] leading-[1.3] font-semibold tracking-[-0.035em] text-[#242424] dark:text-white sm:text-[20px]"
              >
                Activities
              </h2>

              <button
                type="button"
                onClick={toggleAllActivities}
                className="group inline-flex items-center gap-2 text-[12px] font-medium text-[#777777] transition-colors duration-300 hover:text-[#242424] focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#242424] dark:text-[#aaaaaa] dark:hover:text-white dark:focus-visible:outline-white"
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-full border border-[#dddddd] text-[#555555] transition-colors duration-300 group-hover:border-[#242424] dark:border-white/25 dark:text-white dark:group-hover:border-white">
                  <IoCheckmarkOutline
                    aria-hidden="true"
                    className="text-[12px]"
                  />
                </span>

                {allExpanded ? "Collapse All" : "Expand All"}
              </button>
            </div>
          </Reveal>

          <ol className="mt-7 sm:mt-8">
            {activities.map((activity, index) => {
              const activityId = activity.id || index;
              const isExpanded = !collapsedActivities.has(activityId);
              const isLast = index === activities.length - 1;

              const contentId = `${instanceId}-activity-${index}`;
              const headingId = `${instanceId}-heading-${index}`;

              return (
                <li
                  key={activityId}
                  className={`relative min-w-0 pl-8 sm:pl-9 ${
                    isLast ? "pb-0" : "pb-7 sm:pb-8"
                  }`}
                >
                  {/* Timeline Connecting Line */}

                  {!isLast && (
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute top-4 bottom-0 left-1.25 w-px bg-[#dcdcdc] dark:bg-white/20"
                    />
                  )}

                  {/* Timeline Indicator */}

                  <span
                    aria-hidden="true"
                    className={`absolute top-1.25 left-0 flex h-2.75 w-2.75 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                      isExpanded
                        ? "border-[#242424] bg-[#242424] dark:border-white dark:bg-white"
                        : "border-[#a5a5a5] bg-white dark:border-[#858585] dark:bg-[#101112]"
                    }`}
                  />

                  {/* Activity Content */}

                  <div className="min-w-0">
                    <button
                      id={headingId}
                      type="button"
                      aria-expanded={isExpanded}
                      aria-controls={contentId}
                      onClick={() => toggleActivity(activityId)}
                      className="group flex w-full min-w-0 items-start justify-between gap-4 rounded-sm text-left outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#242424] dark:focus-visible:outline-white"
                    >
                      <span className="font-heading min-w-0 text-[14px] leading-[1.55] font-semibold tracking-tight text-[#292929] transition-colors duration-300 group-hover:text-[#777777] dark:text-white dark:group-hover:text-[#cccccc] sm:text-[15px]">
                        {activity.title}
                      </span>

                      <IoChevronDownOutline
                        aria-hidden="true"
                        className={`mt-0.5 shrink-0 text-[16px] text-[#888888] transition-transform duration-300 group-hover:text-[#242424] dark:text-[#aaaaaa] dark:group-hover:text-white ${
                          isExpanded ? "rotate-180" : "rotate-0"
                        }`}
                      />
                    </button>

                    {/* Expandable Description */}

                    <div
                      id={contentId}
                      role="region"
                      aria-labelledby={headingId}
                      aria-hidden={!isExpanded}
                      className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out motion-reduce:transition-none ${
                        isExpanded
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="min-h-0 overflow-hidden">
                        <p className="max-w-180 pt-2.5 text-[13px] leading-[1.8] font-normal text-[#858585] dark:text-[#aaaaaa] sm:pt-3 sm:text-[14px]">
                          {activity.description}
                        </p>

                        {activity.duration && (
                          <span className="mt-3 inline-flex items-center rounded-full bg-[#f2f2f2] px-3 py-1.5 text-[11px] font-medium text-[#777777] dark:bg-[#292b2d] dark:text-[#cccccc]">
                            {activity.duration}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </section>
      )}
    </div>
  );
}