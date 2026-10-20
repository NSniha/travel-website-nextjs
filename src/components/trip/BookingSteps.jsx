"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { IoArrowForwardOutline, IoCheckmarkOutline, IoCloseOutline } from "react-icons/io5";
import Container from "@/components/shared/Container";
import Reveal from "@/components/shared/Reveal";
import { bookingSteps } from "@/data/tripPage";

export default function BookingSteps() {
  const dialogRef = useRef(null);
  const [selectedStep, setSelectedStep] = useState(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!selectedStep || !dialog) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    if (!dialog.open) dialog.showModal();

    return () => {
      if (dialog.open) dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [selectedStep]);

  const closeDetails = () => dialogRef.current?.close();

  return (
    <>
      <section id="booking-steps" aria-labelledby="booking-steps-heading" className="overflow-hidden bg-[#f8f8f8] pt-20 pb-24 transition-colors duration-300 dark:bg-[#191b1d] sm:pt-24 sm:pb-28 lg:pt-28 lg:pb-36">
        <Container>
          <Reveal className="text-center">
            <h2 id="booking-steps-heading" className="font-heading text-[30px] leading-[1.2] font-semibold tracking-[-0.055em] text-[#242424] dark:text-white sm:text-[36px] lg:text-[40px]">
              How to Plan Your Adventure
            </h2>

            <p className="mx-auto mt-4 max-w-[720px] text-[14px] leading-[1.75] font-normal text-[#858585] dark:text-[#aaaaaa] sm:text-[16px]">
              From discovering extraordinary places to preparing for the journey ahead, every adventure begins with a thoughtful plan.
            </p>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 items-start gap-4 sm:mt-14 sm:grid-cols-2 sm:gap-5 lg:mt-16 lg:grid-cols-4 lg:gap-4 xl:gap-5">
            {bookingSteps.map((step, index) => (
              <Reveal key={step.id} delay={index * 100} className={`min-w-0 ${index % 2 !== 0 ? "lg:mt-[85px]" : ""}`}>
                <button
                  type="button"
                  onClick={() => setSelectedStep(step)}
                  aria-label={`Learn more about step ${step.number}: ${step.title}`}
                  aria-haspopup="dialog"
                  className="group relative flex h-[290px] w-full flex-col justify-between overflow-hidden rounded-2xl bg-white p-6 text-left outline-none transition-[transform,box-shadow,background-color] duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_18px_45px_rgba(0,0,0,0.055)] focus-visible:ring-2 focus-visible:ring-[#242424] dark:bg-[#242628] dark:hover:bg-[#2a2c2e] dark:hover:shadow-[0_18px_45px_rgba(0,0,0,0.15)] dark:focus-visible:ring-white sm:h-[340px] sm:p-7 lg:h-[370px] lg:p-6 xl:h-[390px] xl:p-7"
                >
                  <div className="flex w-full items-start justify-between gap-4">
                    <span className="font-heading text-[48px] leading-none font-medium tracking-[-0.065em] text-[#242424] transition-transform duration-500 ease-out group-hover:-translate-y-1 dark:text-white sm:text-[54px] lg:text-[55px] xl:text-[60px]">
                      {step.number}
                    </span>

                    <span className="flex h-9 w-9 translate-y-2 items-center justify-center rounded-full bg-[#f5f5f5] text-[#242424] opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 dark:bg-[#353739] dark:text-white">
                      <IoArrowForwardOutline aria-hidden="true" className="-rotate-45 text-[18px] transition-transform duration-300 group-hover:rotate-0" />
                    </span>
                  </div>

                  <div className="relative z-10">
                    <h3 className="font-heading text-[19px] leading-[1.35] font-semibold tracking-[-0.045em] text-[#242424] dark:text-white sm:text-[20px] lg:text-[19px] xl:text-[21px]">
                      {step.title}
                    </h3>

                    <p className="mt-3 max-w-[300px] text-[14px] leading-[1.75] font-normal text-[#858585] dark:text-[#aaaaaa] sm:text-[15px] lg:text-[14px] xl:text-[16px]">
                      {step.description}
                    </p>
                  </div>

                  <span className="pointer-events-none absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-[#242424] transition-transform duration-500 ease-out group-hover:scale-x-100 dark:bg-white" />
                </button>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <dialog
        ref={dialogRef}
        aria-labelledby="booking-step-dialog-heading"
        aria-describedby="booking-step-dialog-description"
        onClose={() => setSelectedStep(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeDetails();
        }}
        className="fixed inset-0 m-auto max-h-[calc(100dvh-32px)] w-[calc(100%-32px)] max-w-[580px] overflow-y-auto rounded-2xl bg-white p-0 text-[#242424] shadow-[0_25px_90px_rgba(0,0,0,0.3)] backdrop:bg-black/70 backdrop:backdrop-blur-[5px] dark:bg-[#202224] dark:text-white"
      >
        {selectedStep && (
          <div className="relative px-6 py-7 sm:px-9 sm:py-9">
            <div className="flex items-start justify-between gap-5">
              <span className="font-heading text-[58px] leading-none font-medium tracking-[-0.065em] text-[#242424] dark:text-white sm:text-[70px]">
                {selectedStep.number}
              </span>

              <button type="button" onClick={closeDetails} aria-label="Close step details" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f2f2f2] text-[#242424] transition-all duration-300 hover:rotate-90 hover:bg-[#e8e8e8] dark:bg-[#333537] dark:text-white dark:hover:bg-[#414345]">
                <IoCloseOutline aria-hidden="true" className="text-[23px]" />
              </button>
            </div>

            <div className="mt-9">
              <span className="text-[11px] font-medium tracking-[0.1em] text-[#858585] uppercase dark:text-[#aaaaaa]">
                WAYLUME · Your Travel Journey
              </span>

              <h2 id="booking-step-dialog-heading" className="font-heading mt-3 text-[28px] leading-[1.2] font-semibold tracking-[-0.055em] text-[#242424] dark:text-white sm:text-[34px]">
                {selectedStep.title}
              </h2>

              <p id="booking-step-dialog-description" className="mt-5 text-[14px] leading-[1.85] font-normal text-[#858585] dark:text-[#aaaaaa] sm:text-[15px]">
                {selectedStep.details}
              </p>

              <div className="mt-7 border-t border-[#eaeaea] pt-6 dark:border-white/10">
                <h3 className="font-heading text-[16px] font-semibold tracking-[-0.025em] text-[#242424] dark:text-white">
                  What to Consider
                </h3>

                <ul className="mt-5 space-y-3.5">
                  {selectedStep.highlights.map((highlight) => (
                    <li key={highlight} className="flex items-start gap-3 text-[13px] leading-[1.7] text-[#777777] dark:text-[#bcbcbc] sm:text-[14px]">
                      <IoCheckmarkOutline aria-hidden="true" className="mt-0.5 shrink-0 text-[18px] text-[#242424] dark:text-white" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link href="/trip#all-trips" onClick={closeDetails} className="group mt-9 inline-flex h-11 items-center justify-center gap-3 rounded-lg bg-[#242424] px-5 text-[13px] font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#454545] dark:bg-white dark:text-[#242424] dark:hover:bg-[#eeeeee]">
                Explore Our Trips
                <IoArrowForwardOutline aria-hidden="true" className="text-[17px] transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}