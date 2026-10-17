"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Container from "@/components/shared/Container";
import Reveal from "@/components/shared/Reveal";
import { travelerStories } from "@/data/travelStories";

const SLIDE_DURATION = 3000;

export default function Testimonials() {
  const sectionRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isTabVisible, setIsTabVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  const activeStory = travelerStories[activeIndex];
  const shouldPlay = isVisible && isTabVisible && !reducedMotion;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.15 },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const updateVisibility = () => {
      setIsTabVisible(document.visibilityState === "visible");
    };

    updateVisibility();
    document.addEventListener("visibilitychange", updateVisibility);

    return () => document.removeEventListener("visibilitychange", updateVisibility);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setReducedMotion(mediaQuery.matches);

    updateMotion();
    mediaQuery.addEventListener("change", updateMotion);

    return () => mediaQuery.removeEventListener("change", updateMotion);
  }, []);

  useEffect(() => {
    if (!shouldPlay || travelerStories.length < 2) return;

    const timer = window.setTimeout(() => {
      setActiveIndex((previous) => (previous + 1) % travelerStories.length);
    }, SLIDE_DURATION);

    return () => window.clearTimeout(timer);
  }, [activeIndex, shouldPlay]);

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="bg-white pt-12.5 pb-25 transition-colors duration-300 dark:bg-[#101112] sm:pt-16.25 sm:pb-28.75 lg:pt-20 lg:pb-32.5"
    >
      <Container>
        <Reveal className="text-center">
          <h2 id="testimonials-heading" className="font-heading text-[30px] leading-[1.2] font-semibold tracking-[-0.055em] text-[#242424] dark:text-white sm:text-[36px] lg:text-[44px]">
            Journeys Worth Sharing
          </h2>

          <p className="mx-auto mt-3.5 whitespace-nowrap text-[clamp(11px,2.8vw,16px)] leading-[1.7] text-[#858585] dark:text-[#aaaaaa]">
            Every journey leaves a story worth sharing.
          </p>
        </Reveal>

        <Reveal delay={150} className="mt-9.5 sm:mt-11.25">
          <div className="relative isolate flex min-h-118.75 items-center justify-center overflow-hidden rounded-[15px] bg-[#536b55] px-4 py-12 sm:min-h-127.5 sm:px-8 lg:min-h-135">
            <div className="absolute inset-0 overflow-hidden">
              <Image
                src="/images/shared/testimonials-bg.jpg"
                alt="Beautiful green alpine valley surrounded by dramatic mountain landscapes"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1536px) 95vw, 1490px"
                style={{
                  animationPlayState: isVisible && isTabVisible ? "running" : "paused",
                }}
                className="waylume-testimonial-zoom object-cover object-center"
              />
            </div>

            <div className="absolute inset-0 bg-linear-to-t from-[#101b18]/40 via-[#1b3327]/10 to-white/5 transition-colors duration-500 dark:from-black/70 dark:via-[#0b1615]/35 dark:to-black/40" />

            <div
              role="region"
              aria-roledescription="carousel"
              aria-label="Travel journal stories"
              aria-live="off"
              className="relative z-10 w-full max-w-132.5 overflow-hidden rounded-[11px] border border-white/20 bg-white px-5 py-6 text-[#242424] shadow-[0_20px_60px_rgba(0,0,0,0.12)] transition-[background-color,border-color] duration-300 dark:border-white/10 dark:bg-[#1d1f21] dark:text-white dark:shadow-black/30 sm:px-7 sm:py-7 lg:px-8"
            >
              <div key={activeStory.id} id="testimonial-slide" className="animate-fade-in">
                <blockquote>
                  <p className="mx-auto text-center text-[14px] leading-[1.75] font-normal tracking-[-0.015em] text-[#333333] dark:text-[#eeeeee] sm:text-[15px] lg:text-[16px]">
                    {activeStory.quote}
                  </p>
                </blockquote>

                <div className="mt-5.75 border-t border-[#ededed] pt-5.25 dark:border-white/10 sm:mt-6.25 sm:pt-5.75">
                  <div className="flex items-center justify-center gap-3">
                    <div className="relative h-10.75 w-10.75 shrink-0 overflow-hidden rounded-full bg-[#e8e8e8] sm:h-11.75 sm:w-11.75">
                      <Image
                        src={activeStory.avatar}
                        alt={`Portrait representing ${activeStory.name}`}
                        fill
                        sizes="47px"
                        className="object-cover"
                      />
                    </div>

                    <div className="text-left">
                      <h3 className="font-heading text-[13px] leading-[1.4] font-semibold tracking-tight text-[#282828] dark:text-white sm:text-[14px]">
                        {activeStory.name}
                      </h3>

                      <p className="mt-1 text-[11px] leading-normal text-[#898989] dark:text-[#aaaaaa] sm:text-[12px]">
                        {activeStory.location}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-center gap-0.5 sm:mt-4.5">
                {travelerStories.map((story, index) => {
                  const isActive = activeIndex === index;

                  return (
                    <button
                      key={story.id}
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      aria-label={`Show travel story ${index + 1}`}
                      aria-current={isActive ? "true" : undefined}
                      aria-controls="testimonial-slide"
                      className="group flex h-6 w-6 items-center justify-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-[#242424] dark:focus-visible:ring-white"
                    >
                      <span
                        className={`flex rotate-45 items-center justify-center rounded-[1px] border transition-all duration-300 ${
                          isActive
                            ? "h-2.25 w-2.25 border-[#242424] bg-[#242424] dark:border-white dark:bg-white"
                            : "h-1.5 w-1.5 border-[#bcbcbc] bg-transparent group-hover:border-[#242424] dark:border-[#777777] dark:group-hover:border-white"
                        }`}
                      >
                        {isActive && <span className="h-0.5 w-0.5 bg-white dark:bg-[#1d1f21]" />}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}