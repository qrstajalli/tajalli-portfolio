import React, { useState, useEffect } from 'react';

interface BootScreenProps {
  onRevealStart: () => void;
  onComplete: () => void;
}

export const BootScreen: React.FC<BootScreenProps> = ({ onRevealStart, onComplete }) => {
  // Animation phases: 'pause' | 'drawing' | 'holding' | 'fading' | 'done'
  const [phase, setPhase] = useState<'pause' | 'drawing' | 'holding' | 'fading' | 'done'>('pause');

  useEffect(() => {
    // Check for prefers-reduced-motion
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      const quickTimer = setTimeout(() => {
        onRevealStart();
        setPhase('fading');
        setTimeout(() => {
          setPhase('done');
          onComplete();
        }, 300);
      }, 200);
      return () => clearTimeout(quickTimer);
    }

    // Phase 1: Initial pause (300ms)
    const pauseTimer = setTimeout(() => {
      setPhase('drawing');
    }, 300);

    // Phase 2: Drawing completes, start holding (300ms + 1150ms = 1450ms)
    const holdTimer = setTimeout(() => {
      setPhase('holding');
    }, 1450);

    // Phase 3: Hold completes, start fading out and tell desktop to reveal (1450ms + 400ms = 1850ms)
    const fadeTimer = setTimeout(() => {
      setPhase('fading');
      onRevealStart();
    }, 1850);

    // Phase 4: Fading completes, remove from DOM (1850ms + 650ms = 2500ms)
    const doneTimer = setTimeout(() => {
      setPhase('done');
      onComplete();
    }, 2500);

    return () => {
      clearTimeout(pauseTimer);
      clearTimeout(holdTimer);
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, [onRevealStart, onComplete]);

  if (phase === 'done') {
    return null;
  }

  const isFading = phase === 'fading';
  const isStarted = phase !== 'pause';

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 999999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: `
          radial-gradient(ellipse at 50% 0%, rgba(26, 54, 93, 0.25) 0%, rgba(7, 9, 14, 0.75) 100%),
          url(/assets/images/mac_wallpaper.jpg)
        `,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        opacity: isFading ? 0 : 1,
        transition: 'opacity 0.65s cubic-bezier(0.4, 0, 0.2, 1)',
        pointerEvents: isFading ? 'none' : 'auto',
        userSelect: 'none',
        WebkitUserSelect: 'none',
      }}
    >
      {/* Centered Handwritten "hello" SVG */}
      <div
        style={{
          width: 'clamp(280px, 48vw, 500px)',
          maxWidth: '90vw',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          filter: 'drop-shadow(0 8px 24px rgba(0, 0, 0, 0.65)) drop-shadow(0 0 35px rgba(99, 102, 241, 0.25))',
        }}
      >
        <svg
          viewBox="0 0 500 220"
          style={{
            width: '100%',
            height: 'auto',
            overflow: 'visible',
          }}
        >
          {/* Authentic Cursive "hello" continuous stroke */}
          <path
            d="M 60 155 C 75 145, 112 55, 128 32 C 136 20, 146 26, 138 52 C 124 92, 98 152, 88 175 C 98 138, 116 102, 140 102 C 160 102, 172 118, 168 144 C 164 162, 170 172, 185 172 C 200 172, 222 146, 222 122 C 222 106, 206 106, 194 122 C 180 140, 188 172, 215 172 C 230 172, 260 55, 274 32 C 282 20, 290 26, 282 52 C 268 92, 246 152, 240 174 C 244 175, 254 172, 268 172 C 284 172, 314 55, 328 32 C 336 20, 344 26, 336 52 C 322 92, 302 152, 296 174 C 300 175, 310 172, 325 172 C 342 172, 360 144, 360 120 C 360 104, 342 104, 332 122 C 320 144, 328 172, 352 172 C 372 172, 388 150, 386 122 C 384 108, 368 112, 374 120 C 382 128, 400 122, 425 112"
            fill="none"
            stroke="#ffffff"
            strokeWidth="6.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={1000}
            strokeDasharray={1000}
            strokeDashoffset={isStarted ? 0 : 1000}
            style={{
              transition: isStarted
                ? 'stroke-dashoffset 1.15s cubic-bezier(0.42, 0, 0.25, 1)'
                : 'none',
            }}
          />
        </svg>
      </div>
    </div>
  );
};
