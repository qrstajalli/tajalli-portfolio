import React, { useRef, useState, useCallback } from 'react';
import { DockItemData } from '../../types/desktop';
import { DockItem } from './DockItem';

interface DockProps {
  items: DockItemData[];
  onItemClick: (item: DockItemData) => void;
}

export const Dock: React.FC<DockProps> = ({ items, onItemClick }) => {
  const dockRef = useRef<HTMLDivElement>(null);
  const [mouseX, setMouseX] = useState<number | null>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (dockRef.current) {
      const rect = dockRef.current.getBoundingClientRect();
      setMouseX(e.clientX - rect.left);
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    setMouseX(null);
  }, []);

  // Compute scale for each item based on cursor distance
  const getItemScale = (index: number) => {
    if (mouseX === null || !dockRef.current) return 1.0;

    // Estimated width per item + gap
    const itemWidthWithGap = 56;
    const padding = 14;
    const itemCenter = padding + index * itemWidthWithGap + 25;

    const distance = Math.abs(mouseX - itemCenter);
    const maxEffectDistance = 110; // Influence radius in pixels
    const maxScale = 1.38;
    const minScale = 1.0;

    if (distance < maxEffectDistance) {
      // Smooth cosine curve
      const factor = Math.cos((distance / maxEffectDistance) * (Math.PI / 2));
      return minScale + (maxScale - minScale) * factor;
    }

    return minScale;
  };

  // Find closest item for tooltip
  const getHoveredIndex = () => {
    if (mouseX === null || !dockRef.current) return -1;
    const itemWidthWithGap = 56;
    const padding = 14;

    let closestIdx = -1;
    let minDistance = Infinity;

    items.forEach((_, idx) => {
      const itemCenter = padding + idx * itemWidthWithGap + 25;
      const dist = Math.abs(mouseX - itemCenter);
      if (dist < minDistance && dist < 32) {
        minDistance = dist;
        closestIdx = idx;
      }
    });

    return closestIdx;
  };

  const hoveredIndex = getHoveredIndex();

  return (
    <nav
      style={{
        position: 'fixed',
        bottom: '16px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 9000,
        userSelect: 'none',
      }}
    >
      <div
        ref={dockRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          gap: '6px',
          padding: '8px 12px 6px 12px',
          height: '66px',
          backgroundColor: 'rgba(25, 30, 45, 0.45)',
          backdropFilter: 'blur(30px)',
          WebkitBackdropFilter: 'blur(30px)',
          borderRadius: '22px',
          border: '1px solid rgba(255, 255, 255, 0.18)',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05)',
        }}
      >
        {items.map((item, index) => {
          const scale = getItemScale(index);
          const isHovered = index === hoveredIndex;
          const isDividerBefore = index === 3; // Subtle divider before external web links

          return (
            <React.Fragment key={item.id}>
              {isDividerBefore && (
                <div
                  style={{
                    width: '1px',
                    height: '38px',
                    backgroundColor: 'rgba(255, 255, 255, 0.14)',
                    margin: '0 4px 6px 4px',
                  }}
                />
              )}
              <DockItem
                item={item}
                scale={scale}
                isHovered={isHovered}
                onItemClick={onItemClick}
              />
            </React.Fragment>
          );
        })}
      </div>
    </nav>
  );
};
