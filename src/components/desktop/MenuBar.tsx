import React, { useState, useEffect } from 'react';

export const MenuBar: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Format date and time matching reference: "Fri, 2 Oct 2026  8:56 PM"
  const formattedDateTime = () => {
    const weekday = currentTime.toLocaleDateString('en-US', { weekday: 'short' });
    const day = currentTime.getDate();
    const month = currentTime.toLocaleDateString('en-US', { month: 'short' });
    const year = currentTime.getFullYear();
    const timeStr = currentTime.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });

    return `${weekday}, ${day} ${month} ${year}  ${timeStr}`;
  };

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '32px',
        backgroundColor: 'rgba(10, 14, 24, 0.45)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 16px',
        zIndex: 9999,
        fontSize: '0.82rem',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        color: '#f8fafc',
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Plus Jakarta Sans", sans-serif',
      }}
    >
      {/* Left: Tajalli Us Samad */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span
          style={{
            fontWeight: 600,
            fontSize: '0.88rem',
            letterSpacing: '-0.01em',
            color: '#ffffff',
            textShadow: '0 1px 3px rgba(0, 0, 0, 0.6)',
          }}
        >
          Tajalli Us Samad
        </span>
      </div>

      {/* Right: LinkedIn, GitHub, Instagram | Live Date & Time */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        {/* LinkedIn -> https://www.linkedin.com/in/tajalli-us-samad/ */}
        <a
          href="https://www.linkedin.com/in/tajalli-us-samad/"
          target="_blank"
          rel="noopener noreferrer"
          title="LinkedIn"
          style={{
            color: 'rgba(255, 255, 255, 0.85)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'color 0.15s, transform 0.15s',
            textDecoration: 'none',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#ffffff';
            e.currentTarget.style.transform = 'scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'rgba(255, 255, 255, 0.85)';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.68 1.68 0 1 0 0-3.36 1.68 1.68 0 0 0 0 3.36m1.39 9.74v-8.37H5.07v8.37z" />
          </svg>
        </a>

        {/* GitHub -> https://github.com/qrstajalli */}
        <a
          href="https://github.com/qrstajalli"
          target="_blank"
          rel="noopener noreferrer"
          title="GitHub"
          style={{
            color: 'rgba(255, 255, 255, 0.85)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'color 0.15s, transform 0.15s',
            textDecoration: 'none',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#ffffff';
            e.currentTarget.style.transform = 'scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'rgba(255, 255, 255, 0.85)';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 2C6.477 2 2 6.477 2 12C2 16.42 4.87 20.17 8.84 21.5C9.34 21.58 9.5 21.27 9.5 21V19.31C6.73 19.91 6.14 17.97 6.14 17.97C5.68 16.81 5.03 16.5 5.03 16.5C4.12 15.88 5.1 15.9 5.1 15.9C6.1 15.97 6.63 16.93 6.63 16.93C7.5 18.45 8.97 18 9.54 17.76C9.63 17.11 9.89 16.67 10.17 16.42C7.95 16.17 5.62 15.31 5.62 11.5C5.62 10.41 6.01 9.52 6.66 8.82C6.55 8.57 6.21 7.55 6.76 6.19C6.76 6.19 7.6 5.92 9.5 7.21C10.29 6.99 11.15 6.88 12 6.88C12.85 6.88 13.71 6.99 14.5 7.21C16.4 5.92 17.24 6.19 17.24 6.19C17.79 7.55 17.45 8.57 17.34 8.82C18 9.52 18.38 10.41 18.38 11.5C18.38 15.32 16.04 16.16 13.81 16.41C14.17 16.72 14.5 17.33 14.5 18.26V21C14.5 21.27 14.66 21.59 15.17 21.5C19.14 20.16 22 16.42 22 12C22 6.477 17.52 2 12 2Z"
            />
          </svg>
        </a>

        {/* Instagram Icon */}
        <div
          title="Instagram"
          style={{
            color: 'rgba(255, 255, 255, 0.85)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'default',
          }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
          </svg>
        </div>

        {/* Vertical Separator */}
        <div
          style={{
            width: '1px',
            height: '14px',
            backgroundColor: 'rgba(255, 255, 255, 0.22)',
            margin: '0 2px',
          }}
        />

        {/* Live Date and Time */}
        <span
          style={{
            fontSize: '0.82rem',
            fontWeight: 400,
            color: 'rgba(255, 255, 255, 0.92)',
            letterSpacing: '0.01em',
            whiteSpace: 'nowrap',
          }}
        >
          {formattedDateTime()}
        </span>
      </div>
    </header>
  );
};
