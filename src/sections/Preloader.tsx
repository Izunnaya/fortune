import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

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

    tl.fromTo(lineRef.current, { width: '0%' }, { width: '100%', duration: 1.2, ease: 'power2.inOut' })
      .to(lineRef.current, { opacity: 0, duration: 0.3 })
      .to(textRef.current, { scale: 1.05, duration: 0.4, ease: 'power2.out' })
      .to(containerRef.current, { opacity: 0, duration: 0.6, ease: 'power2.out' });

    return () => { tl.kill(); };
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'auto',
        backgroundColor: '#181819',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
        <div
          ref={textRef}
          style={{ fontFamily: "'Playfair Display', serif", color: '#F4F1EA', fontSize: '20px' }}
        >
          Fortune Artz<span style={{ color: '#C8A55C', marginLeft: '8px' }}>&amp;</span>{' '}
          <span style={{ color: '#C8A55C' }}>Creatives</span>
        </div>
        <div
          ref={lineRef}
          style={{ height: '1px', backgroundColor: '#C8A55C', width: '0%', maxWidth: '200px' }}
        />
      </div>
    </div>
  );
}
