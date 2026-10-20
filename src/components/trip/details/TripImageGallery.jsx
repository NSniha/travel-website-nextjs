"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import {
  IoArrowBackOutline,
  IoArrowForwardOutline,
  IoCloseOutline,
  IoExpandOutline,
  IoImagesOutline,
} from "react-icons/io5";

function GalleryImage({
  photo,
  onClick,
  className = "",
  sizes = "50vw",
  priority = false,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`View ${photo.alt} in fullscreen`}
      aria-haspopup="dialog"
      className={`group relative block overflow-hidden rounded-xl bg-[#e5e8e6] text-left outline-none transition-shadow duration-500 hover:shadow-[0_12px_30px_rgba(0,0,0,0.12)] focus-visible:ring-2 focus-visible:ring-[#242424] focus-visible:ring-offset-3 dark:bg-[#292c2e] dark:focus-visible:ring-white dark:focus-visible:ring-offset-[#101112] ${className}`}
    >
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover object-center transition-transform duration-1100 ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:group-hover:scale-[1.055]"
      />

      <span className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/15" />

      <span className="pointer-events-none absolute top-4 right-4 flex h-9 w-9 translate-y-2 items-center justify-center rounded-full border border-white/35 bg-black/25 text-white opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
        <IoExpandOutline
          aria-hidden="true"
          className="text-[18px]"
        />
      </span>
    </button>
  );
}

export default function TripImageGallery({
  trip,
  details,
  variant = "hero",
  className = "",
  showTitle = true,
}) {
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);

  const [activePhotoIndex, setActivePhotoIndex] = useState(null);

  const isGallery = variant === "gallery";
  const isLightboxOpen = activePhotoIndex !== null;

  const photos = useMemo(() => {
    const sources = [
      trip?.image,
      ...(Array.isArray(details?.galleryImages)
        ? details.galleryImages
        : []),
      ...(Array.isArray(trip?.galleryImages)
        ? trip.galleryImages
        : []),
    ];

    const uniquePhotos = new Map();

    sources.forEach((item, index) => {
      const src = typeof item === "string" ? item : item?.src;

      if (!src || uniquePhotos.has(src)) return;

      uniquePhotos.set(src, {
        src,
        alt:
          typeof item === "object" && item?.alt
            ? item.alt
            : index === 0
              ? trip?.imageAlt || `${trip?.title || "Travel"} destination`
              : `${trip?.location || "Travel destination"} gallery photo`,
      });
    });

    return [...uniquePhotos.values()];
  }, [trip, details]);

  const galleryOrder = useMemo(() => {
    if (photos.length <= 1) return [0];

    return [
      ...photos.slice(1).map((_, index) => index + 1),
      0,
    ];
  }, [photos]);

  const photoCount = photos.length;

  const getPhotoIndex = (position) => {
    if (!photoCount) return 0;

    if (isGallery) {
      return galleryOrder[position % galleryOrder.length];
    }

    return position % photoCount;
  };

  const openLightbox = (index) => {
    setActivePhotoIndex(index);
  };

  const closeLightbox = () => {
    dialogRef.current?.close();
  };

  const changePhoto = (direction) => {
    setActivePhotoIndex((current) => {
      if (current === null || photoCount <= 1) return current;

      return (current + direction + photoCount) % photoCount;
    });
  };

  useEffect(() => {
    if (!isLightboxOpen) return;

    const dialog = dialogRef.current;
    if (!dialog) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    if (!dialog.open) {
      dialog.showModal();
    }

    closeButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "ArrowRight" && photoCount > 1) {
        event.preventDefault();

        setActivePhotoIndex((current) =>
          current === null ? null : (current + 1) % photoCount
        );
      }

      if (event.key === "ArrowLeft" && photoCount > 1) {
        event.preventDefault();

        setActivePhotoIndex((current) =>
          current === null
            ? null
            : (current - 1 + photoCount) % photoCount
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);

      if (dialog.open) {
        dialog.close();
      }

      document.body.style.overflow = previousOverflow;
    };
  }, [isLightboxOpen, photoCount]);

  if (!photoCount) return null;

  const selectedPhoto = photos[activePhotoIndex ?? 0];

  const renderPhoto = (position, styles, sizes, priority = false) => {
    const photoIndex = getPhotoIndex(position);

    return (
      <GalleryImage
        photo={photos[photoIndex]}
        onClick={() => openLightbox(photoIndex)}
        className={styles}
        sizes={sizes}
        priority={priority}
      />
    );
  };

  return (
    <>
      {isGallery ? (
        <div className={className}>
          {showTitle && (
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <h2 className="font-heading text-[24px] leading-[1.2] font-semibold tracking-[-0.045em] text-[#242424] dark:text-white sm:text-[28px]">
                Gallery
              </h2>

              <span className="inline-flex items-center gap-2 text-[12px] text-[#858585] dark:text-[#aaaaaa]">
                <IoImagesOutline
                  aria-hidden="true"
                  className="text-[17px]"
                />

                {photoCount} {photoCount === 1 ? "Photo" : "Photos"}
              </span>
            </div>
          )}

          <div className="grid h-70 min-w-0 grid-cols-[minmax(0,0.9fr)_minmax(0,1.55fr)] gap-2.5 sm:h-85 sm:gap-3 lg:h-95">
            <div className="grid min-h-0 grid-rows-2 gap-2.5 sm:gap-3">
              {renderPhoto(
                0,
                "h-full w-full",
                "(max-width: 640px) 35vw, 230px"
              )}

              {renderPhoto(
                1,
                "h-full w-full",
                "(max-width: 640px) 35vw, 230px"
              )}
            </div>

            {renderPhoto(
              2,
              "h-full w-full",
              "(max-width: 640px) 60vw, 500px"
            )}
          </div>
        </div>
      ) : (
        <div
          className={`grid min-w-0 grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-3.5 lg:gap-4 ${className}`}
        >
          {renderPhoto(
            0,
            "h-[290px] w-full sm:h-[454px] lg:h-[502px] xl:h-[530px]",
            "(max-width: 639px) 100vw, 50vw",
            true
          )}

          <div className="grid h-72.5 min-w-0 grid-cols-2 grid-rows-2 gap-2.5 sm:h-113.5 sm:gap-3.5 lg:h-125.5 lg:gap-4 xl:h-132.5">
            {renderPhoto(
              1,
              "col-span-2 h-full w-full",
              "(max-width: 639px) 100vw, 50vw"
            )}

            {renderPhoto(
              2,
              "h-full w-full",
              "(max-width: 639px) 50vw, 25vw"
            )}

            {renderPhoto(
              3,
              "h-full w-full",
              "(max-width: 639px) 50vw, 25vw"
            )}
          </div>
        </div>
      )}

      <dialog
        ref={dialogRef}
        aria-labelledby="trip-lightbox-title"
        aria-describedby="trip-lightbox-description"
        onClose={() => setActivePhotoIndex(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            closeLightbox();
          }
        }}
        className="fixed inset-0 m-auto max-h-[calc(100dvh-24px)] w-[calc(100%-24px)] max-w-287.5 overflow-hidden rounded-2xl bg-[#101112] p-0 text-white shadow-[0_30px_100px_rgba(0,0,0,0.4)] backdrop:bg-black/85 backdrop:backdrop-blur-md sm:w-[calc(100%-48px)]"
      >
        <div className="relative">
          <div className="flex min-h-16 items-center justify-between gap-4 border-b border-white/10 px-4 py-3 sm:px-6">
            <div className="min-w-0">
              <h2
                id="trip-lightbox-title"
                className="font-heading truncate text-[15px] font-semibold tracking-tight sm:text-[17px]"
              >
                {trip?.title || "Journey Gallery"}
              </h2>

              <p
                id="trip-lightbox-description"
                className="mt-0.5 text-[11px] text-white/55 sm:text-[12px]"
              >
                {trip?.location || "Explore the journey"}
              </p>
            </div>

            <button
              ref={closeButtonRef}
              type="button"
              onClick={closeLightbox}
              aria-label="Close photo gallery"
              className="group flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition-all duration-300 hover:rotate-90 hover:bg-white hover:text-[#242424] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <IoCloseOutline
                aria-hidden="true"
                className="text-[24px]"
              />
            </button>
          </div>

          <div className="relative flex h-[min(67dvh,760px)] items-center justify-center bg-[#0c0d0e] sm:h-[min(74dvh,820px)]">
            <Image
              key={selectedPhoto.src}
              src={selectedPhoto.src}
              alt={selectedPhoto.alt}
              fill
              sizes="(max-width: 1200px) 100vw, 1150px"
              className="object-contain"
            />

            {photoCount > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => changePhoto(-1)}
                  aria-label="Previous photo"
                  className="absolute top-1/2 left-3 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/45 text-white backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-[#242424] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:left-5 sm:h-12 sm:w-12"
                >
                  <IoArrowBackOutline
                    aria-hidden="true"
                    className="text-[19px] sm:text-[21px]"
                  />
                </button>

                <button
                  type="button"
                  onClick={() => changePhoto(1)}
                  aria-label="Next photo"
                  className="absolute top-1/2 right-3 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/45 text-white backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-[#242424] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:right-5 sm:h-12 sm:w-12"
                >
                  <IoArrowForwardOutline
                    aria-hidden="true"
                    className="text-[19px] sm:text-[21px]"
                  />
                </button>
              </>
            )}
          </div>

          <div className="flex min-h-14 items-center justify-between gap-4 border-t border-white/10 px-4 py-3 sm:px-6">
            <p className="min-w-0 truncate text-[12px] text-white/70 sm:text-[13px]">
              {selectedPhoto.alt}
            </p>

            <span
              aria-live="polite"
              className="shrink-0 text-[12px] font-medium text-white sm:text-[13px]"
            >
              {String((activePhotoIndex ?? 0) + 1).padStart(2, "0")}
              <span className="mx-2 text-white/35">/</span>
              {String(photoCount).padStart(2, "0")}
            </span>
          </div>
        </div>
      </dialog>
    </>
  );
}