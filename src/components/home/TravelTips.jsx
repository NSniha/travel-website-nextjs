"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { IoArrowForwardOutline, IoCalendarOutline, IoCheckmarkOutline, IoCloseOutline, IoTimeOutline } from "react-icons/io5";
import Container from "@/components/shared/Container";
import Reveal from "@/components/shared/Reveal";
import { travelArticles } from "@/data/travelStories";

export default function TravelTips() {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!selectedArticle || !dialog) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    if (!dialog.open) dialog.showModal();

    return () => {
      if (dialog.open) dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [selectedArticle]);

  const closeArticle = () => dialogRef.current?.close();

  return (
    <>
      <section id="travel-tips" aria-labelledby="travel-tips-heading" className="bg-white pb-22.5 transition-colors duration-300 dark:bg-[#101112] sm:pb-28 lg:pb-30">
        <Container>
          <Reveal className="text-center">
            <h2 id="travel-tips-heading" className="font-heading text-[30px] leading-[1.2] font-semibold tracking-[-0.055em] text-[#242424] dark:text-white sm:text-[36px] lg:text-[44px]">
              Notes From the Open Road
            </h2>
          </Reveal>

          <div className="mt-9.5 grid grid-cols-1 items-start gap-x-5 gap-y-8.75 sm:mt-11.25 sm:grid-cols-2 sm:gap-y-10.5 lg:mt-12.5 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)] lg:gap-x-6.25 xl:gap-x-7">
            {travelArticles.map((article, index) => (
              <Reveal key={article.id} delay={index * 100} className={`min-w-0 ${index === 0 ? "sm:col-span-2 lg:col-span-1" : ""}`}>
                <article className="group w-full">
                  <button type="button" onClick={() => setSelectedArticle(article)} aria-label={`Read ${article.title}`} className="block w-full cursor-pointer text-left outline-none">
                    <div className={`relative w-full overflow-hidden rounded-[14px] bg-[#e8ebe7] dark:bg-[#292c2e] ${index === 0 ? "aspect-[1.42] sm:aspect-[1.55] lg:aspect-[1.42]" : "aspect-[1.25] sm:aspect-[1.05] lg:aspect-[1.03]"}`}>
                      <Image
                        src={article.image}
                        alt={article.imageAlt}
                        fill
                        sizes={index === 0 ? "(max-width: 639px) 100vw, (max-width: 1023px) 95vw, (max-width: 1536px) 50vw, 750px" : "(max-width: 639px) 100vw, (max-width: 1023px) 50vw, (max-width: 1536px) 25vw, 380px"}
                        className="object-cover object-center transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:group-hover:scale-[1.055]"
                      />

                      <span className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />

                      <span className="absolute top-4 right-4 flex h-9.5 w-9.5 translate-y-2 items-center justify-center rounded-full bg-white text-[#242424] opacity-0 shadow-[0_6px_20px_rgba(0,0,0,0.12)] transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                        <IoArrowForwardOutline aria-hidden="true" className="-rotate-45 text-[18px] transition-transform duration-300 group-hover:rotate-0" />
                      </span>
                    </div>

                    <div className="mt-3 sm:mt-3.75 lg:mt-5">
                      <h3 className="font-heading text-[17px] leading-[1.45] font-semibold tracking-tight text-[#262626] transition-colors duration-300 group-hover:text-[#777777] dark:text-white dark:group-hover:text-[#bcbcbc] sm:text-[18px] lg:text-[18px] xl:text-[20px]">
                        {article.title}
                      </h3>

                      <p className="mt-2.75 text-[13px] leading-normal font-normal text-[#929292] dark:text-[#aaaaaa] sm:text-[14px] lg:mt-3.25">
                        {article.date}
                      </p>
                    </div>
                  </button>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <dialog
        ref={dialogRef}
        aria-labelledby="travel-article-title"
        onClose={() => setSelectedArticle(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeArticle();
        }}
        className="fixed inset-0 m-auto max-h-[calc(100dvh-32px)] w-[calc(100%-32px)] max-w-180 overflow-y-auto rounded-2xl bg-white p-0 text-[#242424] shadow-[0_25px_90px_rgba(0,0,0,0.3)] backdrop:bg-black/70 backdrop:backdrop-blur-xs dark:bg-[#1e2022] dark:text-white"
      >
        {selectedArticle && (
          <article>
            <div className="relative h-55 sm:h-80">
              <Image src={selectedArticle.image} alt={selectedArticle.imageAlt} fill sizes="(max-width: 640px) 100vw, 720px" className="object-cover object-center" />

              <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent" />

              <button type="button" onClick={closeArticle} aria-label="Close article" className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#242424] shadow-md transition-all duration-300 hover:rotate-90 hover:bg-[#eeeeee]">
                <IoCloseOutline aria-hidden="true" className="text-[23px]" />
              </button>
            </div>

            <div className="px-6 py-7 sm:px-10 sm:py-9">
              <span className="inline-flex rounded-full bg-[#f3f3f3] px-3 py-1.75 text-[11px] font-medium text-[#555555] dark:bg-[#303234] dark:text-[#dddddd]">
                {selectedArticle.category}
              </span>

              <h2 id="travel-article-title" className="font-heading mt-5 text-[26px] leading-[1.2] font-semibold tracking-[-0.055em] sm:text-[34px]">
                {selectedArticle.title}
              </h2>

              <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3 border-b border-[#ececec] pb-6 text-[12px] text-[#888888] dark:border-white/10 dark:text-[#aaaaaa] sm:text-[13px]">
                <span className="inline-flex items-center gap-2">
                  <IoCalendarOutline aria-hidden="true" className="text-[16px]" />
                  {selectedArticle.date}
                </span>

                <span className="inline-flex items-center gap-2">
                  <IoTimeOutline aria-hidden="true" className="text-[16px]" />
                  {selectedArticle.readTime}
                </span>
              </div>

              <p className="mt-6 text-[15px] leading-[1.85] font-medium text-[#424242] dark:text-[#e0e0e0] sm:text-[16px]">
                {selectedArticle.excerpt}
              </p>

              <div className="mt-5 space-y-5">
                {selectedArticle.content.map((paragraph, index) => (
                  <p key={index} className="text-[14px] leading-[1.9] text-[#777777] dark:text-[#bcbcbc] sm:text-[15px]">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="mt-8 rounded-xl bg-[#f7f7f7] p-5 dark:bg-[#292b2d] sm:p-6">
                <h3 className="font-heading text-[17px] font-semibold tracking-tight">
                  Things to Remember
                </h3>

                <ul className="mt-4 space-y-3">
                  {selectedArticle.highlights.map((highlight) => (
                    <li key={highlight} className="flex items-start gap-3 text-[13px] leading-[1.7] text-[#777777] dark:text-[#c0c0c0] sm:text-[14px]">
                      <IoCheckmarkOutline aria-hidden="true" className="mt-0.75 shrink-0 text-[17px] text-[#292929] dark:text-white" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button type="button" onClick={closeArticle} className="group mt-8 inline-flex h-11.25 items-center justify-center gap-3 rounded-lg bg-[#242424] px-6 text-[13px] font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#454545] hover:shadow-[0_8px_25px_rgba(0,0,0,0.12)] active:translate-y-0 dark:bg-white dark:text-[#242424] dark:hover:bg-[#e9e9e9]">
                Back to Stories
                <IoArrowForwardOutline aria-hidden="true" className="text-[16px] transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </article>
        )}
      </dialog>
    </>
  );
}