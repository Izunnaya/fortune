import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '../hooks/useReducedMotion';

const stats = [
  { display: '7+', label: 'Years Experience' },
  { display: '1000+', label: 'Flight Hours' },
  { display: '500+', label: 'Projects Completed' },
  { display: 'Hundreds', label: 'of Events Covered' },
];

export default function TrustBar() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const items = sectionRef.current?.querySelectorAll('.stat-item');
    if (!items || items.length === 0) return;

    if (prefersReducedMotion) {
      gsap.set(items, { opacity: 1, y: 0 });
      return;
    }

    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.fromTo(items,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.5, stagger: 0.2, ease: 'power2.out' }
        );
      },
    });

    return () => st.kill();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      style={{ backgroundColor: '#0D0D0E', padding: '40px 24px' }}
    >
      <div className="max-w-[1400px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat) => (
          <div key={stat.label} className="stat-item text-center" style={{ opacity: 0 }}>
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 'clamp(2rem, 5vw, 4rem)',
              lineHeight: 1,
              color: '#C8A55C',
              display: 'block',
            }}>
              {stat.display}
            </span>
            <span style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '14px',
              color: '#8A8A8E',
              display: 'block',
              marginTop: '8px',
            }}>
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
