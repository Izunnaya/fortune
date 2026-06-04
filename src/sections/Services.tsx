import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '../hooks/useReducedMotion';

const services = [
  {
    title: 'Drone & Aerial',
    desc: 'Real estate showcases, property inspections, and cinematic aerial coverage. Every flight delivers perspectives that ground-based cameras simply cannot achieve.',
  },
  {
    title: 'Event Coverage',
    desc: 'From corporate launches to intimate celebrations — capturing the energy, emotion, and key moments that tell the full story.',
  },
  {
    title: 'Commercial & Brand',
    desc: 'Product launches, brand campaigns, and social content designed to stop the scroll and drive engagement.',
  },
  {
    title: 'Video Editing',
    desc: 'Post-production that transforms raw footage into polished narratives. Color grading, sound design, and pacing that holds attention.',
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll('.service-card');

    if (prefersReducedMotion) {
      if (cards) gsap.set(cards, { opacity: 1, y: 0 });
      return;
    }

    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 75%',
      once: true,
      onEnter: () => {
        const cs = sectionRef.current?.querySelectorAll('.service-card');
        if (cs && cs.length > 0) {
          gsap.fromTo(cs, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out' });
        }
      },
    });

    return () => st.kill();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="services"
      style={{
        backgroundColor: '#E5DDD0',
        padding: 'clamp(60px, 10vw, 120px) clamp(24px, 5vw, 80px)',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '48px' }}>
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
            SERVICES
          </span>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            lineHeight: 1.05,
            fontWeight: 400,
            color: '#181819',
            margin: 0,
          }}>
            What I Create
          </h2>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service, i) => (
            <div
              key={service.title}
              className="service-card group"
              style={{
                backgroundColor: 'rgba(244, 241, 234, 0.6)',
                border: '1px solid rgba(24, 24, 25, 0.1)',
                borderRadius: '8px',
                padding: '40px',
                position: 'relative',
                cursor: 'default',
                transition: 'all 0.3s ease',
                opacity: 0,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(24, 24, 25, 0.3)';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(24, 24, 25, 0.1)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '48px',
                color: 'rgba(200, 165, 92, 0.2)',
                display: 'block',
                lineHeight: 1,
                marginBottom: '16px',
              }}>
                0{i + 1}
              </span>
              <h3 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '24px',
                fontWeight: 400,
                color: '#181819',
                margin: '0 0 12px',
              }}>
                {service.title}
              </h3>
              <p style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '16px',
                lineHeight: 1.6,
                color: 'rgba(24, 24, 25, 0.8)',
                margin: 0,
              }}>
                {service.desc}
              </p>
              <span
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  bottom: '24px',
                  right: '24px',
                  color: '#C8A55C',
                  fontSize: '20px',
                  transition: 'transform 0.3s ease',
                }}
                className="group-hover:translate-x-1"
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
