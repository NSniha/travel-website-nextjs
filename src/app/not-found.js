import Image from "next/image";
import Link from "next/link";
import {
  IoArrowForwardOutline,
  IoArrowBackOutline,
  IoCompassOutline,
  IoHomeOutline,
  IoLocationOutline,
} from "react-icons/io5";

import Container from "@/components/shared/Container";
import Reveal from "@/components/shared/Reveal";
import Footer from "@/components/layout/Footer";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-white transition-colors duration-300 dark:bg-[#101112]">
      <section
        aria-labelledby="not-found-heading"
        className="relative overflow-hidden bg-white py-12 transition-colors duration-300 dark:bg-[#101112] sm:py-16 lg:pt-18 lg:pb-20"
      >
        <Container>
          {/* Breadcrumb */}

          <Reveal>
            <nav aria-label="Breadcrumb">
              <ol className="flex items-center gap-2.5 text-[12px] sm:text-[13px]">
                <li>
                  <Link
                    href="/"
                    className="font-medium text-[#858585] transition-colors duration-300 hover:text-[#242424] dark:text-[#aaaaaa] dark:hover:text-white"
                  >
                    Home
                  </Link>
                </li>

                <li
                  aria-hidden="true"
                  className="text-[#bbbbbb] dark:text-[#777777]"
                >
                  /
                </li>

                <li
                  aria-current="page"
                  className="font-medium text-[#242424] dark:text-white"
                >
                  Page Not Found
                </li>
              </ol>
            </nav>
          </Reveal>

          {/* Main Content */}

          <div className="mt-11 grid min-w-0 items-center gap-12 sm:mt-14 lg:mt-16 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14 xl:gap-20">
            {/* Left Content */}

            <div className="flex min-w-0 flex-col items-start">
              <Reveal>
                <div className="inline-flex items-center gap-2.5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#e7e7e7] text-[#555555] dark:border-white/15 dark:text-white">
                    <IoCompassOutline
                      aria-hidden="true"
                      className="text-[17px]"
                    />
                  </span>

                  <span className="text-[11px] font-medium tracking-[0.12em] text-[#858585] uppercase dark:text-[#aaaaaa] sm:text-[12px]">
                    A Little Detour
                  </span>
                </div>
              </Reveal>

              {/* 404 Number */}

              <Reveal delay={80}>
                <div
                  aria-hidden="true"
                  className="font-heading mt-7 text-[105px] leading-[0.92] font-semibold tracking-[-0.095em] text-[#242424] dark:text-white sm:text-[135px] lg:text-[145px] xl:text-[165px]"
                >
                  404<span className="text-[#bbbbbb] dark:text-[#55585b]">.</span>
                </div>
              </Reveal>

              {/* Heading */}

              <Reveal delay={140}>
                <h1
                  id="not-found-heading"
                  className="font-heading mt-7 max-w-145 text-[35px] leading-[1.14] font-semibold tracking-[-0.055em] text-[#242424] dark:text-white sm:text-[43px] lg:text-[45px] xl:text-[49px]"
                >
                  Looks Like You've
                  <br className="hidden sm:block" /> Wandered Off the Map.
                </h1>
              </Reveal>

              {/* Description */}

              <Reveal delay={200}>
                <p className="mt-5 max-w-112.5 text-[14px] leading-[1.85] font-normal text-[#858585] dark:text-[#aaaaaa] sm:mt-6 sm:text-[16px]">
                  Every great adventure has its unexpected turns. The page
                  you're looking for seems to have taken a different
                  route. Let's get you back on track.
                </p>
              </Reveal>

              {/* Action Buttons */}

              <Reveal
                delay={260}
                className="mt-8 flex flex-wrap items-center gap-3 sm:mt-9"
              >
                <Link
                  href="/"
                  className="group relative inline-flex h-12 items-center justify-center gap-3 overflow-hidden rounded-lg bg-[#242424] px-5.5 text-[13px] font-medium text-white shadow-[0_5px_18px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(0,0,0,0.15)] active:translate-y-0 dark:bg-white dark:text-[#242424]"
                >
                  <span className="absolute inset-0 -translate-x-full bg-[#454545] transition-transform duration-500 ease-out group-hover:translate-x-0 dark:bg-[#e8e8e8]" />

                  <IoHomeOutline
                    aria-hidden="true"
                    className="relative z-10 text-[17px]"
                  />

                  <span className="relative z-10">
                    Back to Home
                  </span>

                  <IoArrowForwardOutline
                    aria-hidden="true"
                    className="relative z-10 text-[17px] transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>

                <Link
                  href="/trip#all-trips"
                  className="group inline-flex h-12 items-center justify-center gap-3 rounded-lg border border-[#e0e0e0] bg-white px-5.5 text-[13px] font-medium text-[#242424] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#242424] hover:bg-[#f8f8f8] active:translate-y-0 dark:border-white/20 dark:bg-[#1e2022] dark:text-white dark:hover:border-white/60 dark:hover:bg-[#282a2c]"
                >
                  Explore Trips

                  <IoArrowForwardOutline
                    aria-hidden="true"
                    className="text-[17px] transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </Reveal>

              {/* Contact Link */}

              <Reveal delay={320}>
                <div className="mt-9 flex flex-wrap items-center gap-2 border-t border-[#eeeeee] pt-6 dark:border-white/10 sm:mt-11">
                  <span className="text-[13px] text-[#858585] dark:text-[#aaaaaa]">
                    Still feeling lost?
                  </span>

                  <Link
                    href="/contact"
                    className="group inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#242424] transition-colors duration-300 hover:text-[#777777] dark:text-white dark:hover:text-[#cccccc]"
                  >
                    Contact Us

                    <IoArrowForwardOutline
                      aria-hidden="true"
                      className="text-[15px] transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </Link>
                </div>
              </Reveal>
            </div>

            {/* Right Image */}

            <Reveal delay={180} className="min-w-0">
              <div className="group relative isolate h-90 w-full overflow-hidden rounded-2xl bg-[#34443f] sm:h-125 lg:h-150 xl:h-162.5">
                <Image
                  src="/images/trip/travel-offer.jpg"
                  alt="Beautiful mountain landscape inviting travelers to explore new destinations"
                  fill
                  priority
                  quality={90}
                  sizes="(max-width: 1023px) 100vw, 50vw"
                  className="object-cover object-center transition-transform duration-1800 ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:group-hover:scale-[1.06]"
                />

                {/* Image Gradient */}

                <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/5 to-black/15" />

                {/* Top Badge */}

                <div className="absolute top-5 left-5 z-10 sm:top-7 sm:left-7">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/15 px-4 py-2.5 text-[11px] font-medium text-white backdrop-blur-md sm:text-[12px]">
                    <IoLocationOutline
                      aria-hidden="true"
                      className="text-[16px]"
                    />

                    The Journey Continues
                  </span>
                </div>

                {/* Image Bottom Content */}

                <div className="absolute right-0 bottom-0 left-0 z-10 p-6 text-white sm:p-8 lg:p-9">
                  <span className="text-[11px] font-medium tracking-[0.12em] text-white/75 uppercase sm:text-[12px]">
                    WAYLUME Travel
                  </span>

                  <h2 className="font-heading mt-3 max-w-100 text-[26px] leading-[1.2] font-semibold tracking-tighter sm:text-[32px] lg:text-[36px]">
                    The Journey
                    <br />
                    Isn't Over Yet.
                  </h2>

                  <div className="mt-5 flex items-end justify-between gap-4">
                    <p className="max-w-70 text-[12px] leading-[1.7] text-white/85 sm:text-[13px]">
                      There's always another incredible destination waiting
                      to be discovered.
                    </p>

                    <Link
                      href="/trip"
                      aria-label="Discover WAYLUME travel destinations"
                      className="group/link flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/45 bg-white/15 text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:text-[#242424] sm:h-12 sm:w-12"
                    >
                      <IoArrowForwardOutline
                        aria-hidden="true"
                        className="-rotate-45 text-[20px] transition-transform duration-300 group-hover/link:rotate-0"
                      />
                    </Link>
                  </div>
                </div>

                {/* Decorative Border */}

                <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />
              </div>
            </Reveal>
          </div>

          {/* Bottom Navigation */}

          <Reveal delay={360}>
            <div className="mt-13 flex flex-wrap items-center justify-between gap-5 border-t border-[#eeeeee] pt-6 dark:border-white/10 sm:mt-16 lg:mt-20">
              <span className="text-[12px] font-medium text-[#999999] dark:text-[#aaaaaa]">
                WAYLUME — Go Further. Feel More.
              </span>

              <Link
                href="/"
                className="group inline-flex items-center gap-2 text-[12px] font-medium text-[#555555] transition-colors duration-300 hover:text-[#242424] dark:text-[#cccccc] dark:hover:text-white sm:text-[13px]"
              >
                <IoArrowBackOutline
                  aria-hidden="true"
                  className="text-[16px] transition-transform duration-300 group-hover:-translate-x-1"
                />

                Return to Homepage
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>

      <Footer />
    </main>
  );
}