"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { IoArrowBackOutline, IoArrowForwardOutline, IoCloseOutline, IoExpandOutline } from "react-icons/io5";
import Container from "@/components/shared/Container";
import Reveal from "@/components/shared/Reveal";
import { aboutGallery } from "@/data/about";

export default function AboutHero() {
  const dialogRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const activeImage = aboutGallery[activeIndex];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!isOpen || !dialog) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    if (!dialog.open) dialog.showModal();

    const handleKeyDown = (event) => {
      if (event.key === "ArrowRight") setActiveIndex((previous) => (previous + 1) % aboutGallery.length);
      if (event.key === "ArrowLeft") setActiveIndex((previous) => (previous - 1 + aboutGallery.length) % aboutGallery.length);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      if (dialog.open) dialog.close();
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const openGallery = (index) => {
    setActiveIndex(index);
    setIsOpen(true);
  };

  const closeGallery = () => dialogRef.current?.close();

  const changeImage = (direction) => {
    setActiveIndex((previous) => (previous + direction + aboutGallery.length) % aboutGallery.length);
  };

  return (
    <>
      <section id="about-hero" aria-labelledby="about-hero-heading" className="bg-white pt-9 pb-20 transition-colors duration-300 dark:bg-[#101112] sm:pt-12 sm:pb-24 lg:pt-14 lg:pb-12">
        <Container>
          <div className="grid min-w-0 items-end gap-7 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:gap-12 xl:gap-16">
            <Reveal className="min-w-0">
              <h1 id="about-hero-heading" className="font-heading max-w-220 text-[clamp(37px,7vw,60px)] leading-[1.085] font-medium tracking-[-0.06em] text-[#242424] dark:text-white sm:text-[clamp(48px,6vw,68px)] lg:text-[clamp(56px,4.9vw,78px)]">
                <span className="block">Beyond the Map,</span>
                <span className="block">Into the Moment.</span>
              </h1>
            </Reveal>

            <Reveal delay={200} className="min-w-0 lg:justify-self-end lg:pb-1">
              <p className="max-w-145 text-[14px] leading-[1.65] font-normal tracking-[-0.005em] text-[#858585] dark:text-[#aaaaaa] sm:text-[15px] xl:text-[16px]">
                Every meaningful journey begins with curiosity. At WAYLUME, we believe extraordinary places, authentic experiences, and new perspectives make every adventure unforgettable.
              </p>
            </Reveal>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-4 lg:mt-14 lg:grid-cols-[minmax(0,2.12fr)_minmax(0,1fr)_minmax(0,1fr)] lg:gap-5 xl:gap-6">
            {aboutGallery.map((item, index) => (
              <Reveal key={item.id} delay={index * 120} className={`min-w-0 ${index === 0 ? "col-span-2 lg:col-span-1" : ""}`}>
                <button
                  type="button"
                  onClick={() => openGallery(index)}
                  aria-label={`View ${item.title} image`}
                  className={`group relative block w-full overflow-hidden rounded-2xl bg-[#e7e9e5] text-left outline-none transition-shadow duration-500 hover:shadow-[0_15px_40px_rgba(0,0,0,0.12)] focus-visible:ring-2 focus-visible:ring-[#242424] focus-visible:ring-offset-4 dark:bg-[#292c2e] dark:focus-visible:ring-white dark:focus-visible:ring-offset-[#101112] ${index === 0 ? "h-75 sm:h-105 lg:h-[clamp(420px,42vw,640px)]" : "h-62.5 sm:h-90 lg:h-[clamp(420px,42vw,640px)]"}`}
                >
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    priority={index === 0}
                    quality={90}
                    sizes={index === 0 ? "(max-width: 1023px) 100vw, (max-width: 1536px) 50vw, 760px" : "(max-width: 1023px) 50vw, (max-width: 1536px) 25vw, 365px"}
                    className="object-cover object-center transition-transform duration-1200 ease-out motion-safe:group-hover:scale-[1.055]"
                  />

                  <span className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />

                  <span className="absolute top-4 right-4 flex h-9.5 w-9.5 translate-y-2 items-center justify-center rounded-full border border-white/50 bg-white/90 text-[#242424] opacity-0 shadow-[0_5px_20px_rgba(0,0,0,0.12)] backdrop-blur-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 sm:top-5 sm:right-5">
                    <IoExpandOutline aria-hidden="true" className="text-[19px]" />
                  </span>
                </button>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <dialog
        ref={dialogRef}
        aria-label="WAYLUME destination gallery"
        onClose={() => setIsOpen(false)}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeGallery();
        }}
        className="fixed inset-0 m-auto max-h-[calc(100dvh-32px)] w-[calc(100%-32px)] max-w-262.5 overflow-hidden rounded-2xl bg-[#151515] p-0 text-white shadow-[0_25px_90px_rgba(0,0,0,0.4)] backdrop:bg-black/85 backdrop:backdrop-blur-[5px]"
      >
        <div className="relative">
          <div className="relative aspect-4/5 max-h-[75dvh] w-full overflow-hidden bg-[#202523] sm:aspect-16/10">
            <Image key={activeImage.id} src={activeImage.image} alt={activeImage.alt} fill sizes="(max-width: 1050px) 100vw, 1050px" className="animate-fade-in object-cover object-center" />

            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-black/65 to-transparent" />

            <button type="button" onClick={closeGallery} aria-label="Close gallery" className="absolute top-4 right-4 flex h-10.5 w-10.5 items-center justify-center rounded-full bg-white text-[#242424] shadow-lg transition-all duration-300 hover:rotate-90 hover:bg-[#eeeeee] sm:top-5 sm:right-5">
              <IoCloseOutline aria-hidden="true" className="text-[24px]" />
            </button>

            <div className="absolute right-5 bottom-5 left-5 flex items-end justify-between gap-4 sm:right-8 sm:bottom-7 sm:left-8">
              <div>
                <p className="text-[11px] font-medium tracking-[0.12em] text-white/75 uppercase sm:text-[12px]">WAYLUME Gallery</p>
                <h2 className="font-heading mt-2 text-[21px] font-semibold tracking-[-0.04em] text-white sm:text-[28px]">{activeImage.title}</h2>
              </div>

              <span className="shrink-0 text-[12px] font-medium text-white/80 sm:text-[14px]">
                {String(activeIndex + 1).padStart(2, "0")} / {String(aboutGallery.length).padStart(2, "0")}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between px-5 py-4 sm:px-8 sm:py-5">
            <p className="text-[12px] text-white/60 sm:text-[13px]">Explore beyond the ordinary.</p>

            <div className="flex items-center gap-2.5">
              <button type="button" onClick={() => changeImage(-1)} aria-label="Previous gallery image" className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/35 text-white transition-all duration-300 hover:border-white hover:bg-white hover:text-[#242424] active:scale-95">
                <IoArrowBackOutline aria-hidden="true" className="text-[19px] transition-transform duration-300 group-hover:-translate-x-0.75" />
              </button>

              <button type="button" onClick={() => changeImage(1)} aria-label="Next gallery image" className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/35 text-white transition-all duration-300 hover:border-white hover:bg-white hover:text-[#242424] active:scale-95">
                <IoArrowForwardOutline aria-hidden="true" className="text-[19px] transition-transform duration-300 group-hover:translate-x-0.75" />
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}