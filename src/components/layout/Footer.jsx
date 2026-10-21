"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import {
  IoArrowForwardOutline,
  IoCompassOutline,
  IoLocationOutline,
  IoMailOutline,
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoLinkedin,
  IoCheckmarkCircleOutline,
  IoAlertCircleOutline,
  IoCloseOutline,
} from "react-icons/io5";

import Container from "@/components/shared/Container";
import Reveal from "@/components/shared/Reveal";

const NEWSLETTER_FORM_ID =
  process.env.NEXT_PUBLIC_FORMSPREE_NEWSLETTER_ID?.trim() || "";

const NEWSLETTER_ENDPOINT = NEWSLETTER_FORM_ID
  ? `https://formspree.io/f/${NEWSLETTER_FORM_ID}`
  : "";

const footerLinks = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "/#destinations" },
  { label: "Journeys", href: "/#upcoming-adventures" },
  { label: "Services", href: "/#services" },
  { label: "Travel Journal", href: "/#travel-tips" },
  { label: "Contact Us", href: "/contact" },
];

const socialLinks = [
  {
    label: "Facebook",
    icon: IoLogoFacebook,
    href: process.env.NEXT_PUBLIC_WAYLUME_FACEBOOK_URL,
  },
  {
    label: "LinkedIn",
    icon: IoLogoLinkedin,
    href: process.env.NEXT_PUBLIC_WAYLUME_LINKEDIN_URL,
  },
  {
    label: "Instagram",
    icon: IoLogoInstagram,
    href: process.env.NEXT_PUBLIC_WAYLUME_INSTAGRAM_URL,
  },
];

function NewsletterToast({ feedback, onClose }) {
  if (!feedback) return null;

  const isSuccess = feedback.type === "success";

  return (
    <div
      role={isSuccess ? "status" : "alert"}
      aria-live={isSuccess ? "polite" : "assertive"}
      aria-atomic="true"
      className="fixed right-4 bottom-5 left-4 z-200 sm:right-6 sm:bottom-6 sm:left-auto sm:w-full sm:max-w-95"
      style={{
        animation: "waylumeToastIn 350ms ease-out both",
      }}
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
            <h3 className="font-heading text-[15px] leading-[1.4] font-semibold tracking-tight text-[#242424] dark:text-white">
              {feedback.title}
            </h3>

            <p className="mt-1.5 text-[12px] leading-[1.7] text-[#777777] dark:text-[#bcbcbc]">
              {feedback.message}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Dismiss notification"
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[#999999] transition-colors duration-300 hover:bg-[#f2f2f2] hover:text-[#242424] dark:hover:bg-white/10 dark:hover:text-white"
          >
            <IoCloseOutline
              aria-hidden="true"
              className="text-[20px]"
            />
          </button>
        </div>

        <div className="h-0.75 w-full bg-[#eeeeee] dark:bg-white/10">
          <div
            key={feedback.id}
            className={`h-full w-full ${
              isSuccess ? "bg-[#248a47]" : "bg-red-500"
            }`}
            style={{
              transformOrigin: "left",
              animation: "waylumeToastProgress 7s linear forwards",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const emailRef = useRef(null);
  const submittingRef = useRef(false);

  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    if (!feedback) return;

    const timer = window.setTimeout(() => {
      setFeedback(null);
    }, 7000);

    return () => window.clearTimeout(timer);
  }, [feedback]);

  const handleSubscribe = async (event) => {
    event.preventDefault();

    if (submittingRef.current) return;

    const normalizedEmail = email.trim().toLowerCase();

    setEmailError("");
    setFeedback(null);

    if (
      !normalizedEmail ||
      normalizedEmail.length > 254 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)
    ) {
      setEmailError("Please enter a valid email address.");
      emailRef.current?.focus();
      return;
    }

    if (!NEWSLETTER_ENDPOINT) {
      setFeedback({
        id: Date.now(),
        type: "error",
        title: "Subscription Unavailable",
        message:
          "The newsletter form is temporarily unavailable. Please try again later.",
      });

      return;
    }

    submittingRef.current = true;
    setSubmitting(true);

    try {
      const response = await fetch(NEWSLETTER_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: normalizedEmail,
          requestType: "Newsletter Signup",
          source: "WAYLUME Website Footer",
          _subject: "New WAYLUME Newsletter Signup",
        }),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok || result.ok === false) {
        if (response.status === 429) {
          throw new Error(
            "Too many requests. Please wait a moment and try again."
          );
        }

        const formspreeError = Array.isArray(result.errors)
          ? result.errors
              .map((error) => error.message)
              .filter(Boolean)
              .join(" ")
          : "";

        throw new Error(
          formspreeError ||
            "Unable to submit your subscription request. Please try again."
        );
      }

      setFeedback({
        id: Date.now(),
        type: "success",
        title: "Subscription Request Received!",
        message:
          "Thank you for your interest in WAYLUME! We've received your newsletter signup request.",
      });

      setEmail("");
      setEmailError("");
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
      setSubmitting(false);
    }
  };

  return (
    <>
      <footer
        id="footer"
        className="relative isolate w-full overflow-hidden bg-[#050505] text-white"
      >
        {/* Background Image */}

        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <Image
            src="/images/shared/travel-footer.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center brightness-[0.95] saturate-[0.9]"
          />

          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.12) 25%, rgba(0,0,0,0.28) 30%, rgba(0,0,0,0.52) 45%, rgba(0,0,0,0.78) 60%, rgba(0,0,0,0.93) 76%, rgba(0,0,0,0.98) 90%, #050505 100%)",
            }}
          />

          <div
            className="absolute inset-0 mix-blend-multiply"
            style={{
              background:
                "radial-gradient(ellipse 90% 80% at 50% 15%, transparent 35%, rgba(0,0,0,0.25) 75%, rgba(0,0,0,0.45) 100%)",
            }}
          />
        </div>

        {/* Large Background Branding */}

        <div className="pointer-events-none absolute inset-x-0 -bottom-2 z-1 flex w-full items-end justify-center overflow-hidden sm:-bottom-4.5 lg:-bottom-7.5">
          <span className="font-heading block w-max shrink-0 select-none whitespace-nowrap text-center text-[clamp(62px,19.5vw,280px)] leading-[0.95] font-extrabold tracking-wide text-white/6.5">
            WAYLUME
          </span>
        </div>

        <div className="relative z-10">
          <Container>
            {/* Footer CTA */}

            <section
              aria-labelledby="footer-cta-heading"
              className="px-2 pt-22.5 pb-26.25 text-center sm:pt-27.5 sm:pb-31.25 lg:pt-28.75 lg:pb-35"
            >
              <Reveal>
                <h2
                  id="footer-cta-heading"
                  className="font-heading mx-auto max-w-262.5 text-[42px] leading-[1.08] font-semibold tracking-[-0.065em] text-white sm:text-[56px] lg:text-[68px] xl:text-[76px]"
                >
                  Your Next Great Story
                  <br className="hidden sm:block" /> Begins Somewhere New.
                </h2>
              </Reveal>

              <Reveal delay={120}>
                <p className="mx-auto mt-6.25 max-w-137.5 text-[14px] leading-[1.7] text-white/85 sm:mt-7.5 sm:text-[16px]">
                  Extraordinary places, unforgettable moments, and new
                  perspectives are waiting to be discovered.
                </p>
              </Reveal>

              <Reveal delay={220} className="mt-7.5 sm:mt-8.75">
                <Link
                  href="/#upcoming-adventures"
                  className="group relative inline-flex h-12 items-center justify-center gap-3 overflow-hidden rounded-lg bg-white px-5.75 text-[13px] font-semibold text-[#242424] shadow-[0_8px_25px_rgba(0,0,0,0.15)] transition-all duration-300 hover:-translate-y-0.75 hover:shadow-[0_14px_35px_rgba(0,0,0,0.25)] active:translate-y-0 sm:h-12.5 sm:px-6.5 sm:text-[14px]"
                >
                  <span className="absolute inset-0 -translate-x-full bg-[#e8ebe8] transition-transform duration-500 ease-out group-hover:translate-x-0" />

                  <span className="relative z-10">
                    Explore Journeys
                  </span>

                  <IoArrowForwardOutline
                    aria-hidden="true"
                    className="relative z-10 text-[17px] transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </Reveal>
            </section>

            {/* Footer Content */}

            <div className="grid grid-cols-1 gap-x-9 gap-y-12 pt-6.25 sm:grid-cols-2 sm:gap-y-14 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,0.58fr)_minmax(0,0.65fr)_minmax(0,1.3fr)] lg:gap-x-10 lg:pt-8.75 xl:gap-x-12">
              {/* Brand */}

              <Reveal>
                <Link
                  href="/"
                  aria-label="WAYLUME Home"
                  className="font-heading inline-flex text-[26px] leading-none font-bold tracking-[-0.075em] text-white transition-opacity duration-300 hover:opacity-70 sm:text-[29px]"
                >
                  WAYLUME
                </Link>

                <p className="mt-6.25 max-w-88.75 text-[13px] leading-[1.9] text-white/65 sm:text-[14px]">
                  Beyond every horizon lies a story waiting to unfold.
                  Discover remarkable destinations, inspiring journeys,
                  and meaningful experiences with WAYLUME.
                </p>
              </Reveal>

              {/* Quick Links */}

              <Reveal delay={80}>
                <h3 className="font-heading text-[15px] font-semibold text-white sm:text-[16px]">
                  Quick Links
                </h3>

                <nav
                  aria-label="Footer navigation"
                  className="mt-5.75 flex flex-col items-start gap-3.75"
                >
                  {footerLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="group relative inline-flex text-[13px] leading-normal text-white/60 transition-colors duration-300 hover:text-white sm:text-[14px]"
                    >
                      <span>{link.label}</span>

                      <span className="absolute -bottom-0.75 left-0 h-px w-full origin-left scale-x-0 bg-white/80 transition-transform duration-300 group-hover:scale-x-100" />
                    </Link>
                  ))}
                </nav>
              </Reveal>

              {/* Social Links */}

              <Reveal delay={140}>
                <h3 className="font-heading text-[15px] font-semibold text-white sm:text-[16px]">
                  Follow Us
                </h3>

                <div className="mt-5.75 flex items-center gap-2.5">
                  {socialLinks.map((social) => {
                    const Icon = social.icon;

                    return social.href ? (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`WAYLUME on ${social.label}`}
                        className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/60 text-white transition-all duration-300 hover:-translate-y-0.75 hover:border-white hover:bg-white hover:text-[#242424] hover:shadow-[0_8px_25px_rgba(0,0,0,0.2)] active:translate-y-0"
                      >
                        <Icon
                          aria-hidden="true"
                          className="text-[16px] transition-transform duration-300 group-hover:scale-110"
                        />
                      </a>
                    ) : (
                      <span
                        key={social.label}
                        title={`${social.label} profile not configured`}
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-white/45"
                      >
                        <Icon
                          aria-hidden="true"
                          className="text-[16px]"
                        />
                      </span>
                    );
                  })}
                </div>
              </Reveal>

              {/* Newsletter Form */}

              <Reveal delay={200}>
                <h3 className="font-heading text-[15px] font-semibold text-white sm:text-[16px]">
                  Stay Inspired
                </h3>

                <p className="mt-5 max-w-88.75 text-[13px] leading-[1.8] text-white/65 sm:text-[14px]">
                  Discover extraordinary destinations, travel stories,
                  and fresh inspiration delivered straight to your inbox.
                </p>

                <form
                  onSubmit={handleSubscribe}
                  noValidate
                  className="mt-5.5"
                >
                  <div
                    className={`flex h-12.75 w-full items-center overflow-hidden rounded-lg border bg-white px-1.25 transition-shadow duration-300 focus-within:ring-2 focus-within:ring-white/40 ${
                      emailError
                        ? "border-red-400"
                        : "border-white/20"
                    }`}
                  >
                    <label
                      htmlFor="footer-newsletter-email"
                      className="sr-only"
                    >
                      Email address
                    </label>

                    <input
                      ref={emailRef}
                      id="footer-newsletter-email"
                      type="email"
                      name="email"
                      autoComplete="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(event) => {
                        setEmail(event.target.value);
                        setEmailError("");
                      }}
                      required
                      maxLength={254}
                      disabled={submitting}
                      aria-invalid={Boolean(emailError)}
                      aria-describedby={
                        emailError
                          ? "footer-newsletter-error"
                          : undefined
                      }
                      className="h-full min-w-0 flex-1 bg-transparent px-3 text-[13px] text-[#242424] outline-none placeholder:text-[#969696] disabled:opacity-60 sm:text-[14px]"
                    />

                    <button
                      type="submit"
                      disabled={submitting}
                      aria-busy={submitting}
                      aria-label="Subscribe to WAYLUME travel updates"
                      className="group inline-flex h-10.25 shrink-0 items-center justify-center gap-2 rounded-md px-3.25 text-[13px] font-semibold text-[#242424] transition-colors duration-300 hover:bg-[#eeeeee] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {submitting ? (
                        <>
                          <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-[#242424]/20 border-t-[#242424]" />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <span>Join</span>

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
                      id="footer-newsletter-error"
                      role="alert"
                      className="mt-3 text-[12px] leading-[1.6] text-red-300"
                    >
                      {emailError}
                    </p>
                  )}
                </form>
              </Reveal>
            </div>

            {/* Footer Bottom */}

            <div
              id="footer-contact"
              className="relative z-10 mt-18.75 flex flex-col gap-12 pb-11.25 sm:mt-22.5 sm:pb-12.5 lg:mt-25 lg:flex-row lg:items-end lg:justify-between lg:gap-10 lg:pb-13.75"
            >
              <div className="flex flex-col gap-4.75">
                <Link
                  href="/#destinations"
                  className="group flex items-center gap-3.25 text-[13px] leading-[1.6] text-white/60 transition-colors duration-300 hover:text-white sm:text-[14px]"
                >
                  <IoLocationOutline
                    aria-hidden="true"
                    className="shrink-0 text-[19px] transition-transform duration-300 group-hover:-translate-y-0.5"
                  />

                  <span>
                    Extraordinary destinations around the world
                  </span>
                </Link>

                <Link
                  href="/#upcoming-adventures"
                  className="group flex items-center gap-3.25 text-[13px] leading-[1.6] text-white/60 transition-colors duration-300 hover:text-white sm:text-[14px]"
                >
                  <IoCompassOutline
                    aria-hidden="true"
                    className="shrink-0 text-[19px] transition-transform duration-300 group-hover:rotate-45"
                  />

                  <span>
                    Discover your next unforgettable journey
                  </span>
                </Link>

                <Link
                  href="/#travel-tips"
                  className="group flex items-center gap-3.25 text-[13px] leading-[1.6] text-white/60 transition-colors duration-300 hover:text-white sm:text-[14px]"
                >
                  <IoMailOutline
                    aria-hidden="true"
                    className="shrink-0 text-[19px] transition-transform duration-300 group-hover:-translate-y-0.5"
                  />

                  <span>
                    Explore travel stories and inspiration
                  </span>
                </Link>
              </div>

              <p className="text-[12px] leading-[1.7] text-white/55 sm:text-[13px] lg:text-right">
                © {currentYear} WAYLUME Travel. All rights reserved.
              </p>
            </div>
          </Container>
        </div>
      </footer>

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

      <style jsx global>{`
        @keyframes waylumeToastIn {
          from {
            opacity: 0;
            transform: translateY(18px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes waylumeToastProgress {
          from {
            transform: scaleX(1);
          }

          to {
            transform: scaleX(0);
          }
        }
      `}</style>
    </>
  );
}