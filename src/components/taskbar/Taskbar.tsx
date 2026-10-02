import React from 'react';
import { Search } from 'lucide-react';
import { EXTERNAL_LINKS } from '../../data/externalLinks';
import { WindowState } from '../../types/desktop';
import {
  WindowsLogo,
  FigmaIcon,
  GmailIcon,
  LinkedInIcon,
  GitHubIcon,
  LeetCodeIcon,
  FolderIcon,
} from '../common/Icons';
import { SystemTray } from './SystemTray';

interface TaskbarProps {
  isStartOpen: boolean;
  onToggleStart: () => void;
  isSearchOpen: boolean;
  onToggleSearch: () => void;
  windows: Record<string, WindowState>;
  activeWindowId: string | null;
  onFocusWindow: (id: string) => void;
  onMinimizeWindow: (id: string) => void;
}

export const Taskbar: React.FC<TaskbarProps> = ({
  isStartOpen,
  onToggleStart,
  isSearchOpen,
  onToggleSearch,
  windows,
  activeWindowId,
  onFocusWindow,
  onMinimizeWindow,
}) => {
  const getBrandIcon = (id: string) => {
    switch (id) {
      case 'figma':
        return <FigmaIcon size={18} />;
      case 'gmail':
        return <GmailIcon size={18} />;
      case 'linkedin':
        return <LinkedInIcon size={18} />;
      case 'github':
        return <GitHubIcon size={18} />;
      case 'leetcode':
        return <LeetCodeIcon size={18} />;
      default:
        return null;
    }
  };

  const openWindowsList = Object.values(windows).filter((w) => w.isOpen);

  const handleWindowTabClick = (win: WindowState) => {
    if (activeWindowId === win.id && !win.isMinimized) {
      // Minimize if currently focused
      onMinimizeWindow(win.id);
    } else {
      // Focus and restore
      onFocusWindow(win.id);
    }
  };

  return (
    <footer
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: '48px',
        backgroundColor: 'rgba(18, 21, 31, 0.88)',
        backdropFilter: 'blur(28px)',
        WebkitBackdropFilter: 'blur(28px)',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.35)',
        zIndex: 10000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 10px',
        userSelect: 'none',
      }}
    >
      {/* Left / Center Cluster: Start Button, Search, Pinned Links & Open Windows */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          height: '100%',
        }}
      >
        {/* Windows Start Button */}
        <button
          data-start-button="true"
          onClick={onToggleStart}
          aria-label="Start Menu"
          title="Start"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '40px',
            height: '40px',
            borderRadius: '8px',
            border: isStartOpen ? '1px solid rgba(129, 140, 248, 0.4)' : '1px solid transparent',
            backgroundColor: isStartOpen ? 'rgba(255, 255, 255, 0.16)' : 'transparent',
            cursor: 'pointer',
            transition: 'background-color 0.15s, transform 0.1s',
          }}
          onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.92)')}
          onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          onMouseEnter={(e) => {
            if (!isStartOpen) e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.09)';
          }}
          onMouseLeave={(e) => {
            if (!isStartOpen) {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.transform = 'scale(1)';
            }
          }}
        >
          <WindowsLogo size={20} />
        </button>

        {/* Search Bar / Button */}
        <button
          data-search-button="true"
          onClick={onToggleSearch}
          title="Search portfolio (Ctrl+S / Click)"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            height: '34px',
            padding: '0 14px',
            borderRadius: '20px',
            backgroundColor: isSearchOpen ? 'rgba(255, 255, 255, 0.16)' : 'rgba(255, 255, 255, 0.08)',
            border: isSearchOpen
              ? '1px solid rgba(129, 140, 248, 0.4)'
              : '1px solid rgba(255, 255, 255, 0.1)',
            color: 'rgba(255, 255, 255, 0.75)',
            cursor: 'pointer',
            transition: 'background-color 0.15s, border-color 0.15s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.14)';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
          }}
          onMouseLeave={(e) => {
            if (!isSearchOpen) {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
            }
          }}
        >
          <Search size={15} color="#818cf8" />
          <span style={{ fontSize: '0.8rem', fontWeight: 400 }}>Search</span>
        </button>

        {/* Subtle Divider */}
        <div
          style={{
            width: '1px',
            height: '22px',
            backgroundColor: 'rgba(255, 255, 255, 0.12)',
            margin: '0 4px',
          }}
        />

        {/* Pinned External Links (Figma, Gmail, LinkedIn, GitHub, LeetCode) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          {EXTERNAL_LINKS.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              title={link.tooltip}
              aria-label={link.name}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '38px',
                height: '38px',
                borderRadius: '8px',
                backgroundColor: 'transparent',
                border: '1px solid transparent',
                color: '#ffffff',
                textDecoration: 'none',
                transition: 'background-color 0.15s, transform 0.1s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.12)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {getBrandIcon(link.id)}
            </a>
          ))}
        </div>

        {/* Active / Running Window Tabs */}
        {openWindowsList.length > 0 && (
          <>
            <div
              style={{
                width: '1px',
                height: '22px',
                backgroundColor: 'rgba(255, 255, 255, 0.12)',
                margin: '0 4px',
              }}
            />
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', overflowX: 'auto' }}>
              {openWindowsList.map((win) => {
                const isActive = activeWindowId === win.id && !win.isMinimized;
                return (
                  <button
                    key={win.id}
                    onClick={() => handleWindowTabClick(win)}
                    title={win.title}
                    style={{
                      position: 'relative',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      height: '38px',
                      padding: '0 12px',
                      borderRadius: '8px',
                      border: isActive
                        ? '1px solid rgba(129, 140, 248, 0.35)'
                        : '1px solid transparent',
                      backgroundColor: isActive
                        ? 'rgba(255, 255, 255, 0.14)'
                        : 'rgba(255, 255, 255, 0.05)',
                      color: isActive ? '#f8fafc' : 'rgba(255, 255, 255, 0.75)',
                      cursor: 'pointer',
                      transition: 'background-color 0.15s',
                      maxWidth: '160px',
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                    }}
                  >
                    <FolderIcon size={20} />
                    <span
                      style={{
                        fontSize: '0.78rem',
                        fontWeight: 500,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {win.title}
                    </span>

                    {/* Windows 11 Running Pill Indicator */}
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '2px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: isActive ? '18px' : '6px',
                        height: '3px',
                        borderRadius: '2px',
                        backgroundColor: isActive ? '#818cf8' : 'rgba(255, 255, 255, 0.4)',
                        transition: 'all 0.2s ease',
                      }}
                    />
                  </button>
                );
              })}
            </div>
          </>
        )}
      </div>

      {/* Right Cluster: System Tray (Hidden icons, Network, Audio, Battery, Clock, Date) */}
      <SystemTray />
    </footer>
  );
};
