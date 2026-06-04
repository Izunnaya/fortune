import { useEffect, useRef } from "react";
import gsap from "gsap";
import { scrollToSection } from "../utils/scroll";
import { useReducedMotion } from "../hooks/useReducedMotion";

export default function Hero() {
  const heading1Ref = useRef<HTMLHeadingElement>(null);
  const heading2Ref = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const refs = [heading1Ref, heading2Ref, subtitleRef, ctaRef, scrollRef];

    if (prefersReducedMotion) {
      refs.forEach((ref) => {
        if (ref.current) gsap.set(ref.current, { opacity: 1, y: 0 });
      });
      return;
    }

    const tl = gsap.timeline({ delay: 0.3 });
    tl.to(heading1Ref.current, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" })
      .to(heading2Ref.current, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.5")
      .to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.5")
      .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.4")
      .to(scrollRef.current, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.3");

    return () => { tl.kill(); };
  }, [prefersReducedMotion]);

  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">

      {/* Decorative drone video background */}
      <video
        autoPlay muted loop playsInline aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover z-0"
        poster="/images/thumb-drone.jpg"
      >
        <source src="/videos/video-drone.mp4" type="video/mp4" />
      </video>

      {/* Dark gradient overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[1]"
        style={{ background: "linear-gradient(180deg, rgba(24,24,25,0.4) 0%, rgba(24,24,25,0.65) 50%, rgba(24,24,25,0.85) 100%)" }}
      />

      {/* Content */}
      <div className="relative z-[2] flex flex-col items-center text-center px-6 max-w-[900px]">
        <h1
          ref={heading1Ref}
          className="font-display text-[clamp(3rem,8vw,7rem)] leading-none tracking-[-0.02em] font-normal text-paper m-0"
          style={{ opacity: 0, transform: "translateY(20px)" }}
        >
          Fortune
        </h1>
        <h2
          ref={heading2Ref}
          className="font-display text-[clamp(2rem,5vw,4rem)] leading-[1.05] tracking-[-0.02em] font-normal text-paper m-0"
          style={{ opacity: 0, transform: "translateY(20px)" }}
        >
          Artz <span className="text-gold">&amp;</span> Creatives
        </h2>

        <p
          ref={subtitleRef}
          className="font-mono text-base text-paper/80 mt-6"
          style={{ opacity: 0, transform: "translateY(20px)" }}
        >
          Drone Pilot &middot; Video Editor &middot; Content Strategist &middot; Visual Artist
        </p>

        <div
          ref={ctaRef}
          className="flex flex-wrap items-center justify-center gap-4 mt-12"
          style={{ opacity: 0, transform: "translateY(20px)" }}
        >
          <button
            onClick={() => scrollToSection("#booking")}
            className="bg-gold text-charcoal font-mono text-xs font-bold uppercase tracking-[0.05em] py-4 px-8 rounded-full border-none cursor-pointer transition-all duration-300 hover:bg-[#D4B76E] hover:scale-[1.02]"
          >
            Book a Consultation
          </button>
          <button
            onClick={() => scrollToSection("#portfolio")}
            className="bg-transparent text-paper font-mono text-xs font-bold uppercase tracking-[0.05em] py-4 px-8 rounded-full border border-paper/30 cursor-pointer transition-all duration-300 hover:border-paper/60"
          >
            View Selected Work
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        aria-hidden="true"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[2]"
        style={{ opacity: 0 }}
      >
        <div className="animate-scroll-pulse w-px h-12 bg-gold/50" />
      </div>
    </section>
  );
}
