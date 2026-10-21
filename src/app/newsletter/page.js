"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";

import {
  IoArrowForwardOutline,
  IoArrowBackOutline,
  IoCheckmarkCircleOutline,
  IoAlertCircleOutline,
  IoCloseOutline,
  IoMailOutline,
  IoCompassOutline,
  IoGlobeOutline,
  IoSparklesOutline,
} from "react-icons/io5";

import Container from "@/components/shared/Container";
import Reveal from "@/components/shared/Reveal";
import Footer from "@/components/layout/Footer";

const FORM_ID =
  process.env.NEXT_PUBLIC_FORMSPREE_NEWSLETTER_ID?.trim() || "";

const FORM_ENDPOINT = FORM_ID
  ? `https://formspree.io/f/${FORM_ID}`
  : "";

const newsletterFeatures = [
  {
    id: "travel-stories",
    icon: IoCompassOutline,
    title: "Inspiring Travel Stories",
    description:
      "Discover extraordinary experiences and meaningful moments from around the world.",
  },
  {
    id: "destinations",
    icon: IoGlobeOutline,
    title: "Destination Discoveries",
    description:
      "Get inspired by remarkable places, hidden gems, and unforgettable landscapes.",
  },
  {
    id: "inspiration",
    icon: IoSparklesOutline,
    title: "Curated Travel Inspiration",
    description:
      "Be among the first to hear about new journeys, ideas, and travel inspiration.",
  },
];

function NewsletterToast({ feedback, onClose }) {
  if (!feedback) return null;

  const isSuccess = feedback.type === "success";

  return (
    <div
      role={isSuccess ? "status" : "alert"}
      aria-live={isSuccess ? "polite" : "assertive"}
      className="fixed right-4 bottom-5 left-4 z-200 sm:right-6 sm:bottom-6 sm:left-auto sm:w-full sm:max-w-95"
    >
      <div className="overflow-hidden rounded-xl border border-[#e7e7e7] bg-white shadow-[0_18px_55px_rgba(0,0,0,0.16)] dark:border-white/10 dark:bg-[#242628]">
        <div className="flex items-start gap-3.5 px-4 py-4 sm:px-5">
          <span
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
              isSuccess
                ? "bg-[#eaf7ed] text-[#248a47] dark:bg-emerald-500/15 dark:text-emerald-400"
                : "bg-red-50 text-red-500 dark:bg-red-500/15 dark:text-red-400"
            }`}
          >
            {isSuccess ? (
              <IoCheckmarkCircleOutline
                aria-hidden="true"
                className="text-[23px]"
              />
            ) : (
              <IoAlertCircleOutline
                aria-hidden="true"
                className="text-[23px]"
              />
            )}
          </span>

          <div className="min-w-0 flex-1 pt-0.5">
            <h3 className="font-heading text-[15px] font-semibold tracking-tight text-[#242424] dark:text-white">
              {feedback.title}
            </h3>

            <p className="mt-1.5 text-[12px] leading-[1.7] text-[#777777] dark:text-[#bcbcbc]">
              {feedback.message}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close notification"
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[#999999] transition-colors hover:bg-[#f2f2f2] hover:text-[#242424] dark:hover:bg-white/10 dark:hover:text-white"
          >
            <IoCloseOutline
              aria-hidden="true"
              className="text-[20px]"
            />
          </button>
        </div>

        <div className="h-0.75 bg-[#eeeeee] dark:bg-white/10">
          <div
            key={feedback.id}
            className={`h-full w-full animate-[newsletterProgress_7s_linear_forwards] ${
              isSuccess ? "bg-[#248a47]" : "bg-red-500"
            }`}
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes newsletterProgress {
          from {
            transform: scaleX(1);
            transform-origin: left;
          }

          to {
            transform: scaleX(0);
            transform-origin: left;
          }
        }
      `}</style>
    </div>
  );
}

function NewsletterForm() {
  const inputRef = useRef(null);
  const submittingRef = useRef(false);

  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [consentError, setConsentError] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    if (!feedback) return;

    const timer = window.setTimeout(() => {
      setFeedback(null);
    }, 7000);

    return () => window.clearTimeout(timer);
  }, [feedback]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (submittingRef.current) return;

    const normalizedEmail = email.trim().toLowerCase();

    setEmailError("");
    setConsentError("");
    setFeedback(null);

    if (
      !normalizedEmail ||
      normalizedEmail.length > 254 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)
    ) {
      setEmailError("Please enter a valid email address.");
      inputRef.current?.focus();
      return;
    }

    if (!consent) {
      setConsentError(
        "Please agree to receive our travel updates."
      );
      return;
    }

    if (!FORM_ENDPOINT) {
      setFeedback({
        id: Date.now(),
        type: "error",
        title: "Subscription Unavailable",
        message:
          "The newsletter service is temporarily unavailable. Please try again later.",
      });

      return;
    }

    submittingRef.current = true;
    setIsSubmitting(true);

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: normalizedEmail,
          consent: "Yes",
          source: "WAYLUME Newsletter Page",
          requestType: "Newsletter Subscription",
          submittedAt: new Date().toISOString(),
          _subject: "New WAYLUME Newsletter Subscriber",
        }),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok || result.ok === false) {
        if (response.status === 429) {
          throw new Error(
            "Too many requests. Please wait a moment and try again."
          );
        }

        const errorMessage = Array.isArray(result.errors)
          ? result.errors
              .map((error) => error.message)
              .filter(Boolean)
              .join(" ")
          : "";

        throw new Error(
          errorMessage ||
            "Unable to submit your subscription request."
        );
      }

      setFeedback({
        id: Date.now(),
        type: "success",
        title: "Subscription Request Received!",
        message:
          "Thank you for joining WAYLUME! Your newsletter signup request has been received.",
      });

      setEmail("");
      setConsent(false);
    } catch (error) {
      setFeedback({
        id: Date.now(),
        type: "error",
        title: "Subscription Failed",
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.",
      });
    } finally {
      submittingRef.current = false;
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        noValidate
        className="mt-8 w-full max-w-125 sm:mt-10"
      >
        <label
          htmlFor="newsletter-email"
          className="mb-3 block text-[12px] font-semibold text-[#333333] dark:text-[#e8e8e8] sm:text-[13px]"
        >
          Your Email Address
        </label>

        <div
          className={`flex min-h-13.5 items-center gap-2 rounded-lg border bg-white p-1.25 transition-all duration-300 focus-within:ring-2 focus-within:ring-[#242424]/10 dark:bg-[#242628] dark:focus-within:ring-white/10 ${
            emailError
              ? "border-red-400"
              : "border-[#e5e5e5] dark:border-white/15"
          }`}
        >
          <span className="ml-3 flex shrink-0 items-center justify-center text-[#858585] dark:text-[#aaaaaa]">
            <IoMailOutline
              aria-hidden="true"
              className="text-[19px]"
            />
          </span>

          <input
            ref={inputRef}
            id="newsletter-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              setEmailError("");
            }}
            disabled={isSubmitting}
            maxLength={254}
            aria-invalid={Boolean(emailError)}
            aria-describedby={
              emailError ? "newsletter-email-error" : undefined
            }
            className="h-11 min-w-0 flex-1 bg-transparent px-2 text-[13px] text-[#242424] outline-none placeholder:text-[#aaaaaa] disabled:opacity-60 dark:text-white dark:placeholder:text-[#858585] sm:text-[14px]"
          />

          <button
            type="submit"
            disabled={isSubmitting}
            aria-busy={isSubmitting}
            className="group inline-flex h-10.5 shrink-0 items-center justify-center gap-2 rounded-md bg-[#242424] px-4 text-[12px] font-semibold text-white transition-all duration-300 hover:bg-[#454545] disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-[#242424] dark:hover:bg-[#e9e9e9] sm:px-5 sm:text-[13px]"
          >
            {isSubmitting ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white dark:border-[#242424]/20 dark:border-t-[#242424]" />

                <span>Sending...</span>
              </>
            ) : (
              <>
                <span>Subscribe</span>

                <IoArrowForwardOutline
                  aria-hidden="true"
                  className="text-[16px] transition-transform duration-300 group-hover:translate-x-1"
                />
              </>
            )}
          </button>
        </div>

        {emailError && (
          <p
            id="newsletter-email-error"
            role="alert"
            className="mt-2 text-[12px] text-red-500"
          >
            {emailError}
          </p>
        )}

        <div className="mt-5 flex items-start gap-3">
          <input
            id="newsletter-consent"
            type="checkbox"
            checked={consent}
            onChange={(event) => {
              setConsent(event.target.checked);
              setConsentError("");
            }}
            disabled={isSubmitting}
            aria-invalid={Boolean(consentError)}
            aria-describedby={
              consentError ? "newsletter-consent-error" : undefined
            }
            className="mt-0.75 h-4 w-4 shrink-0 cursor-pointer accent-[#242424] dark:accent-white"
          />

          <label
            htmlFor="newsletter-consent"
            className="cursor-pointer text-[12px] leading-[1.7] text-[#858585] dark:text-[#aaaaaa] sm:text-[13px]"
          >
            I agree to receive future travel inspiration, destination
            updates, and newsletter emails from WAYLUME.
          </label>
        </div>

        {consentError && (
          <p
            id="newsletter-consent-error"
            role="alert"
            className="mt-2 text-[12px] text-red-500"
          >
            {consentError}
          </p>
        )}
      </form>

      {feedback &&
        typeof document !== "undefined" &&
        createPortal(
          <NewsletterToast
            key={feedback.id}
            feedback={feedback}
            onClose={() => setFeedback(null)}
          />,
          document.body
        )}
    </>
  );
}

export default function NewsletterPage() {
  return (
    <main className="min-h-screen bg-white transition-colors duration-300 dark:bg-[#101112]">
      <section
        aria-labelledby="newsletter-heading"
        className="overflow-hidden bg-white pt-10 pb-20 transition-colors duration-300 dark:bg-[#101112] sm:pt-14 sm:pb-24 lg:pt-18 lg:pb-28"
      >
        <Container>
          {/* Breadcrumb */}

          <Reveal>
            <nav aria-label="Breadcrumb">
              <ol className="flex items-center gap-2 text-[12px] text-[#858585] dark:text-[#aaaaaa] sm:text-[13px]">
                <li>
                  <Link
                    href="/"
                    className="transition-colors duration-300 hover:text-[#242424] dark:hover:text-white"
                  >
                    Home
                  </Link>
                </li>

                <li aria-hidden="true">/</li>

                <li
                  aria-current="page"
                  className="font-medium text-[#242424] dark:text-white"
                >
                  Newsletter
                </li>
              </ol>
            </nav>
          </Reveal>

          {/* Hero */}

          <div className="mt-12 grid min-w-0 items-center gap-12 lg:mt-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14 xl:gap-20">
            <div className="min-w-0">
              <Reveal>
                <span className="inline-flex items-center gap-2 rounded-full border border-[#e7e7e7] px-3.5 py-2 text-[11px] font-medium tracking-[0.06em] text-[#666666] dark:border-white/15 dark:text-[#cccccc] sm:text-[12px]">
                  <IoMailOutline
                    aria-hidden="true"
                    className="text-[16px]"
                  />

                  THE WAYLUME NEWSLETTER
                </span>
              </Reveal>

              <Reveal delay={80}>
                <h1
                  id="newsletter-heading"
                  className="font-heading mt-7 max-w-160 text-[43px] leading-[1.07] font-semibold tracking-[-0.065em] text-[#242424] dark:text-white sm:text-[56px] lg:text-[62px] xl:text-[70px]"
                >
                  Stay Curious.
                  <br />
                  Stay Inspired.
                  <br />
                  <span className="text-[#969696] dark:text-[#777777]">
                    Go Further.
                  </span>
                </h1>
              </Reveal>

              <Reveal delay={140}>
                <p className="mt-6 max-w-125 text-[14px] leading-[1.85] text-[#858585] dark:text-[#aaaaaa] sm:mt-7 sm:text-[16px]">
                  The world is filled with remarkable places and
                  unforgettable stories. Sign up for future travel
                  inspiration, destination discoveries, and thoughtful
                  ideas for your next extraordinary journey.
                </p>
              </Reveal>

              <Reveal delay={200}>
                <NewsletterForm />
              </Reveal>

              <Reveal delay={260}>
                <div className="mt-9 flex flex-wrap items-center gap-5 border-t border-[#eeeeee] pt-6 dark:border-white/10">
                  <span className="inline-flex items-center gap-2 text-[12px] text-[#858585] dark:text-[#aaaaaa]">
                    <IoCheckmarkCircleOutline
                      aria-hidden="true"
                      className="text-[17px] text-[#555555] dark:text-[#cccccc]"
                    />

                    Thoughtful travel inspiration
                  </span>

                  <span className="inline-flex items-center gap-2 text-[12px] text-[#858585] dark:text-[#aaaaaa]">
                    <IoCheckmarkCircleOutline
                      aria-hidden="true"
                      className="text-[17px] text-[#555555] dark:text-[#cccccc]"
                    />

                    Destination discoveries
                  </span>
                </div>
              </Reveal>
            </div>

            {/* Right Image */}

            <Reveal delay={150} className="min-w-0">
              <div className="group relative isolate h-105 w-full overflow-hidden rounded-[18px] bg-[#34443f] sm:h-135 lg:h-162.5">
                <Image
                  src="/images/trip/travel-offer.jpg"
                  alt="Scenic mountain landscape inspiring new travel adventures"
                  fill
                  priority
                  quality={90}
                  sizes="(max-width: 1023px) 100vw, 50vw"
                  className="object-cover object-center transition-transform duration-1200 ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:group-hover:scale-[1.06]"
                />

                <span className="absolute inset-0 bg-linear-to-t from-black/75 via-black/5 to-black/10" />

                <div className="absolute top-6 left-6 sm:top-8 sm:left-8">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/15 px-4 py-2 text-[11px] font-medium text-white backdrop-blur-sm sm:text-[12px]">
                    <IoCompassOutline
                      aria-hidden="true"
                      className="text-[16px]"
                    />

                    Explore Beyond Ordinary
                  </span>
                </div>

                <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8 lg:p-9">
                  <span className="text-[11px] font-medium tracking-[0.12em] text-white/75 uppercase">
                    WAYLUME TRAVEL
                  </span>

                  <h2 className="font-heading mt-3 max-w-110 text-[28px] leading-[1.2] font-semibold tracking-tighter sm:text-[36px] lg:text-[39px]">
                    A World of Stories
                    <br />
                    Awaits You.
                  </h2>

                  <p className="mt-4 max-w-95 text-[13px] leading-[1.75] text-white/85 sm:text-[14px]">
                    Discover the beauty of going somewhere new and
                    experiencing something extraordinary.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Newsletter Benefits */}

      <section
        aria-labelledby="newsletter-benefits-heading"
        className="bg-[#f8f8f8] py-18 transition-colors duration-300 dark:bg-[#191b1d] sm:py-22 lg:py-26"
      >
        <Container>
          <Reveal>
            <h2
              id="newsletter-benefits-heading"
              className="font-heading max-w-160 text-[30px] leading-[1.2] font-semibold tracking-[-0.055em] text-[#242424] dark:text-white sm:text-[36px] lg:text-[40px]"
            >
              A Little Inspiration
              <br />
              Goes a Long Way.
            </h2>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-9 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
            {newsletterFeatures.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <Reveal
                  key={feature.id}
                  delay={index * 100}
                  className="min-w-0"
                >
                  <article className="group">
                    <span className="flex h-13 w-13 items-center justify-center rounded-full border border-[#dedede] text-[#242424] transition-all duration-300 group-hover:-translate-y-1 group-hover:border-[#242424] group-hover:bg-[#242424] group-hover:text-white dark:border-white/25 dark:text-white dark:group-hover:border-white dark:group-hover:bg-white dark:group-hover:text-[#242424]">
                      <Icon
                        aria-hidden="true"
                        className="text-[23px]"
                      />
                    </span>

                    <h3 className="font-heading mt-6 text-[19px] font-semibold tracking-[-0.04em] text-[#242424] dark:text-white sm:text-[21px]">
                      {feature.title}
                    </h3>

                    <p className="mt-3 max-w-100 text-[14px] leading-[1.8] text-[#858585] dark:text-[#aaaaaa]">
                      {feature.description}
                    </p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Bottom Navigation */}

      <section className="bg-white py-12 dark:bg-[#101112] sm:py-15">
        <Container>
          <div className="flex flex-wrap items-center justify-between gap-5">
            <Link
              href="/"
              className="group inline-flex items-center gap-2 text-[13px] font-medium text-[#555555] transition-colors duration-300 hover:text-[#242424] dark:text-[#cccccc] dark:hover:text-white"
            >
              <IoArrowBackOutline
                aria-hidden="true"
                className="text-[17px] transition-transform duration-300 group-hover:-translate-x-1"
              />

              Back to Homepage
            </Link>

            <Link
              href="/trip"
              className="group inline-flex items-center gap-2 text-[13px] font-medium text-[#242424] transition-colors duration-300 hover:text-[#777777] dark:text-white dark:hover:text-[#cccccc]"
            >
              Explore Journeys

              <IoArrowForwardOutline
                aria-hidden="true"
                className="text-[17px] transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </Container>
      </section>

      <Footer />
    </main>
  );
}