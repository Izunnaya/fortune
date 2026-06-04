import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { NAV_LINKS, CONTACT } from '../constants';
import { scrollToSection } from '../utils/scroll';
import { useReducedMotion } from '../hooks/useReducedMotion';

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
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.fromTo(contentRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' });
      },
    });
    triggers.push(st1);

    const st2 = ScrollTrigger.create({
      trigger: footerRef.current,
      start: 'top bottom',
      end: 'bottom bottom',
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
      style={{
        backgroundColor: '#0D0D0E',
        padding: '80px clamp(24px, 5vw, 80px) 40px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div ref={contentRef} style={{ maxWidth: '1400px', margin: '0 auto', opacity: 0 }}>
        {/* Top row */}
        <div className="grid md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '20px', color: '#F4F1EA' }}>
              Fortune Artz <span style={{ color: '#C8A55C' }}>&amp;</span> Creatives
            </span>
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '12px', color: '#8A8A8E', marginTop: '8px' }}>
              &copy; {new Date().getFullYear()}
            </p>
          </div>

          {/* Nav */}
          <nav aria-label="Footer navigation">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  style={{ fontFamily: "'Space Mono', monospace", fontSize: '14px', color: 'rgba(244, 241, 234, 0.6)', textDecoration: 'none', transition: 'color 0.3s ease' }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#F4F1EA'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(244, 241, 234, 0.6)'; }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </nav>

          {/* Socials & Contact */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {CONTACT.instagram.map((ig) => (
              <a
                key={ig.handle}
                href={ig.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontFamily: "'Space Mono', monospace", fontSize: '14px', color: 'rgba(244, 241, 234, 0.6)', textDecoration: 'none', transition: 'color 0.3s ease' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#C8A55C'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(244, 241, 234, 0.6)'; }}
              >
                {ig.handle}
              </a>
            ))}
            <a
              href={`mailto:${CONTACT.email}`}
              style={{ fontFamily: "'Space Mono', monospace", fontSize: '14px', color: 'rgba(244, 241, 234, 0.6)', textDecoration: 'none', transition: 'color 0.3s ease' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#C8A55C'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(244, 241, 234, 0.6)'; }}
            >
              {CONTACT.email}
            </a>
            <a
              href={`tel:${CONTACT.phone}`}
              style={{ fontFamily: "'Space Mono', monospace", fontSize: '14px', color: 'rgba(244, 241, 234, 0.6)', textDecoration: 'none', transition: 'color 0.3s ease' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#C8A55C'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(244, 241, 234, 0.6)'; }}
            >
              {CONTACT.phoneDisplay}
            </a>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: '1px', backgroundColor: 'rgba(138, 138, 142, 0.2)' }} />

        {/* Decorative wordmark */}
        <div
          ref={wordmarkRef}
          aria-hidden="true"
          style={{ textAlign: 'center', padding: '40px 0 20px', overflow: 'hidden', userSelect: 'none' }}
        >
          <span style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(4rem, 12vw, 10rem)',
            color: 'rgba(244, 241, 234, 0.05)',
            lineHeight: 1,
            fontWeight: 400,
            display: 'block',
          }}>
            FORTUNE
          </span>
        </div>
      </div>
    </footer>
  );
}
