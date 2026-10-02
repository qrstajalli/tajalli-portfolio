import React from 'react';
import dockAbout from '../../assets/dock/dock_1.png';
import dockGlobe from '../../assets/dock/dock_2.png';
import dockCamera from '../../assets/dock/dock_3.png';
import dockMegaphone from '../../assets/dock/dock_4.png';
import dockMessages from '../../assets/dock/dock_5.png';

interface IconGraphicsProps {
  id: string;
  size?: number;
  className?: string;
}

export const AppIconGraphics: React.FC<IconGraphicsProps> = ({ id, size = 76 }) => {
  const squircleRadius = `${Math.round(size * 0.22)}px`;

  switch (id) {
    // ----------------------------------------------------
    // 1. FRAMER (Black squircle with white geometric F)
    // ----------------------------------------------------
    case 'framer':
      return (
        <div
          style={{
            width: size,
            height: size,
            borderRadius: squircleRadius,
            background: 'linear-gradient(180deg, #242730 0%, #111317 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 22px rgba(0, 0, 0, 0.45), inset 0 1px 1px rgba(255, 255, 255, 0.2)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '42%',
              background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0) 100%)',
            }}
          />
          <svg width={size * 0.52} height={size * 0.52} viewBox="0 0 24 24" fill="none">
            <path d="M4 2H20V9H12L20 16H12V23L4 16V9H12L4 2Z" fill="#ffffff" />
          </svg>
        </div>
      );

    // ----------------------------------------------------
    // 2. GITHUB (Dark graphite squircle with white Octocat)
    // ----------------------------------------------------
    case 'github':
      return (
        <div
          style={{
            width: size,
            height: size,
            borderRadius: squircleRadius,
            background: 'linear-gradient(180deg, #24292f 0%, #0d1117 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 22px rgba(0, 0, 0, 0.45), inset 0 1px 1px rgba(255, 255, 255, 0.2)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '42%',
              background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.14) 0%, rgba(255, 255, 255, 0) 100%)',
            }}
          />
          <svg width={size * 0.58} height={size * 0.58} viewBox="0 0 24 24" fill="#ffffff">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 2C6.477 2 2 6.477 2 12C2 16.42 4.87 20.17 8.84 21.5C9.34 21.58 9.5 21.27 9.5 21V19.31C6.73 19.91 6.14 17.97 6.14 17.97C5.68 16.81 5.03 16.5 5.03 16.5C4.12 15.88 5.1 15.9 5.1 15.9C6.1 15.97 6.63 16.93 6.63 16.93C7.5 18.45 8.97 18 9.54 17.76C9.63 17.11 9.89 16.67 10.17 16.42C7.95 16.17 5.62 15.31 5.62 11.5C5.62 10.41 6.01 9.52 6.66 8.82C6.55 8.57 6.21 7.55 6.76 6.19C6.76 6.19 7.6 5.92 9.5 7.21C10.29 6.99 11.15 6.88 12 6.88C12.85 6.88 13.71 6.99 14.5 7.21C16.4 5.92 17.24 6.19 17.24 6.19C17.79 7.55 17.45 8.57 17.34 8.82C18 9.52 18.38 10.41 18.38 11.5C18.38 15.32 16.04 16.16 13.81 16.41C14.17 16.72 14.5 17.33 14.5 18.26V21C14.5 21.27 14.66 21.59 15.17 21.5C19.14 20.16 22 16.42 22 12C22 6.477 17.52 2 12 2Z"
            />
          </svg>
        </div>
      );

    // ----------------------------------------------------
    // 3. LINKEDIN (Sleek deep blue squircle with 'in' logo)
    // ----------------------------------------------------
    case 'linkedin':
      return (
        <div
          style={{
            width: size,
            height: size,
            borderRadius: squircleRadius,
            background: 'linear-gradient(180deg, #0a66c2 0%, #084e96 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 22px rgba(10, 102, 194, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.4)',
            border: '1px solid rgba(255, 255, 255, 0.25)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '42%',
              background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0) 100%)',
            }}
          />
          <svg width={size * 0.54} height={size * 0.54} viewBox="0 0 24 24" fill="currentColor" color="#ffffff">
            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.68 1.68 0 1 0 0-3.36 1.68 1.68 0 0 0 0 3.36m1.39 9.74v-8.37H5.07v8.37z" />
          </svg>
        </div>
      );

    // ----------------------------------------------------
    // 4. MAC-STYLE FOLDER (Projects, Hackathons, Skills)
    // ----------------------------------------------------
    case 'folder':
    case 'projects':
    case 'hackathons':
    case 'skills':
      return (
        <div
          style={{
            width: size,
            height: size,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          {/* Authentic macOS Blue Folder SVG */}
          <svg
            width={size}
            height={size * 0.86}
            viewBox="0 0 100 86"
            fill="none"
            style={{ filter: 'drop-shadow(0 8px 18px rgba(0, 0, 0, 0.45))' }}
          >
            <defs>
              {/* Back cover gradient */}
              <linearGradient id="folderBack" x1="50" y1="6" x2="50" y2="80" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#60a5fa" />
                <stop offset="100%" stopColor="#2563eb" />
              </linearGradient>
              {/* Front flap gradient */}
              <linearGradient id="folderFront" x1="50" y1="26" x2="50" y2="84" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#93c5fd" />
                <stop offset="25%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#1d4ed8" />
              </linearGradient>
              {/* Top highlight */}
              <linearGradient id="folderGloss" x1="50" y1="26" x2="50" y2="45" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Folder Back with Tab */}
            <path
              d="M10 14C10 9.58172 13.5817 6 18 6H38C41.5 6 44 8.5 46.5 12L49 16H82C86.4183 16 90 19.5817 90 24V74C90 78.4183 86.4183 82 82 82H18C13.5817 82 10 78.4183 10 74V14Z"
              fill="url(#folderBack)"
            />

            {/* Folder Inner Paper Sheet subtle rim */}
            <path
              d="M16 22C16 19.7909 17.7909 18 20 18H80C82.2091 18 84 19.7909 84 22V36H16V22Z"
              fill="rgba(255, 255, 255, 0.4)"
            />

            {/* Folder Front Pocket / Flap */}
            <path
              d="M8 28C8 25.7909 9.79086 24 12 24H88C90.2091 24 92 25.7909 92 28V76C92 80.4183 88.4183 84 84 84H16C11.5817 84 8 80.4183 8 76V28Z"
              fill="url(#folderFront)"
            />

            {/* Subtle top edge gloss on front pocket */}
            <path
              d="M8 28C8 25.7909 9.79086 24 12 24H88C90.2091 24 92 25.7909 92 28V46C92 46 60 40 8 46V28Z"
              fill="url(#folderGloss)"
            />

            {/* Subtle front rim divider line */}
            <line x1="8" y1="24.5" x2="92" y2="24.5" stroke="rgba(255, 255, 255, 0.55)" strokeWidth="1" />
          </svg>
        </div>
      );

    // ----------------------------------------------------
    // 5. ABOUT ME (Matches reference: White squircle with 3D star)
    // ----------------------------------------------------
    case 'about-me':
    case 'about':
      return (
        <div
          style={{
            width: size,
            height: size,
            borderRadius: squircleRadius,
            background: 'linear-gradient(180deg, #ffffff 0%, #f1f5f9 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 22px rgba(0, 0, 0, 0.35), inset 0 1px 1px rgba(255, 255, 255, 0.9)',
            border: '1px solid rgba(255, 255, 255, 0.8)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '46%',
              background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0) 100%)',
            }}
          />
          <svg
            width={size * 0.62}
            height={size * 0.62}
            viewBox="0 0 100 100"
            fill="none"
            style={{ filter: 'drop-shadow(0 4px 8px rgba(245, 124, 0, 0.45))' }}
          >
            <defs>
              <linearGradient id="starGrad" x1="50" y1="5" x2="50" y2="95" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#ff9800" />
                <stop offset="50%" stopColor="#f57c00" />
                <stop offset="100%" stopColor="#e65100" />
              </linearGradient>
              <linearGradient id="starHighlight" x1="30" y1="10" x2="70" y2="60" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#ffe082" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#ff9800" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M50 8C52 28 68 44 88 50C68 56 52 72 50 92C48 72 32 56 12 50C32 44 48 28 50 8Z"
              fill="url(#starGrad)"
            />
            <circle cx="50" cy="50" r="14" fill="#ffb74d" opacity="0.8" />
            <path
              d="M50 14C51.5 30 64 42.5 80 47C66 50 54 62 50 78C46 62 34 50 20 47C36 42.5 48.5 30 50 14Z"
              fill="url(#starHighlight)"
            />
          </svg>
        </div>
      );

    // ----------------------------------------------------
    // ----------------------------------------------------
    // DOCK SLOT 1: About Me (Glossy 3D Profile/Person from reference)
    // ----------------------------------------------------
    case 'dock-about':
      return (
        <div
          style={{
            width: `${size}px`,
            height: `${size}px`,
            borderRadius: `${Math.round(size * 0.27)}px`,
            border: '1px solid rgba(230, 230, 235, 0.6)',
            boxShadow: '0px 1px 4px 0px rgba(0, 0, 0, 0.16)',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxSizing: 'border-box',
          }}
        >
          <img
            src={dockAbout}
            alt="About Me"
            width={size}
            height={size}
            style={{
              width: '100%',
              height: '100%',
              display: 'block',
              userSelect: 'none',
              pointerEvents: 'none',
              objectFit: 'cover',
            }}
            draggable={false}
          />
        </div>
      );

    // ----------------------------------------------------
    // DOCK SLOT 2: RESERVED / UNSPECIFIED (Glossy 3D Globe from reference)
    // ----------------------------------------------------
    case 'dock-reserved-2':
      return (
        <div
          style={{
            width: `${size}px`,
            height: `${size}px`,
            borderRadius: `${Math.round(size * 0.27)}px`,
            border: '1px solid rgba(230, 230, 235, 0.6)',
            boxShadow: '0px 1px 4px 0px rgba(0, 0, 0, 0.16)',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxSizing: 'border-box',
          }}
        >
          <img
            src={dockGlobe}
            alt="Globe"
            width={size}
            height={size}
            style={{
              width: '100%',
              height: '100%',
              display: 'block',
              userSelect: 'none',
              pointerEvents: 'none',
              objectFit: 'cover',
            }}
            draggable={false}
          />
        </div>
      );

    // ----------------------------------------------------
    // DOCK SLOT 3: Gallery (Glossy 3D Camera from reference)
    // ----------------------------------------------------
    case 'dock-gallery':
      return (
        <div
          style={{
            width: `${size}px`,
            height: `${size}px`,
            borderRadius: `${Math.round(size * 0.27)}px`,
            border: '1px solid rgba(230, 230, 235, 0.6)',
            boxShadow: '0px 1px 4px 0px rgba(0, 0, 0, 0.16)',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxSizing: 'border-box',
          }}
        >
          <img
            src={dockCamera}
            alt="Gallery"
            width={size}
            height={size}
            style={{
              width: '100%',
              height: '100%',
              display: 'block',
              userSelect: 'none',
              pointerEvents: 'none',
              objectFit: 'cover',
            }}
            draggable={false}
          />
        </div>
      );

    // ----------------------------------------------------
    // DOCK SLOT 4: RESERVED / UNSPECIFIED (Glossy 3D Megaphone from reference)
    // ----------------------------------------------------
    case 'dock-reserved-4':
      return (
        <div
          style={{
            width: `${size}px`,
            height: `${size}px`,
            borderRadius: `${Math.round(size * 0.27)}px`,
            border: '1px solid rgba(230, 230, 235, 0.6)',
            boxShadow: '0px 1px 4px 0px rgba(0, 0, 0, 0.16)',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxSizing: 'border-box',
          }}
        >
          <img
            src={dockMegaphone}
            alt="Megaphone"
            width={size}
            height={size}
            style={{
              width: '100%',
              height: '100%',
              display: 'block',
              userSelect: 'none',
              pointerEvents: 'none',
              objectFit: 'cover',
            }}
            draggable={false}
          />
        </div>
      );

    // ----------------------------------------------------
    // DOCK SLOT 5: Contact (Glossy 3D Messages with red '1' badge from reference)
    // ----------------------------------------------------
    case 'dock-contact':
      return (
        <div
          style={{
            width: `${size}px`,
            height: `${size}px`,
            borderRadius: `${Math.round(size * 0.27)}px`,
            border: '1px solid rgba(230, 230, 235, 0.6)',
            boxShadow: '0px 1px 4px 0px rgba(0, 0, 0, 0.16)',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxSizing: 'border-box',
          }}
        >
          <img
            src={dockMessages}
            alt="Contact"
            width={size}
            height={size}
            style={{
              width: '100%',
              height: '100%',
              display: 'block',
              userSelect: 'none',
              pointerEvents: 'none',
              objectFit: 'cover',
            }}
            draggable={false}
          />
        </div>
      );

    default:
      return null;
  }
};
