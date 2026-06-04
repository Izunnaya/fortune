import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CALENDLY_URL, CONTACT } from '../constants';
import { useReducedMotion } from '../hooks/useReducedMotion';

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
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://assets.calendly.com/assets/external/widget.css';
      document.head.appendChild(link);
    }

    if (document.querySelector('script[src*="calendly"]')) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
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
      start: 'top 80%',
      once: true,
      onEnter: () => {
        gsap.fromTo(contentRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' });
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
      style={{
        backgroundColor: '#181819',
        padding: 'clamp(60px, 10vw, 120px) clamp(24px, 5vw, 80px)',
      }}
    >
      <div ref={contentRef} style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', opacity: 0 }}>
        <span style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: '12px',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          color: '#C8A55C',
          display: 'block',
          marginBottom: '16px',
        }}>
          BOOKING
        </span>
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(2.5rem, 6vw, 5rem)',
          lineHeight: 1.05,
          fontWeight: 400,
          color: '#F4F1EA',
          margin: '0 0 16px',
        }}>
          Start a Project
        </h2>
        <p style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: '16px',
          lineHeight: 1.7,
          color: 'rgba(244, 241, 234, 0.8)',
          maxWidth: '560px',
          margin: '0 auto 48px',
        }}>
          Free 30-minute consultation, no obligation. Pick a time that works for you —
          you'll receive a confirmation email with all the details immediately after booking.
        </p>

        <button
          onClick={handleBookClick}
          style={{
            backgroundColor: '#C8A55C',
            color: '#181819',
            fontFamily: "'Space Mono', monospace",
            fontSize: '13px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            padding: '18px 40px',
            borderRadius: '100px',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#D4B76E';
            e.currentTarget.style.transform = 'scale(1.03)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#C8A55C';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          Book a Free Consultation
        </button>

        <p style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: '13px',
          color: '#8A8A8E',
          marginTop: '32px',
        }}>
          Prefer email?{' '}
          <a href={`mailto:${CONTACT.email}`} style={{ color: '#C8A55C', textDecoration: 'none' }}>
            {CONTACT.email}
          </a>
          {' '}or call{' '}
          <a href={`tel:${CONTACT.phone}`} style={{ color: '#C8A55C', textDecoration: 'none' }}>
            {CONTACT.phoneDisplay}
          </a>
        </p>
      </div>
    </section>
  );
}
