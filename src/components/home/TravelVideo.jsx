"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { IoCloseOutline, IoPlay } from "react-icons/io5";
import Container from "@/components/shared/Container";
import Reveal from "@/components/shared/Reveal";
import { travelVideo } from "@/data/travelMedia";

export default function TravelVideo() {
  const dialogRef = useRef(null);
  const videoRef = useRef(null);
  const closeButtonRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  const openVideo = () => {
    setVideoError(false);

    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }

    setIsOpen(true);
    closeButtonRef.current?.focus();

    videoRef.current?.play().catch(() => {
      // Playback remains available through the native video controls.
    });
  };

  const closeVideo = () => {
    dialogRef.current?.close();
  };

  const handleClose = () => {
    videoRef.current?.pause();

    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }

    setIsOpen(false);
  };

  return (
    <>
      <section id="travel-video" aria-labelledby="travel-video-heading" className="bg-white pt-[35px] pb-[105px] transition-colors duration-300 dark:bg-[#101112] sm:pt-[45px] sm:pb-[120px] lg:pt-[55px] lg:pb-[130px]">
        <Container>
          <Reveal className="text-center">
            <h2 id="travel-video-heading" className="font-heading text-[29px] leading-[1.2] font-medium tracking-[-0.055em] text-[#242424] dark:text-white sm:text-[35px] lg:text-[39px]">
              {travelVideo.title}
            </h2>

            <p className="mx-auto mt-4 max-w-[650px] text-[14px] leading-[1.7] text-[#858585] dark:text-[#aaaaaa] sm:text-[16px]">
              {travelVideo.description}
            </p>
          </Reveal>

          <Reveal delay={150} className="mt-[38px] sm:mt-[45px]">
            <button
              type="button"
              onClick={openVideo}
              aria-label="Play WAYLUME travel film"
              className="group relative block aspect-[1.4] w-full overflow-hidden rounded-[14px] bg-[#d8dcd5] text-left outline-none focus-visible:ring-2 focus-visible:ring-[#242424] focus-visible:ring-offset-4 dark:bg-[#292c2e] dark:focus-visible:ring-white dark:focus-visible:ring-offset-[#101112] sm:aspect-[1.9] lg:aspect-[2.23]"
            >
              <Image
                src={travelVideo.poster}
                alt="Breathtaking scenic landscape with dramatic mountains and a winding river"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1536px) 95vw, 1490px"
                className="object-cover object-center transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:group-hover:scale-[1.045]"
              />

              <span className="absolute inset-0 bg-black/5 transition-colors duration-500 group-hover:bg-black/15" />

              <span className="absolute top-1/2 left-1/2 flex h-[56px] w-[56px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#242424] shadow-[0_10px_35px_rgba(0,0,0,0.18)] transition-[background-color,box-shadow] duration-300 group-hover:bg-[#f4f4f4] group-hover:shadow-[0_15px_45px_rgba(0,0,0,0.25)] sm:h-[62px] sm:w-[62px]">
                <span className="absolute inset-0 rounded-full border border-white/60 transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.3]" />
                <IoPlay aria-hidden="true" className="ml-[3px] text-[21px] transition-transform duration-300 motion-safe:group-hover:scale-110 sm:text-[23px]" />
              </span>
            </button>
          </Reveal>
        </Container>
      </section>

      <dialog
        ref={dialogRef}
        aria-label="WAYLUME travel film"
        onClose={handleClose}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeVideo();
        }}
        className="fixed inset-0 m-auto max-h-[calc(100dvh-32px)] w-[calc(100%-32px)] max-w-[1100px] overflow-hidden rounded-[15px] bg-[#111111] p-0 text-white shadow-[0_25px_90px_rgba(0,0,0,0.4)] backdrop:bg-black/80 backdrop:backdrop-blur-[5px]"
      >
        <div className="relative">
          <button
            ref={closeButtonRef}
            type="button"
            onClick={closeVideo}
            aria-label="Close video player"
            className="absolute top-3 right-3 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/65 text-white backdrop-blur-sm transition-all duration-300 hover:rotate-90 hover:bg-black/90 sm:top-4 sm:right-4"
          >
            <IoCloseOutline aria-hidden="true" className="text-[23px]" />
          </button>

          <video
            ref={videoRef}
            src={travelVideo.video}
            poster={travelVideo.poster}
            controls
            playsInline
            preload="none"
            onError={() => setVideoError(true)}
            className="aspect-video max-h-[calc(100dvh-32px)] w-full bg-black object-contain"
          >
            Your browser does not support HTML5 video.
          </video>

          {videoError && (
            <div role="status" className="absolute inset-0 z-10 flex items-center justify-center bg-[#111111] px-8 text-center">
              <div className="max-w-[400px]">
                <h3 className="font-heading text-[20px] font-semibold sm:text-[24px]">Video Unavailable</h3>
                <p className="mt-3 text-[13px] leading-[1.7] text-white/65 sm:text-[14px]">
                  This travel film is not available yet. Please add your video file to the project's public/videos folder.
                </p>
              </div>
            </div>
          )}
        </div>
      </dialog>
    </>
  );
}