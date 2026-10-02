import React from 'react';
import { DesktopApp, Position } from '../../types/desktop';
import { AppIconGraphics } from './AppIconGraphics';
import { useDraggable } from '../../hooks/useDraggable';

interface DesktopIconProps {
  app: DesktopApp;
  position: Position;
  isSelected: boolean;
  onSelect: () => void;
  onPositionChange: (newPos: Position) => void;
}

export const DesktopIcon: React.FC<DesktopIconProps> = ({
  app,
  position,
  isSelected,
  onSelect,
  onPositionChange,
}) => {
  const iconGraphicSize = 74;
  const containerWidth = 96;
  const containerHeight = 112;

  const { position: currentPos, isDragging, handleMouseDown, hasMoved } = useDraggable({
    initialPosition: position,
    elementWidth: containerWidth,
    elementHeight: containerHeight,
    topOffset: 38,
    bottomOffset: 84,
    onDragEnd: onPositionChange,
  });

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasMoved()) return;

    onSelect();

    // TYPE A: DEFINED ACTION -> External Navigation
    if (app.actionType === 'external_link' && app.actionUrl) {
      window.open(app.actionUrl, '_blank', 'noopener,noreferrer');
      return;
    }

    // TYPE B: UNDEFINED ACTION -> Strictly Inactive. No popup, no window, no invented content.
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={app.name}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      style={{
        position: 'absolute',
        left: `${currentPos.x}px`,
        top: `${currentPos.y}px`,
        width: `${containerWidth}px`,
        height: `${containerHeight}px`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: '6px 4px',
        borderRadius: '16px',
        cursor: isDragging ? 'grabbing' : 'pointer',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        zIndex: isDragging ? 50 : isSelected ? 30 : 10,
        backgroundColor: isDragging
          ? 'rgba(255, 255, 255, 0.16)'
          : isSelected
          ? 'rgba(255, 255, 255, 0.12)'
          : 'transparent',
        border: isSelected
          ? '1px solid rgba(255, 255, 255, 0.35)'
          : isDragging
          ? '1px dashed rgba(255, 255, 255, 0.45)'
          : '1px solid transparent',
        boxShadow: isDragging
          ? '0 20px 40px rgba(0, 0, 0, 0.55)'
          : isSelected
          ? '0 4px 16px rgba(0, 0, 0, 0.25)'
          : 'none',
        transform: isDragging ? 'scale(1.06)' : 'scale(1)',
        transition: isDragging
          ? 'box-shadow 0.15s, transform 0.15s'
          : 'background-color 0.2s cubic-bezier(0.16, 1, 0.3, 1), transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      onMouseEnter={(e) => {
        if (!isSelected && !isDragging) {
          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
          e.currentTarget.style.transform = 'translateY(-3px) scale(1.04)';
          e.currentTarget.style.filter = 'brightness(1.08)';
        }
      }}
      onMouseLeave={(e) => {
        if (!isSelected && !isDragging) {
          e.currentTarget.style.backgroundColor = 'transparent';
          e.currentTarget.style.transform = 'translateY(0) scale(1)';
          e.currentTarget.style.filter = 'brightness(1)';
        }
      }}
    >
      {/* Desktop Icon Asset */}
      <div
        style={{
          pointerEvents: 'none',
          filter: 'drop-shadow(0 10px 20px rgba(0, 0, 0, 0.45))',
        }}
      >
        <AppIconGraphics id={app.iconType} size={iconGraphicSize} />
      </div>

      {/* White Desktop Label */}
      <span
        style={{
          marginTop: '7px',
          fontSize: '15px',
          fontWeight: 500,
          color: '#ffffff',
          textAlign: 'center',
          lineHeight: 1.25,
          maxWidth: '94px',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          textShadow: '0 1px 3px rgba(0, 0, 0, 0.95), 0 2px 10px rgba(0, 0, 0, 0.75)',
          letterSpacing: '-0.01em',
          pointerEvents: 'none',
          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Plus Jakarta Sans", sans-serif',
        }}
      >
        {app.name}
      </span>
    </div>
  );
};
