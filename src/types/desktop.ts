export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface FolderItem {
  id: string;
  name: string;
  description: string;
  category: string;
  iconColor?: string;
  defaultPosition: Position;
}

export interface WindowState {
  id: string;
  folderId: string;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  position: Position;
  size: Size;
  zIndex: number;
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
