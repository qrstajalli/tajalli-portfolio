import React, { useState } from 'react';
import { Wifi, Battery, Search, SlidersHorizontal } from 'lucide-react';
import { Clock } from './Clock';

export const MenuBar: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const menuItems = ['File', 'Edit', 'View', 'Go', 'Window', 'Help'];

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '28px',
        backgroundColor: 'rgba(15, 18, 28, 0.42)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 12px',
        zIndex: 9999,
        fontSize: '0.82rem',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        color: '#f8fafc',
      }}
    >
      {/* Left Menu Section */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '2px', height: '100%' }}>
        {/* Apple / OS Icon */}
        <button
          aria-label="Apple Menu"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2px 8px',
            height: '22px',
            borderRadius: '4px',
            border: 'none',
            background: 'transparent',
            color: '#f8fafc',
            cursor: 'pointer',
            transition: 'background-color 0.15s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.12)')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
        >
          {/* Apple Logo SVG */}
          <svg width="14" height="17" viewBox="0 0 170 170" fill="currentColor">
            <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.07-7.66-7.85-11.88-14.34-6.41-9.98-11.45-21.2-15.12-33.68-3.67-12.48-5.51-24.36-5.51-35.63 0-14.54 3.66-26.69 10.99-36.46 7.33-9.76 16.51-14.77 27.56-15.01 4.71 0 10.15 1.25 16.32 3.75 6.17 2.5 10.1 3.82 11.79 3.97 1.34-.15 5.48-1.54 12.42-4.17 6.94-2.63 12.75-3.75 17.43-3.35 13.06 1.07 23.36 6.33 30.9 15.79-11.43 6.91-17.02 16.29-16.78 28.16.24 9.32 3.86 17.15 10.86 23.49 7 6.34 15.22 10.02 24.66 11.05-2.01 6.13-4.46 12.33-7.36 18.6zM119.22 33.15c0-7.32 2.66-14.18 7.99-20.59 5.33-6.41 11.83-10.45 19.51-12.12.14 1.08.21 2.03.21 2.85 0 7.32-2.73 14.16-8.2 20.52-5.46 6.36-12 10.41-19.61 12.14-.14-1.07-.21-2.01-.21-2.8z" />
          </svg>
        </button>

        {/* System / App Title */}
        <span
          style={{
            fontWeight: 700,
            padding: '2px 8px',
            borderRadius: '4px',
            letterSpacing: '0.01em',
            color: '#ffffff',
          }}
        >
          TajalliOS
        </span>

        {/* Standard Mac Menu Bar Items */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {menuItems.map((item) => (
            <button
              key={item}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '2px 8px',
                height: '22px',
                borderRadius: '4px',
                border: 'none',
                background: activeMenu === item ? 'rgba(255, 255, 255, 0.16)' : 'transparent',
                color: 'rgba(255, 255, 255, 0.88)',
                cursor: 'default',
                fontSize: '0.82rem',
                fontFamily: 'inherit',
                transition: 'background-color 0.12s',
              }}
              onMouseEnter={(e) => {
                setActiveMenu(item);
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.12)';
              }}
              onMouseLeave={(e) => {
                setActiveMenu(null);
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Right Status Section */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', height: '100%' }}>
        {/* Search / Spotlight */}
        <div
          title="Search"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2px 4px',
            borderRadius: '4px',
            cursor: 'default',
            color: 'rgba(255, 255, 255, 0.85)',
          }}
        >
          <Search size={14} />
        </div>

        {/* Control Center */}
        <div
          title="Control Center"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2px 4px',
            borderRadius: '4px',
            cursor: 'default',
            color: 'rgba(255, 255, 255, 0.85)',
          }}
        >
          <SlidersHorizontal size={14} />
        </div>

        {/* Wi-Fi */}
        <div
          title="Wi-Fi: Connected"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2px 4px',
            borderRadius: '4px',
            cursor: 'default',
            color: 'rgba(255, 255, 255, 0.85)',
          }}
        >
          <Wifi size={14} />
        </div>

        {/* Battery */}
        <div
          title="Battery: 100%"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2px 4px',
            borderRadius: '4px',
            cursor: 'default',
            color: 'rgba(255, 255, 255, 0.85)',
          }}
        >
          <Battery size={15} />
        </div>

        {/* Live Clock Component */}
        <Clock />
      </div>
    </header>
  );
};
