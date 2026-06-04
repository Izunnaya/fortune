import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setIsVisible(false);
        onComplete();
      },
    });

    // GSAP animates width from 0% → 100%, so width stays as inline style
    tl.fromTo(lineRef.current, { width: "0%" }, { width: "100%", duration: 1.2, ease: "power2.inOut" })
      .to(lineRef.current, { opacity: 0, duration: 0.3 })
      .to(textRef.current, { scale: 1.05, duration: 0.4, ease: "power2.out" })
      .to(containerRef.current, { opacity: 0, duration: 0.6, ease: "power2.out" });

    return () => { tl.kill(); };
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div ref={containerRef} className="fixed inset-0 z-[100] flex items-center justify-center bg-charcoal">
      <div className="flex flex-col items-center gap-6">
        <div ref={textRef} className="font-display text-paper text-xl">
          Fortune Artz<span className="text-gold ml-2">&amp;</span>{" "}
          <span className="text-gold">Creatives</span>
        </div>
        {/* width animated by GSAP — keep as inline style */}
        <div
          ref={lineRef}
          className="h-px bg-gold max-w-[200px]"
          style={{ width: "0%" }}
        />
      </div>
    </div>
  );
}
