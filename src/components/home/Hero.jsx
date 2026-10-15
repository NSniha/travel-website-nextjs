import Image from "next/image";
import Link from "next/link";
import Container from "@/components/shared/Container";

export default function Hero() {
  return (
    <Container>
      <section
        aria-labelledby="hero-heading"
        className="group relative isolate flex min-h-[650px] overflow-hidden rounded-[16px] bg-[#35423a] sm:min-h-[700px] lg:min-h-[clamp(630px,calc(100svh-165px),790px)]"
      >
        <Image
          src="https://images.unsplash.com/photo-1719056155581-592454404326?auto=format&fit=crop&w=2400&q=85"
          alt="Scenic mountain landscape surrounded by the Swiss Alps"
          fill
          priority
          sizes="(max-width: 640px) 100vw, (max-width: 1536px) 95vw, 1490px"
          className="object-cover object-center transition-transform duration-[1400ms] ease-out motion-safe:group-hover:scale-[1.035]"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

        <div className="relative z-10 flex w-full flex-col justify-end gap-7 px-6 pt-36 pb-9 sm:px-10 sm:pb-12 lg:flex-row lg:items-end lg:justify-between lg:gap-12 lg:px-[62px] lg:pb-[62px]">
          <div className="animate-fade-up max-w-[950px]">
            <h1 id="hero-heading" className="font-heading text-[clamp(38px,7.5vw,68px)] leading-[1.1] font-normal tracking-[-0.065em] text-white sm:text-[clamp(54px,6vw,76px)] lg:text-[clamp(62px,5.55vw,90px)]">
              Let's Discover
              <br className="hidden md:block" />
              {" "}Destinations Beyond
              <br className="hidden md:block" />
              {" "}Your Imagination.
            </h1>
          </div>

          <div className="animate-fade-up animation-delay-200 flex w-full max-w-[355px] shrink-0 flex-col items-start gap-7 text-white lg:mb-1">
            <p className="text-[16px] leading-[1.55] font-normal tracking-[-0.015em] sm:text-[19px] lg:text-[22px]">
              Go beyond the familiar, discover remarkable places, and create stories worth telling.
            </p>

            <Link href="/trip" className="inline-flex h-[51px] items-center justify-center rounded-[9px] bg-white px-[27px] text-[16px] font-medium text-[#202020] transition-all duration-300 hover:-translate-y-1 hover:bg-[#f1f1f1] hover:shadow-[0_12px_30px_rgba(0,0,0,0.2)] active:translate-y-0">
              Plan Your Trip
            </Link>
          </div>
        </div>
      </section>
    </Container>
  );
}