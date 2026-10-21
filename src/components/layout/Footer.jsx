"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { IoArrowForwardOutline, IoCompassOutline, IoLocationOutline, IoMailOutline, IoLogoFacebook, IoLogoInstagram, IoLogoLinkedin } from "react-icons/io5";
import Container from "@/components/shared/Container";
import Reveal from "@/components/shared/Reveal";

const footerLinks = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "/#destinations" },
  { label: "Journeys", href: "/#upcoming-adventures" },
  { label: "Services", href: "/#services" },
  { label: "Travel Journal", href: "/#travel-tips" },
  { label: "Contact Us", href: "/contact" },
];

const socialLinks = [
  { label: "Facebook", icon: IoLogoFacebook, href: process.env.NEXT_PUBLIC_WAYLUME_FACEBOOK_URL },
  { label: "LinkedIn", icon: IoLogoLinkedin, href: process.env.NEXT_PUBLIC_WAYLUME_LINKEDIN_URL },
  { label: "Instagram", icon: IoLogoInstagram, href: process.env.NEXT_PUBLIC_WAYLUME_INSTAGRAM_URL },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  const handleSubscribe = async (event) => {
    event.preventDefault();
    if (submitting) return;

    const normalizedEmail = email.trim().toLowerCase();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      setStatus({ type: "error", message: "Please enter a valid email address." });
      return;
    }

    setSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: normalizedEmail }),
      });

      const result = await response.json();

      if (!response.ok) throw new Error(result.message || "Unable to subscribe right now.");

      setStatus({ type: "success", message: result.message });
      setEmail("");
    } catch (error) {
      setStatus({ type: "error", message: error.message || "Something went wrong. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <footer id="footer" className="relative isolate w-full overflow-hidden bg-[#050505] text-white">
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
            background: "linear-gradient(180deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.12) 25%, rgba(0,0,0,0.28) 30%, rgba(0,0,0,0.52) 45%, rgba(0,0,0,0.78) 60%, rgba(0,0,0,0.93) 76%, rgba(0,0,0,0.98) 90%, #050505 100%)",
          }}
        />

        <div
          className="absolute inset-0 mix-blend-multiply"
          style={{
            background: "radial-gradient(ellipse 90% 80% at 50% 15%, transparent 35%, rgba(0,0,0,0.25) 75%, rgba(0,0,0,0.45) 100%)",
          }}
        />
      </div>

      <div className="pointer-events-none absolute inset-x-0 -bottom-2 z-1 flex w-full items-end justify-center overflow-hidden sm:-bottom-4.5 lg:-bottom-7.5">
        <span className="font-heading block w-max shrink-0 select-none whitespace-nowrap text-center text-[clamp(62px,19.5vw,280px)] leading-[0.95] font-extrabold tracking-wide text-white/6.5">
          WAYLUME
        </span>
      </div>

      <div className="relative z-10">
        <Container>
          <section aria-labelledby="footer-cta-heading" className="px-2 pt-22.5 pb-26.25 text-center sm:pt-27.5 sm:pb-31.25 lg:pt-28.75 lg:pb-35">
            <Reveal>
              <h2 id="footer-cta-heading" className="font-heading mx-auto max-w-262.5 text-[42px] leading-[1.08] font-semibold tracking-[-0.065em] text-white sm:text-[56px] lg:text-[68px] xl:text-[76px]">
                Your Next Great Story
                <br className="hidden sm:block" /> Begins Somewhere New.
              </h2>
            </Reveal>

            <Reveal delay={120}>
              <p className="mx-auto mt-6.25 max-w-137.5 text-[14px] leading-[1.7] text-white/85 sm:mt-7.5 sm:text-[16px]">
                Extraordinary places, unforgettable moments, and new perspectives are waiting to be discovered.
              </p>
            </Reveal>

            <Reveal delay={220} className="mt-7.5 sm:mt-8.75">
              <Link
                href="/#upcoming-adventures"
                className="group relative inline-flex h-12 items-center justify-center gap-3 overflow-hidden rounded-lg bg-white px-5.75 text-[13px] font-semibold text-[#242424] shadow-[0_8px_25px_rgba(0,0,0,0.15)] transition-all duration-300 hover:-translate-y-0.75 hover:shadow-[0_14px_35px_rgba(0,0,0,0.25)] active:translate-y-0 sm:h-12.5 sm:px-6.5 sm:text-[14px]"
              >
                <span className="absolute inset-0 -translate-x-full bg-[#e8ebe8] transition-transform duration-500 ease-out group-hover:translate-x-0" />
                <span className="relative z-10">Explore Journeys</span>
                <IoArrowForwardOutline aria-hidden="true" className="relative z-10 text-[17px] transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Reveal>
          </section>

          <div className="grid grid-cols-1 gap-x-9 gap-y-12 pt-6.25 sm:grid-cols-2 sm:gap-y-14 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,0.58fr)_minmax(0,0.65fr)_minmax(0,1.3fr)] lg:gap-x-10 lg:pt-8.75 xl:gap-x-12">
            <Reveal>
              <Link href="/" aria-label="WAYLUME Home" className="font-heading inline-flex text-[26px] leading-none font-bold tracking-[-0.075em] text-white transition-opacity duration-300 hover:opacity-70 sm:text-[29px]">
                WAYLUME
              </Link>

              <p className="mt-6.25 max-w-88.75 text-[13px] leading-[1.9] text-white/65 sm:text-[14px]">
                Beyond every horizon lies a story waiting to unfold. Discover remarkable destinations, inspiring journeys, and meaningful experiences with WAYLUME.
              </p>
            </Reveal>

            <Reveal delay={80}>
              <h3 className="font-heading text-[15px] font-semibold text-white sm:text-[16px]">Quick Links</h3>

              <nav aria-label="Footer navigation" className="mt-5.75 flex flex-col items-start gap-3.75">
                {footerLinks.map((link) => (
                  <Link key={link.href} href={link.href} className="group relative inline-flex text-[13px] leading-normal text-white/60 transition-colors duration-300 hover:text-white sm:text-[14px]">
                    <span>{link.label}</span>
                    <span className="absolute -bottom-0.75 left-0 h-px w-full origin-left scale-x-0 bg-white/80 transition-transform duration-300 group-hover:scale-x-100" />
                  </Link>
                ))}
              </nav>
            </Reveal>

            <Reveal delay={140}>
              <h3 className="font-heading text-[15px] font-semibold text-white sm:text-[16px]">Follow Us</h3>

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
                      <Icon aria-hidden="true" className="text-[16px] transition-transform duration-300 group-hover:scale-110" />
                    </a>
                  ) : (
                    <span key={social.label} title={`${social.label} profile not configured`} className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-white/45">
                      <Icon aria-hidden="true" className="text-[16px]" />
                    </span>
                  );
                })}
              </div>
            </Reveal>

            <Reveal delay={200}>
              <h3 className="font-heading text-[15px] font-semibold text-white sm:text-[16px]">Stay Inspired</h3>

              <p className="mt-5 max-w-88.75 text-[13px] leading-[1.8] text-white/65 sm:text-[14px]">
                Discover extraordinary destinations, travel stories, and fresh inspiration delivered straight to your inbox.
              </p>
                
              <form onSubmit={handleSubscribe} className="mt-5.5">
                <div className="flex h-12.75 w-full items-center overflow-hidden rounded-lg border border-white/20 bg-white px-1.25 transition-shadow duration-300 focus-within:ring-2 focus-within:ring-white/40">
                  <label htmlFor="footer-newsletter-email" className="sr-only">Email address</label>

                  <input
                    id="footer-newsletter-email"
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                      if (status.message) setStatus({ type: "", message: "" });
                    }}
                    required
                    maxLength={254}
                    disabled={submitting}
                    className="h-full min-w-0 flex-1 bg-transparent px-3 text-[13px] text-[#242424] outline-none placeholder:text-[#969696] disabled:opacity-60 sm:text-[14px]"
                  />

                  <button type="submit" disabled={submitting} className="group inline-flex h-10.25 shrink-0 items-center justify-center gap-2 rounded-md px-3.25 text-[13px] font-semibold text-[#242424] transition-colors duration-300 hover:bg-[#eeeeee] disabled:cursor-wait disabled:opacity-60">
                    <span>{submitting ? "Sending..." : "Join"}</span>
                    {!submitting && <IoArrowForwardOutline aria-hidden="true" className="text-[16px] transition-transform duration-300 group-hover:translate-x-1" />}
                  </button>
                </div>

                {status.message && (
                  <p role="status" aria-live="polite" className={`mt-3 text-[12px] leading-[1.6] ${status.type === "success" ? "text-emerald-300" : "text-red-300"}`}>
                    {status.message}
                  </p>
                )}
              </form>
            </Reveal>
          </div>

          <div id="footer-contact" className="relative z-10 mt-18.75 flex flex-col gap-12 pb-11.25 sm:mt-22.5 sm:pb-12.5 lg:mt-25 lg:flex-row lg:items-end lg:justify-between lg:gap-10 lg:pb-13.75">
            <div className="flex flex-col gap-4.75">
              <Link href="/#destinations" className="group flex items-center gap-3.25 text-[13px] leading-[1.6] text-white/60 transition-colors duration-300 hover:text-white sm:text-[14px]">
                <IoLocationOutline aria-hidden="true" className="shrink-0 text-[19px] transition-transform duration-300 group-hover:-translate-y-0.5" />
                <span>Extraordinary destinations around the world</span>
              </Link>

              <Link href="/#upcoming-adventures" className="group flex items-center gap-3.25 text-[13px] leading-[1.6] text-white/60 transition-colors duration-300 hover:text-white sm:text-[14px]">
                <IoCompassOutline aria-hidden="true" className="shrink-0 text-[19px] transition-transform duration-300 group-hover:rotate-45" />
                <span>Discover your next unforgettable journey</span>
              </Link>

              <Link href="/#travel-tips" className="group flex items-center gap-3.25 text-[13px] leading-[1.6] text-white/60 transition-colors duration-300 hover:text-white sm:text-[14px]">
                <IoMailOutline aria-hidden="true" className="shrink-0 text-[19px] transition-transform duration-300 group-hover:-translate-y-0.5" />
                <span>Explore travel stories and inspiration</span>
              </Link>
            </div>

            <p className="text-[12px] leading-[1.7] text-white/55 sm:text-[13px] lg:text-right">
              © {currentYear} WAYLUME Travel. All rights reserved.
            </p>
          </div>
        </Container>
      </div>
    </footer>
  );
}