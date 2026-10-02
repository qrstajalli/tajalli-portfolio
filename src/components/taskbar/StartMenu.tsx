import React, { useState, useEffect, useRef } from 'react';
import { Search, Lock, ExternalLink as ExtIcon } from 'lucide-react';
import { PORTFOLIO_FOLDERS } from '../../data/folders';
import { EXTERNAL_LINKS } from '../../data/externalLinks';
import { SYSTEM_USER } from '../../data/systemConfig';
import { FigmaIcon, GmailIcon, LinkedInIcon, GitHubIcon, LeetCodeIcon, FolderIcon } from '../common/Icons';

interface StartMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenFolder: (id: string) => void;
  onLock: () => void;
}

export const StartMenu: React.FC<StartMenuProps> = ({
  isOpen,
  onClose,
  onOpenFolder,
  onLock,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const menuRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setSearchQuery('');
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Handle escape key and click outside
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        // Only close if not clicking the windows button (handled in Taskbar)
        const target = e.target as HTMLElement;
        if (!target.closest('[data-start-button="true"]')) {
          onClose();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredFolders = PORTFOLIO_FOLDERS.filter((f) =>
    f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredLinks = EXTERNAL_LINKS.filter((l) =>
    l.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getBrandIcon = (id: string) => {
    switch (id) {
      case 'figma':
        return <FigmaIcon size={20} />;
      case 'gmail':
        return <GmailIcon size={20} />;
      case 'linkedin':
        return <LinkedInIcon size={20} />;
      case 'github':
        return <GitHubIcon size={20} />;
      case 'leetcode':
        return <LeetCodeIcon size={20} />;
      default:
        return <ExtIcon size={18} />;
    }
  };

  return (
    <div
      ref={menuRef}
      className="animate-slideUp"
      style={{
        position: 'fixed',
        bottom: '56px',
        left: '12px',
        width: '540px',
        maxWidth: 'calc(100vw - 24px)',
        maxHeight: '620px',
        backgroundColor: 'rgba(22, 26, 38, 0.94)',
        backdropFilter: 'blur(32px)',
        WebkitBackdropFilter: 'blur(32px)',
        border: '1px solid rgba(255, 255, 255, 0.14)',
        borderRadius: '16px',
        boxShadow: '0 24px 60px rgba(0, 0, 0, 0.65), 0 0 0 1px rgba(255, 255, 255, 0.08)',
        zIndex: 10001,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* Top Search Input */}
      <div style={{ padding: '16px 20px 12px 20px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            backgroundColor: 'rgba(255, 255, 255, 0.07)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '24px',
            padding: '8px 16px',
            transition: 'border-color 0.15s, background-color 0.15s',
          }}
        >
          <Search size={16} color="rgba(255, 255, 255, 0.6)" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Type to search folders, sections, links..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#ffffff',
              fontSize: '0.86rem',
              fontFamily: 'inherit',
            }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'rgba(255, 255, 255, 0.5)',
                cursor: 'pointer',
                fontSize: '0.8rem',
              }}
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '4px 20px 16px 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '18px',
        }}
      >
        {/* Section: Portfolio Folders */}
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '10px',
            }}
          >
            <span
              style={{
                fontSize: '0.78rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: 'rgba(255, 255, 255, 0.6)',
              }}
            >
              Portfolio Folders ({filteredFolders.length})
            </span>
          </div>

          {filteredFolders.length === 0 ? (
            <div
              style={{
                padding: '16px',
                textAlign: 'center',
                color: 'rgba(255, 255, 255, 0.45)',
                fontSize: '0.84rem',
              }}
            >
              No folders matching "{searchQuery}"
            </div>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '8px',
              }}
            >
              {filteredFolders.map((folder) => (
                <button
                  key={folder.id}
                  onClick={() => {
                    onOpenFolder(folder.id);
                    onClose();
                  }}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '10px 8px',
                    borderRadius: '10px',
                    border: '1px solid transparent',
                    background: 'rgba(255, 255, 255, 0.04)',
                    cursor: 'pointer',
                    transition: 'background-color 0.15s, border-color 0.15s, transform 0.1s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.04)';
                    e.currentTarget.style.borderColor = 'transparent';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <FolderIcon size={38} color={folder.iconColor} />
                  <span
                    style={{
                      marginTop: '6px',
                      fontSize: '0.8rem',
                      fontWeight: 500,
                      color: '#f8fafc',
                      textAlign: 'center',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      maxWidth: '100%',
                    }}
                  >
                    {folder.name}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Section: External Links */}
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '10px',
            }}
          >
            <span
              style={{
                fontSize: '0.78rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: 'rgba(255, 255, 255, 0.6)',
              }}
            >
              External Channels
            </span>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(95px, 1fr))',
              gap: '8px',
            }}
          >
            {filteredLinks.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                title={link.tooltip}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 10px',
                  borderRadius: '8px',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  textDecoration: 'none',
                  color: '#ffffff',
                  fontSize: '0.78rem',
                  fontWeight: 500,
                  transition: 'background-color 0.15s, border-color 0.15s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.12)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.04)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center' }}>{getBrandIcon(link.id)}</div>
                <span>{link.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* User Footer Profile & Lock */}
      <div
        style={{
          padding: '12px 20px',
          background: 'rgba(15, 18, 28, 0.85)',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              width: '34px',
              height: '34px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #818cf8 0%, #c084fc 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              fontWeight: 600,
              fontSize: '0.85rem',
            }}
          >
            TS
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#f8fafc' }}>
              {SYSTEM_USER.name}
            </span>
            <span style={{ fontSize: '0.74rem', color: 'rgba(255, 255, 255, 0.6)' }}>
              Developer Workspace
            </span>
          </div>
        </div>

        {/* Lock Screen Action */}
        <button
          onClick={() => {
            onClose();
            onLock();
          }}
          title="Lock Desktop"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 12px',
            borderRadius: '6px',
            background: 'rgba(255, 255, 255, 0.06)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            color: 'rgba(255, 255, 255, 0.8)',
            fontSize: '0.78rem',
            cursor: 'pointer',
            transition: 'background-color 0.15s, color 0.15s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
            e.currentTarget.style.color = '#ffffff';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.06)';
            e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)';
          }}
        >
          <Lock size={13} />
          <span>Lock</span>
        </button>
      </div>
    </div>
  );
};
