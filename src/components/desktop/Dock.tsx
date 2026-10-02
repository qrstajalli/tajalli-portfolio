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

  // Compute subtle magnification scale
  const getItemScale = (index: number) => {
    if (mouseX === null || !dockRef.current) return 1.0;

    const itemWidthWithGap = 58;
    const padding = 12;
    const itemCenter = padding + index * itemWidthWithGap + 26;

    const distance = Math.abs(mouseX - itemCenter);
    const maxEffectDistance = 95; // Gentle influence radius
    const maxScale = 1.25; // Subtle macOS-style magnification
    const minScale = 1.0;

    if (distance < maxEffectDistance) {
      const factor = Math.cos((distance / maxEffectDistance) * (Math.PI / 2));
      return minScale + (maxScale - minScale) * factor;
    }

    return minScale;
  };

  const getHoveredIndex = () => {
    if (mouseX === null || !dockRef.current) return -1;
    const itemWidthWithGap = 58;
    const padding = 12;

    let closestIdx = -1;
    let minDistance = Infinity;

    items.forEach((_, idx) => {
      const itemCenter = padding + idx * itemWidthWithGap + 26;
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
        bottom: '18px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 9000,
        userSelect: 'none',
        WebkitUserSelect: 'none',
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
          padding: '6px 12px 4px 12px',
          height: '66px',
          backgroundColor: 'rgba(18, 22, 34, 0.52)',
          backdropFilter: 'blur(30px)',
          WebkitBackdropFilter: 'blur(30px)',
          borderRadius: '22px',
          border: '1px solid rgba(255, 255, 255, 0.18)',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.06)',
        }}
      >
        {items.map((item, index) => {
          const scale = getItemScale(index);
          const isHovered = index === hoveredIndex;

          return (
            <DockItem
              key={item.id}
              item={item}
              scale={scale}
              isHovered={isHovered}
              onItemClick={onItemClick}
            />
          );
        })}
      </div>
    </nav>
  );
};
