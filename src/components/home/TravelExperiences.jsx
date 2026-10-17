"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { IoArrowForwardOutline, IoCloseOutline, IoCompassOutline } from "react-icons/io5";
import Container from "@/components/shared/Container";
import Reveal from "@/components/shared/Reveal";
import { travelExperiences } from "@/data/home";

export default function TravelExperiences() {
  const [activeExperience, setActiveExperience] = useState(null);
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!activeExperience || !dialog) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.showModal();

    return () => {
      if (dialog.open) dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [activeExperience]);

  const closeDetails = () => dialogRef.current?.close();

  return (
    <>
      <section id="experiences" aria-labelledby="experiences-heading" className="bg-white py-18.75 transition-colors duration-300 dark:bg-[#101112] sm:py-22.5 lg:py-25">
        <Container>
          <div className="grid items-end gap-5 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.85fr)] lg:gap-12">
            <Reveal>
             <h2 id="experiences-heading" className="font-heading max-w-162.5 text-[30px] leading-[1.2] font-semibold tracking-[-0.055em] text-[#242424] dark:text-white sm:text-[36px] lg:text-[44px]">
              Explore Handpicked Destinations<br className="hidden lg:block" />{" "}And Find Your Perfect Escape
            </h2>
            </Reveal>

            <Reveal delay={120} className="lg:justify-self-end lg:pb-1">
              <p className="max-w-97.5 text-[14px] leading-[1.7] text-[#858585] dark:text-[#aaaaaa] sm:text-[16px]">
                Discover unforgettable journeys, extraordinary places, and experiences that bring every adventure to life.
              </p>
            </Reveal>
          </div>

          <div className="mt-8.75 grid grid-cols-1 gap-3.75 sm:mt-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4.25">
            {travelExperiences.map((experience, index) => {
              const columnClass = index < 2 ? "lg:col-span-2" : index === 2 ? "sm:col-span-2 lg:col-span-2" : "";

              return (
                <Reveal key={experience.id} delay={(index % 3) * 90} className={columnClass}>
                  <button
                    type="button"
                    onClick={() => setActiveExperience(experience)}
                    aria-label={`Explore ${experience.title}`}
                    className="group relative block h-67.5 w-full overflow-hidden rounded-[14px] bg-[#e2e5e4] text-left outline-none transition-shadow duration-500 hover:shadow-[0_15px_35px_rgba(0,0,0,0.12)] focus-visible:ring-2 focus-visible:ring-[#242424] focus-visible:ring-offset-4 dark:bg-[#292c2e] dark:focus-visible:ring-white dark:focus-visible:ring-offset-[#101112] sm:h-71.25 lg:h-[clamp(280px,27.8vw,370px)]"
                  >
                    <Image
                      src={experience.image}
                      alt={`${experience.title} travel experience`}
                      fill
                      sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, (max-width: 1536px) 50vw, 740px"
                      className="object-cover object-center transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:group-hover:scale-[1.065]"
                    />

                    <span className="absolute inset-0 bg-linear-to-t from-black/75 via-black/15 to-transparent transition-colors duration-500" />

                    <span className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />

                    <span className="absolute top-4 right-4 flex h-9 w-9 translate-y-2 items-center justify-center rounded-full border border-white/40 bg-white/15 text-white opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                      <IoArrowForwardOutline aria-hidden="true" className="text-[18px]" />
                    </span>

                    <span className="absolute right-0 bottom-0 left-0 block px-4.5 pb-4.75 text-white sm:px-5 sm:pb-5.25">
                      <span className="font-heading block text-[19px] leading-[1.3] font-semibold tracking-[-0.035em] transition-transform duration-500 motion-safe:group-hover:-translate-y-1 sm:text-[20px]">
                        {experience.title}
                      </span>

                      <span className="mt-1.5 block max-w-105 text-[13px] leading-[1.55] font-normal text-white/90 sm:text-[14px]">
                        {experience.description}
                      </span>
                    </span>
                  </button>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      <dialog
        ref={dialogRef}
        aria-labelledby="experience-dialog-title"
        onClose={() => setActiveExperience(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeDetails();
        }}
        className="fixed inset-0 m-auto max-h-[calc(100dvh-32px)] w-[calc(100%-32px)] max-w-147.5 overflow-y-auto rounded-[18px] bg-white p-0 text-[#242424] shadow-[0_25px_90px_rgba(0,0,0,0.25)] backdrop:bg-black/65 backdrop:backdrop-blur-xs dark:bg-[#1e2022] dark:text-white"
      >
        {activeExperience && (
          <div>
            <div className="relative h-55 sm:h-68.75">
              <Image src={activeExperience.image} alt={activeExperience.title} fill sizes="(max-width: 640px) 100vw, 590px" className="object-cover" />

              <button
                type="button"
                onClick={closeDetails}
                aria-label="Close experience details"
                className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#242424] shadow-md transition-all duration-300 hover:rotate-90 hover:bg-[#f0f0f0]"
              >
                <IoCloseOutline className="text-[23px]" />
              </button>
            </div>

            <div className="px-6 py-7 sm:px-9 sm:py-8">
              <div className="flex items-center gap-2 text-[12px] font-medium tracking-[0.08em] text-[#858585] uppercase dark:text-[#aaaaaa]">
                <IoCompassOutline aria-hidden="true" className="text-[17px]" />
                <span>WAYLUME Experiences</span>
              </div>

              <h2 id="experience-dialog-title" className="font-heading mt-3 text-[27px] leading-[1.2] font-semibold tracking-tighter sm:text-[32px]">
                {activeExperience.title}
              </h2>

              <p className="mt-4 text-[14px] leading-[1.8] text-[#777777] dark:text-[#b0b0b0] sm:text-[15px]">
                {activeExperience.details}
              </p>

              <h3 className="mt-6 text-[15px] font-semibold">Experience Highlights</h3>

              <ul className="mt-3 space-y-3">
                {activeExperience.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-3 text-[14px] leading-[1.6] text-[#777777] dark:text-[#b0b0b0]">
                    <span aria-hidden="true" className="mt-2.25 h-1.25 w-1.25 shrink-0 rounded-full bg-[#242424] dark:bg-white" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={closeDetails}
                className="mt-7 inline-flex h-10.75 items-center justify-center rounded-lg bg-[#242424] px-6 text-[13px] font-medium text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#454545] active:translate-y-0 dark:bg-white dark:text-[#242424] dark:hover:bg-[#e9e9e9]"
              >
                Continue Exploring
              </button>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}