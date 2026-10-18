import Container from "@/components/shared/Container";
import Reveal from "@/components/shared/Reveal";
import CountUp from "@/components/shared/CountUp";
import { upcomingAdventures } from "@/data/adventures";
import { travelExperiences } from "@/data/home";
import { travelArticles } from "@/data/travelStories";

const statistics = [
  { id: 1, value: upcomingAdventures.length, suffix: "+", label: "Journey Concepts" },
  { id: 2, value: travelExperiences.length, suffix: "", label: "Travel Experiences" },
  { id: 3, value: travelArticles.length, suffix: "+", label: "Travel Guides" },
];

export default function OurPurpose() {
  return (
    <section id="our-purpose" aria-labelledby="our-purpose-heading" className="bg-white pt-6 pb-12 transition-colors duration-300 dark:bg-[#101112] sm:pt-9 sm:pb-16 lg:pt-12 lg:pb-12">
      <Container>
        <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          <Reveal>
            <h2 id="our-purpose-heading" className="font-heading max-w-137.5 text-[30px] leading-[1.2] font-semibold tracking-[-0.055em] text-[#242424] dark:text-white sm:text-[36px] lg:text-[40px]">
              Curiosity Connects Us,
              <br className="hidden sm:block" /> Discovery Moves Us.
            </h2>
          </Reveal>

          <div>
            <Reveal delay={120}>
              <p className="max-w-142.5 text-[14px] leading-[1.75] font-normal text-[#858585] dark:text-[#aaaaaa] sm:text-[16px]">
                Travel is more than discovering new places. It is about meaningful connections, fresh perspectives, and the stories that stay with us long after the journey ends. At WAYLUME, we bring together extraordinary destinations and thoughtful travel inspiration to make every adventure feel closer.
              </p>
            </Reveal>

            <Reveal delay={200} className="mt-7 border-t border-[#e8eaed] pt-7 dark:border-white/10 sm:mt-8 sm:pt-8">
              <div className="grid grid-cols-3 gap-3 sm:gap-5">
                {statistics.map((statistic, index) => (
                  <div key={statistic.id} className="group min-w-0">
                    <div className="font-heading text-[32px] leading-none font-semibold tracking-[-0.065em] text-[#242424] transition-transform duration-300 group-hover:-translate-y-1 dark:text-white sm:text-[42px] lg:text-[46px]">
                      <CountUp end={statistic.value} suffix={statistic.suffix} duration={1600 + index * 200} />
                    </div>

                    <p className="mt-3 text-[11px] leading-normal text-[#858585] dark:text-[#aaaaaa] sm:text-[13px] lg:text-[14px]">
                      {statistic.label}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}