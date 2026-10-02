import React, { useState } from 'react';
import { DESKTOP_APPS, DOCK_ITEMS } from '../../data/desktopApps';
import { AppId, DesktopApp, DockItemData, Position } from '../../types/desktop';
import { MenuBar } from './MenuBar';
import { Dock } from './Dock';
import { DesktopIcon } from './DesktopIcon';

const STORAGE_KEY_MAC_POSITIONS = 'tajalli_mac_desktop_positions_v1';

export const Desktop: React.FC = () => {
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
      {/* Top Mac Menu Bar */}
      <MenuBar />

      {/* Subtle Iconic Macintosh "hello" script in center background (as in MyOS reference) */}
      <div
        style={{
          position: 'absolute',
          top: '46%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          userSelect: 'none',
          textAlign: 'center',
          opacity: 0.72,
        }}
      >
        <span
          style={{
            fontFamily: "'Brush Script MT', 'Segoe Script', cursive, sans-serif",
            fontSize: 'clamp(3.8rem, 9vw, 7.5rem)',
            fontWeight: 300,
            color: 'rgba(255, 255, 255, 0.88)',
            letterSpacing: '0.02em',
            textShadow: '0 8px 30px rgba(0, 0, 0, 0.6), 0 0 40px rgba(99, 102, 241, 0.25)',
          }}
        >
          hello
        </span>
      </div>

      {/* Desktop App Icons */}
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

      {/* Bottom Floating Mac Dock */}
      <Dock items={DOCK_ITEMS} onItemClick={handleDockItemClick} />
    </div>
  );
};
