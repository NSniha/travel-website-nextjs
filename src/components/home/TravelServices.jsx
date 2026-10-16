import { IoAirplaneOutline, IoBriefcaseOutline, IoBusinessOutline, IoDocumentTextOutline } from "react-icons/io5";
import Container from "@/components/shared/Container";
import Reveal from "@/components/shared/Reveal";
import { travelServices } from "@/data/home";

const serviceIcons = {
  flight: IoAirplaneOutline,
  hotel: IoBusinessOutline,
  tour: IoBriefcaseOutline,
  visa: IoDocumentTextOutline,
};

export default function TravelServices() {
  return (
    <section id="services" aria-labelledby="services-heading" className="bg-white pt-[65px] pb-[85px] transition-colors duration-300 dark:bg-[#101112] sm:pt-[75px] sm:pb-[95px] lg:pt-[85px] lg:pb-[110px]">
      <Container>
        <div className="grid items-end gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-16">
          <Reveal>
            <h2 id="services-heading" className="font-heading max-w-[620px] text-[30px] leading-[1.2] font-medium tracking-[-0.055em] text-[#222222] dark:text-white sm:text-[36px] lg:text-[40px] xl:text-[43px]">
              Your Gateway to
              <br className="hidden sm:block" />
              {" "}Seamless, Stress-Free,
              <br className="hidden sm:block" />
              {" "}Inspired Travel
            </h2>
          </Reveal>

          <Reveal delay={130} className="lg:justify-self-end lg:pb-1">
            <p className="max-w-[410px] text-[14px] leading-[1.7] font-normal text-[#808080] dark:text-[#aaaaaa] sm:text-[16px] lg:text-[17px]">
              Discover thoughtful travel services designed to make every journey effortless, comfortable, and memorable.
            </p>
          </Reveal>
        </div>

        <div className="mt-[55px] grid grid-cols-1 gap-x-7 gap-y-11 min-[480px]:grid-cols-2 sm:mt-[65px] lg:grid-cols-4 lg:gap-x-8 xl:gap-x-10">
          {travelServices.map((service, index) => {
            const Icon = serviceIcons[service.icon];

            return (
              <Reveal key={service.id} delay={index * 100} className="group">
                <article className="flex h-full flex-col items-start">
                  <div className="mb-[35px] flex h-[44px] items-center text-[#242424] transition-all duration-500 group-hover:-translate-y-2 group-hover:rotate-[-5deg] dark:text-white sm:mb-[40px]">
                    <Icon aria-hidden="true" className="text-[36px] sm:text-[39px]" />
                  </div>

                  <h3 className="font-heading text-[18px] leading-[1.35] font-semibold tracking-[-0.035em] text-[#252525] transition-colors duration-300 group-hover:text-[#555555] dark:text-white dark:group-hover:text-[#cccccc] sm:text-[19px] lg:text-[20px]">
                    {service.title}
                  </h3>

                  <p className="mt-[14px] max-w-[290px] text-[14px] leading-[1.7] font-normal text-[#858585] dark:text-[#a5a5a5] sm:text-[15px]">
                    {service.description}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}