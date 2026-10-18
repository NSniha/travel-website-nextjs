"use client";

import { useEffect, useRef, useState } from "react";

export default function CountUp({ end = 0, duration = 1800, suffix = "" }) {
  const elementRef = useRef(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    let frameId;
    let hasAnimated = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimated) return;

        hasAnimated = true;
        observer.unobserve(element);

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          setCount(end);
          return;
        }

        const startTime = performance.now();

        const animate = (currentTime) => {
          const progress = Math.min((currentTime - startTime) / duration, 1);
          const easedProgress = 1 - Math.pow(1 - progress, 3);

          setCount(Math.round(end * easedProgress));

          if (progress < 1) frameId = requestAnimationFrame(animate);
        };

        frameId = requestAnimationFrame(animate);
      },
      { threshold: 0.35 },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [end, duration]);

  return (
    <span ref={elementRef}>
      <span aria-hidden="true">{new Intl.NumberFormat("en-US").format(count)}{suffix}</span>
      <span className="sr-only">{new Intl.NumberFormat("en-US").format(end)}{suffix}</span>
    </span>
  );
}