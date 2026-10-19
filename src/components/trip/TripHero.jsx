import Image from "next/image";
import Container from "@/components/shared/Container";
import Reveal from "@/components/shared/Reveal";
import { tripHero } from "@/data/tripPage";

export default function TripHero() {
  return (
    <section id="trip-hero" aria-labelledby="trip-hero-heading" className="bg-white pt-9 pb-18 transition-colors duration-300 dark:bg-[#101112] sm:pt-12 sm:pb-22 lg:pt-14 lg:pb-20">
      <Container>
        <div className="grid min-w-0 items-end gap-7 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-12 xl:gap-16">
          <Reveal className="min-w-0">
            <h1 id="trip-hero-heading" className="font-heading max-w-220 text-[clamp(37px,7vw,60px)] leading-[1.085] font-medium tracking-[-0.06em] text-[#242424] dark:text-white sm:text-[clamp(48px,6vw,68px)] lg:text-[clamp(56px,4.9vw,78px)]">
              {tripHero.title.map((line) => (
                <span key={line} className="block">{line}</span>
              ))}
            </h1>
          </Reveal>

          <Reveal delay={150} className="min-w-0 lg:justify-self-end lg:pb-1">
            <p className="max-w-145 text-[14px] leading-[1.65] font-normal tracking-[-0.005em] text-[#858585] dark:text-[#aaaaaa] sm:text-[15px] xl:text-[16px]">
              {tripHero.description}
            </p>
          </Reveal>
        </div>

        <Reveal delay={200} className="mt-10 sm:mt-12 lg:mt-14">
          <div className="group relative isolate aspect-[1.2] w-full overflow-hidden rounded-2xl bg-[#dce2df] dark:bg-[#292c2e] sm:aspect-[1.75] lg:aspect-[2.24]">
            <Image
              src={tripHero.image}
              alt={tripHero.imageAlt}
              fill
              priority
              quality={90}
              sizes="(max-width: 640px) 100vw, (max-width: 1536px) 95vw, 1490px"
              className="object-cover object-center transition-transform duration-1400 ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:group-hover:scale-[1.035]"
            />

            <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-700 group-hover:bg-black/5" />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}