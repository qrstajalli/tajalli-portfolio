export type AppId =
  | 'about-me'
  | 'projects'
  | 'hackathons'
  | 'experience'
  | 'skills'
  | 'open-source'
  | 'resume'
  | 'contact';

export type DockAppId =
  | 'finder'
  | 'about'
  | 'projects'
  | 'github'
  | 'linkedin'
  | 'figma'
  | 'leetcode'
  | 'mail'
  | 'resume';

export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface DesktopApp {
  id: AppId;
  name: string;
  category: string;
  description: string;
  defaultPosition: Position;
  gradient: string;
  iconType: string;
}

export interface DockItemData {
  id: DockAppId;
  name: string;
  type: 'app' | 'link';
  url?: string;
  gradient?: string;
  isOpen?: boolean;
}

// Window state structure prepared for Prompt #2
export interface WindowState {
  id: string;
  appId?: AppId | string;
  folderId?: string;
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
