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
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    setMobileOpen(false);
    scrollToSection(href);
  };

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          backgroundColor: scrolled
            ? "rgba(24, 24, 25, 0.95)"
            : "rgba(24, 24, 25, 0.8)",
          backdropFilter: "blur(12px)",
          borderBottom: scrolled
            ? "1px solid rgba(244, 241, 234, 0.1)"
            : "1px solid transparent",
          padding: "16px 20px",
          transition: "all 0.3s ease",
        }}
      >
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            style={{ textDecoration: "none" }}
          >
            <span
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "16px",
                color: "#F4F1EA",
              }}
            >
              Fortune Artz
            </span>
            <span
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "10px",
                color: "#C8A55C",
                position: "relative",
                top: "-4px",
                marginLeft: "4px",
              }}
            >
              &amp; Creatives
            </span>
          </a>

          {/* Desktop Nav */}
          <div
            style={{ alignItems: "center", gap: "32px" }}
            className="hidden md:flex"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "12px",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "#F4F1EA",
                  opacity: 0.8,
                  textDecoration: "none",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = "1";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = "0.8";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile Hamburger */}
          <button
            className="p-2 bg-none border-none cursor-pointer flex md:hidden flex-col gap-1.5 w-[36px] bg-center justify-center"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            // style={{
            //   padding: "8px",
            //   background: "none",
            //   border: "none",
            //   cursor: "pointer",
            //   display: "none",
            //   flexDirection: "column",
            //   gap: "5px",
            //   width: "36px",
            //   alignItems: "center",
            //   justifyContent: "center",
            // }}
          >
            <span
              style={{
                display: "block",
                height: "1.5px",
                width: "22px",
                backgroundColor: "#F4F1EA",
                transition: "all 0.3s ease",
                transform: mobileOpen
                  ? "rotate(45deg) translateY(3.25px)"
                  : "none",
              }}
            />
            <span
              style={{
                display: "block",
                height: "1.5px",
                width: "22px",
                backgroundColor: "#F4F1EA",
                transition: "all 0.3s ease",
                transform: mobileOpen
                  ? "rotate(-45deg) translateY(-3.25px)"
                  : "none",
              }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Overlay */}
      <div
        id="mobile-menu"
        className="md:hidden"
        aria-hidden={!mobileOpen}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 40,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "36px",
          backgroundColor: "rgba(24, 24, 25, 0.98)",
          opacity: mobileOpen ? 1 : 0,
          pointerEvents: mobileOpen ? "auto" : "none",
          transition: "opacity 0.5s ease",
        }}
      >
        {NAV_LINKS.map((link, i) => (
          <a
            key={link.label}
            href={link.href}
            onClick={(e) => handleNavClick(e, link.href)}
            tabIndex={mobileOpen ? 0 : -1}
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "32px",
              fontWeight: 400,
              color: "#F4F1EA",
              textDecoration: "none",
              opacity: mobileOpen ? 1 : 0,
              transform: mobileOpen ? "translateY(0)" : "translateY(12px)",
              transition: `all 0.4s ease ${mobileOpen ? i * 80 + 150 : 0}ms`,
            }}
          >
            {link.label}
          </a>
        ))}
      </div>
    </>
  );
}
