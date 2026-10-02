import React, { useState, useCallback, useRef } from 'react';
import { PORTFOLIO_FOLDERS } from './data/folders';
import { WindowState } from './types/desktop';
import { LockScreen } from './components/lockscreen/LockScreen';
import { Desktop } from './components/desktop/Desktop';
import { Taskbar } from './components/taskbar/Taskbar';
import { StartMenu } from './components/taskbar/StartMenu';
import { SearchFlyout } from './components/taskbar/SearchFlyout';
import { WindowManager } from './components/windows/WindowManager';

export const App: React.FC = () => {
  const [isLocked, setIsLocked] = useState<boolean>(true);
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);
  const [windows, setWindows] = useState<Record<string, WindowState>>({});
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
  const [isStartOpen, setIsStartOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const highestZIndexRef = useRef<number>(100);

  // Bring window to front
  const handleFocusWindow = useCallback(
    (windowId: string) => {
      highestZIndexRef.current += 1;
      const nextZ = highestZIndexRef.current;
      setWindows((curr) => {
        const win = curr[windowId];
        if (!win) return curr;
        return {
          ...curr,
          [windowId]: {
            ...win,
            isMinimized: false,
            zIndex: nextZ,
          },
        };
      });
      setActiveWindowId(windowId);
    },
    []
  );

  // Open folder as desktop window
  const handleOpenFolder = useCallback(
    (folderId: string) => {
      const folder = PORTFOLIO_FOLDERS.find((f) => f.id === folderId);
      if (!folder) return;

      highestZIndexRef.current += 1;
      const nextZ = highestZIndexRef.current;

      setWindows((prevWindows) => {
        const existing = prevWindows[folderId];
        if (existing) {
          return {
            ...prevWindows,
            [folderId]: {
              ...existing,
              isOpen: true,
              isMinimized: false,
              zIndex: nextZ,
            },
          };
        }

        // Compute a cascaded default position
        const openCount = Object.values(prevWindows).filter((w) => w.isOpen).length;
        const defaultX = Math.min(180 + (openCount % 6) * 32, Math.max(20, window.innerWidth - 560));
        const defaultY = Math.min(60 + (openCount % 6) * 28, Math.max(20, window.innerHeight - 480));

        const newWindow: WindowState = {
          id: folderId,
          folderId: folderId,
          title: folder.name,
          isOpen: true,
          isMinimized: false,
          isMaximized: false,
          position: { x: defaultX, y: defaultY },
          size: { width: 540, height: 420 },
          zIndex: nextZ,
        };

        return {
          ...prevWindows,
          [folderId]: newWindow,
        };
      });

      setActiveWindowId(folderId);
      setSelectedFolderId(folderId);
      setIsStartOpen(false);
      setIsSearchOpen(false);
    },
    []
  );

  // Close window
  const handleCloseWindow = useCallback((windowId: string) => {
    setWindows((prev) => {
      const win = prev[windowId];
      if (!win) return prev;
      return {
        ...prev,
        [windowId]: {
          ...win,
          isOpen: false,
          isMinimized: false,
        },
      };
    });

    setActiveWindowId((currentActive) => {
      if (currentActive === windowId) {
        return null;
      }
      return currentActive;
    });
  }, []);

  // Minimize window
  const handleMinimizeWindow = useCallback((windowId: string) => {
    setWindows((prev) => {
      const win = prev[windowId];
      if (!win) return prev;
      return {
        ...prev,
        [windowId]: {
          ...win,
          isMinimized: true,
        },
      };
    });

    setActiveWindowId((currentActive) => {
      if (currentActive === windowId) {
        return null;
      }
      return currentActive;
    });
  }, []);

  // Maximize / restore window
  const handleMaximizeWindow = useCallback((windowId: string) => {
    setWindows((prev) => {
      const win = prev[windowId];
      if (!win) return prev;
      return {
        ...prev,
        [windowId]: {
          ...win,
          isMaximized: !win.isMaximized,
        },
      };
    });
  }, []);

  // Move window position
  const handleMoveWindow = useCallback((windowId: string, newPos: { x: number; y: number }) => {
    setWindows((prev) => {
      const win = prev[windowId];
      if (!win) return prev;
      return {
        ...prev,
        [windowId]: {
          ...win,
          position: newPos,
        },
      };
    });
  }, []);

  // Toggle Start Menu
  const handleToggleStart = useCallback(() => {
    setIsStartOpen((prev) => {
      const next = !prev;
      if (next) setIsSearchOpen(false);
      return next;
    });
  }, []);

  // Toggle Search Flyout
  const handleToggleSearch = useCallback(() => {
    setIsSearchOpen((prev) => {
      const next = !prev;
      if (next) setIsStartOpen(false);
      return next;
    });
  }, []);

  // Unlock callback
  const handleUnlock = useCallback(() => {
    setIsLocked(false);
  }, []);

  // Lock desktop callback
  const handleLock = useCallback(() => {
    setIsLocked(true);
    setIsStartOpen(false);
    setIsSearchOpen(false);
  }, []);

  // Handle clicking empty area to close popups
  const handleBackgroundClick = useCallback(() => {
    setIsStartOpen(false);
    setIsSearchOpen(false);
    setSelectedFolderId(null);
  }, []);

  return (
    <div
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        backgroundColor: '#0c0e17',
      }}
      onClick={handleBackgroundClick}
    >
      {/* Desktop Space (Wallpaper + 9 Interactive Folders) */}
      <Desktop
        folders={PORTFOLIO_FOLDERS}
        selectedFolderId={selectedFolderId}
        onSelectFolder={setSelectedFolderId}
        onOpenFolder={handleOpenFolder}
      />

      {/* Windows Architecture (Draggable, Minimizable, Maximizable Windows) */}
      <WindowManager
        windows={windows}
        activeWindowId={activeWindowId}
        onFocusWindow={handleFocusWindow}
        onCloseWindow={handleCloseWindow}
        onMinimizeWindow={handleMinimizeWindow}
        onMaximizeWindow={handleMaximizeWindow}
        onMoveWindow={handleMoveWindow}
      />

      {/* Start Menu Flyout */}
      <StartMenu
        isOpen={isStartOpen}
        onClose={() => setIsStartOpen(false)}
        onOpenFolder={handleOpenFolder}
        onLock={handleLock}
      />

      {/* Search Flyout */}
      <SearchFlyout
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onOpenFolder={handleOpenFolder}
      />

      {/* Fixed Windows 11-style Taskbar */}
      <Taskbar
        isStartOpen={isStartOpen}
        onToggleStart={handleToggleStart}
        isSearchOpen={isSearchOpen}
        onToggleSearch={handleToggleSearch}
        windows={windows}
        activeWindowId={activeWindowId}
        onFocusWindow={handleFocusWindow}
        onMinimizeWindow={handleMinimizeWindow}
      />

      {/* Phase 1 Lock Screen Overlay */}
      {isLocked && <LockScreen onUnlock={handleUnlock} />}
    </div>
  );
};

export default App;
