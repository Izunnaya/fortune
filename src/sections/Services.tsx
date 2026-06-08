import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "../hooks/useReducedMotion";

const services = [
  {
    title: "Drone & Aerial",
    desc: "Real estate showcases, property inspections, and cinematic aerial coverage. Every flight delivers perspectives that ground-based cameras simply cannot achieve.",
  },
  {
    title: "Event Coverage",
    desc: "From corporate launches to intimate celebrations — capturing the energy, emotion, and key moments that tell the full story.",
  },
  {
    title: "Commercial & Brand",
    desc: "Product launches, brand campaigns, and social content designed to stop the scroll and drive engagement.",
  },
  {
    title: "Video Editing",
    desc: "Post-production that transforms raw footage into polished narratives. Color grading, sound design, and pacing that holds attention.",
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll(".service-card");

    if (prefersReducedMotion) {
      if (cards) gsap.set(cards, { opacity: 1, y: 0 });
      return;
    }

    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 75%",
      onEnter: () => {
        const cs = sectionRef.current?.querySelectorAll(".service-card");
        if (cs && cs.length > 0) {
          gsap.fromTo(
            cs,
            { y: 80, opacity: 0, scale: 0.94 },
            { y: 0, opacity: 1, scale: 1, duration: 0.9, stagger: 0.15, ease: "power3.out" }
          );
        }
      },
      onLeaveBack: () => {
        const cs = sectionRef.current?.querySelectorAll(".service-card");
        if (cs) gsap.set(cs, { y: 80, opacity: 0, scale: 0.94 });
      },
    });

    return () => st.kill();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="bg-warm-sand px-[clamp(24px,5vw,80px)] py-[clamp(60px,10vw,120px)] overflow-hidden"
    >
      <div className="max-w-[1200px] mx-auto">

        {/* Header */}
        <div className="mb-12">
          <span className="font-mono text-xs font-bold uppercase tracking-[0.1em] text-gold block mb-4">
            SERVICES
          </span>
          <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[1.05] font-normal text-charcoal m-0">
            What I Create
          </h2>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service, i) => (
            <div
              key={service.title}
              className="service-card group bg-paper/60 border border-charcoal/10 rounded-lg p-10 relative cursor-default transition-all duration-300 hover:border-charcoal/30 hover:-translate-y-1"
              style={{ opacity: 0 }}
            >
              <span
                aria-hidden="true"
                className="font-data text-5xl text-gold/20 block leading-none mb-4"
              >
                0{i + 1}
              </span>
              <h3 className="font-display text-2xl font-normal text-charcoal mb-3">
                {service.title}
              </h3>
              <p className="font-mono text-base leading-[1.6] text-charcoal/80 m-0">
                {service.desc}
              </p>
              <span
                aria-hidden="true"
                className="absolute bottom-6 right-6 text-gold text-xl transition-transform duration-300 group-hover:translate-x-1"
              >
                &rarr;
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
