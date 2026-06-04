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
      className="bg-charcoal py-[clamp(60px,10vw,120px)] overflow-hidden"
    >
      {/* Header */}
      <div className="px-[clamp(24px,5vw,80px)] max-w-[1400px] mx-auto mb-[60px]">
        <span className="font-mono text-xs font-bold uppercase tracking-[0.1em] text-gold block mb-4">
          PROCESS
        </span>
        <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[1.05] font-normal text-paper m-0">
          How We Work Together
        </h2>
      </div>

      {/* Horizontal Track */}
      <div ref={trackRef} className="flex flex-col lg:flex-row lg:flex-nowrap">
        {steps.map((step, index) => (
          <div
            key={step.number}
            className={`lg:flex-shrink-0 lg:w-[1024px] lg:min-h-[60vh] flex flex-col justify-center py-10 px-[clamp(24px,5vw,80px)] ${
              index > 0 ? "border-l border-gold/30" : ""
            }`}
          >
            <span
              aria-hidden="true"
              className="font-data text-[clamp(4rem,10vw,8rem)] text-gold/[0.15] block leading-none mb-4"
            >
              {step.number}
            </span>
            <h3 className="font-display text-[clamp(1.5rem,3vw,2.5rem)] leading-[1.1] font-normal text-paper mb-4">
              {step.title}
            </h3>
            <p className="font-mono text-lg leading-[1.7] text-paper/80 max-w-[400px] m-0">
              {step.desc}
            </p>
            {index < steps.length - 1 && (
              <div className="lg:hidden h-px bg-gold/30 mt-10" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
