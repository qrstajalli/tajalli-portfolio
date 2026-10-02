import React, { useRef, useState } from 'react';
import { DockItemData } from '../../types/desktop';
import { AppIconGraphics } from './AppIconGraphics';

interface DockItemProps {
  item: DockItemData;
  scale: number;
  isHovered: boolean;
  onItemClick: (item: DockItemData) => void;
}

export const DockItem: React.FC<DockItemProps> = ({
  item,
  scale,
  isHovered,
  onItemClick,
}) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const [isPressed, setIsPressed] = useState(false);

  // Compute upward lift from scale
  const translateY = -(scale - 1) * 26;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (item.type === 'link' && item.url) {
      window.open(item.url, '_blank', 'noopener,noreferrer');
    } else {
      console.log(`[Mac Dock] Clicked app: ${item.name} (${item.id})`);
      onItemClick(item);
    }
  };

  return (
    <div
      ref={itemRef}
      role="button"
      tabIndex={0}
      aria-label={item.name}
      onClick={handleClick}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: '50px',
        height: '54px',
        cursor: 'pointer',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        transform: `translateY(${translateY}px) scale(${isPressed ? scale * 0.94 : scale})`,
        transformOrigin: 'bottom center',
        transition: 'transform 0.12s cubic-bezier(0.2, 0, 0, 1)',
        zIndex: isHovered ? 100 : Math.round(scale * 10),
      }}
    >
      {/* Tooltip floating above hovered icon */}
      {isHovered && (
        <div
          style={{
            position: 'absolute',
            bottom: '100%',
            marginBottom: '10px',
            backgroundColor: 'rgba(20, 24, 36, 0.85)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            boxShadow: '0 6px 18px rgba(0, 0, 0, 0.45)',
            color: '#f8fafc',
            fontSize: '0.74rem',
            fontWeight: 500,
            padding: '3px 10px',
            borderRadius: '8px',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            letterSpacing: '0.01em',
            animation: 'fadeIn 0.15s ease-out',
          }}
        >
          {item.name}
        </div>
      )}

      {/* App Icon */}
      <div
        style={{
          filter: 'drop-shadow(0 6px 14px rgba(0, 0, 0, 0.4))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <AppIconGraphics id={item.id} size={46} />
      </div>

      {/* Running/Open Indicator Dot */}
      <div
        style={{
          width: '4px',
          height: '4px',
          borderRadius: '50%',
          backgroundColor: item.isOpen ? 'rgba(255, 255, 255, 0.85)' : 'transparent',
          marginTop: '4px',
          boxShadow: item.isOpen ? '0 0 6px rgba(255, 255, 255, 0.8)' : 'none',
          transition: 'background-color 0.2s',
        }}
      />
    </div>
  );
};
