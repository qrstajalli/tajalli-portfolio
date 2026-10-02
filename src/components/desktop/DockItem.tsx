import React from 'react';
import { DockItemData } from '../../types/desktop';
import { AppIconGraphics } from './AppIconGraphics';

interface DockItemProps {
  item: DockItemData;
  scale?: number;
  isHovered?: boolean;
  onItemClick: (item: DockItemData) => void;
}

export const DockItem: React.FC<DockItemProps> = ({
  item,
  onItemClick,
}) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Inactive until future instructions define functionality
    onItemClick(item);
  };

  const graphicId = `dock-${item.id}`;

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={item.name}
      onClick={handleClick}
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '60px',
        height: '60px',
        cursor: 'default',
        userSelect: 'none',
        WebkitUserSelect: 'none',
      }}
    >
      {/* Large rounded-square icon on white base matching reference */}
      <AppIconGraphics id={graphicId} size={60} />
    </div>
  );
};
