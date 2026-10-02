import React from 'react';
import { DesktopApp, Position } from '../../types/desktop';
import { AppIconGraphics } from './AppIconGraphics';
import { useDraggable } from '../../hooks/useDraggable';

interface DesktopIconProps {
  app: DesktopApp;
  position: Position;
  isSelected: boolean;
  onSelect: () => void;
  onDoubleClick: () => void;
  onPositionChange: (newPos: Position) => void;
}

export const DesktopIcon: React.FC<DesktopIconProps> = ({
  app,
  position,
  isSelected,
  onSelect,
  onDoubleClick,
  onPositionChange,
}) => {
  const iconWidth = 84;
  const iconHeight = 92;

  const { position: currentPos, isDragging, handleMouseDown, hasMoved } = useDraggable({
    initialPosition: position,
    elementWidth: iconWidth,
    elementHeight: iconHeight,
    topOffset: 34,
    bottomOffset: 84,
    onDragEnd: onPositionChange,
  });

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!hasMoved()) {
      onSelect();
    }
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!hasMoved()) {
      console.log(`[Mac Desktop] Double-clicked app: ${app.name} (${app.id})`);
      onDoubleClick();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={app.name}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onMouseDown={handleMouseDown}
      style={{
        position: 'absolute',
        left: `${currentPos.x}px`,
        top: `${currentPos.y}px`,
        width: `${iconWidth}px`,
        height: `${iconHeight}px`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '6px 4px',
        borderRadius: '12px',
        cursor: isDragging ? 'grabbing' : 'pointer',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        zIndex: isDragging ? 50 : isSelected ? 30 : 10,
        backgroundColor: isDragging
          ? 'rgba(255, 255, 255, 0.18)'
          : isSelected
          ? 'rgba(255, 255, 255, 0.16)'
          : 'transparent',
        border: isSelected
          ? '1px solid rgba(255, 255, 255, 0.35)'
          : isDragging
          ? '1px dashed rgba(255, 255, 255, 0.4)'
          : '1px solid transparent',
        boxShadow: isDragging
          ? '0 16px 32px rgba(0, 0, 0, 0.5)'
          : isSelected
          ? '0 4px 14px rgba(0, 0, 0, 0.25)'
          : 'none',
        transform: isDragging ? 'scale(1.05)' : 'scale(1)',
        transition: isDragging
          ? 'box-shadow 0.15s, transform 0.15s'
          : 'background-color 0.15s, border-color 0.15s, transform 0.15s',
      }}
      onMouseEnter={(e) => {
        if (!isSelected && !isDragging) {
          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
          e.currentTarget.style.transform = 'translateY(-2px)';
        }
      }}
      onMouseLeave={(e) => {
        if (!isSelected && !isDragging) {
          e.currentTarget.style.backgroundColor = 'transparent';
          e.currentTarget.style.transform = 'translateY(0)';
        }
      }}
    >
      {/* Polished macOS App Squircle */}
      <div style={{ pointerEvents: 'none', filter: 'drop-shadow(0 6px 12px rgba(0, 0, 0, 0.35))' }}>
        <AppIconGraphics id={app.id} size={54} />
      </div>

      {/* App Label */}
      <span
        style={{
          marginTop: '6px',
          fontSize: '0.78rem',
          fontWeight: 500,
          color: '#ffffff',
          textAlign: 'center',
          lineHeight: 1.2,
          maxWidth: '80px',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          textShadow: '0 1px 3px rgba(0, 0, 0, 0.8), 0 2px 8px rgba(0, 0, 0, 0.6)',
          letterSpacing: '0.01em',
          pointerEvents: 'none',
        }}
      >
        {app.name}
      </span>
    </div>
  );
};
