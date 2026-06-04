import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '../hooks/useReducedMotion';

type Category = 'All' | 'Events' | 'Commercial' | 'AI Creative' | 'Drone';

interface Project {
  title: string;
  category: Category;
  tags: string[];
  videoSrc: string;
  thumbnail: string;
  role: string;
}

const projects: Project[] = [
  {
    title: 'BetNaija Agent Event',
    category: 'Events',
    tags: ['Event', 'Highlight', '4K'],
    videoSrc: '/videos/video-betnaija.mp4',
    thumbnail: '/images/thumb-betnaija.jpg',
    role: 'Content creator & Editor',
  },
  {
    title: 'MOMENTS 2026 Awards Night',
    category: 'Events',
    tags: ['Documentary', 'Storytelling'],
    videoSrc: '/videos/video-moments.mp4',
    thumbnail: '/images/thumb-moments.jpg',
    role: 'Content creator & Editor',
  },
  {
    title: 'Real Estate Launch',
    category: 'Commercial',
    tags: ['Corporate', 'Live Coverage'],
    videoSrc: '/videos/video-launch.mp4',
    thumbnail: '/images/thumb-launch.jpg',
    role: 'Content creator',
  },
  {
    title: 'TurbanTempest Launch',
    category: 'Commercial',
    tags: ['Brand', 'Commercial', '4K'],
    videoSrc: '/videos/video-turbantempest.mp4',
    thumbnail: '/images/thumb-turbantempest.jpg',
    role: 'Director of Photography',
  },
  {
    title: 'AcneExpert Cleanser',
    category: 'AI Creative',
    tags: ['AI', 'Creative', 'Experimental'],
    videoSrc: '/videos/video-acneexpert.mp4',
    thumbnail: '/images/thumb-acneexpert.jpg',
    role: 'Creative Director & Editor',
  },
  {
    title: 'Drone Showreel',
    category: 'Drone',
    tags: ['Aerial', 'Cinematic'],
    videoSrc: '/videos/video-drone.mp4',
    thumbnail: '/images/thumb-drone.jpg',
    role: 'Drone Pilot & Editor',
  },
];

const filters: Category[] = ['All', 'Events', 'Commercial', 'AI Creative', 'Drone'];

export default function Portfolio() {
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const scrolledInView = useRef(false);
  const [activeFilter, setActiveFilter] = useState<Category>('All');
  const prefersReducedMotion = useReducedMotion();

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  // Initial scroll-triggered animation
  useEffect(() => {
    if (prefersReducedMotion) {
      scrolledInView.current = true;
      if (headerRef.current) gsap.set(headerRef.current, { opacity: 1, y: 0 });
      const cards = gridRef.current?.querySelectorAll('.project-card');
      if (cards) gsap.set(cards, { opacity: 1, y: 0, rotateX: 0 });
      return;
    }

    const st = ScrollTrigger.create({
      trigger: headerRef.current,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        scrolledInView.current = true;
        gsap.fromTo(headerRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' });
        const cards = gridRef.current?.querySelectorAll('.project-card');
        if (cards && cards.length > 0) {
          gsap.fromTo(cards,
            { rotateX: 15, y: 60, opacity: 0 },
            { rotateX: 0, y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out', delay: 0.2 }
          );
        }
      },
    });

    return () => st.kill();
  }, [prefersReducedMotion]);

  // Re-animate cards whenever the active filter changes (after section scrolled into view)
  useEffect(() => {
    if (!scrolledInView.current) return;
    const cards = gridRef.current?.querySelectorAll('.project-card');
    if (!cards || cards.length === 0) return;
    gsap.fromTo(cards,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: prefersReducedMotion ? 0 : 0.3, stagger: prefersReducedMotion ? 0 : 0.05, ease: 'power2.out' }
    );
  }, [activeFilter, prefersReducedMotion]);

  return (
    <section
      id="portfolio"
      style={{
        backgroundColor: '#0D0D0E',
        padding: 'clamp(60px, 10vw, 120px) clamp(24px, 5vw, 80px)',
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <div ref={headerRef} style={{ marginBottom: '32px', opacity: 0 }}>
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
            SELECTED WORK
          </span>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            lineHeight: 1.05,
            fontWeight: 400,
            color: '#F4F1EA',
            margin: '0 0 24px',
          }}>
            Projects
          </h2>

          {/* Filters */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }} role="group" aria-label="Filter projects by category">
            {filters.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                aria-pressed={activeFilter === cat}
                className="bg-transparent border-none cursor-pointer"
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '14px',
                  fontWeight: activeFilter === cat ? 600 : 400,
                  color: activeFilter === cat ? '#F4F1EA' : 'rgba(244, 241, 234, 0.6)',
                  padding: '4px 0',
                  position: 'relative',
                  transition: 'color 0.3s ease',
                }}
              >
                {cat}
                {activeFilter === cat && (
                  <span aria-hidden="true" style={{ position: 'absolute', bottom: '-4px', left: 0, right: 0, height: '2px', backgroundColor: '#C8A55C' }} />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div
          ref={gridRef}
          className="grid md:grid-cols-2 gap-6"
        >
          {filtered.map((project) => (
            <div
              key={project.title}
              className="project-card"
              style={{
                backgroundColor: 'rgba(245, 240, 232, 0.02)',
                borderRadius: '8px',
                overflow: 'hidden',
                border: '1px solid rgba(201, 169, 110, 0.08)',
                transition: 'border-color 0.3s ease',
                opacity: 0,
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(201, 169, 110, 0.2)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(201, 169, 110, 0.08)'; }}
            >
              {/* Video player */}
              <div style={{ position: 'relative', aspectRatio: '16/9' }}>
                <video
                  src={project.videoSrc}
                  poster={project.thumbnail}
                  controls
                  playsInline
                  preload="none"
                  aria-label={`${project.title} — ${project.role}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>

              {/* Info */}
              <div style={{ padding: '20px 24px' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontFamily: "'Space Mono', monospace",
                        fontSize: '10px',
                        textTransform: 'uppercase',
                        color: '#C8A55C',
                        opacity: 0.8,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '20px',
                  fontWeight: 400,
                  color: '#F4F1EA',
                  margin: '0 0 4px',
                }}>
                  {project.title}
                </h3>
                <p style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '13px',
                  color: '#8A8A8E',
                  margin: 0,
                }}>
                  {project.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
