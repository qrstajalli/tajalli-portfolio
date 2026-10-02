import React, { useState } from 'react';
import { FolderItem, Position } from '../../types/desktop';
import { DesktopFolder } from './DesktopFolder';

interface DesktopProps {
  folders: FolderItem[];
  selectedFolderId: string | null;
  onSelectFolder: (id: string | null) => void;
  onOpenFolder: (id: string) => void;
}

const STORAGE_KEY_POSITIONS = 'tajalli_desktop_folder_positions_v1';

export const Desktop: React.FC<DesktopProps> = ({
  folders,
  selectedFolderId,
  onSelectFolder,
  onOpenFolder,
}) => {
  // Load saved folder positions from localStorage or use defaults
  const [positions, setPositions] = useState<Record<string, Position>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_POSITIONS);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Fallback
    }

    const initial: Record<string, Position> = {};
    folders.forEach((f) => {
      initial[f.id] = f.defaultPosition;
    });
    return initial;
  });

  const handlePositionChange = (folderId: string, newPos: Position) => {
    setPositions((prev) => {
      const updated = { ...prev, [folderId]: newPos };
      try {
        localStorage.setItem(STORAGE_KEY_POSITIONS, JSON.stringify(updated));
      } catch {
        // Storage full or private mode
      }
      return updated;
    });
  };

  // Deselect folder when clicking empty desktop area
  const handleDesktopClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onSelectFolder(null);
    }
  };

  return (
    <div
      onClick={handleDesktopClick}
      style={{
        position: 'absolute',
        inset: 0,
        bottom: '48px', // Space for taskbar
        backgroundImage: `radial-gradient(circle at 50% 30%, rgba(12, 14, 23, 0.25) 0%, rgba(12, 14, 23, 0.6) 100%), url(/assets/images/wallpaper.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        overflow: 'hidden',
        userSelect: 'none',
      }}
    >
      {/* Folder Icons — Clean, spacious, only the 9 interactive folders */}
      {folders.map((folder) => {
        const pos = positions[folder.id] || folder.defaultPosition;
        return (
          <DesktopFolder
            key={folder.id}
            folder={folder}
            position={pos}
            isSelected={selectedFolderId === folder.id}
            onSelect={() => onSelectFolder(folder.id)}
            onDoubleClick={() => onOpenFolder(folder.id)}
            onPositionChange={(newPos) => handlePositionChange(folder.id, newPos)}
          />
        );
      })}
    </div>
  );
};
