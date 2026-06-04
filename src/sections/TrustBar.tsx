import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "../hooks/useReducedMotion";

const stats = [
  { target: 7,    suffix: "+", label: "Years Experience" },
  { target: 1000, suffix: "+", label: "Flight Hours" },
  { target: 500,  suffix: "+", label: "Projects Completed" },
  { target: 100,  suffix: "s", label: "of Events Covered" },
];

export default function TrustBar() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const items = sectionRef.current?.querySelectorAll(".stat-item");
    if (!items || items.length === 0) return;

    if (prefersReducedMotion) {
      gsap.set(items, { opacity: 1, y: 0 });
      items.forEach((item, i) => {
        const el = item.querySelector(".stat-number");
        if (el) el.textContent = stats[i].target + stats[i].suffix;
      });
      return;
    }

    const runAnimation = () => {
      // Slide-in animation
      gsap.fromTo(
        items,
        { y: 60, opacity: 0, scale: 0.92 },
        { y: 0, opacity: 1, scale: 1, duration: 0.9, stagger: 0.18, ease: "power3.out" }
      );

      // Count-up for each number
      items.forEach((item, i) => {
        const el = item.querySelector(".stat-number");
        if (!el) return;
        const proxy = { val: 0 };
        gsap.to(proxy, {
          val: stats[i].target,
          duration: 1.8,
          delay: i * 0.18,
          ease: "power2.out",
          onUpdate() {
            el.textContent = Math.round(proxy.val) + stats[i].suffix;
          },
        });
      });
    };

    const resetItems = () => {
      gsap.killTweensOf(items);
      gsap.set(items, { y: 60, opacity: 0, scale: 0.92 });
      items.forEach((item, i) => {
        const el = item.querySelector(".stat-number");
        if (el) el.textContent = "0" + stats[i].suffix;
      });
    };

    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 85%",
      onEnter: runAnimation,
      onLeaveBack: resetItems,
    });

    return () => st.kill();
  }, [prefersReducedMotion]);

  return (
    <section ref={sectionRef} className="bg-deep-black py-10 px-6">
      <div className="max-w-[1400px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat) => (
          <div key={stat.label} className="stat-item text-center" style={{ opacity: 0 }}>
            <span className="stat-number font-data text-[clamp(2rem,5vw,4rem)] leading-none text-gold block">
              0{stat.suffix}
            </span>
            <span className="font-mono text-sm text-medium-gray block mt-2">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
