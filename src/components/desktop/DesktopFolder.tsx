import React from 'react';
import { FolderItem, Position } from '../../types/desktop';
import { FolderIcon } from '../common/Icons';
import { useDraggable } from '../../hooks/useDraggable';

interface DesktopFolderProps {
  folder: FolderItem;
  position: Position;
  isSelected: boolean;
  onSelect: () => void;
  onDoubleClick: () => void;
  onPositionChange: (pos: Position) => void;
}

export const DesktopFolder: React.FC<DesktopFolderProps> = ({
  folder,
  position,
  isSelected,
  onSelect,
  onDoubleClick,
  onPositionChange,
}) => {
  const folderWidth = 86;
  const folderHeight = 88;

  const { position: currentPos, isDragging, handleMouseDown, hasMoved } = useDraggable({
    initialPosition: position,
    elementWidth: folderWidth,
    elementHeight: folderHeight,
    bottomOffset: 48, // Taskbar height
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
      onDoubleClick();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`Folder ${folder.name}`}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onMouseDown={handleMouseDown}
      style={{
        position: 'absolute',
        left: `${currentPos.x}px`,
        top: `${currentPos.y}px`,
        width: `${folderWidth}px`,
        height: `${folderHeight}px`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '6px 4px',
        borderRadius: '8px',
        cursor: isDragging ? 'grabbing' : 'pointer',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        zIndex: isDragging ? 100 : isSelected ? 50 : 10,
        backgroundColor: isDragging
          ? 'rgba(255, 255, 255, 0.16)'
          : isSelected
          ? 'rgba(59, 130, 246, 0.24)'
          : 'transparent',
        border: isSelected
          ? '1px solid rgba(147, 197, 253, 0.55)'
          : isDragging
          ? '1px dashed rgba(255, 255, 255, 0.4)'
          : '1px solid transparent',
        boxShadow: isDragging
          ? '0 16px 32px rgba(0, 0, 0, 0.45)'
          : isSelected
          ? '0 4px 14px rgba(59, 130, 246, 0.25)'
          : 'none',
        transform: isDragging ? 'scale(1.06)' : 'scale(1)',
        transition: isDragging
          ? 'box-shadow 0.15s, transform 0.15s'
          : 'background-color 0.15s, border-color 0.15s, transform 0.15s',
      }}
      onMouseEnter={(e) => {
        if (!isSelected && !isDragging) {
          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.16)';
        }
      }}
      onMouseLeave={(e) => {
        if (!isSelected && !isDragging) {
          e.currentTarget.style.backgroundColor = 'transparent';
          e.currentTarget.style.borderColor = 'transparent';
        }
      }}
    >
      {/* Folder Vector Icon */}
      <div style={{ pointerEvents: 'none', display: 'flex', justifyContent: 'center' }}>
        <FolderIcon size={46} color={folder.iconColor} />
      </div>

      {/* Folder Name Label */}
      <span
        style={{
          marginTop: '4px',
          fontSize: '0.78rem',
          fontWeight: 500,
          color: '#ffffff',
          textAlign: 'center',
          lineHeight: 1.2,
          maxWidth: '82px',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          textShadow: '0 1px 3px rgba(0, 0, 0, 0.9), 0 2px 6px rgba(0, 0, 0, 0.7)',
          letterSpacing: '0.01em',
          pointerEvents: 'none',
        }}
      >
        {folder.name}
      </span>
    </div>
  );
};
