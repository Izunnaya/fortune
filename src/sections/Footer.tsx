import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { NAV_LINKS, CONTACT } from "../constants";
import { scrollToSection } from "../utils/scroll";
import { useReducedMotion } from "../hooks/useReducedMotion";

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      if (contentRef.current) gsap.set(contentRef.current, { opacity: 1, y: 0 });
      return;
    }

    const triggers: ScrollTrigger[] = [];

    const st1 = ScrollTrigger.create({
      trigger: footerRef.current,
      start: "top 85%",
      onEnter: () => {
        gsap.fromTo(
          contentRef.current,
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" }
        );
      },
      onLeaveBack: () => {
        gsap.set(contentRef.current, { y: 60, opacity: 0 });
      },
    });
    triggers.push(st1);

    const st2 = ScrollTrigger.create({
      trigger: footerRef.current,
      start: "top bottom",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        if (wordmarkRef.current) {
          gsap.set(wordmarkRef.current, { y: self.progress * 30 });
        }
      },
    });
    triggers.push(st2);

    return () => triggers.forEach((t) => t.kill());
  }, [prefersReducedMotion]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    scrollToSection(href);
  };

  return (
    <footer
      ref={footerRef}
      className="bg-deep-black px-[clamp(24px,5vw,80px)] pt-20 pb-10 relative overflow-hidden"
    >
      <div ref={contentRef} className="max-w-[1400px] mx-auto" style={{ opacity: 0 }}>

        {/* Top row */}
        <div className="grid md:grid-cols-3 gap-10 mb-12">

          {/* Brand */}
          <div>
            <span className="font-display text-xl text-paper">
              Fortune Artz <span className="text-gold">&amp;</span> Creatives
            </span>
            <p className="font-mono text-xs text-medium-gray mt-2">
              &copy; {new Date().getFullYear()}
            </p>
          </div>

          {/* Nav */}
          <nav aria-label="Footer navigation">
            <div className="flex flex-col gap-[10px]">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="font-mono text-sm text-paper/60 no-underline transition-colors duration-300 hover:text-paper"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </nav>

          {/* Socials & Contact */}
          <div className="flex flex-col gap-[10px]">
            {CONTACT.instagram.map((ig) => (
              <a
                key={ig.handle}
                href={ig.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-sm text-paper/60 no-underline transition-colors duration-300 hover:text-gold"
              >
                {ig.handle}
              </a>
            ))}
            <a
              href={`mailto:${CONTACT.email}`}
              className="font-mono text-sm text-paper/60 no-underline transition-colors duration-300 hover:text-gold"
            >
              {CONTACT.email}
            </a>
            <a
              href={`tel:${CONTACT.phone}`}
              className="font-mono text-sm text-paper/60 no-underline transition-colors duration-300 hover:text-gold"
            >
              {CONTACT.phoneDisplay}
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-medium-gray/20" />

        {/* Decorative wordmark */}
        <div
          ref={wordmarkRef}
          aria-hidden="true"
          className="text-center py-10 overflow-hidden select-none"
        >
          <span className="font-display text-[clamp(4rem,12vw,10rem)] text-paper/5 leading-none font-normal block">
            FORTUNE
          </span>
        </div>
      </div>
    </footer>
  );
}
