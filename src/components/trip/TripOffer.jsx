import Image from "next/image";
import Link from "next/link";
import { IoArrowForwardOutline } from "react-icons/io5";
import Container from "@/components/shared/Container";
import Reveal from "@/components/shared/Reveal";
import { tripOffer } from "@/data/tripPage";

export default function TripOffer() {
  return (
    <section id="trip-offer" aria-labelledby="trip-offer-heading" className="bg-white pt-12 pb-22 transition-colors duration-300 dark:bg-[#101112] sm:pt-16 sm:pb-26 lg:pt-28 lg:pb-14">
      <Container>
        <div className="grid min-w-0 items-end gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-12 xl:gap-16">
          <Reveal className="min-w-0">
            <h2 id="trip-offer-heading" className="font-heading max-w-180 text-[30px] leading-[1.2] font-semibold tracking-[-0.055em] text-[#242424] dark:text-white sm:text-[36px] lg:text-[44px]">
              {tripOffer.title}
            </h2>
          </Reveal>

          <Reveal delay={120} className="min-w-0 lg:justify-self-end lg:pb-1">
            <p className="max-w-132.5 text-[14px] leading-[1.75] font-normal text-[#858585] dark:text-[#aaaaaa] sm:text-[16px]">
              {tripOffer.description}
            </p>
          </Reveal>
        </div>

        <Reveal delay={180} className="mt-10 sm:mt-12 lg:mt-14">
          <div className="group relative isolate flex min-h-132.5 w-full flex-col justify-between overflow-hidden rounded-2xl bg-[#354b3c] p-5 text-white sm:min-h-122.5 sm:p-8 lg:min-h-130 lg:p-10 xl:min-h-137.5 xl:p-12">
            <Image
              src={tripOffer.image}
              alt={tripOffer.imageAlt}
              fill
              quality={90}
              sizes="(max-width: 640px) 100vw, (max-width: 1536px) 95vw, 1490px"
              className="object-cover object-center transition-transform duration-1400 ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:group-hover:scale-[1.035]"
            />

            <div className="pointer-events-none absolute inset-0 bg-linear-to-r from-black/70 via-black/20 to-black/5" />
            <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/10 via-transparent to-black/1" />

            <div className="relative z-10">
              <span className="inline-flex max-w-full items-center rounded-full bg-white px-4 py-2.5 text-[11px] leading-normal font-medium text-[#242424] shadow-[0_4px_15px_rgba(0,0,0,0.08)] sm:px-5 sm:text-[12px]">
                {tripOffer.badge}
              </span>
            </div>

            <div className="relative z-10 flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-end sm:gap-10">
              <div className="min-w-0">
                <h3 className="font-heading text-[clamp(43px,6vw,78px)] leading-[1.03] font-medium tracking-[-0.065em] text-white">
                  {tripOffer.heading.map((line) => (
                    <span key={line} className="block">{line}</span>
                  ))}
                </h3>

                <div className="mt-5 sm:mt-6">
                  <p className="text-[12px] leading-normal text-white/90 sm:text-[14px]">
                    {tripOffer.discountLabel}
                  </p>

                  <div className="mt-1 flex items-end gap-1">
                    <span className="font-heading text-[90px] leading-[0.95] font-medium tracking-[-0.09em] text-white sm:text-[105px] lg:text-[120px]">
                      {tripOffer.discount}
                    </span>

                    <span className="mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-[#242424]/90 text-[15px] font-medium text-white sm:mb-3 sm:h-10 sm:w-10 sm:text-[17px]">
                      %
                    </span>
                  </div>

                  <p className="mt-3 max-w-105 text-[11px] leading-[1.6] text-white/85 sm:text-[12px]">
                    {tripOffer.note}
                  </p>
                </div>
              </div>

              <Link
                href={tripOffer.buttonHref}
                className="group/cta relative inline-flex h-12 shrink-0 items-center justify-center gap-3 overflow-hidden rounded-lg bg-white px-5.5 text-[13px] font-medium text-[#242424] shadow-[0_5px_20px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-0.75 hover:shadow-[0_12px_30px_rgba(0,0,0,0.22)] active:translate-y-0 sm:h-12.5 sm:px-6 sm:text-[14px]"
              >
                <span className="absolute inset-0 -translate-x-full bg-[#e8eae6] transition-transform duration-500 ease-out group-hover/cta:translate-x-0" />
                <span className="relative z-10">{tripOffer.buttonText}</span>
                <IoArrowForwardOutline aria-hidden="true" className="relative z-10 text-[17px] transition-transform duration-300 group-hover/cta:translate-x-1" />
              </Link>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}