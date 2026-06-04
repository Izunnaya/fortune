import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CALENDLY_URL, CONTACT } from "../constants";
import { useReducedMotion } from "../hooks/useReducedMotion";

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
    };
  }
}

function loadCalendlyAssets(): Promise<void> {
  return new Promise((resolve) => {
    if (!document.querySelector('link[href*="calendly"]')) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://assets.calendly.com/assets/external/widget.css";
      document.head.appendChild(link);
    }

    if (document.querySelector('script[src*="calendly"]')) {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    script.onload = () => resolve();
    document.head.appendChild(script);
  });
}

export default function Booking() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      if (contentRef.current) gsap.set(contentRef.current, { opacity: 1, y: 0 });
      return;
    }

    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 80%",
      onEnter: () => {
        gsap.fromTo(
          contentRef.current,
          { y: 80, opacity: 0, scale: 0.97 },
          { y: 0, opacity: 1, scale: 1, duration: 0.9, ease: "power3.out" }
        );
      },
      onLeaveBack: () => {
        gsap.set(contentRef.current, { y: 80, opacity: 0, scale: 0.97 });
      },
    });

    return () => st.kill();
  }, [prefersReducedMotion]);

  const handleBookClick = useCallback(async () => {
    await loadCalendlyAssets();
    window.Calendly?.initPopupWidget({ url: CALENDLY_URL });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="booking"
      className="bg-charcoal px-[clamp(24px,5vw,80px)] py-[clamp(60px,10vw,120px)]"
    >
      <div ref={contentRef} className="max-w-[800px] mx-auto text-center" style={{ opacity: 0 }}>
        <span className="font-mono text-xs font-bold uppercase tracking-[0.1em] text-gold block mb-4">
          BOOKING
        </span>
        <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[1.05] font-normal text-paper mb-4">
          Start a Project
        </h2>
        <p className="font-mono text-base leading-[1.7] text-paper/80 max-w-[560px] mx-auto mb-12">
          Free 30-minute consultation, no obligation. Pick a time that works for you —
          you'll receive a confirmation email with all the details immediately after booking.
        </p>

        <button
          onClick={handleBookClick}
          className="bg-gold text-charcoal font-mono text-[13px] font-bold uppercase tracking-[0.06em] py-[18px] px-10 rounded-full border-none cursor-pointer transition-all duration-300 hover:bg-[#D4B76E] hover:scale-[1.03]"
        >
          Book a Free Consultation
        </button>

        <p className="font-mono text-[13px] text-medium-gray mt-8">
          Prefer email?{" "}
          <a href={`mailto:${CONTACT.email}`} className="text-gold no-underline">
            {CONTACT.email}
          </a>
          {" "}or call{" "}
          <a href={`tel:${CONTACT.phone}`} className="text-gold no-underline">
            {CONTACT.phoneDisplay}
          </a>
        </p>
      </div>
    </section>
  );
}
