import Image from "next/image";
import Link from "next/link";
import { IoArrowForwardOutline, IoCloseOutline } from "react-icons/io5";
import Container from "@/components/shared/Container";
import Reveal from "@/components/shared/Reveal";
import { tripCategories } from "@/data/tripPage";

function CategoryCard({ category, index, activeCategoryId }) {
  const isActive = activeCategoryId === category.id;
  const href = isActive ? "/trip" : `/trip/category/${category.slug}`;

  return (
    <Reveal delay={(index % 3) * 100} className="min-w-0">
      <Link
        href={href}
        aria-label={`${isActive ? "Clear" : "Explore"} ${category.title} category`}
        aria-current={isActive ? "page" : undefined}
        className={`group relative isolate block h-75 w-full overflow-hidden rounded-2xl bg-[#dce2df] outline-none transition-[box-shadow,transform] duration-500 hover:shadow-[0_16px_40px_rgba(0,0,0,0.15)] focus-visible:ring-2 focus-visible:ring-[#242424] focus-visible:ring-offset-4 dark:bg-[#292c2e] dark:focus-visible:ring-white dark:focus-visible:ring-offset-[#101112] sm:h-80 lg:h-[clamp(300px,26vw,385px)] ${isActive ? "ring-2 ring-[#242424] ring-offset-4 dark:ring-white dark:ring-offset-[#101112]" : ""}`}
      >
        <Image
          src={category.image}
          alt={category.alt}
          fill
          quality={90}
          sizes={index < 3 ? "(max-width: 639px) 100vw, (max-width: 1023px) 95vw, 50vw" : "(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw"}
          className="object-cover object-center transition-transform duration-1200 ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:group-hover:scale-[1.065]"
        />

        <span className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/85 via-black/10 to-transparent" />
        <span className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/15" />

        <span className="absolute top-5 right-5 flex h-9 w-9 translate-y-2 items-center justify-center rounded-full border border-white/50 bg-white/95 text-[#242424] opacity-0 shadow-[0_5px_20px_rgba(0,0,0,0.12)] transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
          {isActive ? <IoCloseOutline aria-hidden="true" className="text-[21px]" /> : <IoArrowForwardOutline aria-hidden="true" className="text-[18px] -rotate-45 transition-transform duration-300 group-hover:rotate-0" />}
        </span>

        <div className="absolute inset-x-0 bottom-0 z-10 p-5 text-white sm:p-6 lg:p-6 xl:p-7">
          <h3 className="font-heading text-[21px] leading-tight font-semibold tracking-[-0.04em] sm:text-[23px] lg:text-[22px] xl:text-[24px]">
            {category.title}
          </h3>

          <p className="mt-2 max-w-127.5 text-[13px] leading-[1.65] font-normal text-white/90 sm:text-[14px] xl:text-[15px]">
            {category.description}
          </p>

          <span className="mt-3 inline-flex max-h-0 items-center gap-2 overflow-hidden text-[12px] font-medium opacity-0 transition-all duration-500 group-hover:max-h-8 group-hover:opacity-100 group-focus-visible:max-h-8 group-focus-visible:opacity-100">
            {isActive ? "View All Experiences" : "Explore Experiences"}
            <IoArrowForwardOutline aria-hidden="true" className="text-[15px] transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </Reveal>
  );
}

export default function TripCategories({ activeCategoryId = null }) {
  const selectedCategory = tripCategories.find((category) => category.id === activeCategoryId);

  return (
    <section id="trip-categories" aria-labelledby="trip-categories-heading" className="bg-white pt-0 pb-12 transition-colors duration-300 dark:bg-[#101112] sm:pt-8 sm:pb-12 lg:pt-12 lg:pb-14">
      <Container>
        <div className="grid min-w-0 items-end gap-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-12 xl:gap-16">
          <Reveal className="min-w-0">
            <h2 id="trip-categories-heading" className="font-heading max-w-187.5 text-[30px] leading-[1.2] font-semibold tracking-[-0.055em] text-[#242424] dark:text-white sm:text-[36px] lg:text-[44px]">
              Explore Journeys Made for<br className="hidden lg:block" /> Every Kind of Traveler
            </h2>
          </Reveal>

          <Reveal delay={120} className="min-w-0 lg:justify-self-end lg:pb-1">
            <p className="max-w-130 text-[14px] leading-[1.75] font-normal text-[#858585] dark:text-[#aaaaaa] sm:text-[16px]">
              From peaceful escapes to extraordinary adventures, discover experiences that inspire the way you explore.
            </p>
          </Reveal>
        </div>

        {selectedCategory && (
          <Reveal className="mt-6 flex flex-wrap items-center gap-3">
            <span className="text-[12px] text-[#858585] dark:text-[#aaaaaa] sm:text-[13px]">Selected experience:</span>

            <Link href="/trip" className="group inline-flex items-center gap-2 rounded-full border border-[#dedede] px-3 py-1.5 text-[12px] font-medium text-[#242424] transition-colors duration-300 hover:bg-[#f5f5f5] dark:border-white/20 dark:text-white dark:hover:bg-white/10">
              {selectedCategory.title}
              <IoCloseOutline aria-hidden="true" className="text-[16px] transition-transform duration-300 group-hover:rotate-90" />
            </Link>
          </Reveal>
        )}

        <div className="mt-10 grid min-w-0 grid-cols-1 gap-4 sm:mt-12 md:grid-cols-2 lg:mt-14 lg:gap-5 xl:gap-6">
          {tripCategories.slice(0, 2).map((category, index) => (
            <CategoryCard key={category.id} category={category} index={index} activeCategoryId={activeCategoryId} />
          ))}
        </div>

        <div className="mt-4 grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)] lg:gap-5 xl:mt-6 xl:gap-6">
          {tripCategories.slice(2).map((category, index) => (
            <div key={category.id} className={`min-w-0 ${index === 0 ? "sm:col-span-2 lg:col-span-1" : ""}`}>
              <CategoryCard category={category} index={index + 2} activeCategoryId={activeCategoryId} />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}