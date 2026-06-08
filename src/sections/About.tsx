import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "../hooks/useReducedMotion";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const textEl = sectionRef.current?.querySelector(".about-text");
    const imgEl = sectionRef.current?.querySelector(".about-image");

    if (prefersReducedMotion) {
      if (textEl) gsap.set(textEl, { opacity: 1, x: 0 });
      if (imgEl) gsap.set(imgEl, { opacity: 1, x: 0 });
      return;
    }

    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 75%",
      onEnter: () => {
        if (textEl)
          gsap.fromTo(
            textEl,
            { x: -80, opacity: 0, scale: 0.97 },
            { x: 0, opacity: 1, scale: 1, duration: 1, ease: "power3.out" },
          );
        if (imgEl)
          gsap.fromTo(
            imgEl,
            { x: 80, opacity: 0, scale: 0.97 },
            { x: 0, opacity: 1, scale: 1, duration: 1, ease: "power3.out", delay: 0.2 },
          );
      },
      onLeaveBack: () => {
        if (textEl) gsap.set(textEl, { x: -80, opacity: 0, scale: 0.97 });
        if (imgEl) gsap.set(imgEl, { x: 80, opacity: 0, scale: 0.97 });
      },
    });

    return () => st.kill();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="bg-charcoal px-[clamp(24px,5vw,80px)] py-[clamp(60px,10vw,120px)] overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto grid lg:grid-cols-[55%_45%] gap-12 items-start">

        {/* Text */}
        <div className="about-text order-2 lg:order-1" style={{ opacity: 0 }}>
          <span className="font-mono text-xs font-bold uppercase tracking-[0.1em] text-gold block mb-6">
            ABOUT
          </span>
          <h2 className="font-display text-[clamp(1.5rem,3vw,2.5rem)] leading-[1.1] font-normal text-paper mb-6">
            Precision &amp; Vision, From Every Angle
          </h2>
          <p className="font-mono text-lg leading-[1.7] text-paper/85 max-w-[640px] mb-5">
            I started with art. Grew into content. Then took to the skies.{" "}
            <br className="mb-10"></br>
            <p className="mt-5">
              A background in Arts and Design taught me to see balance, detail,
              and meaning beyond the surface. In 2025 I became a drone pilot,
              and it completely changed how I tell stories entirely.
            </p>
          </p>
          <div className="h-px bg-gold/20 w-20 mb-4" />
          <span className="font-mono text-sm text-medium-gray">
            Lagos, Nigeria &middot; Available Worldwide
          </span>
        </div>

        {/* Image */}
        <div className="about-image order-1 lg:order-2 lg:-mt-10" style={{ opacity: 0 }}>
          <div className="rounded overflow-hidden">
            <img
              src="/images/about-portrait.jpg"
              alt="Emeruem Chisom Fortune — Creative Director & Founder of Fortune Artz and Creatives"
              className="w-full object-cover max-h-[580px] object-top"
              loading="lazy"
            />
          </div>
          <p className="font-mono text-xs text-medium-gray mt-3">
            Emeruem Chisom Fortune — Founder
          </p>
        </div>

      </div>
    </section>
  );
}
