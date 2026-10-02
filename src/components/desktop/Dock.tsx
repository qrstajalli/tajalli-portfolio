import React, { useState } from 'react';
import { DockItemData } from '../../types/desktop';
import { DockItem } from './DockItem';

interface DockProps {
  items: DockItemData[];
  onItemClick: (item: DockItemData) => void;
  isRevealed?: boolean;
}

export const Dock: React.FC<DockProps> = ({ items, onItemClick, isRevealed = true }) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <nav
      style={{
        position: 'fixed',
        bottom: '26px',
        left: '50%',
        transform: isRevealed ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(16px)',
        zIndex: 9990,
        userSelect: 'none',
        WebkitUserSelect: 'none',
        opacity: isRevealed ? 1 : 0,
        transition: 'opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1), transform 0.65s cubic-bezier(0.16, 1, 0.3, 1)',
        pointerEvents: isRevealed ? 'auto' : 'none',
      }}
    >
      <div
        onMouseLeave={() => setHoveredIdx(null)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px',
          backgroundColor: 'rgba(255, 255, 255, 0.20)',
          backdropFilter: 'blur(20px) saturate(1.5)',
          WebkitBackdropFilter: 'blur(20px) saturate(1.5)',
          borderRadius: '20px',
          border: '1px solid rgba(255, 255, 255, 0.38)',
          boxShadow: '0 14px 34px rgba(0, 0, 0, 0.36), 0 1px 6px rgba(0, 0, 0, 0.15), inset 0 1px 1px rgba(255, 255, 255, 0.5)',
        }}
      >
        {items.map((item, index) => {
          const isHovered = hoveredIdx === index;

          return (
            <div
              key={item.id}
              onMouseEnter={() => setHoveredIdx(index)}
              style={{
                cursor: 'default',
                transform: isHovered ? 'scale(1.08) translateY(-2px)' : 'scale(1) translateY(0)',
                filter: isHovered ? 'brightness(1.08)' : 'brightness(1)',
                transition: 'transform 0.18s cubic-bezier(0.16, 1, 0.3, 1), filter 0.18s ease',
              }}
            >
              <DockItem
                item={item}
                onItemClick={onItemClick}
              />
            </div>
          );
        })}
      </div>
    </nav>
  );
};
