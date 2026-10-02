import React, { useState, useEffect, useCallback } from 'react';
import { DESKTOP_APPS, DOCK_ITEMS } from '../../data/desktopApps';
import { AppId, DesktopApp, DockItemData, Position } from '../../types/desktop';
import { MenuBar } from './MenuBar';
import { Dock } from './Dock';
import { DesktopIcon } from './DesktopIcon';

const STORAGE_KEY_POSITIONS = 'tajalli_desktop_master_positions_v1';

interface DesktopProps {
  isRevealed?: boolean;
}

export const Desktop: React.FC<DesktopProps> = ({ isRevealed = true }) => {
  const [selectedAppId, setSelectedAppId] = useState<AppId | null>(null);

  // ----------------------------------------------------
  // Deterministic Scattered Spatial Positioning
  // ----------------------------------------------------
  const computeScatteredPositions = useCallback((): Record<AppId, Position> => {
    const width = typeof window !== 'undefined' ? window.innerWidth : 1440;
    const height = typeof window !== 'undefined' ? window.innerHeight : 900;
    const isMobile = width < 768;

    const initial: Record<string, Position> = {};

    DESKTOP_APPS.forEach((app, index) => {
      if (isMobile) {
        // Mobile adaptive clean 2-column layout
        const col = index % 2;
        const row = Math.floor(index / 2);
        initial[app.id] = {
          x: col === 0 ? 24 : width - 120,
          y: 48 + row * 118,
        };
      } else {
        // Deterministic scattered positions matching reference composition
        const calcX = Math.round((width * app.percentX) / 100);
        const calcY = Math.round((height * app.percentY) / 100);

        const clampedX = Math.max(20, Math.min(calcX, width - 120));
        const clampedY = Math.max(42, Math.min(calcY, height - 160));

        initial[app.id] = { x: clampedX, y: clampedY };
      }
    });

    return initial as Record<AppId, Position>;
  }, []);

  const [positions, setPositions] = useState<Record<AppId, Position>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_POSITIONS);
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return computeScatteredPositions();
  });

  // Re-compute on window resize if not manually dragged
  useEffect(() => {
    const handleResize = () => {
      try {
        const saved = localStorage.getItem(STORAGE_KEY_POSITIONS);
        if (!saved) {
          setPositions(computeScatteredPositions());
        }
      } catch {
        setPositions(computeScatteredPositions());
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [computeScatteredPositions]);

  const handlePositionChange = (appId: AppId, newPos: Position) => {
    setPositions((prev) => {
      const updated = { ...prev, [appId]: newPos };
      try {
        localStorage.setItem(STORAGE_KEY_POSITIONS, JSON.stringify(updated));
      } catch {
        // Ignore quota
      }
      return updated;
    });
  };

  const handleAppSelect = (app: DesktopApp) => {
    setSelectedAppId(app.id);
  };

  const handleDockItemClick = (item: DockItemData) => {
    // Dock items are currently inactive as per specification
    console.log(`[Dock] ${item.name} is currently inactive.`);
  };

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setSelectedAppId(null);
    }
  };

  return (
    <div
      onClick={handleCanvasClick}
      className="mac-desktop-wallpaper"
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        userSelect: 'none',
      }}
    >
      {/* Top Menu Bar */}
      <div
        style={{
          opacity: isRevealed ? 1 : 0,
          transform: isRevealed ? 'translateY(0)' : 'translateY(-10px)',
          transition: 'opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1), transform 0.65s cubic-bezier(0.16, 1, 0.3, 1)',
          pointerEvents: isRevealed ? 'auto' : 'none',
        }}
      >
        <MenuBar />
      </div>

      {/* Exactly 7 Desktop Items */}
      <div
        style={{
          opacity: isRevealed ? 1 : 0,
          transform: isRevealed ? 'scale(1)' : 'scale(0.97)',
          transition: 'opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1), transform 0.65s cubic-bezier(0.16, 1, 0.3, 1)',
          pointerEvents: isRevealed ? 'auto' : 'none',
        }}
      >
        {DESKTOP_APPS.map((app) => {
          const pos = positions[app.id] || app.defaultPosition;
          return (
            <DesktopIcon
              key={app.id}
              app={app}
              position={pos}
              isSelected={selectedAppId === app.id}
              onSelect={() => handleAppSelect(app)}
              onPositionChange={(newPos) => handlePositionChange(app.id, newPos)}
            />
          );
        })}
      </div>

      {/* Exactly 5 Dock Slots */}
      <Dock items={DOCK_ITEMS} onItemClick={handleDockItemClick} isRevealed={isRevealed} />
    </div>
  );
};
