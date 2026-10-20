"use client";

import { useEffect, useRef, useState } from "react";
import {
  IoAddOutline,
  IoAlertCircleOutline,
  IoCalendarOutline,
  IoCheckmarkCircleOutline,
  IoChevronDownOutline,
  IoCloseOutline,
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoLinkedin,
  IoRemoveOutline,
} from "react-icons/io5";

import Container from "@/components/shared/Container";
import Reveal from "@/components/shared/Reveal";
import { trips } from "@/data/trips";

const contactEmail =
  process.env.NEXT_PUBLIC_WAYLUME_CONTACT_EMAIL || "";

const contactPhone =
  process.env.NEXT_PUBLIC_WAYLUME_CONTACT_PHONE || "";

const contactAddress =
  process.env.NEXT_PUBLIC_WAYLUME_CONTACT_ADDRESS || "";

const socialLinks = [
  {
    name: "Facebook",
    icon: IoLogoFacebook,
    href: process.env.NEXT_PUBLIC_WAYLUME_FACEBOOK_URL || "",
  },
  {
    name: "LinkedIn",
    icon: IoLogoLinkedin,
    href: process.env.NEXT_PUBLIC_WAYLUME_LINKEDIN_URL || "",
  },
  {
    name: "Instagram",
    icon: IoLogoInstagram,
    href: process.env.NEXT_PUBLIC_WAYLUME_INSTAGRAM_URL || "",
  },
];

const faqs = [
  {
    id: "faq-01",
    question: "How Far In Advance Should I Book My Trip?",
    answer:
      "We recommend planning your journey around 3–6 months in advance whenever possible. Planning early allows more flexibility when exploring destinations, travel dates, and accommodation preferences.",
  },
  {
    id: "faq-02",
    question: "Can I Customize My Travel Package?",
    answer:
      "You can share your preferred destinations, travel style, activities, and budget. These details can help shape a more personalized travel experience.",
  },
  {
    id: "faq-03",
    question: "What Is Your Cancellation Policy?",
    answer:
      "Cancellation terms depend on the travel provider, destination, and selected services. Specific cancellation conditions should always be reviewed before confirming a reservation.",
  },
  {
    id: "faq-04",
    question: "Do You Offer Group Discounts?",
    answer:
      "Group travel pricing depends on your destination, group size, accommodation preferences, and selected experiences. Any applicable offers require confirmation.",
  },
  {
    id: "faq-05",
    question: "Is Travel Insurance Included?",
    answer:
      "Travel insurance is not automatically included in our sample itineraries. Travelers should review suitable insurance coverage before making travel arrangements.",
  },
];

const initialForm = {
  fullName: "",
  email: "",
  destination: "",
  startDate: "",
  endDate: "",
  message: "",
};

const inputClass =
  "h-11 w-full rounded-[5px] border border-[#e7e9ec] bg-white px-3.5 text-[13px] text-[#242424] outline-none transition-colors duration-300 placeholder:text-[#aaaaaa] focus:border-[#777777] focus:ring-2 focus:ring-[#242424]/5 dark:border-white/15 dark:bg-[#252729] dark:text-white dark:placeholder:text-[#858585] dark:focus:border-white/50";

const labelClass =
  "mb-2 block text-[12px] font-semibold text-[#333333] dark:text-[#e8e8e8]";

function formatDate(dateString) {
  if (!dateString) return "";

  const date = new Date(`${dateString}T00:00:00Z`);

  if (Number.isNaN(date.getTime())) return "";

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

function ConfirmationToast({ feedback, onClose }) {
  if (!feedback) return null;

  const isSuccess = feedback.type === "success";

  return (
    <div
      role={isSuccess ? "status" : "alert"}
      aria-live={isSuccess ? "polite" : "assertive"}
      className="fixed right-4 bottom-5 left-4 z-200 sm:right-6 sm:bottom-6 sm:left-auto sm:w-full sm:max-w-95"
    >
      <div className="animate-[slideUp_0.35s_ease-out] overflow-hidden rounded-xl border border-[#e7e7e7] bg-white shadow-[0_18px_55px_rgba(0,0,0,0.16)] dark:border-white/10 dark:bg-[#242628]">
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
            <h3 className="font-heading text-[15px] leading-[1.4] font-semibold tracking-[-0.025em] text-[#242424] dark:text-white">
              {feedback.title}
            </h3>

            <p className="mt-1.5 text-[12px] leading-[1.7] text-[#777777] dark:text-[#bcbcbc]">
              {feedback.message}
            </p>

            {feedback.note && (
              <p className="mt-1 text-[11px] leading-[1.6] text-[#999999] dark:text-[#aaaaaa]">
                {feedback.note}
              </p>
            )}
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
            className={`h-full origin-left animate-[toastProgress_7s_linear_forwards] ${
              isSuccess ? "bg-[#248a47]" : "bg-red-500"
            }`}
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(18px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes toastProgress {
          from {
            transform: scaleX(1);
          }
          to {
            transform: scaleX(0);
          }
        }
      `}</style>
    </div>
  );
}

function ContactInformation() {
  const contactItems = [
    {
      label: "Email",
      value: contactEmail || "Email coming soon",
      href: contactEmail ? `mailto:${contactEmail}` : null,
    },
    {
      label: "Phone",
      value: contactPhone || "Phone number coming soon",
      href: contactPhone
        ? `tel:${contactPhone.replace(/[^\d+]/g, "")}`
        : null,
    },
    {
      label: "Office",
      value: contactAddress || "Office details coming soon",
      href: null,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-5 sm:gap-x-6 sm:gap-y-6">
      {contactItems.map((item) => (
        <div
          key={item.label}
          className="min-w-0 border-b border-[#e8e8e8] pb-4 dark:border-white/10"
        >
          <h3 className="text-[13px] font-semibold text-[#242424] dark:text-white">
            {item.label}
          </h3>

          {item.href ? (
            <a
              href={item.href}
              className="mt-2 block break-words text-[12px] leading-[1.7] text-[#888888] transition-colors duration-300 hover:text-[#242424] dark:text-[#aaaaaa] dark:hover:text-white sm:text-[13px]"
            >
              {item.value}
            </a>
          ) : (
            <p className="mt-2 break-words text-[12px] leading-[1.7] text-[#888888] dark:text-[#aaaaaa] sm:text-[13px]">
              {item.value}
            </p>
          )}
        </div>
      ))}

      <div className="min-w-0 border-b border-[#e8e8e8] pb-4 dark:border-white/10">
        <h3 className="text-[13px] font-semibold text-[#242424] dark:text-white">
          Follow Us
        </h3>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          {socialLinks.map((social) => {
            const Icon = social.icon;

            return social.href ? (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit WAYLUME on ${social.name}`}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#333333] text-[#242424] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#242424] hover:text-white dark:border-white/60 dark:text-white dark:hover:bg-white dark:hover:text-[#242424]"
              >
                <Icon
                  aria-hidden="true"
                  className="text-[15px]"
                />
              </a>
            ) : (
              <span
                key={social.name}
                title={`${social.name} coming soon`}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#bdbdbd] text-[#999999] dark:border-white/25 dark:text-[#888888]"
              >
                <Icon
                  aria-hidden="true"
                  className="text-[15px]"
                />
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ContactForm({
  initialTripSlug,
  initialDeparture,
  initialReturnDate,
}) {
  const formRef = useRef(null);
  const dateDialogRef = useRef(null);

  const [form, setForm] = useState({
    ...initialForm,
    destination: initialTripSlug,
    startDate: initialDeparture,
    endDate: initialReturnDate,
  });

  const [temporaryDates, setTemporaryDates] = useState({
    startDate: initialDeparture,
    endDate: initialReturnDate,
  });

  const [errors, setErrors] = useState({});
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    if (!feedback) return;

    const timer = window.setTimeout(() => {
      setFeedback(null);
    }, 7000);

    return () => window.clearTimeout(timer);
  }, [feedback]);

  const updateField = (field, value) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [field]: "",
    }));

    setFeedback(null);
  };

  const openDatePicker = () => {
    setTemporaryDates({
      startDate: form.startDate,
      endDate: form.endDate,
    });

    dateDialogRef.current?.showModal();
  };

  const closeDatePicker = () => {
    dateDialogRef.current?.close();
  };

  const applyDates = () => {
    const { startDate, endDate } = temporaryDates;

    if (!startDate || !endDate || endDate < startDate) return;

    setForm((previous) => ({
      ...previous,
      startDate,
      endDate,
    }));

    setErrors((previous) => ({
      ...previous,
      dates: "",
    }));

    setFeedback(null);
    closeDatePicker();
  };

  const clearDates = () => {
    setTemporaryDates({
      startDate: "",
      endDate: "",
    });

    setForm((previous) => ({
      ...previous,
      startDate: "",
      endDate: "",
    }));

    setErrors((previous) => ({
      ...previous,
      dates: "",
    }));

    setFeedback(null);
    closeDatePicker();
  };

  const validateForm = () => {
    const nextErrors = {};

    if (form.fullName.trim().length < 2) {
      nextErrors.fullName = "Please enter your full name.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (!form.destination) {
      nextErrors.destination = "Please select a destination.";
    }

    if (
      (form.startDate && !form.endDate) ||
      (!form.startDate && form.endDate) ||
      (form.startDate && form.endDate < form.startDate)
    ) {
      nextErrors.dates = "Please select a valid travel date range.";
    }

    if (form.message.trim().length < 10) {
      nextErrors.message =
        "Please write a message of at least 10 characters.";
    }

    return nextErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationErrors = validateForm();

    setErrors(validationErrors);
    setFeedback(null);

    if (Object.keys(validationErrors).length > 0) {
      const firstField = Object.keys(validationErrors)[0];

      if (firstField === "dates") {
        openDatePicker();
      } else {
        formRef.current
          ?.querySelector(`[name="${firstField}"]`)
          ?.focus();
      }

      return;
    }

    const selectedTrip = trips.find(
      (trip) => trip.slug === form.destination
    );

    const destinationName =
      selectedTrip?.title ||
      (form.destination === "other"
        ? "Other / Not Sure Yet"
        : form.destination);

    const inquiry = {
      fullName: form.fullName.trim(),
      email: form.email.trim(),
      destination: destinationName,
      tripSlug: selectedTrip?.slug || null,
      startDate: form.startDate || null,
      endDate: form.endDate || null,
      message: form.message.trim(),
      createdAt: new Date().toISOString(),
    };

    const firstName = inquiry.fullName.split(/\s+/)[0];

    try {
      window.sessionStorage.setItem(
        "waylume-contact-inquiry",
        JSON.stringify(inquiry)
      );

      if (contactEmail) {
        const emailSubject = `WAYLUME Travel Inquiry - ${destinationName}`;

        const emailBody = [
          `Full Name: ${inquiry.fullName}`,
          `Email: ${inquiry.email}`,
          `Destination: ${inquiry.destination}`,
          `Travel From: ${inquiry.startDate || "Flexible"}`,
          `Travel To: ${inquiry.endDate || "Flexible"}`,
          "",
          "Message:",
          inquiry.message,
        ].join("\n");

        const mailtoUrl = `mailto:${contactEmail}?subject=${encodeURIComponent(
          emailSubject
        )}&body=${encodeURIComponent(emailBody)}`;

        setFeedback({
          id: Date.now(),
          type: "success",
          title: "Your inquiry is ready!",
          message: `Thank you, ${firstName}! Your travel inquiry has been prepared.`,
          note: "Complete the process by sending the message in your email application.",
        });

        window.location.href = mailtoUrl;
      } else {
        setFeedback({
          id: Date.now(),
          type: "success",
          title: "Your inquiry is ready!",
          message: `Thank you, ${firstName}! Your travel inquiry has been saved in this browser.`,
          note: "Your message hasn't been delivered yet.",
        });
      }
    } catch {
      setFeedback({
        id: Date.now(),
        type: "error",
        title: "Unable to save your inquiry",
        message:
          "We couldn't save your information in this browser. Please try again.",
      });
    }
  };

  const dateLabel =
    form.startDate && form.endDate
      ? `${formatDate(form.startDate)} – ${formatDate(form.endDate)}`
      : "Select your dates";

  return (
    <>
      <div className="rounded-[15px] border border-[#e6e8eb] bg-white p-5.5 shadow-[0_5px_28px_rgba(0,0,0,0.015)] transition-colors duration-300 dark:border-white/10 dark:bg-[#1c1e20] sm:p-8 lg:p-7 xl:p-8.5">
        <h2 className="font-heading text-[26px] leading-[1.2] font-semibold tracking-[-0.055em] text-[#242424] dark:text-white sm:text-[30px] lg:text-[32px]">
          Let&apos;s Start Your Journey
        </h2>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          noValidate
          className="mt-7 space-y-5"
        >
          <div>
            <label htmlFor="contact-name" className={labelClass}>
              Fullname
            </label>

            <input
              id="contact-name"
              name="fullName"
              type="text"
              value={form.fullName}
              onChange={(event) =>
                updateField("fullName", event.target.value)
              }
              placeholder="John Doe"
              autoComplete="name"
              aria-invalid={Boolean(errors.fullName)}
              className={inputClass}
            />

            {errors.fullName && (
              <p
                role="alert"
                className="mt-1.5 text-[11px] text-red-500"
              >
                {errors.fullName}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="contact-email" className={labelClass}>
              Email Address
            </label>

            <input
              id="contact-email"
              name="email"
              type="email"
              value={form.email}
              onChange={(event) =>
                updateField("email", event.target.value)
              }
              placeholder="ex@mail.com"
              autoComplete="email"
              aria-invalid={Boolean(errors.email)}
              className={inputClass}
            />

            {errors.email && (
              <p
                role="alert"
                className="mt-1.5 text-[11px] text-red-500"
              >
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="contact-destination" className={labelClass}>
              Destination of Interest
            </label>

            <div className="relative">
              <select
                id="contact-destination"
                name="destination"
                value={form.destination}
                onChange={(event) =>
                  updateField("destination", event.target.value)
                }
                aria-invalid={Boolean(errors.destination)}
                className={`${inputClass} appearance-none pr-11`}
              >
                <option value="">
                  Select your destination
                </option>

                {trips.map((trip) => (
                  <option key={trip.slug} value={trip.slug}>
                    {trip.location}
                  </option>
                ))}

                <option value="other">
                  Other / Not Sure Yet
                </option>
              </select>

              <IoChevronDownOutline
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-[17px] text-[#555555] dark:text-[#dddddd]"
              />
            </div>

            {errors.destination && (
              <p
                role="alert"
                className="mt-1.5 text-[11px] text-red-500"
              >
                {errors.destination}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="contact-dates" className={labelClass}>
              Preferred Travel Dates
            </label>

            <button
              id="contact-dates"
              type="button"
              onClick={openDatePicker}
              aria-haspopup="dialog"
              className={`flex h-11 w-full items-center justify-between gap-3 rounded-[5px] border bg-white px-3.5 text-left text-[13px] transition-colors duration-300 hover:border-[#aaaaaa] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#242424] dark:bg-[#252729] dark:focus-visible:outline-white ${
                errors.dates
                  ? "border-red-400"
                  : "border-[#e7e9ec] dark:border-white/15"
              }`}
            >
              <span
                className={
                  form.startDate
                    ? "min-w-0 truncate text-[#242424] dark:text-white"
                    : "text-[#aaaaaa] dark:text-[#858585]"
                }
              >
                {dateLabel}
              </span>

              <IoCalendarOutline
                aria-hidden="true"
                className="shrink-0 text-[19px] text-[#292929] dark:text-white"
              />
            </button>

            {errors.dates && (
              <p
                role="alert"
                className="mt-1.5 text-[11px] text-red-500"
              >
                {errors.dates}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="contact-message" className={labelClass}>
              Message
            </label>

            <textarea
              id="contact-message"
              name="message"
              value={form.message}
              onChange={(event) =>
                updateField("message", event.target.value)
              }
              placeholder="Enter your message"
              rows={5}
              aria-invalid={Boolean(errors.message)}
              className="min-h-28 w-full resize-y rounded-[5px] border border-[#e7e9ec] bg-white px-3.5 py-3 text-[13px] leading-[1.7] text-[#242424] outline-none transition-colors duration-300 placeholder:text-[#aaaaaa] focus:border-[#777777] focus:ring-2 focus:ring-[#242424]/5 dark:border-white/15 dark:bg-[#252729] dark:text-white dark:placeholder:text-[#858585] dark:focus:border-white/50"
            />

            {errors.message && (
              <p
                role="alert"
                className="mt-1.5 text-[11px] text-red-500"
              >
                {errors.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="group relative flex h-11 w-full items-center justify-center overflow-hidden rounded-[5px] bg-[#242424] px-5 text-[13px] font-semibold text-white transition-all duration-300 hover:bg-[#444444] hover:shadow-[0_8px_20px_rgba(0,0,0,0.12)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#242424] dark:bg-white dark:text-[#242424] dark:hover:bg-[#e9e9e9]"
          >
            Send
          </button>
        </form>
      </div>

      <ConfirmationToast
        feedback={feedback}
        onClose={() => setFeedback(null)}
      />

      <dialog
        ref={dateDialogRef}
        aria-labelledby="contact-date-dialog-title"
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            closeDatePicker();
          }
        }}
        className="fixed inset-0 m-auto w-[calc(100%-32px)] max-w-115 rounded-[15px] border border-[#e8e8e8] bg-white p-0 text-[#242424] shadow-[0_25px_90px_rgba(0,0,0,0.2)] backdrop:bg-black/65 backdrop:backdrop-blur-xs dark:border-white/10 dark:bg-[#1e2022] dark:text-white"
      >
        <div className="flex items-center justify-between border-b border-[#eeeeee] px-5 py-4 dark:border-white/10">
          <h2
            id="contact-date-dialog-title"
            className="font-heading text-[19px] font-semibold tracking-[-0.035em]"
          >
            Select Travel Dates
          </h2>

          <button
            type="button"
            onClick={closeDatePicker}
            aria-label="Close date picker"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f5f5f5] text-[#242424] transition-transform duration-300 hover:rotate-90 dark:bg-[#303234] dark:text-white"
          >
            <IoCloseOutline
              aria-hidden="true"
              className="text-[21px]"
            />
          </button>
        </div>

        <div className="space-y-5 px-5 py-6">
          <div>
            <label
              htmlFor="contact-start-date"
              className={labelClass}
            >
              Departure Date
            </label>

            <input
              id="contact-start-date"
              type="date"
              value={temporaryDates.startDate}
              onChange={(event) =>
                setTemporaryDates({
                  startDate: event.target.value,
                  endDate:
                    temporaryDates.endDate &&
                    temporaryDates.endDate < event.target.value
                      ? ""
                      : temporaryDates.endDate,
                })
              }
              className={inputClass}
            />
          </div>

          <div>
            <label
              htmlFor="contact-end-date"
              className={labelClass}
            >
              Return Date
            </label>

            <input
              id="contact-end-date"
              type="date"
              min={temporaryDates.startDate || undefined}
              value={temporaryDates.endDate}
              onChange={(event) =>
                setTemporaryDates((previous) => ({
                  ...previous,
                  endDate: event.target.value,
                }))
              }
              className={inputClass}
            />
          </div>

          <p className="text-[12px] leading-[1.7] text-[#858585] dark:text-[#aaaaaa]">
            Select the travel dates that work best for you.
          </p>

          <div className="flex items-center justify-between gap-3 border-t border-[#eeeeee] pt-5 dark:border-white/10">
            <button
              type="button"
              onClick={clearDates}
              className="text-[13px] font-medium text-[#777777] transition-colors hover:text-[#242424] dark:text-[#aaaaaa] dark:hover:text-white"
            >
              Clear Dates
            </button>

            <button
              type="button"
              onClick={applyDates}
              disabled={
                !temporaryDates.startDate ||
                !temporaryDates.endDate ||
                temporaryDates.endDate < temporaryDates.startDate
              }
              className="h-10 rounded-lg bg-[#242424] px-5 text-[12px] font-medium text-white transition-colors hover:bg-[#454545] disabled:cursor-not-allowed disabled:opacity-40 dark:bg-white dark:text-[#242424] dark:hover:bg-[#e8e8e8]"
            >
              Apply Dates
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}

function ContactFAQs() {
  const [activeFAQ, setActiveFAQ] = useState(faqs[0].id);

  return (
    <section
      id="travel-faqs"
      aria-labelledby="travel-faq-heading"
      className="bg-white pt-15 pb-23 transition-colors duration-300 dark:bg-[#101112] sm:pt-20 sm:pb-28 lg:pt-24 lg:pb-33"
    >
      <Container>
        <Reveal>
          <h2
            id="travel-faq-heading"
            className="font-heading text-center text-[30px] leading-[1.2] font-semibold tracking-[-0.055em] text-[#242424] dark:text-white sm:text-[36px] lg:text-[40px]"
          >
            Travel FAQs For A Smooth Journey
          </h2>
        </Reveal>

        <div className="mt-14 sm:mt-18 lg:mt-22">
          {faqs.map((faq, index) => {
            const isOpen = activeFAQ === faq.id;

            return (
              <Reveal key={faq.id} delay={(index % 5) * 70}>
                <article className="border-b border-[#e9e9e9] dark:border-white/10">
                  <h3>
                    <button
                      type="button"
                      onClick={() =>
                        setActiveFAQ(isOpen ? null : faq.id)
                      }
                      aria-expanded={isOpen}
                      aria-controls={`${faq.id}-answer`}
                      className="group grid w-full grid-cols-[56px_minmax(0,1fr)_36px] items-start gap-4 py-6 text-left outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#242424] dark:focus-visible:outline-white sm:grid-cols-[110px_minmax(0,1fr)_40px] sm:gap-6 sm:py-7 lg:grid-cols-[160px_minmax(0,1fr)_42px]"
                    >
                      <span className="font-heading pt-0.5 text-[17px] font-medium tracking-[-0.035em] text-[#292929] dark:text-white sm:text-[19px]">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <span className="font-heading text-[17px] leading-[1.45] font-medium tracking-[-0.04em] text-[#292929] transition-colors duration-300 group-hover:text-[#777777] dark:text-white dark:group-hover:text-[#cccccc] sm:text-[19px] lg:text-[21px]">
                        {faq.question}
                      </span>

                      <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#e5e5e5] text-[#333333] transition-all duration-300 group-hover:border-[#999999] dark:border-white/20 dark:text-white sm:h-9 sm:w-9">
                        {isOpen ? (
                          <IoRemoveOutline
                            aria-hidden="true"
                            className="text-[18px]"
                          />
                        ) : (
                          <IoAddOutline
                            aria-hidden="true"
                            className="text-[18px]"
                          />
                        )}
                      </span>
                    </button>
                  </h3>

                  <div
                    id={`${faq.id}-answer`}
                    className={`grid transition-[grid-template-rows,opacity] duration-400 ease-out motion-reduce:transition-none ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="min-h-0 overflow-hidden">
                      <p className="max-w-180 pb-7 pl-18 text-[14px] leading-[1.8] text-[#858585] dark:text-[#aaaaaa] sm:pl-34 sm:text-[16px] lg:pl-46">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export default function ContactPageClient({
  initialTripSlug = "",
  initialDeparture = "",
  initialReturnDate = "",
}) {
  return (
    <>
      <section
        id="contact"
        aria-labelledby="contact-heading"
        className="bg-white pt-10 pb-12 transition-colors duration-300 dark:bg-[#101112] sm:pt-14 sm:pb-15 lg:pt-18 lg:pb-18"
      >
        <Container>
          <div className="grid min-w-0 items-stretch gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-10 xl:gap-14">
            <div className="flex min-w-0 flex-col">
              <Reveal>
                <h1
                  id="contact-heading"
                  className="font-heading max-w-165 text-[clamp(40px,6vw,58px)] leading-[1.07] font-medium tracking-[-0.065em] text-[#242424] dark:text-white sm:text-[clamp(48px,5vw,66px)] lg:text-[clamp(47px,4.5vw,70px)]"
                >
                  Get In Touch With
                  <br />
                  WAYLUME
                </h1>
              </Reveal>

              <Reveal delay={100}>
                <p className="mt-6 max-w-125 text-[14px] leading-[1.75] text-[#858585] dark:text-[#aaaaaa] sm:text-[16px] lg:text-[17px]">
                  Have questions about your next adventure? Our team
                  is just a message away, ready to guide you with
                  thoughtful travel inspiration and helpful information.
                </p>
              </Reveal>

              <Reveal delay={180} className="mt-14 lg:mt-auto lg:pt-16">
                <ContactInformation />
              </Reveal>
            </div>

            <Reveal delay={130} className="min-w-0">
              <ContactForm
                initialTripSlug={initialTripSlug}
                initialDeparture={initialDeparture}
                initialReturnDate={initialReturnDate}
              />
            </Reveal>
          </div>
        </Container>
      </section>

      <ContactFAQs />
    </>
  );
}