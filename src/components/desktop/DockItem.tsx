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

  // Subtle upward lift from scale
  const translateY = -(scale - 1) * 18;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Inactive until future instructions define functionality
    if (item.isInteractive && item.actionType === 'external_link' && item.actionUrl) {
      window.open(item.actionUrl, '_blank', 'noopener,noreferrer');
      return;
    }

    onItemClick(item);
  };

  const graphicId = `dock-${item.id}`;

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
        width: '52px',
        height: '56px',
        cursor: item.isInteractive ? 'pointer' : 'default',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        transform: `translateY(${translateY}px) scale(${isPressed ? scale * 0.94 : scale})`,
        transformOrigin: 'bottom center',
        transition: 'transform 0.14s cubic-bezier(0.2, 0, 0, 1)',
        zIndex: isHovered ? 100 : Math.round(scale * 10),
      }}
    >
      {/* Tooltip floating above hovered icon */}
      {isHovered && (
        <div
          style={{
            position: 'absolute',
            bottom: '100%',
            marginBottom: '12px',
            backgroundColor: 'rgba(15, 18, 28, 0.88)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            boxShadow: '0 8px 20px rgba(0, 0, 0, 0.5)',
            color: '#f8fafc',
            fontSize: '0.76rem',
            fontWeight: 500,
            padding: '3px 10px',
            borderRadius: '8px',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            letterSpacing: '-0.01em',
            animation: 'fadeIn 0.15s ease-out',
          }}
        >
          {item.name}
        </div>
      )}

      {/* Dock Icon Asset */}
      <div
        style={{
          position: 'relative',
          filter: 'drop-shadow(0 6px 14px rgba(0, 0, 0, 0.4))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <AppIconGraphics id={graphicId} size={48} />
      </div>
    </div>
  );
};
