import React from 'react';
import { WindowState } from '../../types/desktop';
import { DesktopWindow } from './DesktopWindow';

interface WindowManagerProps {
  windows: Record<string, WindowState>;
  activeWindowId: string | null;
  onFocusWindow: (id: string) => void;
  onCloseWindow: (id: string) => void;
  onMinimizeWindow: (id: string) => void;
  onMaximizeWindow: (id: string) => void;
  onMoveWindow: (id: string, pos: { x: number; y: number }) => void;
}

export const WindowManager: React.FC<WindowManagerProps> = ({
  windows,
  activeWindowId,
  onFocusWindow,
  onCloseWindow,
  onMinimizeWindow,
  onMaximizeWindow,
  onMoveWindow,
}) => {
  return (
    <>
      {Object.values(windows).map((win) => {
        if (!win.isOpen) return null;
        return (
          <DesktopWindow
            key={win.id}
            windowState={win}
            isActive={activeWindowId === win.id}
            onFocus={() => onFocusWindow(win.id)}
            onClose={() => onCloseWindow(win.id)}
            onMinimize={() => onMinimizeWindow(win.id)}
            onMaximize={() => onMaximizeWindow(win.id)}
            onMove={(pos) => onMoveWindow(win.id, pos)}
          />
        );
      })}
    </>
  );
};
