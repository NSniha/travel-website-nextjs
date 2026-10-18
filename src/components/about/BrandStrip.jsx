import Container from "@/components/shared/Container";
import Reveal from "@/components/shared/Reveal";
import { aboutBrandMarks } from "@/data/about";

function BrandLogo({ brand }) {
  return (
    <svg viewBox="0 0 220 54" xmlns="http://www.w3.org/2000/svg" role="img" aria-label={`${brand.name} illustrative travel identity`} className="h-11.25 w-48.75 shrink-0 text-[#858585] transition-colors duration-300 group-hover:text-[#333333] dark:text-[#777777] dark:group-hover:text-white">
      <g fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        {brand.icon === "mountain" && (
          <>
            <path d="M5 39 19 13 34 39H5Z" />
            <path d="m13 24 6 7 6-7" />
            <path d="M11 43h20" />
          </>
        )}

        {brand.icon === "compass" && (
          <>
            <circle cx="20" cy="27" r="17" />
            <path d="m26 19-4 12-10 5 4-12 10-5Z" />
            <circle cx="20" cy="27" r="2" fill="currentColor" stroke="none" />
          </>
        )}

        {brand.icon === "globe" && (
          <>
            <circle cx="20" cy="27" r="17" />
            <path d="M3 27h34M20 10c-12 9-12 25 0 34M20 10c12 9 12 25 0 34M20 10v34" />
            <path d="M7 17h26M7 37h26" />
          </>
        )}

        {brand.icon === "sun" && (
          <>
            <circle cx="20" cy="27" r="9" />
            <path d="M20 7v7M20 40v7M0 27h9M31 27h9M6 13l5 5M29 36l5 5M34 13l-5 5M11 36l-5 5" />
          </>
        )}

        {brand.icon === "landscape" && (
          <>
            <path d="M3 40 15 18l8 14 7-10 10 18H3Z" />
            <path d="M10 44h26M13 13l3-4 3 4" />
            <circle cx="32" cy="12" r="4" />
          </>
        )}
      </g>

      <text x="47" y="34" fill="currentColor" fontFamily="Arial, sans-serif" fontSize="18" fontWeight="700" letterSpacing=".15">
        {brand.name}
      </text>
    </svg>
  );
}

export default function BrandStrip() {
  return (
    <section aria-label="Illustrative WAYLUME travel identity concepts" className="bg-white py-14 transition-colors duration-300 dark:bg-[#101112] sm:py-16 lg:pt-12 lg:pb-16">
      <Container>
        <Reveal>
          <div className="waylume-brand-marquee relative overflow-hidden mask-[linear-gradient(to_right,transparent,black_7%,black_93%,transparent)]">
            <div className="waylume-brand-track flex w-max items-center">
              {[0, 1].map((copy) => (
                <div key={copy} aria-hidden={copy === 1} className="flex shrink-0 items-center gap-9 pr-9 sm:gap-14 sm:pr-14 lg:gap-16 lg:pr-16">
                  {aboutBrandMarks.map((brand) => (
                    <div key={`${copy}-${brand.id}`} className="group flex w-37.5 shrink-0 items-center justify-center">
                      <BrandLogo brand={brand} />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}