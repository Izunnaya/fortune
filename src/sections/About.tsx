import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '../hooks/useReducedMotion';

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const textEl = sectionRef.current?.querySelector('.about-text');
    const imgEl = sectionRef.current?.querySelector('.about-image');

    if (prefersReducedMotion) {
      if (textEl) gsap.set(textEl, { opacity: 1, x: 0 });
      if (imgEl) gsap.set(imgEl, { opacity: 1, x: 0 });
      return;
    }

    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 75%',
      once: true,
      onEnter: () => {
        if (textEl) gsap.fromTo(textEl, { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: 'power3.out' });
        if (imgEl) gsap.fromTo(imgEl, { x: 30, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.2 });
      },
    });

    return () => st.kill();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="about"
      style={{
        backgroundColor: '#181819',
        padding: 'clamp(60px, 10vw, 120px) clamp(24px, 5vw, 80px)',
      }}
    >
      <div className="max-w-[1400px] mx-auto grid lg:grid-cols-[55%_45%] gap-12 items-start">
        {/* Text */}
        <div className="about-text order-2 lg:order-1" style={{ opacity: 0 }}>
          <span style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '12px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: '#C8A55C',
            display: 'block',
            marginBottom: '24px',
          }}>
            ABOUT
          </span>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
            lineHeight: 1.1,
            fontWeight: 400,
            color: '#F4F1EA',
            margin: '0 0 24px',
          }}>
            Precision &amp; Vision, From Every Angle
          </h2>
          <p style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '18px',
            lineHeight: 1.7,
            color: 'rgba(244, 241, 234, 0.85)',
            maxWidth: '540px',
            marginBottom: '20px',
          }}>
            I started with art. Grew into content. Then took to the skies. With a background
            in Arts and Design, I learned to see details, balance, and meaning beyond the surface.
            In 2025, I became a drone pilot — expanding how I tell stories. Since then, I've worked
            across events, weddings, real estate, interior decor, and brand content. Technical
            precision meets creative instinct in everything I do.
          </p>
          <div style={{ height: '1px', backgroundColor: 'rgba(200, 165, 92, 0.2)', width: '80px', marginBottom: '16px' }} />
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '14px', color: '#8A8A8E' }}>
            Lagos, Nigeria &middot; Available Worldwide
          </span>
        </div>

        {/* Image */}
        <div className="about-image order-1 lg:order-2 lg:-mt-10" style={{ opacity: 0 }}>
          <div style={{ borderRadius: '4px', overflow: 'hidden' }}>
            <img
              src="/images/fortune-real.jpg"
              alt="Fortune Chisom Emeruem — Creative Director and Founder of Fortune Artz & Creatives"
              style={{ width: '100%', objectFit: 'cover', maxHeight: '520px' }}
              loading="lazy"
            />
          </div>
          <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '12px', color: '#8A8A8E', marginTop: '12px' }}>
            Emeruem Chisom Fortune — Founder
          </p>
        </div>
      </div>
    </section>
  );
}
