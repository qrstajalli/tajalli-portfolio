export type AppId =
  | 'framer'
  | 'github'
  | 'linkedin'
  | 'projects'
  | 'hackathons'
  | 'skills'
  | 'about-me';

export type DockSlotId =
  | 'about'
  | 'reserved-2'
  | 'gallery'
  | 'reserved-4'
  | 'contact';

export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export type ActionType = 'external_link' | 'none';

export interface DesktopApp {
  id: AppId;
  name: string;
  iconType: 'framer' | 'github' | 'linkedin' | 'folder' | 'about';
  actionType: ActionType;
  actionUrl?: string;
  isInteractive: boolean;
  defaultPosition: Position;
  percentX: number;
  percentY: number;
}

export interface DockItemData {
  id: DockSlotId;
  name: string;
  isReserved?: boolean;
  isInteractive: boolean;
  actionType: ActionType;
  actionUrl?: string;
  badge?: string | number;
}

export interface WindowState {
  id: string;
  appId?: string;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  position: Position;
  size: Size;
  zIndex: number;
}

// Legacy interfaces preserved for compilation integrity
export interface FolderItem {
  id: string;
  name: string;
  description: string;
  category: string;
  iconColor?: string;
  defaultPosition: Position;
}

export interface ExternalLink {
  id: string;
  name: string;
  url: string;
  tooltip: string;
}

export interface SystemUser {
  name: string;
  role: string;
  avatarUrl?: string;
  pin: string;
}
