import React, { useState } from 'react';
import { DESKTOP_APPS, DOCK_ITEMS } from '../../data/desktopApps';
import { AppId, DesktopApp, DockItemData, Position } from '../../types/desktop';
import { MenuBar } from './MenuBar';
import { Dock } from './Dock';
import { DesktopIcon } from './DesktopIcon';

const STORAGE_KEY_MAC_POSITIONS = 'tajalli_mac_desktop_positions_v1';

interface DesktopProps {
  isRevealed?: boolean;
}

export const Desktop: React.FC<DesktopProps> = ({ isRevealed = true }) => {
  const [selectedAppId, setSelectedAppId] = useState<AppId | null>(null);

  // Position management with localStorage persistence and fallback defaults
  const [positions, setPositions] = useState<Record<AppId, Position>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_MAC_POSITIONS);
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    const initial: Record<string, Position> = {};
    DESKTOP_APPS.forEach((app) => {
      initial[app.id] = app.defaultPosition;
    });
    return initial as Record<AppId, Position>;
  });

  const handlePositionChange = (appId: AppId, newPos: Position) => {
    setPositions((prev) => {
      const updated = { ...prev, [appId]: newPos };
      try {
        localStorage.setItem(STORAGE_KEY_MAC_POSITIONS, JSON.stringify(updated));
      } catch {
        // Ignore quota
      }
      return updated;
    });
  };

  const handleAppSelect = (appId: AppId) => {
    setSelectedAppId(appId);
  };

  const handleAppDoubleClick = (app: DesktopApp) => {
    console.log(`[Mac Desktop] Launching app: ${app.name} (${app.id}) — ready for window manager in Prompt #2`);
  };

  const handleDockItemClick = (item: DockItemData) => {
    console.log(`[Mac Dock] Launching dock app: ${item.name} (${item.id}) — ready for window manager in Prompt #2`);
  };

  // Deselect on desktop canvas click
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
      {/* Top Mac Menu Bar (Fade/slide reveal) */}
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

      {/* Desktop App Icons (Fade/scale reveal) */}
      <div
        style={{
          opacity: isRevealed ? 1 : 0,
          transform: isRevealed ? 'scale(1)' : 'scale(0.96)',
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
              onSelect={() => handleAppSelect(app.id)}
              onDoubleClick={() => handleAppDoubleClick(app)}
              onPositionChange={(newPos) => handlePositionChange(app.id, newPos)}
            />
          );
        })}
      </div>

      {/* Bottom Floating Mac Dock (Fade/slide reveal) */}
      <div
        style={{
          opacity: isRevealed ? 1 : 0,
          transform: isRevealed ? 'translateY(0)' : 'translateY(16px)',
          transition: 'opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1), transform 0.65s cubic-bezier(0.16, 1, 0.3, 1)',
          pointerEvents: isRevealed ? 'auto' : 'none',
        }}
      >
        <Dock items={DOCK_ITEMS} onItemClick={handleDockItemClick} />
      </div>
    </div>
  );
};
