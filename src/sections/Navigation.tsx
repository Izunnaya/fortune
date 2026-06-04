import { useState, useEffect } from "react";
import { NAV_LINKS } from "../constants";
import { scrollToSection } from "../utils/scroll";

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    scrollToSection(href);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 px-5 py-4 backdrop-blur-md transition-all duration-300 ${
          scrolled
            ? "bg-charcoal/95 border-b border-paper/10"
            : "bg-charcoal/80 border-b border-transparent"
        }`}
      >
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">

          {/* Logo */}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className="no-underline"
          >
            <span className="font-display text-2xl text-paper">Fortune Artz</span>
            <span className="font-mono text-[15px] text-gold relative top-[-7px] ml-0.5">
              &amp; Creatives
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="font-mono text-xs font-bold uppercase tracking-[0.08em] text-paper opacity-80 no-underline transition-all duration-300 hover:opacity-100 hover:-translate-y-px"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden flex flex-col gap-[5px] w-9 items-center justify-center p-2 bg-transparent border-none cursor-pointer"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            <span
              className="block h-[1.5px] w-[22px] bg-paper transition-all duration-300"
              style={{ transform: mobileOpen ? "rotate(45deg) translateY(3.25px)" : "none" }}
            />
            <span
              className="block h-[1.5px] w-[22px] bg-paper transition-all duration-300"
              style={{ transform: mobileOpen ? "rotate(-45deg) translateY(-3.25px)" : "none" }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Overlay */}
      <div
        id="mobile-menu"
        aria-hidden={!mobileOpen}
        className={`md:hidden fixed inset-0 z-40 flex flex-col items-center justify-center gap-9 bg-charcoal/[0.98] transition-opacity duration-500 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {NAV_LINKS.map((link, i) => (
          <a
            key={link.label}
            href={link.href}
            onClick={(e) => handleNavClick(e, link.href)}
            tabIndex={mobileOpen ? 0 : -1}
            className="font-display text-[32px] font-normal text-paper no-underline transition-all duration-[400ms]"
            style={{
              opacity: mobileOpen ? 1 : 0,
              transform: mobileOpen ? "translateY(0)" : "translateY(12px)",
              transitionDelay: mobileOpen ? `${i * 80 + 150}ms` : "0ms",
            }}
          >
            {link.label}
          </a>
        ))}
      </div>
    </>
  );
}
