import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "../hooks/useReducedMotion";

type Category = "All" | "Events" | "Commercial" | "AI Creative" | "Drone";

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
    title: "BetNaija Agent Event",
    category: "Events",
    tags: ["Event", "Highlight", "4K"],
    videoSrc: "/videos/video-betnaija.mp4",
    thumbnail: "/images/thumb-betnaija.jpg",
    role: "Content creator & Editor",
  },
  {
    title: "MOMENTS 2026 Awards Night",
    category: "Events",
    tags: ["Documentary", "Storytelling"],
    videoSrc: "/videos/video-moments.mp4",
    thumbnail: "/images/thumb-moments.jpg",
    role: "Content creator & Editor",
  },
  {
    title: "Real Estate Launch",
    category: "Commercial",
    tags: ["Corporate", "Live Coverage"],
    videoSrc: "/videos/video-launch.mp4",
    thumbnail: "/images/thumb-launch.jpg",
    role: "Content creator",
  },
  {
    title: "TurbanTempest Launch",
    category: "Commercial",
    tags: ["Brand", "Commercial", "4K"],
    videoSrc: "/videos/video-turbantempest.mp4",
    thumbnail: "/images/thumb-turbantempest.jpg",
    role: "Director of Photography",
  },
  {
    title: "AcneExpert Cleanser",
    category: "AI Creative",
    tags: ["AI", "Creative", "Experimental"],
    videoSrc: "/videos/video-acneexpert.mp4",
    thumbnail: "/images/thumb-acneexpert.jpg",
    role: "Creative Director & Editor",
  },
  {
    title: "Drone Showreel",
    category: "Drone",
    tags: ["Aerial", "Cinematic"],
    videoSrc: "/videos/video-drone.mp4",
    thumbnail: "/images/thumb-drone.jpg",
    role: "Drone Pilot & Editor",
  },
];

const filters: Category[] = ["All", "Events", "Commercial", "AI Creative", "Drone"];

export default function Portfolio() {
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const scrolledInView = useRef(false);
  const [activeFilter, setActiveFilter] = useState<Category>("All");
  const prefersReducedMotion = useReducedMotion();

  const filtered = activeFilter === "All"
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  useEffect(() => {
    if (prefersReducedMotion) {
      scrolledInView.current = true;
      if (headerRef.current) gsap.set(headerRef.current, { opacity: 1, y: 0 });
      const cards = gridRef.current?.querySelectorAll(".project-card");
      if (cards) gsap.set(cards, { opacity: 1, y: 0, rotateX: 0, scale: 1 });
      return;
    }

    const st = ScrollTrigger.create({
      trigger: headerRef.current,
      start: "top 80%",
      onEnter: () => {
        scrolledInView.current = true;
        gsap.fromTo(
          headerRef.current,
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" }
        );
        const cards = gridRef.current?.querySelectorAll(".project-card");
        if (cards && cards.length > 0) {
          gsap.fromTo(
            cards,
            { rotateX: 20, y: 100, opacity: 0, scale: 0.94 },
            { rotateX: 0, y: 0, opacity: 1, scale: 1, duration: 0.9, stagger: 0.12, ease: "power3.out", delay: 0.2 }
          );
        }
      },
      onLeaveBack: () => {
        scrolledInView.current = false;
        gsap.set(headerRef.current, { y: 60, opacity: 0 });
        const cards = gridRef.current?.querySelectorAll(".project-card");
        if (cards) gsap.set(cards, { y: 100, opacity: 0, rotateX: 20, scale: 0.94 });
      },
    });

    return () => st.kill();
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!scrolledInView.current) return;
    const cards = gridRef.current?.querySelectorAll(".project-card");
    if (!cards || cards.length === 0) return;
    gsap.fromTo(
      cards,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: prefersReducedMotion ? 0 : 0.35, stagger: prefersReducedMotion ? 0 : 0.07, ease: "power2.out" }
    );
  }, [activeFilter, prefersReducedMotion]);

  return (
    <section
      id="portfolio"
      className="bg-deep-black px-[clamp(24px,5vw,80px)] py-[clamp(60px,10vw,120px)]"
    >
      <div className="max-w-[1400px] mx-auto">

        {/* Header */}
        <div ref={headerRef} className="mb-8" style={{ opacity: 0 }}>
          <span className="font-mono text-xs font-bold uppercase tracking-[0.1em] text-gold block mb-4">
            SELECTED WORK
          </span>
          <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[1.05] font-normal text-paper mb-6">
            Projects
          </h2>

          {/* Filters */}
          <div
            className="flex flex-wrap gap-4 items-center"
            role="group"
            aria-label="Filter projects by category"
          >
            {filters.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                aria-pressed={activeFilter === cat}
                className={`relative bg-transparent border-none cursor-pointer font-mono text-sm pb-1 transition-colors duration-300 ${
                  activeFilter === cat
                    ? "text-paper font-semibold"
                    : "text-paper/60 font-normal"
                }`}
              >
                {cat}
                {activeFilter === cat && (
                  <span aria-hidden="true" className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gold" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div ref={gridRef} className="grid md:grid-cols-2 gap-6">
          {filtered.map((project) => (
            <div
              key={project.title}
              className="project-card rounded-lg overflow-hidden border border-gold/[0.08] transition-[border-color] duration-300 hover:border-gold/20"
              style={{ opacity: 0 }}
            >
              {/* Video */}
              <div className="relative aspect-video">
                <video
                  src={project.videoSrc}
                  poster={project.thumbnail}
                  controls
                  playsInline
                  preload="none"
                  aria-label={`${project.title} — ${project.role}`}
                  className="w-full h-full object-cover block"
                />
              </div>

              {/* Info */}
              <div className="px-6 py-5">
                <div className="flex flex-wrap gap-2 mb-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="font-mono text-[10px] uppercase text-gold/80">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="font-display text-xl font-normal text-paper mb-1">
                  {project.title}
                </h3>
                <p className="font-mono text-[13px] text-medium-gray m-0">
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
