import { IoAirplaneOutline, IoCompassOutline, IoChatbubblesOutline, IoLeafOutline, IoPricetagOutline, IoHeartOutline } from "react-icons/io5";
import Container from "@/components/shared/Container";
import Reveal from "@/components/shared/Reveal";
import { aboutBenefits } from "@/data/about";

const benefitIcons = {
  planning: IoAirplaneOutline,
  destination: IoCompassOutline,
  guidance: IoChatbubblesOutline,
  sustainable: IoLeafOutline,
  value: IoPricetagOutline,
  community: IoHeartOutline,
};

export default function WhyChooseUs() {
  return (
    <section id="why-waylume" aria-labelledby="why-waylume-heading" className="bg-[#f8f8f8] py-20 transition-colors duration-300 dark:bg-[#191b1d] sm:py-23.75 lg:py-28">
      <Container>
        <Reveal className="text-center">
          <h2 id="why-waylume-heading" className="font-heading text-[30px] leading-[1.2] font-semibold tracking-[-0.055em] text-[#242424] dark:text-white sm:text-[36px] lg:text-[44px]">
            The WAYLUME Difference
          </h2>

          <p className="mx-auto mt-3.75 max-w-155 text-[14px] leading-[1.75] font-normal text-[#858585] dark:text-[#aaaaaa] sm:text-[16px]">
            Discover a more thoughtful way to explore, connect, and experience the extraordinary.
          </p>
        </Reveal>

        <div className="mt-10.5 grid grid-cols-1 items-start gap-4.25 sm:mt-12.5 sm:grid-cols-2 sm:gap-5 lg:mt-13.75 lg:gap-6">
          {aboutBenefits.map((benefit, index) => {
            const Icon = benefitIcons[benefit.icon];

            return (
              <Reveal key={benefit.id} delay={(index % 2) * 100} className="min-w-0">
                <details className="group overflow-hidden rounded-[13px] bg-white transition-[background-color,box-shadow] duration-300 hover:shadow-[0_10px_35px_rgba(0,0,0,0.035)] dark:bg-[#242628] dark:hover:bg-[#292b2d]">
                  <summary className="flex min-h-23.75 cursor-pointer list-none items-center gap-4.75 px-5 py-5 outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#242424] dark:focus-visible:ring-white sm:px-5.5 lg:gap-5.5 lg:px-6.25 [&::-webkit-details-marker]:hidden">
                    <span className="flex h-8.5 w-8.5 shrink-0 items-center justify-center text-[#292929] transition-transform duration-500 ease-out motion-safe:group-hover:-translate-y-0.75 motion-safe:group-hover:rotate-[-5deg] dark:text-white">
                      <Icon aria-hidden="true" className="text-[29px] sm:text-[30px]" />
                    </span>

                    <span className="font-heading max-w-102.5 text-[15px] leading-normal font-semibold tracking-tight text-[#292929] transition-colors duration-300 group-hover:text-[#555555] dark:text-white dark:group-hover:text-[#dddddd] sm:text-[16px] lg:text-[17px]">
                      {benefit.title}
                    </span>
                  </summary>

                  <div className="px-5 pb-5.75 sm:px-5.5 lg:px-6.25">
                    <div className="border-t border-[#eeeeee] pt-4.25 dark:border-white/10">
                      <p className="text-[13px] leading-[1.8] text-[#858585] dark:text-[#aaaaaa] sm:text-[14px]">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </details>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}