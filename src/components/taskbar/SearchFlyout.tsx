import React, { useState, useEffect, useRef } from 'react';
import { Search, ArrowRight, X } from 'lucide-react';
import { PORTFOLIO_FOLDERS } from '../../data/folders';
import { FolderItem } from '../../types/desktop';
import { FolderIcon } from '../common/Icons';

interface SearchFlyoutProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenFolder: (id: string) => void;
}

export const SearchFlyout: React.FC<SearchFlyoutProps> = ({
  isOpen,
  onClose,
  onOpenFolder,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 80);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        const target = e.target as HTMLElement;
        if (!target.closest('[data-search-button="true"]')) {
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

  const results: FolderItem[] = PORTFOLIO_FOLDERS.filter((f) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      f.name.toLowerCase().includes(q) ||
      f.description.toLowerCase().includes(q) ||
      f.category.toLowerCase().includes(q)
    );
  });

  const handleSelectFolder = (id: string) => {
    onOpenFolder(id);
    onClose();
  };

  const handleKeyDownInput = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, results.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + results.length) % Math.max(1, results.length));
    } else if (e.key === 'Enter' && results.length > 0) {
      e.preventDefault();
      handleSelectFolder(results[selectedIndex]?.id || results[0].id);
    }
  };

  return (
    <div
      ref={containerRef}
      className="animate-slideUp"
      style={{
        position: 'fixed',
        bottom: '56px',
        left: '60px',
        width: '460px',
        maxWidth: 'calc(100vw - 32px)',
        backgroundColor: 'rgba(22, 26, 38, 0.95)',
        backdropFilter: 'blur(32px)',
        WebkitBackdropFilter: 'blur(32px)',
        border: '1px solid rgba(255, 255, 255, 0.14)',
        borderRadius: '14px',
        boxShadow: '0 24px 60px rgba(0, 0, 0, 0.65), 0 0 0 1px rgba(255, 255, 255, 0.08)',
        zIndex: 10001,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Search Input Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '14px 18px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          background: 'rgba(255, 255, 255, 0.03)',
        }}
      >
        <Search size={18} color="#818cf8" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setSelectedIndex(0);
          }}
          onKeyDown={handleKeyDownInput}
          placeholder="Search portfolio sections, projects, skills..."
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: '#ffffff',
            fontSize: '0.92rem',
            fontFamily: 'inherit',
          }}
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'rgba(255, 255, 255, 0.5)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Search Results List */}
      <div
        style={{
          maxHeight: '360px',
          overflowY: 'auto',
          padding: '8px',
        }}
      >
        <div
          style={{
            padding: '4px 10px 8px 10px',
            fontSize: '0.74rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: 'rgba(255, 255, 255, 0.45)',
          }}
        >
          {query ? `Results (${results.length})` : 'Quick Navigation'}
        </div>

        {results.length === 0 ? (
          <div
            style={{
              padding: '24px 16px',
              textAlign: 'center',
              color: 'rgba(255, 255, 255, 0.5)',
              fontSize: '0.86rem',
            }}
          >
            No matches found for "{query}"
          </div>
        ) : (
          results.map((folder, idx) => {
            const isSelected = idx === selectedIndex;
            return (
              <div
                key={folder.id}
                onClick={() => handleSelectFolder(folder.id)}
                onMouseEnter={() => setSelectedIndex(idx)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  backgroundColor: isSelected ? 'rgba(129, 140, 248, 0.16)' : 'transparent',
                  border: isSelected
                    ? '1px solid rgba(129, 140, 248, 0.3)'
                    : '1px solid transparent',
                  transition: 'background-color 0.12s',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <FolderIcon size={28} color={folder.iconColor} />
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span
                      style={{
                        fontSize: '0.86rem',
                        fontWeight: 500,
                        color: isSelected ? '#ffffff' : 'rgba(255, 255, 255, 0.9)',
                      }}
                    >
                      {folder.name}
                    </span>
                    <span
                      style={{
                        fontSize: '0.74rem',
                        color: 'rgba(255, 255, 255, 0.5)',
                      }}
                    >
                      {folder.description}
                    </span>
                  </div>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    color: isSelected ? '#818cf8' : 'rgba(255, 255, 255, 0.3)',
                  }}
                >
                  <span
                    style={{
                      fontSize: '0.7rem',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      backgroundColor: 'rgba(255, 255, 255, 0.06)',
                    }}
                  >
                    {folder.category}
                  </span>
                  <ArrowRight size={14} />
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Footer shortcut tip */}
      <div
        style={{
          padding: '8px 16px',
          background: 'rgba(15, 18, 28, 0.8)',
          borderTop: '1px solid rgba(255, 255, 255, 0.06)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '0.72rem',
          color: 'rgba(255, 255, 255, 0.4)',
        }}
      >
        <span>Use &uarr; &darr; to navigate, Enter to select</span>
        <span>Esc to close</span>
      </div>
    </div>
  );
};
