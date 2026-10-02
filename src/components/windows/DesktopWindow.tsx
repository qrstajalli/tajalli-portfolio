import React from 'react';
import { WindowState } from '../../types/desktop';

interface DesktopWindowProps {
  windowState: WindowState;
  isActive: boolean;
  onFocus: () => void;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onMove: (pos: { x: number; y: number }) => void;
}

export const DesktopWindow: React.FC<DesktopWindowProps> = ({
  windowState,
}) => {
  if (windowState.isMinimized || !windowState.isOpen) {
    return null;
  }

  return null;
};
