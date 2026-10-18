"use client";

import { useState } from "react";
import Image from "next/image";
import { IoArrowForwardOutline } from "react-icons/io5";
import Container from "@/components/shared/Container";
import Reveal from "@/components/shared/Reveal";
import { aboutMilestones } from "@/data/about";

export default function OurStory() {
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleAccordion = (index) => {
    setActiveIndex((previous) => (previous === index ? null : index));
  };

  return (
    <section id="our-story" aria-labelledby="our-story-heading" className="bg-white pt-12 pb-22 transition-colors duration-300 dark:bg-[#101112] sm:pt-16 sm:pb-26 lg:pt-14 lg:pb-30">
      <Container>
        <div className="grid min-w-0 items-start gap-12 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:gap-10 xl:gap-14">
          <div className="min-w-0">
            <Reveal>
              <h2 id="our-story-heading" className="font-heading max-w-155 text-[30px] leading-[1.2] font-semibold tracking-[-0.055em] text-[#242424] dark:text-white sm:text-[36px] lg:text-[44px]">
                Every Great Journey<br className="hidden sm:block" /> Begins With a Vision.
              </h2>
            </Reveal>

            <div className="mt-10 grid grid-cols-[minmax(0,1.5fr)_minmax(0,0.9fr)] items-end gap-3 sm:mt-12 sm:gap-4 lg:mt-14 lg:gap-5">
              <Reveal className="min-w-0">
                <div className="group relative h-87.5 w-full overflow-hidden rounded-[14px] bg-[#e7e9e5] dark:bg-[#292c2e] sm:h-108.75 lg:h-127.5 xl:h-141.25 2xl:h-152.5">
                  <Image
                    src="/images/about/story-adventure.jpg"
                    alt="Traveler celebrating an unforgettable moment above a breathtaking mountain landscape"
                    fill
                    quality={90}
                    sizes="(max-width: 639px) 65vw, (max-width: 1023px) 60vw, 35vw"
                    className="object-cover object-center transition-transform duration-1000 ease-out motion-safe:group-hover:scale-[1.055]"
                  />

                  <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/5" />
                </div>
              </Reveal>

              <Reveal delay={150} className="min-w-0">
                <div className="group relative h-65 w-full overflow-hidden rounded-[14px] bg-[#e7e9e5] dark:bg-[#292c2e] sm:h-80 lg:h-97.5 xl:h-110 2xl:h-118.75">
                  <Image
                    src="/images/about/story-exploration.jpg"
                    alt="Traveler exploring remarkable red sandstone formations and natural landscapes"
                    fill
                    quality={90}
                    sizes="(max-width: 639px) 35vw, (max-width: 1023px) 40vw, 25vw"
                    className="object-cover object-center transition-transform duration-1000 ease-out motion-safe:group-hover:scale-[1.06]"
                  />

                  <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/5" />
                </div>
              </Reveal>
            </div>
          </div>

          <div className="min-w-0">
            {aboutMilestones.map((milestone, index) => {
              const isOpen = activeIndex === index;

              return (
                <Reveal key={milestone.id} delay={index * 80}>
                  <div className="group border-b border-[#e8eaed] transition-colors duration-300 dark:border-white/10">
                    <button
                      type="button"
                      onClick={() => toggleAccordion(index)}
                      aria-expanded={isOpen}
                      aria-controls={`story-panel-${milestone.id}`}
                      id={`story-trigger-${milestone.id}`}
                      className="grid w-full cursor-pointer grid-cols-[54px_minmax(0,1fr)] items-start gap-4 py-5.5 text-left outline-none focus-visible:rounded-md focus-visible:ring-2 focus-visible:ring-[#242424] dark:focus-visible:ring-white sm:grid-cols-[70px_minmax(0,1fr)] sm:gap-6 sm:py-6.25 lg:py-6.75"
                    >
                      <span className={`font-heading text-[16px] leading-[1.65] font-semibold tracking-tight transition-colors duration-300 sm:text-[18px] ${isOpen ? "text-[#242424] dark:text-white" : "text-[#555555] group-hover:text-[#242424] dark:text-[#bbbbbb] dark:group-hover:text-white"}`}>
                        {milestone.year}
                      </span>

                      <span className="flex min-w-0 items-start justify-between gap-4">
                        <span className={`text-[14px] leading-[1.75] font-normal transition-colors duration-300 sm:text-[16px] ${isOpen ? "text-[#555555] dark:text-[#dddddd]" : "text-[#858585] group-hover:text-[#555555] dark:text-[#aaaaaa] dark:group-hover:text-white"}`}>
                          {milestone.description}
                        </span>

                        <IoArrowForwardOutline
                          aria-hidden="true"
                          className={`mt-1.25 shrink-0 text-[18px] transition-all duration-300 ease-out motion-reduce:transition-none ${isOpen ? "rotate-90 text-[#242424] dark:text-white" : "rotate-0 text-[#999999] group-hover:translate-x-1 group-hover:text-[#242424] dark:text-[#888888] dark:group-hover:text-white"}`}
                        />
                      </span>
                    </button>

                    <div
                      id={`story-panel-${milestone.id}`}
                      role="region"
                      aria-labelledby={`story-trigger-${milestone.id}`}
                      inert={!isOpen}
                      className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                    >
                      <div className="min-h-0 overflow-hidden">
                        <div className="pb-6.25 pl-17.5 sm:pb-7 sm:pl-23.5">
                          <h3 className="font-heading text-[15px] leading-[1.4] font-semibold tracking-tight text-[#292929] dark:text-white sm:text-[17px]">
                            {milestone.title}
                          </h3>

                          <p className="mt-3 max-w-122.5 text-[14px] leading-[1.75] font-normal text-[#858585] dark:text-[#aaaaaa] sm:text-[15px]">
                            {milestone.details}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}