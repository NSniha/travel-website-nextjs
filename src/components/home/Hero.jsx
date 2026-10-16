import Image from "next/image";
import Link from "next/link";
import { IoArrowForwardOutline } from "react-icons/io5";
import Container from "@/components/shared/Container";

export default function Hero() {
  return (
    <Container>
      <section
        aria-labelledby="hero-heading"
        className="group relative isolate flex min-h-[640px] overflow-hidden rounded-[16px] bg-[#35423a] sm:min-h-[670px] lg:min-h-[680px] xl:min-h-[clamp(650px,calc(100svh-115px),790px)]"
      >
        <Image
          src="/images/hero/hero.png"
          alt="Scenic mountain landscape showcasing an extraordinary travel destination"
          fill
          priority
          quality={90}
          sizes="(max-width: 640px) 100vw, (max-width: 1536px) 95vw, 1490px"
          className="object-cover object-center transition-transform duration-[1600ms] ease-out motion-safe:group-hover:scale-[1.035]"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

        <div className="relative z-10 mt-auto grid w-full min-w-0 gap-7 px-6 pt-36 pb-9 sm:px-10 sm:pb-12 lg:px-[54px] lg:pb-[54px] xl:grid-cols-[minmax(0,1fr)_300px] xl:items-end xl:gap-12 xl:px-[58px] xl:pb-[58px]">
          <div className="animate-fade-up min-w-0">
            <h1
              id="hero-heading"
              className="font-heading max-w-[880px] text-[clamp(37px,7vw,60px)] leading-[1.085] font-normal tracking-[-0.06em] text-white sm:text-[clamp(48px,6vw,68px)] lg:text-[clamp(56px,4.9vw,78px)]"
            >
              <span className="block">Let's Discover</span>
              <span className="block">Destinations Beyond</span>
              <span className="block">Your Imagination.</span>
            </h1>
          </div>

          <div className="animate-fade-up animation-delay-200 flex max-w-[330px] flex-col items-start gap-6 text-white xl:max-w-[300px] xl:gap-7 xl:pb-1">
            <p className="text-[14px] leading-[1.65] font-normal tracking-[-0.005em] text-white/95 sm:text-[15px] xl:text-[16px]">
              Go beyond the familiar, discover remarkable places, and create stories worth telling.
            </p>

            <Link
              href="/trip"
              className="group/cta relative inline-flex h-[48px] items-center justify-center gap-4 overflow-hidden rounded-[8px] bg-white px-[22px] text-[14px] font-medium text-[#202020] shadow-[0_4px_15px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-[3px] hover:shadow-[0_12px_28px_rgba(0,0,0,0.2)] active:translate-y-0"
            >
              <span className="absolute inset-0 -translate-x-full bg-[#e8eae6] transition-transform duration-500 ease-out group-hover/cta:translate-x-0" />
              <span className="relative z-10">Plan Your Trip</span>
              <IoArrowForwardOutline aria-hidden="true" className="relative z-10 text-[17px] transition-transform duration-300 group-hover/cta:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </Container>
  );
}