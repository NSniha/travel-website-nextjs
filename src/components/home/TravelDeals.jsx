"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { IoArrowForwardOutline, IoCheckmarkOutline, IoCloseOutline, IoPricetagOutline } from "react-icons/io5";
import Container from "@/components/shared/Container";
import Reveal from "@/components/shared/Reveal";
import { travelDeals } from "@/data/travelMedia";

export default function TravelDeals() {
  const [selectedDeal, setSelectedDeal] = useState(null);
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!selectedDeal) return;

    const dialog = dialogRef.current;
    const previousOverflow = document.body.style.overflow;

    if (!dialog?.open) {
      dialog?.showModal();
    }

    document.body.style.overflow = "hidden";

    return () => {
      if (dialog?.open) dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [selectedDeal]);

  const closeDeal = () => {
    dialogRef.current?.close();
  };

  return (
    <>
      <section id="travel-deals" aria-labelledby="travel-deals-heading" className="bg-white pb-[95px] transition-colors duration-300 dark:bg-[#101112] sm:pb-[110px] lg:pb-[125px]">
        <Container>
          <div className="grid items-end gap-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-14">
            <Reveal>
              <h2 id="travel-deals-heading" className="font-heading max-w-[650px] text-[30px] leading-[1.23] font-medium tracking-[-0.055em] text-[#242424] dark:text-white sm:text-[36px] lg:text-[40px]">
                Explore Unmissable Travel
                <br className="hidden lg:block" />
                {" "}Deals Tailored Just for You
              </h2>
            </Reveal>

            <Reveal delay={120} className="lg:justify-self-end lg:pb-1">
              <p className="max-w-[420px] text-[14px] leading-[1.7] text-[#858585] dark:text-[#aaaaaa] sm:text-[16px]">
                Discover inspiring travel offers curated for your next remarkable escape.
              </p>
            </Reveal>
          </div>

          <div className="mt-[35px] grid grid-cols-1 gap-[18px] sm:mt-[42px] lg:grid-cols-2">
            {travelDeals.map((deal, index) => (
              <Reveal key={deal.id} delay={index * 130}>
                <button
                  type="button"
                  onClick={() => setSelectedDeal(deal)}
                  aria-label={`View details for ${deal.title}, up to ${deal.discount}% off`}
                  className="group relative block h-[355px] w-full overflow-hidden rounded-[14px] bg-[#44514a] text-left outline-none transition-shadow duration-500 hover:shadow-[0_18px_45px_rgba(0,0,0,0.15)] focus-visible:ring-2 focus-visible:ring-[#242424] focus-visible:ring-offset-4 dark:focus-visible:ring-white dark:focus-visible:ring-offset-[#101112] sm:h-[370px] lg:h-[350px] xl:h-[380px]"
                >
                  <Image
                    src={deal.image}
                    alt={`${deal.title} travel destination`}
                    fill
                    sizes="(max-width: 1023px) 100vw, (max-width: 1536px) 50vw, 745px"
                    className="object-cover object-center transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:group-hover:scale-[1.065]"
                  />

                  <span className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-black/5 transition-colors duration-500" />

                  <span className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />

                  <span className="absolute top-[21px] left-[21px] z-10 max-w-[calc(100%-85px)] rounded-full bg-white px-[15px] py-[9px] text-[10px] leading-[1.4] font-medium text-[#242424] shadow-sm sm:top-[25px] sm:left-[25px] sm:text-[11px]">
                    {deal.badge}
                  </span>

                  <span className="absolute top-[21px] right-[21px] z-10 flex h-[35px] w-[35px] translate-y-2 items-center justify-center rounded-full border border-white/50 bg-white/15 text-white opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 sm:top-[25px] sm:right-[25px]">
                    <IoArrowForwardOutline aria-hidden="true" className="text-[18px]" />
                  </span>

                  <span className="absolute right-0 bottom-0 left-0 z-10 block p-[22px] text-white sm:p-[26px] xl:p-[28px]">
                    <span className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-end sm:gap-3">
                      <span className="block min-w-0 flex-1">
                        <span className="font-heading block text-[32px] leading-[1.12] font-medium tracking-[-0.06em] transition-transform duration-500 motion-safe:group-hover:-translate-y-1 sm:text-[34px] lg:text-[clamp(29px,3.1vw,44px)]">
                          {deal.titleLines.map((line) => (
                            <span key={line} className="block">
                              {line}
                            </span>
                          ))}
                        </span>

                        <span className="mt-[13px] block max-w-[330px] text-[11px] leading-[1.5] font-normal text-white/90 sm:text-[12px]">
                          {deal.note}
                        </span>
                      </span>

                      <span className="flex shrink-0 flex-col items-start sm:items-end">
                        <span className="text-[11px] leading-[1.3] text-white/90 sm:text-[12px]">Discount up to</span>

                        <span className="mt-[3px] flex items-end gap-[3px]">
                          <span className="font-heading text-[64px] leading-[0.95] font-medium tracking-[-0.075em] sm:text-[67px] lg:text-[clamp(55px,5.4vw,78px)]">
                            {deal.discount}
                          </span>

                          <span className="mb-[5px] flex h-[25px] w-[25px] items-center justify-center rounded-full bg-[#262626] text-[12px] font-medium text-white sm:h-[28px] sm:w-[28px]">
                            %
                          </span>
                        </span>
                      </span>
                    </span>
                  </span>
                </button>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <dialog
        ref={dialogRef}
        aria-labelledby="travel-deal-dialog-title"
        onClose={() => setSelectedDeal(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeDeal();
        }}
        className="fixed inset-0 m-auto max-h-[calc(100dvh-32px)] w-[calc(100%-32px)] max-w-[600px] overflow-y-auto rounded-[18px] bg-white p-0 text-[#242424] shadow-[0_25px_90px_rgba(0,0,0,0.3)] backdrop:bg-black/65 backdrop:backdrop-blur-[4px] dark:bg-[#1e2022] dark:text-white"
      >
        {selectedDeal && (
          <div>
            <div className="relative h-[220px] sm:h-[270px]">
              <Image src={selectedDeal.image} alt={selectedDeal.title} fill sizes="(max-width: 640px) 100vw, 600px" className="object-cover" />

              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

              <button
                type="button"
                onClick={closeDeal}
                aria-label="Close travel deal details"
                className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#242424] shadow-md transition-all duration-300 hover:rotate-90 hover:bg-[#f0f0f0]"
              >
                <IoCloseOutline aria-hidden="true" className="text-[23px]" />
              </button>
            </div>

            <div className="px-6 py-7 sm:px-9 sm:py-8">
              <div className="flex items-center gap-2 text-[12px] font-medium tracking-[0.08em] text-[#858585] uppercase dark:text-[#aaaaaa]">
                <IoPricetagOutline aria-hidden="true" className="text-[17px]" />
                <span>WAYLUME Travel Deals</span>
              </div>

              <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
                <h2 id="travel-deal-dialog-title" className="font-heading max-w-[350px] text-[27px] leading-[1.2] font-semibold tracking-[-0.05em] sm:text-[32px]">
                  {selectedDeal.title}
                </h2>

                <span className="rounded-full bg-[#f1f3ef] px-4 py-2 text-[12px] font-semibold text-[#242424] dark:bg-[#303431] dark:text-white">
                  Up to {selectedDeal.discount}% Off
                </span>
              </div>

              <p className="mt-5 text-[14px] leading-[1.8] text-[#777777] dark:text-[#b0b0b0] sm:text-[15px]">
                {selectedDeal.description}
              </p>

              <h3 className="mt-6 text-[15px] font-semibold">Offer Highlights</h3>

              <ul className="mt-4 space-y-3">
                {selectedDeal.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-3 text-[14px] leading-[1.6] text-[#777777] dark:text-[#b0b0b0]">
                    <IoCheckmarkOutline aria-hidden="true" className="mt-[2px] shrink-0 text-[18px] text-[#242424] dark:text-white" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-6 text-[12px] leading-[1.65] text-[#929292] dark:text-[#999999]">
                Promotional discounts are illustrative. Final pricing and availability will be confirmed when booking services are integrated.
              </p>

              <button
                type="button"
                onClick={closeDeal}
                className="mt-6 inline-flex h-[44px] items-center justify-center rounded-[8px] bg-[#242424] px-6 text-[13px] font-medium text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#454545] active:translate-y-0 dark:bg-white dark:text-[#242424] dark:hover:bg-[#e9e9e9]"
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