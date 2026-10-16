import Image from "next/image";
import { IoAddOutline, IoChatbubbleEllipsesOutline, IoDocumentTextOutline, IoLeafOutline, IoPricetagOutline } from "react-icons/io5";
import Container from "@/components/shared/Container";
import Reveal from "@/components/shared/Reveal";
import { travelBenefits } from "@/data/home";

const benefitIcons = {
  planning: IoDocumentTextOutline,
  support: IoChatbubbleEllipsesOutline,
  value: IoPricetagOutline,
  sustainable: IoLeafOutline,
};

export default function WhyChooseUs() {
  return (
    <section id="why-choose-us" aria-labelledby="why-choose-us-heading" className="bg-white pt-[30px] pb-[85px] transition-colors duration-300 dark:bg-[#101112] sm:pt-[50px] sm:pb-[100px] lg:pt-[60px] lg:pb-[110px]">
      <Container>
        <div className="grid items-center gap-9 lg:grid-cols-2 lg:gap-[35px] xl:gap-[40px]">
          <Reveal className="h-full">
            <div className="group relative h-[350px] overflow-hidden rounded-[14px] bg-[#e7e9e5] dark:bg-[#292c2e] sm:h-[430px] lg:h-[clamp(400px,42vw,520px)]">
              <Image
                src="/images/shared/why-choose-us.jpg"
                alt="Traveler exploring a mountain landscape surrounded by breathtaking alpine scenery"
                fill
                sizes="(max-width: 1023px) 100vw, 50vw"
                className="object-cover object-center transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:group-hover:scale-[1.045]"
              />

              <div className="absolute inset-0 bg-black/0 transition-colors duration-700 group-hover:bg-black/5" />
            </div>
          </Reveal>

          <div className="min-w-0">
            <Reveal>
              <h2 id="why-choose-us-heading" className="font-heading max-w-[550px] text-[30px] leading-[1.2] font-medium tracking-[-0.055em] text-[#242424] dark:text-white sm:text-[36px] lg:text-[clamp(30px,3.3vw,43px)]">
                Explore the World With
                <br className="hidden sm:block" />
                {" "}Confidence and Ease
              </h2>
            </Reveal>

            <div className="mt-[18px] sm:mt-[22px]">
              {travelBenefits.map((benefit, index) => {
                const Icon = benefitIcons[benefit.icon];

                return (
                  <Reveal key={benefit.id} delay={index * 80}>
                    <details className="group border-b border-[#e8e8e8] transition-colors duration-300 dark:border-white/10">
                      <summary className="flex cursor-pointer list-none items-start gap-[14px] py-[17px] outline-none [&::-webkit-details-marker]:hidden sm:gap-[16px] sm:py-[19px]">
                        <span className="flex h-[33px] w-[33px] shrink-0 items-center justify-center rounded-[7px] bg-[#f7f7f7] text-[#303030] transition-all duration-300 group-hover:bg-[#ededed] dark:bg-[#292b2d] dark:text-white dark:group-hover:bg-[#35383a]">
                          <Icon aria-hidden="true" className="text-[18px]" />
                        </span>

                        <span className="min-w-0 flex-1">
                          <span className="font-heading block text-[16px] leading-[1.4] font-semibold tracking-[-0.025em] text-[#292929] dark:text-white sm:text-[17px]">
                            {benefit.title}
                          </span>

                          <span className="mt-[7px] block text-[13px] leading-[1.65] text-[#888888] dark:text-[#aaaaaa] sm:text-[14px]">
                            {benefit.description}
                          </span>
                        </span>

                        <IoAddOutline aria-hidden="true" className="mt-[5px] shrink-0 text-[16px] text-[#999999] transition-transform duration-300 group-open:rotate-45 dark:text-[#bbbbbb]" />
                      </summary>

                      <p className="pr-5 pb-[20px] pl-[47px] text-[13px] leading-[1.75] text-[#888888] dark:text-[#aaaaaa] sm:pl-[49px] sm:text-[14px]">
                        {benefit.details}
                      </p>
                    </details>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}