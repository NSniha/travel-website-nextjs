import Image from "next/image";
import Link from "next/link";
import { IoArrowForwardOutline } from "react-icons/io5";
import { formatTripPrice } from "@/lib/trips";

export default function TripCard({ trip, index = 0 }) {
  return (
    <Link
      href={`/trip/${trip.slug}`}
      aria-label={`Explore ${trip.title} in ${trip.location}`}
      className="group relative isolate block aspect-[0.9] w-full overflow-hidden rounded-2xl bg-[#dce2df] text-white outline-none transition-[transform,box-shadow] duration-500 ease-out hover:-translate-y-1.5 hover:shadow-[0_18px_45px_rgba(0,0,0,0.14)] focus-visible:ring-2 focus-visible:ring-[#242424] focus-visible:ring-offset-4 dark:bg-[#292c2e] dark:focus-visible:ring-white dark:focus-visible:ring-offset-[#101112] sm:aspect-[0.88] lg:aspect-[0.87]"
    >
      <Image
        src={trip.image}
        alt={trip.imageAlt}
        fill
        quality={90}
        sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, (max-width: 1536px) 33vw, 460px"
        className="object-cover object-center transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:group-hover:scale-[1.065]"
      />

      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/10 via-transparent to-black/70" />
      <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />

      <div className="absolute top-5 left-5 z-10 sm:top-5 sm:left-5 lg:top-6 lg:left-6">
        <span className="inline-flex max-w-full items-center rounded-full bg-white px-4 py-2 text-[12px] leading-[1.3] font-semibold text-[#242424] shadow-[0_4px_15px_rgba(0,0,0,0.05)] sm:text-[13px]">
          {trip.location}
        </span>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10 p-5 sm:p-5 lg:p-6">
        <div className="flex flex-col gap-3">
          <h3 className="font-heading text-[20px] leading-[1.3] font-semibold tracking-[-0.035em] text-white sm:text-[21px] lg:text-[22px]">
            Starting at {formatTripPrice(trip.priceFrom, trip.currency)}
          </h3>

          <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
            <p className="text-[12px] leading-[1.6] font-normal text-white/90 sm:text-[13px] xl:text-[14px]">
              {trip.durationDays} Days, {trip.dateLabel}
            </p>

            <span className="inline-flex shrink-0 items-center gap-2 text-[12px] font-medium text-white sm:text-[13px] xl:text-[14px]">
              Learn More
              <IoArrowForwardOutline aria-hidden="true" className="text-[17px] transition-transform duration-300 group-hover:translate-x-1.5" />
            </span>
          </div>
        </div>
      </div>

      <span className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />
    </Link>
  );
}