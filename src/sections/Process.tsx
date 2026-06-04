import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "../hooks/useReducedMotion";

const steps = [
  {
    number: "01",
    title: "Consultation & Brief",
    desc: "I get to understand your vision, objectives, and project scope. This is where the story begins.",
  },
  {
    number: "02",
    title: "Concept & Planning",
    desc: "Moodboards, shot lists, storyboard sketches, locations, props, drone usage — every detail mapped out.",
  },
  {
    number: "03",
    title: "Production / Shoot",
    desc: "The shoot — whether aerial, ground, or both. Professional equipment, precise execution, minimal disruption.",
  },
  {
    number: "04",
    title: "Editing / Post-Production",
    desc: "Assembly, color grading, sound design, and revisions. Your feedback shapes the final cut.",
  },
  {
    number: "05",
    title: "Review & Final Delivery",
    desc: "Final files in your preferred formats, optimized for web, social, or broadcast. Ready to publish.",
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const mm = gsap.matchMedia();
    const triggers: ScrollTrigger[] = [];

    mm.add("(min-width: 1024px)", () => {
      if (!trackRef.current || !sectionRef.current) return;
      const totalWidth = trackRef.current.scrollWidth - window.innerWidth;

      const st = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: () => `+=${totalWidth}`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        onUpdate: (self) => {
          if (trackRef.current) {
            gsap.set(trackRef.current, { x: -totalWidth * self.progress });
          }
        },
      });
      triggers.push(st);
    });

    mm.add("(max-width: 1024px)", () => {
      if (trackRef.current) gsap.set(trackRef.current, { x: 0 });
    });

    return () => {
      triggers.forEach((st) => st.kill());
      mm.revert();
    };
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      style={{
        backgroundColor: "#181819",
        padding: "clamp(60px, 10vw, 120px) 0",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "0 clamp(24px, 5vw, 80px)",
          maxWidth: "1400px",
          margin: "0 auto 60px",
        }}
      >
        <span
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "12px",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "#C8A55C",
            display: "block",
            marginBottom: "16px",
          }}
        >
          PROCESS
        </span>
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            lineHeight: 1.05,
            fontWeight: 400,
            color: "#F4F1EA",
            margin: 0,
          }}
        >
          How We Work Together
        </h2>
      </div>

      {/* Horizontal Track */}
      <div ref={trackRef} className="flex flex-col lg:flex-row lg:flex-nowrap">
        {steps.map((step, index) => (
          <div
            key={step.number}
            className="lg:flex-shrink-0 lg:w-[1024px] lg:min-h-[60vh]"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "40px clamp(24px, 5vw, 80px)",
              borderLeft:
                index > 0 ? "1px solid rgba(200, 165, 92, 0.3)" : "none",
            }}
          >
            <span
              aria-hidden="true"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "clamp(4rem, 10vw, 8rem)",
                color: "rgba(200, 165, 92, 0.15)",
                display: "block",
                lineHeight: 1,
                marginBottom: "16px",
              }}
            >
              {step.number}
            </span>
            <h3
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
                lineHeight: 1.1,
                fontWeight: 400,
                color: "#F4F1EA",
                margin: "0 0 16px",
              }}
            >
              {step.title}
            </h3>
            <p
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "18px",
                lineHeight: 1.7,
                color: "rgba(244, 241, 234, 0.8)",
                maxWidth: "400px",
                margin: 0,
              }}
            >
              {step.desc}
            </p>
            {index < steps.length - 1 && (
              <div
                className="lg:hidden"
                style={{
                  height: "1px",
                  backgroundColor: "rgba(200, 165, 92, 0.3)",
                  marginTop: "40px",
                }}
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
