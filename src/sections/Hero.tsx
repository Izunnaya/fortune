import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { scrollToSection } from '../utils/scroll';
import { useReducedMotion } from '../hooks/useReducedMotion';

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
    tl.to(heading1Ref.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
      .to(heading2Ref.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5')
      .to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5')
      .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4')
      .to(scrollRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.3');

    return () => { tl.kill(); };
  }, [prefersReducedMotion]);

  return (
    <section
      style={{ position: 'relative', minHeight: '100dvh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}
    >
      {/* Decorative drone video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}
        poster="/images/thumb-drone.jpg"
      >
        <source src="/videos/video-drone.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div
        aria-hidden="true"
        style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'linear-gradient(180deg, rgba(24,24,25,0.4) 0%, rgba(24,24,25,0.65) 50%, rgba(24,24,25,0.85) 100%)' }}
      />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '0 24px', maxWidth: '900px' }}>
        <h1
          ref={heading1Ref}
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(3rem, 8vw, 7rem)',
            lineHeight: 1.0,
            letterSpacing: '-0.02em',
            fontWeight: 400,
            color: '#F4F1EA',
            margin: 0,
            opacity: 0,
            transform: 'translateY(20px)',
          }}
        >
          Fortune
        </h1>
        <h2
          ref={heading2Ref}
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2rem, 5vw, 4rem)',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            fontWeight: 400,
            color: '#F4F1EA',
            margin: 0,
            opacity: 0,
            transform: 'translateY(20px)',
          }}
        >
          Artz <span style={{ color: '#C8A55C' }}>&amp;</span> Creatives
        </h2>

        <p
          ref={subtitleRef}
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '16px',
            color: 'rgba(244, 241, 234, 0.8)',
            marginTop: '24px',
            opacity: 0,
            transform: 'translateY(20px)',
          }}
        >
          Drone Pilot &middot; Video Editor &middot; Content Strategist &middot; Visual Artist
        </p>

        <div
          ref={ctaRef}
          style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '16px', marginTop: '48px', opacity: 0, transform: 'translateY(20px)' }}
        >
          <button
            onClick={() => scrollToSection('#booking')}
            style={{
              backgroundColor: '#C8A55C',
              color: '#181819',
              fontFamily: "'Space Mono', monospace",
              fontSize: '12px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              padding: '16px 32px',
              borderRadius: '100px',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#D4B76E';
              e.currentTarget.style.transform = 'scale(1.02)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#C8A55C';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            Book a Consultation
          </button>
          <button
            onClick={() => scrollToSection('#portfolio')}
            style={{
              backgroundColor: 'transparent',
              color: '#F4F1EA',
              fontFamily: "'Space Mono', monospace",
              fontSize: '12px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              padding: '16px 32px',
              borderRadius: '100px',
              border: '1px solid rgba(244, 241, 234, 0.3)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(244, 241, 234, 0.6)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(244, 241, 234, 0.3)';
            }}
          >
            View Selected Work
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        aria-hidden="true"
        style={{ position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', zIndex: 2, opacity: 0 }}
      >
        <div className="animate-scroll-pulse" style={{ width: '1px', height: '48px', backgroundColor: 'rgba(200, 165, 92, 0.5)' }} />
      </div>
    </section>
  );
}
